import React, { useContext, useEffect } from 'react';
import style from './post.module.css';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import { useState } from 'react';
import FullPost from '../fullPost/FullPost';
import UserProfileLocationHeader from '../userProfileHead/UserProfileLocationHeader';
import { ApiContext } from '../../App';

function Post({ postObj, refresh }) {
  const apiURL = useContext(ApiContext);

  const [isComments, setIsComments] = useState(false);
  const [countComments, setCountComments] = useState(0);
  const [displayPost, setDisplayPost] = useState(false);

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
    location,
  } = postObj;

  // If a new comment is added, the individual post needs to refresh just comments
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [tempLikes, setTempLikes] = useState(like);
  const [isVideo, setIsVideo] = useState(false);

  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };

  const handleLike = () => {
    if (isLiked) {
      setTempLikes(tempLikes - 1);
      setIsLiked(false);
      submitLike();
    } else {
      setTempLikes(tempLikes + 1);
      setIsLiked(true);
      submitLike();
    }
  };
  const submitLike = () => {
    let data = new URLSearchParams(); // form sending x-www-form-urlencoded data
    data.append('like', tempLikes);
    fetch(`${apiURL}/api/posts/${_id}`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors',
    }).then(() => {
      console.log('done');
    });
  };

  const updateParentPost = () => {
    setIsNewComment(true);
    refresh();
  };

  useEffect(() => {
    if (comments.length !== 0) {
      setIsComments(true);
      setCountComments(comments.length);
    } else {
      setIsComments(false);
      setCountComments(0);
    }
    if (postObj.image.contentType === 'video/mp4') {
      setIsVideo(true);
    }
  }, [isNewComment, isLiked]);

  const numberOfLikes = () => {
    switch (tempLikes) {
      case 0:
        return 'No one has liked this yet ...';
      case 1:
        return 'One person has liked this.';
      default:
        return `Liked by ${tempLikes} people.`;
    }
  };

  return (
    <div>
      <div className={style.postContainer}>
        <span className={style.userDateHead}>
          <UserProfileLocationHeader user={user} location={location} />
          <div className={style.optionsEllipses}>
            <img
              className={style.optionsEllipses}
              src='./src/assets/favicons/horizontalellipse.svg'
            ></img>
          </div>
        </span>
        <div className={style.imgContainers}>
          {isVideo ? (
            <video className={`${style.postImages} ${image.filter}`} controls>
              <source src={`${apiURL}/${image.url}`} type='video/mp4'></source>
            </video>
          ) : (
            <img
              className={`${style.postImages} ${image.filter}`}
              src={`${apiURL}/${image.url}`}
              alt={image.alt}
            ></img>
          )}
        </div>
        <div className={style.postInfoContainer}>
          <span className={style.iconsContainer}>
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
              src='./src/assets/favicons/comment.svg'
              alt='comments'
            ></img>
            <img
              className={style.icons}
              src='./src/assets/favicons/send.svg'
              alt='private message'
            ></img>
          </span>
          <span>
            <em>{numberOfLikes()}</em>
          </span>
          <p>
            <em className={style.userNameEmphasis}>{user.userName}</em> {post}
          </p>
          <p className={style.datePublished}>{createdAt.toUpperCase()}</p>
          <p onClick={toggleDisplayFullPost} className={style.viewAllComments}>
            {isComments ? `View all ${countComments} comments` : ''}
          </p>
        </div>
        <AddCommentInput updateParentPost={updateParentPost} post={_id} />
      </div>
      {displayPost ? (
        <FullPost
          postObj={postObj}
          toggleFullPost={toggleDisplayFullPost}
          updateParentPost={updateParentPost}
          isVideo={isVideo}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
