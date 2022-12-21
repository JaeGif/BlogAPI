import React from 'react';
import Comment from '../comments/Comment';
import style from './post.module.css';

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
    <div>
      <span className={style.userDateHead}>
        <h1>{user.userName}</h1>
        <h3>{createdAt}</h3>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='48'
            width='48'
            style={{ color: 'white' }}
          >
            <path d='M10.4 26.4q-1 0-1.7-.7T8 24q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7T40 24q0 1-.7 1.7t-1.7.7Z' />
          </svg>
        </div>
      </span>
      <div>
        <img className={style.postImages} src={`${image.url}`}></img>
      </div>
      <span>
        <div>{like}</div>
        {comments.map((comment) => (
          <Comment commentObj={comment} />
        ))}
        <p>Share</p>
      </span>
      <span>Liked by ... usernames</span>
    </div>
  );
}

export default Post;
