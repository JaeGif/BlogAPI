import React from 'react';
import UserProfileAvatar from '../userProfileHead/UserProfileAvatar';
import style from './postdetailsexpanded.module.css';

function PostDetailsExpanded({ postObj }) {
  return (
    <div className={style.postExpandedContainer}>
      <div className={style.postExpandedWrapper}>
        <UserProfileAvatar user={postObj.user} />
        <div className={style.flexColumn}>
          <div className={style.postFirstLine}>
            <p className={`${style.textSizing} ${style.userName}`}>
              {postObj.user.userName}
            </p>
            <p className={`${style.postWrap} ${style.textSizing}`}>
              {postObj.post ? postObj.post : postObj.comment}
            </p>
          </div>
          <p className={style.textSizing}>
            <em className={style.timestamp}>{postObj.updatedAt}</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsExpanded;
