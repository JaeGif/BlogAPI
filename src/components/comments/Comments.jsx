import React from 'react';
import uniqid from 'uniqid';
import Comment from './Comment';

function Comments({ comments, userData }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={uniqid()} commentObj={comment} userData={userData} />
      ))}
    </div>
  );
}

export default Comments;
