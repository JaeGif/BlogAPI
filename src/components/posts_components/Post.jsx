import React, { useContext, useEffect } from 'react';
import style from './post.module.css';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import { useState } from 'react';
import FullPost from '../fullPost/FullPost';
import UserProfileLocationHeader from '../userProfileHead/UserProfileLocationHeader';
import {
  ApiContext,
  PathContext,
  ProfileContext,
  TokenContext,
  UserContext,
} from '../../App';
import { useQuery } from '@tanstack/react-query';
import ImageSlider from './ImageSlider';
import uniqid from 'uniqid';
import PostOptionsEllipse from '../options/postOptions/PostOptionsEllipse';
import MobileFullPost from '../fullPost/MobileFullPost';

function Post({ postObj, refreshLoggedInUserData }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);

  const [isComments, setIsComments] = useState(false);
  const [countComments, setCountComments] = useState(0);
  const [displayPost, setDisplayPost] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likedBy, setLikedBy] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState();
  const [mediaMobile, setMediaMobile] = useState(false);

  const {
    createdAt,
    images,
    like,
    post,
    published,
    comments,
    updatedAt,
    user,
    _id,
    location,
  } = postObj;
  // If a new comment is added, the individual post needs to refresh just comments
  const width = window.innerWidth;

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    }
  }, []);

  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      const tempLikedBy = likedBy;
      tempLikedBy.pop();
      setLikedBy(tempLikedBy);
      submitLike();
    } else {
      setIsLiked(true);

      setLikedBy(
        likedBy.concat({
          _id: loggedInUser._id,
          username: loggedInUser.username,
        })
      );
      submitLike();
    }
  };

  const submitLike = () => {
    let data = new URLSearchParams(); // form sending x-www-form-urlencoded data
    data.append(
      'like',
      JSON.stringify({
        _id: loggedInUser._id,
        username: loggedInUser.username,
        recipient: user,
        post: {
          _id: _id,
          thumbnail: {
            url: thumbnailImage.url,
            alt: thumbnailImage.alt,
            filter: thumbnailImage.filter,
            adjustments: thumbnailImage.adjustments,
          },
        },
      })
    );
    fetch(`${apiURL}/api/posts/${_id}`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer' + ' ' + token,
      },
      mode: 'cors',
    }).then(() => {
      /*       refreshLoggedInUserData();
       */
    });
  };

  const handleSavePost = () => {
    let data = new URLSearchParams();

    for (let i = 0; i < loggedInUser.savedPosts.length; i++) {
      if (loggedInUser.savedPosts[i] === _id) {
        setIsSaved(false);
      }
    }
    data.append('savedPost', JSON.stringify(_id));
    fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer' + ' ' + token,
      },
      mode: 'cors',
    }).then(() => {
      console.log('saved!');
    });
  };

  const updateParentPost = () => {
    setIsNewComment(true);
  };

  useEffect(() => {
    for (let i = 0; i < loggedInUser.savedPosts.length; i++) {
      if (loggedInUser.savedPosts[i] === _id) {
        setIsSaved(true);
      }
    }
    fetchThumbnail();
    if (like.length) {
      fetchUsersLike();
    }
  }, []);

  useEffect(() => {
    if (comments.length !== 0) {
      setIsComments(true);
      setCountComments(comments.length);
    } else {
      setIsComments(false);
      setCountComments(0);
    }
    if (like.length) {
      for (let i = 0; i < like.length; i++) {
        if (like[i].toString() === loggedInUser._id.toString()) {
          setIsLiked(true);
        }
      }
    }
  }, [isNewComment]);

  useEffect(() => {
    if (user === loggedInUser._id) {
      setIsCurrentUser(true);
    }
  }, []);

  const numberOfLikes = () => {
    switch (likedBy.length) {
      case 0:
        return 'No one has liked this yet ...';
      case 1:
        return `${likedBy[0].username} liked this.`;
      case 2:
        return `Liked by ${likedBy[0].username} and ${likedBy[1].username}.`;
      default:
        return `Liked by ${likedBy[0].username}, ${likedBy[1].username} and ${
          likedBy.length - 2
        } more.`;
    }
  };
  const fetchThumbnail = async () => {
    const res = await fetch(`${apiURL}/api/images/${images[0]}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setThumbnailImage(data.image);
  };
  const fetchUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${user}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const userQuery = useQuery({
    queryKey: ['users', user],
    queryFn: fetchUser,
  });
  const detectDoubleClick = (e) => {
    switch (e.detail) {
      case 2:
        handleLike();
        break;
      default:
        break;
    }
  };
  const fetchUsersLike = async () => {
    const promiseWrap = await Promise.all(
      like.map(async (userId) => {
        const res = await fetch(`${apiURL}/api/users/${userId}`, {
          mode: 'cors',
          headers: { Authorization: 'Bearer' + ' ' + token },
        });
        const data = await res.json();
        return data.user;
      })
    );

    setLikedBy(promiseWrap);
  };

  return (
    userQuery.data && (
      <div>
        <div className={style.postContainer}>
          <span className={style.userDateHead}>
            <UserProfileLocationHeader
              userData={userQuery.data}
              location={location}
            />
            <PostOptionsEllipse post={postObj} />
          </span>
          <div className={style.sliderContainer} onClick={detectDoubleClick}>
            <ImageSlider images={images} />
          </div>
          <div className={style.postInfoContainer}>
            <span className={style.iconsContainer}>
              <span className={style.iconsSpacing}>
                <svg
                  onClick={handleLike}
                  className={style.icons}
                  viewBox='0 0 50 50'
                >
                  <path
                    fill={isLiked ? '#EE4B2B' : 'FFFFFF'}
                    d='m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1ZM24 38q5.05-4.65 8.325-7.975 3.275-3.325 5.2-5.825 1.925-2.5 2.7-4.45.775-1.95.775-3.9 0-3.3-2.1-5.425T33.5 8.3q-2.55 0-4.75 1.575T25.2 14.3h-2.45q-1.3-2.8-3.5-4.4-2.2-1.6-4.75-1.6-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 1.95.775 3.925.775 1.975 2.7 4.5Q12.4 26.8 15.7 30.1 19 33.4 24 38Zm0-14.85Z'
                  />
                </svg>
                <img
                  onClick={toggleDisplayFullPost}
                  className={style.icons}
                  src={`/BlogAPI/assets/favicons/comment.svg`}
                  alt='comments'
                ></img>
                <img
                  className={style.icons}
                  src={`./assets/favicons/send.svg`}
                  alt='private message'
                ></img>
              </span>
              {!isCurrentUser && (
                <img
                  onClick={handleSavePost}
                  className={style.icons}
                  src={
                    isSaved
                      ? `/BlogAPI/assets/favicons/bookmark_blue.svg`
                      : `./assets/favicons/bookmark.svg`
                  }
                  alt='save post'
                ></img>
              )}
            </span>
            <span>
              <em>{likedBy && numberOfLikes()}</em>
            </span>
            <p>
              <em className={style.userNameEmphasis}>{user.username}</em> {post}
            </p>
            <p className={style.datePublished}>{createdAt.toUpperCase()}</p>
            <p
              onClick={toggleDisplayFullPost}
              className={style.viewAllComments}
            >
              {isComments ? `View all ${countComments} comments` : ''}
            </p>
          </div>
          <AddCommentInput updateParentPost={updateParentPost} post={_id} />
        </div>
        {displayPost && !mediaMobile && (
          <FullPost
            postObj={postObj}
            toggleFullPost={toggleDisplayFullPost}
            updateParentPost={updateParentPost}
            userData={userQuery.data}
          />
        )}
        {displayPost && mediaMobile && (
          <MobileFullPost
            postObj={postObj}
            toggleFullPost={toggleDisplayFullPost}
            updateParentPost={updateParentPost}
            userData={userQuery.data}
          />
        )}
      </div>
    )
  );
}

export default Post;
