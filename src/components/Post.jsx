import React from 'react';
import Comment from './Comment';

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
      <span>
        <h1>{user.userName}</h1>
        <h3>{createdAt}</h3>
        <div>Options</div>
      </span>
      <div>
        <img src={`${image.url}`}></img>
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
