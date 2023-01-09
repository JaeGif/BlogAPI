import React, { useState, useEffect, useContext } from 'react';
import style from './newpost.module.css';
import UploadImages from './UploadImages';
import FullPreviewPage from './imageOptions/FullPreviewPage';
import SubmitPost from './SubmitPost';
import { ApiContext, UserContext } from '../../App';
import uniqid from 'uniqid';
// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.

function NewPost({ newPostModal, refresh }) {
  const apiURL = useContext(ApiContext);
  const user = useContext(UserContext);

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [filter, setFilter] = useState('none');
  const [alt, setAlt] = useState(null);
  const [isVideoPreview, setIsVideoPreview] = useState(false);
  const [tagged, setTagged] = useState([]);

  const handleFilter = (e) => {
    setFilter(e.currentTarget.id);
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
    setIsSubmitting(true);
    let data = new FormData();
    console.log('images', imageFiles[0]);

    data.append('image', imageFiles[0]);
    data.append('user', JSON.stringify(user));
    data.append('post', post);
    data.append('location', location);
    data.append('filter', filter);
    data.append('alt', alt);
    data.append('taggedPost', JSON.stringify(tagged));

    console.log(data);
    fetch(`${apiURL}/api/posts`, {
      method: 'POST',
      body: data,
    }).then(() => {
      resetData();
      newPostModal();
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
            images={images}
            filter={filter}
            handleFilters={handleFilter}
            isVideoPreview={isVideoPreview}
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
            filter={filter}
            user={user}
            changeLocation={handleLocation}
            isVideoPreview={isVideoPreview}
            handleTagged={handleTagged}
            tagged={tagged}
            removeTag={removeTag}
          />
        );
      default:
        return <>BIG UH OH</>;
    }
  };
  return (
    <div>
      <div
        className={style.modalContainerFullScreenCenter}
        onClick={() => newPostModal()}
      >
        <div className={style.paddingWrapper}>
          <span className={style.closeModalBtnContainer}>
            <p className={style.closeModalBtn} onClick={() => newPostModal()}>
              &#10005;
            </p>
          </span>
        </div>
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
