import React, { useState, useEffect, useContext } from 'react';
import style from './userpostpreview.module.css';
import FullPost from '../../fullPost/FullPost';
import { ApiContext, PathContext, TokenContext } from '../../../App';
import { useQuery } from '@tanstack/react-query';

function UserPostPreview({ post, userData }) {
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const [isVideo, setIsVideo] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);
  console.log(post);

  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };

  const updateParentPost = () => {
    console.log('refresh?');
  };

  const fetchThumbnail = async () => {
    const res = await fetch(`${apiURL}/api/images/${post.images[0]}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.image;
  };

  useEffect(() => {
    if (post.contentType === 'video/mp4') {
      setIsVideo(true);
    }
  });

  const thumbnailQuery = useQuery({
    queryKey: ['images', { imageid: post.images[0] }],
    queryFn: fetchThumbnail,
  });
  console.log(thumbnailQuery.data);
  return thumbnailQuery.data ? (
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
                  className={`${style.contentIndicatorIcon} `}
                  src={`${basePath}/assets/favicons/movie.svg`}
                  alt='indicate video'
                />
              </span>
              <video
                className={`${style.squarePreviewContent} ${thumbnailQuery.data.filter}`}
              >
                <source
                  src={`${apiURL}/${thumbnailQuery.data.url}`}
                  type='video/mp4'
                ></source>
              </video>
            </>
          ) : (
            <>
              <span className={style.contentIndicatorWrapper}>
                <img
                  className={style.contentIndicatorIcon}
                  src={`/assets/favicons/photo.svg`}
                  alt='indicate photo'
                />
              </span>
              <img
                className={`${style.squarePreviewContent} ${thumbnailQuery.filter}`}
                src={`${apiURL}/${thumbnailQuery.data.url}`}
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
          userData={userData}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

export default UserPostPreview;
