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
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import ImageSlider from './ImageSlider';
import uniqid from 'uniqid';
import PostOptionsEllipse from '../options/postOptions/PostOptionsEllipse';
import MobileFullPost from '../fullPost/MobileFullPost';

function Post({ postObj, refreshLoggedInUserData }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const queryClient = useQueryClient();

  const [isComments, setIsComments] = useState(false);
  const [countComments, setCountComments] = useState(0);
  const [displayPost, setDisplayPost] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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

  const submitLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
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
            url: thumbnailQuery.data.url,
            alt: thumbnailQuery.data.alt,
            filter: thumbnailQuery.data.filter,
            adjustments: thumbnailQuery.data.adjustments,
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
  }, []);

  useEffect(() => {
    if (comments.length !== 0) {
      setIsComments(true);
      setCountComments(comments.length);
    } else {
      setIsComments(false);
      setCountComments(0);
    }
  }, [isNewComment]);

  useEffect(() => {
    if (like.length) {
      for (let i = 0; i < like.length; i++) {
        if (like[i].toString() === loggedInUser._id.toString()) {
          setIsLiked(true);
        }
      }
    }
  }, [like, isLiked]);

  useEffect(() => {
    if (user === loggedInUser._id) {
      setIsCurrentUser(true);
    }
  }, []);

  const fetchThumbnail = async () => {
    const res = await fetch(`${apiURL}/api/images/${images[0]}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.image;
  };
  const thumbnailQuery = useQuery({
    queryKey: ['thumbnail', { _id: images[0] }],
    queryFn: fetchThumbnail,
  });
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
        addLikeMutation.mutate();
        break;
      default:
        break;
    }
  };

  const fetchLikeUser = async (userId) => {
    const res = await fetch(`${apiURL}/api/users/${userId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const likesQueries = useQueries({
    queries: like.map((userId) => {
      return {
        queryKey: ['likes', { user: userId }],
        queryFn: () => fetchLikeUser(userId),
      };
    }),
  });

  const addLikeMutation = useMutation({
    mutationFn: submitLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', { u: loggedInUser._id }],
      });
    },
  });
  const numberOfLikes = () => {
    let tempLikes = [];
    console.log('like', like, 'isLiked:', isLiked);

    if (like.length !== 0 && likesQueries[0].isSuccess) {
      const userData = {
        data: {
          username: loggedInUser.username,
          _id: loggedInUser._id,
        },
      };
      if (isLiked && !like.includes(loggedInUser._id)) {
        tempLikes = [userData, ...likesQueries];
      } else {
        tempLikes = likesQueries;
      }
      console.log('temps', tempLikes);
      if (tempLikes.length === 0) {
        return 'No one has liked this yet ...';
      } else if (tempLikes.length === 1) {
        return `${tempLikes[0].data.username} liked this.`;
      } else if (tempLikes.length === 2) {
        return `Liked by ${tempLikes[0].data.username} and ${tempLikes[1].data.username}.`;
      } else if (tempLikes.length > 2) {
        return `Liked by ${tempLikes[0].data.username}, ${
          tempLikes[1].data.username
        } and ${tempLikes.length - 2} more.`;
      }
    } else if (like.length === 0 && isLiked) {
      return `${loggedInUser.username} liked this.`;
    } else if (like.length > 0 && isLiked) {
      return `Liked by ${loggedInUser.username} and ${like.length - 1} more.`;
    } else {
      return 'No one has liked this yet ...';
    }
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
            <ImageSlider key={uniqid()} images={images} />
          </div>
          <div className={style.postInfoContainer}>
            <span className={style.iconsContainer}>
              <span className={style.iconsSpacing}>
                <svg
                  onClick={addLikeMutation.mutate}
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
                  src={`${basePath}/assets/favicons/comment.svg`}
                  alt='comments'
                ></img>
                <img
                  className={style.icons}
                  src={`${basePath}/assets/favicons/send.svg`}
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
                      : `${basePath}/assets/favicons/bookmark.svg`
                  }
                  alt='save post'
                ></img>
              )}
            </span>
            <span>
              <em>{numberOfLikes()}</em>
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
