import React from 'react';
import style from '../options/postOptions/options.module.css';

function DeleteUserModal({ user, closeDeleteModal }) {
  return (
    <div className={`${style.defaultModal} ${style.greyBorder}`}>
      <span
        className={`${style.center} ${style.column} ${style.containedText}`}
      >
        <h3>Delete Account?</h3>
        <p className={style.softText}>
          Are you sure you want to delete your account?
        </p>
        <p className={style.softText}>
          Your account and data will be completely destroyed.
        </p>
      </span>
      <span
        className={`${style.center} ${style.bottomBorder} ${style.topBorder} ${style.danger}`}
        onClick={(e) => {
          e.stopPropagation();
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
    </div>
  );
}

export default DeleteUserModal;
