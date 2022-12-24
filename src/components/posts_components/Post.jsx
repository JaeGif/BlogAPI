import React, { useEffect } from 'react';
import Comment from '../comments/Comment';
import style from './post.module.css';
import uniqid from 'uniqid';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import Comments from '../comments/Comments';
import { useState } from 'react';

function Post({ postObj }) {
  const [isComments, setIsComments] = useState(false);
  const [countComments, setCountComments] = useState(0);
  const {
    createdAt,
    image,
    like,
    post,
    published,
    title,
    comments,
    updatedAt,
    user,
    _id,
  } = postObj;

  useEffect(() => {
    console.log(comments);
    if (comments.length !== 0) {
      setIsComments(true);
      setCountComments(comments.length);
    } else {
      setIsComments(false);
      setCountComments(0);
    }
  }, [comments]);
  return (
    <div className={style.postContainer}>
      <span className={style.userDateHead}>
        <div>
          <p>
            <em className={style.userNameEmphasis}>{user.userName}</em>
          </p>
        </div>
        <div className={style.optionsEllipses}>
          <img
            className={style.optionsEllipses}
            src='./src/assets/favicons/horizontalellipse.svg'
          ></img>
        </div>
      </span>
      <div className={style.imgContainers}>
        <img className={style.postImages} src={`${image.url}`}></img>
      </div>
      <div className={style.postInfoContainer}>
        <span className={style.iconsContainer}>
          <img
            className={style.icons}
            src='./src/assets/favicons/favorite.svg'
            alt='like'
          ></img>
          <img
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
        <span>Liked by ... usernames and {like} more</span>
        <p>
          <em className={style.userNameEmphasis}>{user.userName}</em> {post}
        </p>
        <p className={style.datePublished}>{createdAt.toUpperCase()}</p>
      </div>
      {isComments ? `View all ${countComments} comments` : ''}
      {/*       <Comments comments={comments} />
       */}{' '}
      <AddCommentInput />
    </div>
  );
}

export default Post;
