import React, { useState, useEffect } from 'react';
import style from './newpost.module.css';
import UploadImages from './UploadImages';
import FullPreviewPage from './imageOptions/FullPreviewPage';
import SubmitPost from './SubmitPost';

// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.

function NewPost({ newPostModal, refresh }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const dummyUser = {
    avatar: {
      id: '9263f45c70879dbc56faa5c4',
      url: 'https://instaapi-production.up.railway.app/uploads/823fce52b33a845ef7554dd9/avatar.jpg',
    },
    _id: '823fce52b33a845ef7554dd9',
    firstName: 'Neal',
    lastName: 'Morissette',
    email: 'Tia_Kris@hotmail.com',
    userName: 'Eldridge_Feest40',
    isAdmin: false,
  };

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState({
    id: dummyUser._id,
    userName: dummyUser.userName,
    avatar: {
      id: dummyUser.avatar.id,
      url: dummyUser.avatar.url,
    },
  });
  const [filter, setFilter] = useState('none');
  const [alt, setAlt] = useState(`image posted by ${user.userName}`);

  const handleFilter = (e) => {
    setFilter(e.currentTarget.id);
  };
  const changeAlt = (e) => {
    setAlt(e.target.value);
  };
  const [post, setPost] = useState('');

  const [postStep, setPostStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const imageTypeRegex = /image\/(png|jpg|jpeg|gif)/gm;

    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
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
    data.append('image', imageFiles[0]);
    data.append('user', JSON.stringify(user));
    data.append('post', post);
    data.append('filter', filter);
    data.append('alt', alt);

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
