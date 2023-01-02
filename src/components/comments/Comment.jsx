import React from 'react';
import UserProfile from '../userProfileHead/userProfile';

function Comment({ commentObj }) {
  return (
    <div>
      <span>
        <UserProfile user={commentObj.user} />

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
