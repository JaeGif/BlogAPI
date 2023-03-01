import React, { useContext } from 'react';
import {
  UserContext,
  ApiContext,
  PathContext,
  TokenContext,
  ProfileContext,
} from '../../../App';
import style from './options.module.css';

function DeleteModal({ closeDeleteModal, post, handleCloseOptions, user }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const profileCheckout = useContext(ProfileContext);

  const handleDelete = async () => {
    deleteImages();
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
  const deleteImages = async () => {
    let data = new URLSearchParams();
    data.append('images', JSON.stringify(post.images));
    data.append('user', post.user);
    const res = await fetch(`${apiURL}/api/images`, {
      mode: 'cors',
      method: 'DELETE',
      body: data,
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
  };
  if (post) {
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
  } else if (user) {
    <>
      <span
        className={`${style.center} ${style.column} ${style.containedText}`}
      >
        <h3>Delete Account?</h3>
        <p className={style.softText}>
          Are you sure you want to delete your account?
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
    </>;
  }
}

export default DeleteModal;
