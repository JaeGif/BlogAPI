import React, { useContext, useEffect, useState } from 'react';
import style from './fullpost.module.css';
import UserProfileLocationHeader from '../userProfileHead/UserProfileLocationHeader';
import Comments from '../comments/Comments';
import PostOptionsEllipse from '../options/postOptions/PostOptionsEllipse';
import AddCommentInput from '../comments/addComment/AddCommentInput';
import PostDetailsExpanded from '../posts_components/PostDetailsExpanded';
import { UserContext } from '../../App';
function MobileFullPost({
  postObj,
  toggleFullPost,
  updateParentPost,
  isVideo,
  userData,
}) {
  const {
    createdAt,
    images,
    like,
    post,
    published,
    comments,
    updatedAt,
    location,
    user,
    tagged,
    _id,
  } = postObj;
  const loggedInUser = useContext(UserContext);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    if (user === loggedInUser._id) {
      setIsLoggedInUser(true);
    }
  }, []);

  return (
    <div className={style.fullScreenMobile}>
      <div className={style.mobileHead}>
        <img
          onClick={toggleFullPost}
          src='assets/favicons/previous.svg'
          alt='return icon'
        />
        <h2>Comments</h2>
        {isLoggedInUser ? <PostOptionsEllipse post={postObj} /> : <p> </p>}
      </div>
      <div className={style.postSideWrapper}>
        <div>
          <div className={style.postCommentsContainer}>
            <PostDetailsExpanded postObj={postObj} userData={userData} />
            <Comments comments={comments} userData={userData} />
          </div>
        </div>
        <div className={style.positionAddComment}>
          <AddCommentInput updateParentPost={updateParentPost} post={_id} />
        </div>
      </div>
    </div>
  );
}

export default MobileFullPost;
