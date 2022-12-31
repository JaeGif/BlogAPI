import React from 'react';

function Comment({ commentObj }) {
  return (
    <div>
      <span>
        <h3>{commentObj.user.userName}</h3>
        <h3>
          {commentObj.edited
            ? `edited at ${commentObj.updatedAt}`
            : commentObj.createdAt}
        </h3>
      </span>
      <p>{commentObj.comment}</p>
      <div>
        <p>Likes: {commentObj.like}</p>
      </div>
    </div>
  );
}

export default Comment;
