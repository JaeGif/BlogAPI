import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import AddLocation from '../../newPost/SubmitComponents/AddLocation';
import UserHeadName from '../../newPost/SubmitComponents/UserHeadName';
import ImageSlider from '../../posts_components/ImageSlider';
import style from './options.module.css';

function EditModal({ post, closeEditModal }) {
  const loggedInUser = useContext(UserContext);
  const [postBody, setPostBody] = useState(post.post);
  const handlePostEdit = (e) => {
    setPostBody(e.target.value);
  };

  return (
    <div className={style.editContainer} onClick={(e) => e.stopPropagation()}>
      <div className={style.editHeader}>
        <span className={style.cancelBtn}>Cancel</span>
        <span className={style.header}>Edit Info</span>
        <span className={style.doneBtn}>Done</span>
      </div>
      <div className={style.postBody}>
        <ImageSlider images={post.images} />
        <div className={style.headerPostWrapper}>
          <UserHeadName user={loggedInUser} />
          <textarea
            className={style.postInput}
            onChange={(e) => handlePostEdit(e)}
            name='post'
            defaultValue={postBody}
            placeholder='Write a caption...'
          ></textarea>
          <AddLocation lastLocation={post.location} />
        </div>
      </div>
    </div>
  );
}

export default EditModal;
