import React, { useState, useEffect, useContext } from 'react';
import style from './userpostpreview.module.css';
import FullPost from '../../fullPost/FullPost';
import { ApiContext } from '../../../App';

function UserPostPreview({ post }) {
  const apiURL = useContext(ApiContext);
  const [isVideo, setIsVideo] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);

  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };
  const updateParentPost = () => {
    console.log('refresh?');
  };

  useEffect(() => {
    if (post.image.contentType === 'video/mp4') {
      setIsVideo(true);
    }
  });

  return (
    <div>
      <div
        onClick={toggleDisplayFullPost}
        className={style.squarePreviewContainer}
      >
        <div className={style.contentTypeIndicatorContainer}>
          {isVideo ? (
            <>
              <span className={style.contentIndicatorWrapper}>
                <img
                  className={style.contentIndicatorIcon}
                  src='./src/assets/favicons/movie.svg'
                  alt='indicate video'
                />
              </span>
              <video className={style.squarePreviewContent}>
                <source
                  src={`${apiURL}/${post.image.url}`}
                  type='video/mp4'
                ></source>
              </video>
            </>
          ) : (
            <>
              <span className={style.contentIndicatorWrapper}>
                <img
                  className={style.contentIndicatorIcon}
                  src='./src/assets/favicons/photo.svg'
                  alt='indicate photo'
                />
              </span>
              <img
                className={style.squarePreviewContent}
                src={`${apiURL}/${post.image.url}`}
              />
            </>
          )}
        </div>
      </div>
      {displayPost ? (
        <FullPost
          postObj={post}
          toggleFullPost={toggleDisplayFullPost}
          updateParentPost={updateParentPost}
          isVideo={isVideo}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserPostPreview;
