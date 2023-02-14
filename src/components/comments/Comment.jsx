import React, { useContext } from 'react';
import { ApiContext, TokenContext } from '../../App';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import UserProfileAvatar from '../userProfileHead/userProfileAvatar';
import style from './comment.module.css';
import { useQuery } from '@tanstack/react-query';
import LoadingIcon from '../utlity_Components/LoadingIcon';

function Comment({ commentObj, userData }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const fetchComment = async () => {
    const res = await fetch(`${apiURL}/api/comments/${commentObj}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.comment;
  };

  const commentQuery = useQuery({
    queryKey: ['comments', { commentid: commentObj }],
    queryFn: fetchComment,
  });
  return commentQuery.data ? (
    <div>
      <PostDetailsExpanded postObj={commentQuery.data} userData={userData} />
    </div>
  ) : (
    <LoadingIcon />
  );
}

export default Comment;
