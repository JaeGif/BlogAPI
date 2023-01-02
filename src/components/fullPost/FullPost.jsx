import React from 'react';
import Comments from '../comments/Comments';
import Comment from '../comments/Comment';
import style from './fullpost.module.css';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import UserProfile from '../userProfileHead/userProfile';
import AddCommentInput from '../comments/addComment/AddCommentInput';

function FullPost({ postObj, toggleFullPost }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const {
    createdAt,
    image,
    like,
    post,
    published,
    comments,
    updatedAt,
    user,
    _id,
  } = postObj;
  return (
    <div className={style.fullScreenContainer}>
      <div
        className={style.modalContainerFullScreenCenter}
        onClick={() => toggleFullPost()}
      >
        <div className={style.paddingWrapper}>
          <span className={style.closeModalBtnContainer}>
            <p className={style.closeModalBtn} onClick={() => toggleFullPost()}>
              &#10005;
            </p>
          </span>
        </div>
        <div className={style.postModalWrapper}>
          <div
            className={style.postModalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.innerContent}>
              <div className={style.imageContainer}>
                <img
                  className={style.imageSizing}
                  src={`${apiURL}/${image.url}`}
                  alt='default alt'
                />
              </div>
              <div className={style.postSideWrapper}>
                <div>
                  <span className={style.userHead}>
                    <UserProfile user={user} />
                    <div className={style.optionsEllipses}>
                      <img
                        className={style.optionsEllipses}
                        src='./src/assets/favicons/horizontalellipse.svg'
                      ></img>
                    </div>
                  </span>
                  <div className={style.postCommentsContainer}>
                    <PostDetailsExpanded postObj={postObj} />
                    <Comments comments={comments} />
                  </div>
                </div>
                <AddCommentInput />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
