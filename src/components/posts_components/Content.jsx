import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState, useEffect } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../App';
import style from './post.module.css';
function Content({ imageId, removeEls }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const [isVideo, setIsVideo] = useState(false);
  const [greyScreen, setGreyScreen] = useState(false);

  const fetchContent = async () => {
    const res = await fetch(`${apiURL}/api/images/${imageId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    if (data.contentType === 'video/mp4') {
      setIsVideo(true);
    }
    return data.image;
  };

  const contentQuery = useQuery({
    queryKey: ['posts', imageId],
    queryFn: fetchContent,
  });
  useEffect(() => {
    if (removeEls) {
      for (let i = 0; i < removeEls.length; i++) {
        if (imageId.toString() === removeEls[i].toString()) {
          setGreyScreen(true);
          break;
        }
      }
    }
  });

  return contentQuery.data ? (
    <div className={`${style.imgContainers} `}>
      {isVideo ? (
        <video
          preload='none'
          className={
            greyScreen
              ? `${style.grey} ${style.postImages} ${contentQuery.data.img.filter}`
              : `${style.postImages} ${contentQuery.data.img.filter}`
          }
          controls
        >
          <source
            src={`${apiURL}/${contentQuery.data.url}`}
            type='video/mp4'
          ></source>
        </video>
      ) : (
        <img
          loading='lazy'
          className={
            greyScreen
              ? `${style.grey} ${style.postImages} ${contentQuery.data.img.filter}`
              : `${style.postImages} ${contentQuery.data.img.filter}`
          }
          src={`${apiURL}/${contentQuery.data.url}`}
          alt={contentQuery.data.alt}
        ></img>
      )}
    </div>
  ) : (
    <>Loading</>
  );
}

export default Content;
