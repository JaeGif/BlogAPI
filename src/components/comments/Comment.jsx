import React from 'react';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import UserProfileAvatar from '../userProfileHead/userProfileAvatar';
import style from './comment.module.css';

function Comment({ commentObj }) {
  return (
    <div>
      <PostDetailsExpanded postObj={commentObj} />
    </div>
  );
}

export default Comment;
