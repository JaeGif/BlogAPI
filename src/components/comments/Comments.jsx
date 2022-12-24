import React from 'react';
import uniqid from 'uniqid';
import Comment from './Comment';

function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={uniqid()} commentObj={comment} />
      ))}
    </div>
  );
}

export default Comments;
