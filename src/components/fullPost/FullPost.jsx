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
import {
  ApiContext,
  PathContext,
  UserContext,
  ProfileContext,
} from '../../App';
import Content from '../posts_components/Content';

function FullPost({
  postObj,
  toggleFullPost,
  updateParentPost,
  isVideo,
  userData,
}) {
  const {
    createdAt,
    images,
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
  const getUserProfile = useContext(ProfileContext);

  const [revealTags, setRevealTags] = useState(false);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [tags, setTags] = useState(tagged);

  const toggleRevealTags = () => {
    revealTags ? setRevealTags(false) : setRevealTags(true);
    console.log(revealTags);
    console.log(tags[0].user);
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
                          onClick={(e) => {
                            getUserProfile(tag.user);
                            e.stopPropagation();
                          }}
                        >
                          {tag.user.username}
                        </span>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                {images.map((img) => (
                  <Content imageId={img} />
                ))}
              </div>
              <div className={style.postSideWrapper}>
                <div>
                  <span className={style.userHead}>
                    <UserProfileLocationHeader
                      userData={userData}
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
                    <PostDetailsExpanded
                      postObj={postObj}
                      userData={userData}
                    />
                    <Comments comments={comments} userData={userData} />
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
