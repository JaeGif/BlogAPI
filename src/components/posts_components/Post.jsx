import React from 'react';
import Comment from '../comments/Comment';
import style from './post.module.css';
import uniqid from 'uniqid';

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
        <h3>{user.userName}</h3>
        <h3>{createdAt}</h3>
        <div className={style.optionsEllipses}>
          <img
            className={style.optionsEllipses}
            src='./src/assets/favicons/horizontalellipse.svg'
          ></img>
        </div>
      </span>
      <div>
        <img className={style.postImages} src={`${image.url}`}></img>
      </div>
      <span>
        <div className={style.icons}>
          <img src='./src/assets/favicons/favorite.svg'></img>
          {like}
        </div>
        <p>Share</p>
      </span>
      <span>Liked by ... usernames</span>
      <div>
        {comments.map((comment) => (
          <Comment key={uniqid()} commentObj={comment} />
        ))}
      </div>
    </div>
  );
}

export default Post;
