import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../../App';
import AddLocation from '../../newPost/SubmitComponents/AddLocation';
import UserHeadName from '../../newPost/SubmitComponents/UserHeadName';
import ImageSlider from '../../posts_components/ImageSlider';
import style from './options.module.css';

function EditModal({ post, closeEditModal, index }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const [postBody, setPostBody] = useState(post.post);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [multipleContent, setMultipleContent] = useState(false);
  const [fullPost, setFullPost] = useState(post);
  const [removeEls, setRemoveEls] = useState();
  const [location, setLocation] = useState(post.location);

  useEffect(() => {
    if (fullPost.images.length > 1) {
      setMultipleContent(true);
    } else {
      setMultipleContent(false);
    }
  }, [fullPost]);

  const handleAddContentForDeletion = () => {
    setRemoveEls(removeEls.concat(fullPost.images[currentIndex]));
  };
  const handleRemoveContent = async () => {
    let data = new URLSearchParams();

    data.append('removeContent', JSON.stringify(removeEls));
    const res = await fetch(`${apiURL}/api/posts/${post._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: { Authorization: 'Bearer' + ' ' + token },
    });

    switch (res.status) {
      case 200:
        console.log('success');
        break;
      case 404:
        console.log('that doesn/t exist buddy');
        break;
      case 500:
        alert('something has gone horribly wrong here, err 500');
        break;
    }
    console.log(res);
  };
  const handleUpdateIndex = (index) => {
    setCurrentIndex(index);
  };

  const handleSubmitPostData = async () => {
    const data = new URLSearchParams();
    data.append('post', postBody);
    data.append('location', location);
    data.append('removeContent', JSON.stringify(removeEls));

    const res = await fetch(`${apiURL}/api/posts/${post._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
  };
  const handlePostEdit = (e) => {
    setPostBody(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  return (
    <div className={style.editContainer} onClick={(e) => e.stopPropagation()}>
      <div className={style.editHeader}>
        <span onClick={() => closeEditModal()} className={style.cancelBtn}>
          Cancel
        </span>
        <span className={style.header}>Edit Info</span>
        <span onClick={handleSubmitPostData} className={style.doneBtn}>
          Done
        </span>
      </div>
      <div className={style.postBody}>
        <ImageSlider
          images={fullPost.images}
          handleUpdateIndex={handleUpdateIndex}
          removeEls={removeEls}
        />
        <div>
          <UserHeadName user={loggedInUser} />
          <div className={style.postBodyContainer}>
            <textarea
              className={style.postInput}
              onChange={(e) => handlePostEdit(e)}
              name='post'
              defaultValue={postBody}
              placeholder='Write a caption...'
            ></textarea>
          </div>
          <AddLocation
            changeLocation={(e) => {
              handleChangeLocation(e);
            }}
            lastLocation={post.location}
          />

          {multipleContent && (
            <div className={style.removeContainer}>
              <span className={style.removeWrapper}>
                <div
                  onClick={handleAddContentForDeletion}
                  className={style.removeIcon}
                >
                  <img src='/assets/favicons/delete.svg' />
                </div>
                <p>
                  <em className={style.removeEmphasis}>Remove</em>
                </p>
                <p>
                  <em>If you remove this content it cannot be recovered.</em>
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditModal;
