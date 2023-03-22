import React, { useState, useEffect, useContext } from 'react';
import style from './newpost.module.css';
import UploadImages from './UploadImages';
import FullPreviewPage from './imageOptions/FullPreviewPage';
import SubmitPost from './SubmitPost';
import {
  ApiContext,
  TokenContext,
  UserContext,
  ProgressContext,
} from '../../App';
import uniqid from 'uniqid';
// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.

function NewPost({ newPostModal, refresh }) {
  const apiURL = useContext(ApiContext);
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const handleProgress = useContext(ProgressContext);

  const width = window.innerWidth;

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [alt, setAlt] = useState(null);
  const [isVideoPreview, setIsVideoPreview] = useState(false);
  const [tagged, setTagged] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [mediaMobile, setMediaMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  });

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    } else {
      setMediaMobile(false);
    }
  }, []);

  const handleIncIndex = () => {
    if (imageIndex === images.length - 1) {
      return;
    } else {
      setImageIndex(imageIndex + 1);
    }
  };
  const handleDecIndex = () => {
    if (imageIndex === 0) {
      return;
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < imageFiles.length; i++) {
      tempArray.push({ filter: 'filter-none', index: i });
    }
    setImageData(tempArray);
  }, [imageFiles]);

  const assignDataToContent = (filterId) => {
    let intermediateArr = [...imageData];
    console.log(intermediateArr);
    // first if data already exists, adjust the data
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].index === imageIndex) {
        intermediateArr[i].filter = filterId;
        setImageData(intermediateArr);
        break;
      }
    }
  };
  const handleFilter = (e, index) => {
    assignDataToContent(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  const changeAlt = (e) => {
    setAlt(e.target.value);
  };
  const [post, setPost] = useState(null);
  const [location, setLocation] = useState(null);

  const [postStep, setPostStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagged = (tag) => {
    setTagged(tagged.concat({ key: uniqid(), user: tag }));
  };
  const removeTag = (key) => {
    for (let i = 0; i < tagged.length; i++) {
      if (tagged[i].key === key) {
        const taggedCopy = [...tagged];
        taggedCopy.splice(i, 1);
        setTagged(taggedCopy);
      }
    }
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const removeImagesAndReturn = () => {
    setImages([]);
    setImageFiles([]);
    decPostStep();
  };
  const handleFiles = (file) => {
    let files;
    if (!file.length) {
      files = [file];
    } else {
      files = file;
    }
    if (files.length > 10) {
      return alert('No more than 10 pieces of content per post.');
    }
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type == 'video/mp4') {
        setIsVideoPreview(true);
      }
      validImageFiles.push(file);
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);

      setPostStep(1);
      return;
    }
    alert(
      'DEV ALERT RED CODE RED CODE: Selected images are not of valid type!'
    );
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const incPostStep = () => {
    setPostStep(postStep + 1);
  };
  const decPostStep = () => {
    setPostStep(postStep - 1);
  };
  const addPost = (e) => {
    setPost(e.target.value);
  };
  const resetData = () => {
    setImages([]);
    setImageFiles([]);
    setPost('');
  };

  const submitPost = () => {
    handleProgress(20);
    setIsSubmitting(true);
    handleProgress(25);

    let data = new FormData();
    let taggedIdx = [];

    console.log('images', imageFiles);
    for (let i = 0; i < imageFiles.length; i++) {
      data.append('image', imageFiles[i]);
      console.log('pushing image');
    }
    handleProgress(35);

    // make tagged users only idx
    for (let j = 0; j < tagged.length; j++) {
      taggedIdx.push(tagged[j].user._id);
    }

    data.append('user', user._id);
    data.append('post', post);
    data.append('location', location);
    data.append('imageData', JSON.stringify(imageData));
    data.append('alt', alt);
    data.append('taggedPost', JSON.stringify(taggedIdx));
    handleProgress(50);

    console.log(data);
    fetch(`${apiURL}/api/posts`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    }).then(() => {
      handleProgress(70);
      resetData();
      newPostModal();
      handleProgress(100);
      refresh();
      setIsSubmitting(false);
    });
  };

  const renderPostStep = () => {
    switch (postStep) {
      case 0:
        return <UploadImages handleFiles={handleFiles} />;
      case 1:
        return (
          <FullPreviewPage
            returnToUpload={removeImagesAndReturn}
            nextStep={incPostStep}
            imageIndex={imageIndex}
            images={images}
            imageData={imageData}
            handleFilters={handleFilter}
            isVideoPreview={isVideoPreview}
            handleIncIndex={handleIncIndex}
            handleDecIndex={handleDecIndex}
          />
        );
      case 2:
        return (
          <SubmitPost
            exitModal={newPostModal}
            addPost={addPost}
            prevStep={decPostStep}
            submit={submitPost}
            isSubmitting={isSubmitting}
            changeAlt={changeAlt}
            images={images}
            imageIndex={imageIndex}
            imageData={imageData}
            handleIncIndex={handleIncIndex}
            handleDecIndex={handleDecIndex}
            user={user}
            changeLocation={handleLocation}
            isVideoPreview={isVideoPreview}
            handleTagged={handleTagged}
            tagged={tagged}
            removeTag={removeTag}
          />
        );
      default:
        return <UploadImages handleFiles={handleFiles} />;
    }
  };
  return (
    <div>
      <div
        className={style.modalContainerFullScreenCenter}
        onClick={() => !mediaMobile && newPostModal()}
      >
        {!mediaMobile && (
          <div className={style.paddingWrapper}>
            <span className={style.closeModalBtnContainer}>
              <p className={style.closeModalBtn} onClick={() => newPostModal()}>
                &#10005;
              </p>
            </span>
          </div>
        )}
        <div className={style.postModalWrapper}>
          <div
            className={style.postModalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {renderPostStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
