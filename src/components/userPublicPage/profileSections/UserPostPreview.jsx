import React, { useState, useEffect, useContext } from 'react';
import style from './userpostpreview.module.css';
import FullPost from '../../fullPost/FullPost';
import { ApiContext, PathContext, TokenContext } from '../../../App';
import { useQuery } from '@tanstack/react-query';
import Post from '../../posts_components/Post';

function UserPostPreview({ post }) {
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const [isVideo, setIsVideo] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);
  const [userData, setUserData] = useState();
  const [isReady, setIsReady] = useState(false);
  const [multipleContent, setMultipleContent] = useState(false);
  const [mediaMobile, setMediaMobile] = useState(false);
  const width = window.innerWidth;

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    }
  }, []);

  const toggleDisplayFullPost = () => {
    fetchPostUserData();
  };
  const fetchPostUserData = async () => {
    const res = await fetch(`${apiURL}/api/users/${post.user}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setUserData(data.user);
  };
  useEffect(() => {
    if (post.images.length > 1) {
      setMultipleContent(true);
    }
  }, []);
  useEffect(() => {
    if (userData) {
      displayPost ? setDisplayPost(false) : setDisplayPost(true);
    }
  }, [userData]);

  const updateParentPost = () => {
    console.log('refresh?');
  };

  const fetchThumbnail = async () => {
    const res = await fetch(`${apiURL}/api/images/${post.images[0]}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    if (data.image.img.contentType === 'video/mp4') {
      setIsVideo(true);
    }
    return data.image;
  };

  const thumbnailQuery = useQuery({
    queryKey: ['images', { imageid: post.images[0] }],
    queryFn: fetchThumbnail,
  });

  return (
    thumbnailQuery.data && (
      <>
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
                      src={
                        multipleContent
                          ? `${basePath}/favicons/multiple-content-white.svg`
                          : `${basePath}/favicons/photo.svg`
                      }
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
          {displayPost && (
            <FullPost
              postObj={post}
              toggleFullPost={toggleDisplayFullPost}
              updateParentPost={updateParentPost}
              isVideo={isVideo}
              userData={userData}
            />
          )}
        </div>
      </>
    )
  );
}

export default UserPostPreview;
