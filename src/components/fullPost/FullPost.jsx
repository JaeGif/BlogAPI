import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import Comments from '../comments/Comments';
import Comment from '../comments/Comment';
import style from './fullpost.module.css';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import UserProfile from '../userProfileHead/userProfile';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import UserProfileLocationHeader from '../userProfileHead/UserProfileLocationHeader';
import { ApiContext, PathContext, UserContext } from '../../App';

function FullPost({ postObj, toggleFullPost, updateParentPost, isVideo }) {
  const {
    createdAt,
    image,
    like,
    post,
    published,
    comments,
    updatedAt,
    location,
    user,
    _id,
    tagged,
  } = postObj;

  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const [revealTags, setRevealTags] = useState(false);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [tags, setTags] = useState(tagged);

  const toggleRevealTags = () => {
    revealTags ? setRevealTags(false) : setRevealTags(true);
    console.log(revealTags);
    console.log(tags);
  };

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
              <div onClick={toggleRevealTags} className={style.imageContainer}>
                {revealTags ? (
                  <div className={style.tagsContainer}>
                    {tags.length ? (
                      tags.map((tag) => (
                        <span
                          key={uniqid()}
                          className={style.taggedUsersContainer}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {tag.user.userName}
                        </span>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {isVideo ? (
                  <video
                    className={`${style.imageSizing} ${image.filter}`}
                    controls
                  >
                    <source
                      src={`${apiURL}/${image.url}`}
                      type='video/mp4'
                    ></source>
                  </video>
                ) : (
                  <img
                    className={`${style.imageSizing} ${image.filter}`}
                    src={`${apiURL}/${image.url}`}
                    alt={image.alt}
                  />
                )}
              </div>
              <div className={style.postSideWrapper}>
                <div>
                  <span className={style.userHead}>
                    <UserProfileLocationHeader
                      user={user}
                      location={location}
                    />
                    <div className={style.optionsEllipses}>
                      <img
                        className={style.optionsEllipses}
                        src={`${basePath}/assets/favicons/horizontalellipse.svg`}
                      ></img>
                    </div>
                  </span>
                  <div className={style.postCommentsContainer}>
                    <PostDetailsExpanded postObj={postObj} />
                    <Comments comments={comments} />
                  </div>
                </div>
                <AddCommentInput
                  updateParentPost={updateParentPost}
                  post={_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
