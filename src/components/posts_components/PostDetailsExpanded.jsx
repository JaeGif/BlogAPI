import React from 'react';
import UserProfileAvatar from '../userProfileHead/UserProfileAvatar';
import style from './postdetailsexpanded.module.css';

function PostDetailsExpanded({ postObj, userData }) {
  return (
    <div className={style.postExpandedContainer}>
      <div className={style.postExpandedWrapper}>
        <UserProfileAvatar user={userData} />
        <div className={style.flexColumn}>
          <div className={style.postFirstLine}>
            <p className={`${style.textSizing} ${style.userName}`}>
              {userData.username}
            </p>
            <p className={`${style.postWrap} ${style.textSizing}`}>
              {postObj.post ? postObj.post : postObj.comment}
            </p>
          </div>
          <p className={style.textSizing}>
            <em className={style.timestamp}>{postObj.createdAt}</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsExpanded;
