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
import {
  ApiContext,
  PathContext,
  UserContext,
  ProfileContext,
  TokenContext,
} from '../../App';
import Content from '../posts_components/Content';
import { useQueries } from '@tanstack/react-query';

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

  const [revealTags, setRevealTags] = useState(false);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  useEffect(() => {
    if (tagged.length >= 0) {
      console.log('has length');
      setHasLength(true);
    }
  }, []);

  const toggleRevealTags = () => {
    revealTags ? setRevealTags(false) : setRevealTags(true);
  };
  const fetchUserById = async (id) => {
    const res = await fetch(`${apiURL}/api/users/${id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    console.log(data);
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
  console.log(taggedUsersQueries);
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
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRevealTags();
                }}
                className={style.imageContainer}
              >
                {revealTags ? (
                  <div className={style.tagsContainer}>
                    {hasLength && taggedUsersQueries[0].isSuccess ? (
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
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                <ImageSlider key={uniqid()} images={images} />
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
