import React, { useContext } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../App';
import style from '../options/postOptions/options.module.css';

function DeleteUserModal({ user, closeDeleteModal, handleLogOut }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const loggedInUser = useContext(UserContext);

  const handleDeleteUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
      method: 'DELETE',
    });
    if (res.status === 200) {
      handleLogOut();
    }
    console.log(res);
  };
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
          Your data will be completely unrecoverable.
        </p>
      </span>
      <span
        className={`${style.center} ${style.bottomBorder} ${style.topBorder} ${style.danger}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteUser();
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
