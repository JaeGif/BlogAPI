import React from 'react';

function Post({ postObj }) {
  const {
    createdAt,
    image,
    like,
    post,
    published,
    title,
    updatedAt,
    user,
    _id,
  } = postObj;
  return (
    <div>
      <span>
        <h1>{user}</h1>
        <div>Options</div>
      </span>
      <div>
        <img src={`${image.img.url}`}></img>
      </div>
      <span>
        <div>{like}</div>
        <p>Comment</p>
        <p>Share</p>
      </span>
      <span>Liked by ... usernames</span>
    </div>
  );
}

export default Post;
