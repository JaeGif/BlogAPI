import React from 'react';
import Comment from '../comments/Comment';
import style from './post.module.css';
import uniqid from 'uniqid';
import AddCommentInput from '../comments/addComment/AddCommentInput';

function Post({ postObj }) {
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
  return (
    <div className={style.postContainer}>
      <span className={style.userDateHead}>
        <div>
          <p>{user.userName}</p>
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
          <em>{createdAt}</em>
        </p>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={uniqid()} commentObj={comment} />
        ))}
      </div>
      <AddCommentInput />
    </div>
  );
}

export default Post;
