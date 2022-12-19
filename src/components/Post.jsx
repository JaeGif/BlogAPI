import React from 'react';

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
        <div>Options</div>
      </span>
      <div>
        <img src={`${image.url}`}></img>
      </div>
      <span>
        <div>{like}</div>
        <p>
          {comments.map((el) => (
            <div>
              {' '}
              COMMENTS -----
              <p>{el.comment}</p>
              <p>{el.user.userName}</p>
            </div>
          ))}
        </p>
        <p>Share</p>
      </span>
      <span>Liked by ... usernames</span>
    </div>
  );
}

export default Post;
