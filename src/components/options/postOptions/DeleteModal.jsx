import React, { useContext } from 'react';
import {
  UserContext,
  ApiContext,
  PathContext,
  TokenContext,
  ProfileContext,
} from '../../../App';
import style from './options.module.css';

function DeleteModal({ closeDeleteModal, post, handleCloseOptions }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const profileCheckout = useContext(ProfileContext);

  const handleDelete = async () => {
    const res = await fetch(`${apiURL}/api/posts/${post._id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    console.log(res.status);
    if (res.status === 200) {
      handleCloseOptions();
    }
  };
  return (
    <>
      <span
        className={`${style.center} ${style.column} ${style.containedText}`}
      >
        <h3>Delete Post?</h3>
        <p className={style.softText}>
          Are you sure you want to delete this post?
        </p>
      </span>
      <span
        className={`${style.center} ${style.bottomBorder} ${style.topBorder} ${style.danger}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        Delete
      </span>
      <span
        className={`${style.center}`}
        onClick={(e) => {
          e.stopPropagation();
          closeDeleteModal();
        }}
      >
        Cancel
      </span>
    </>
  );
}

export default DeleteModal;
