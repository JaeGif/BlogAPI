import React, { useContext, useEffect, useState } from 'react';
import style from './options.module.css';
import {
  UserContext,
  ApiContext,
  PathContext,
  TokenContext,
  ProfileContext,
} from '../../../App';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
function Options({ post, handleCloseOptions }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const profileCheckout = useContext(ProfileContext);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [defaultModal, setDefaultModal] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [fullPost, setFullPost] = useState(false);

  useEffect(() => {
    if (loggedInUser._id === post.user) {
      setIsCurrentUser(true);
    }
  }, []);

  const removeFollowingFromCurrentUser = async () => {
    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: post.user,
        type: 'following/remove',
      })
    );
    const followingRes = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}`,
      {
        mode: 'cors',
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer' + ' ' + token,
        },
      }
    );
  };
  const removeFollowerFromUser = async () => {
    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: post.user,
        type: 'follower/remove',
      })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${post.user}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer' + ' ' + token,
      },
    });
  };

  const handleUnfollow = () => {
    removeFollowerFromUser();
    removeFollowingFromCurrentUser();
  };
  const openDeleteModal = () => {
    console.log('open delete');
    setDeleteModal(true);
    setDefaultModal(false);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDefaultModal(true);
  };
  const openEditModal = () => {
    setEditModal(true);
    setDefaultModal(false);
  };
  const closeEditModal = () => {
    setEditModal(false);
    setDefaultModal(true);
  };

  console.log(defaultModal, deleteModal, editModal);

  return (
    <>
      {defaultModal && (
        <div className={style.defaultModal}>
          {!isCurrentUser && (
            <div
              onClick={handleUnfollow}
              className={`${style.center} ${style.danger} ${style.bottomBorder}`}
            >
              Unfollow
            </div>
          )}
          {isCurrentUser && (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal();
                }}
                className={`${style.center} ${style.bottomBorder} ${style.danger}`}
              >
                Delete
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal();
                }}
                className={`${style.center} ${style.bottomBorder} ${style.neutral}`}
              >
                Edit
              </div>
            </>
          )}
          <div className={`${style.center} ${style.bottomBorder}`}>
            Full Post LINK
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleCloseOptions();
            }}
            className={`${style.center}`}
          >
            Close
          </div>
        </div>
      )}
      {deleteModal && (
        <div className={style.defaultModal}>
          <DeleteModal
            handleCloseOptions={handleCloseOptions}
            closeDeleteModal={closeDeleteModal}
            post={post}
          />
        </div>
      )}
      {editModal && (
        <div className={style.defaultModal}>
          <EditModal closeEditModal={closeEditModal} post={post} />
        </div>
      )}
    </>
  );
}

export default Options;
