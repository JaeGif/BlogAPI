import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import Comments from '../comments/Comments';
import Comment from '../comments/Comment';
import ImageSlider from '../posts_components/ImageSlider';
import style from './fullpost.module.css';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import UserProfile from '../userProfileHead/userProfile';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import UserProfileLocationHeader from '../userProfileHead/UserProfileLocationHeader';
import MobileFullPost from './MobileFullPost';
import {
  ApiContext,
  PathContext,
  UserContext,
  ProfileContext,
  TokenContext,
  ProgressContext,
} from '../../App';
import Content from '../posts_components/Content';
import { useQueries } from '@tanstack/react-query';
import PostOptionsEllipse from '../options/postOptions/PostOptionsEllipse';

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
    tagged,
    _id,
  } = postObj;

  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const getUserProfile = useContext(ProfileContext);
  const token = useContext(TokenContext);
  const width = window.innerWidth;

  const [revealTags, setRevealTags] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [mediaMobile, setMediaMobile] = useState(false);
  const [commentView, setCommentView] = useState(false);

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    }
  });
  useEffect(() => {
    if (tagged.length > 0) {
      setHasLength(true);
    }
  }, []);

  const toggleRevealTags = () => {
    if (hasLength) {
      revealTags ? setRevealTags(false) : setRevealTags(true);
    } else {
      return;
    }
  };
  const fetchUserById = async (id) => {
    const res = await fetch(`${apiURL}/api/users/${id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const taggedUsersQueries = useQueries({
    queries: tagged.map((tagId) => {
      return {
        queryKey: ['users', { taggedid: tagId }],
        queryFn: () => fetchUserById(tagId),
        enabled: !!tagId,
      };
    }),
  });

  return (
    <>
      <div className={style.fullScreenContainer}>
        <div
          className={style.modalContainerFullScreenCenter}
          onClick={() => toggleFullPost()}
        >
          <div className={style.paddingWrapper}>
            <span className={style.closeModalBtnContainer}>
              <p
                className={style.closeModalBtn}
                onClick={() => toggleFullPost()}
              >
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
                {mediaMobile && (
                  <span className={style.userHead}>
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFullPost}
                      src='./assets/favicons/previous.svg'
                      alt='back'
                    />
                    <UserProfileLocationHeader
                      userData={userData}
                      location={location}
                    />
                    <PostOptionsEllipse post={postObj} />
                  </span>
                )}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRevealTags();
                  }}
                  className={style.imageContainer}
                >
                  {revealTags && (
                    <div className={style.tagsContainer}>
                      {hasLength &&
                        taggedUsersQueries[0].isSuccess &&
                        taggedUsersQueries.map((tag) => (
                          <span
                            key={uniqid()}
                            className={style.taggedUsersContainer}
                            onClick={(e) => {
                              getUserProfile(tag.data);
                              e.stopPropagation();
                            }}
                          >
                            {tag.data.username}
                          </span>
                        ))}
                    </div>
                  )}
                  <ImageSlider key={uniqid()} images={images} />
                </div>

                <div className={style.postSideWrapper}>
                  {!mediaMobile ? (
                    <>
                      <div>
                        <span className={style.userHead}>
                          <UserProfileLocationHeader
                            userData={userData}
                            location={location}
                          />
                          <PostOptionsEllipse post={postObj} />
                        </span>

                        <div className={style.postCommentsContainer}>
                          <PostDetailsExpanded
                            postObj={postObj}
                            userData={userData}
                          />
                          <Comments comments={comments} userData={userData} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={style.textContainer}>
                      <p>
                        <em className={style.timestamp}>{createdAt}</em>
                      </p>
                      {comments.length >= 1 && (
                        <p
                          onClick={() => {
                            setCommentView(true);
                          }}
                          className={`${style.timestamp} ${style.cursorPointer}`}
                        >
                          View All {comments.length} comments
                        </p>
                      )}
                    </div>
                  )}
                  <AddCommentInput
                    updateParentPost={updateParentPost}
                    post={_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {commentView && (
          <MobileFullPost
            postObj={postObj}
            toggleFullPost={toggleFullPost}
            updateParentPost={updateParentPost}
            userData={userData}
          />
        )}
      </div>
    </>
  );
}

export default FullPost;
