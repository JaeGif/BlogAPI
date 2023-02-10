import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState, useEffect } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../App';
import style from './post.module.css';
function Content({ imageId }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const [isVideo, setIsVideo] = useState(false);

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

  return contentQuery.data ? (
    <div className={style.imgContainers}>
      {isVideo ? (
        <video
          className={`${style.postImages} ${contentQuery.data.filter}`}
          controls
        >
          <source
            src={`${apiURL}/${contentQuery.data.url}`}
            type='video/mp4'
          ></source>
        </video>
      ) : (
        <img
          className={`${style.postImages} ${contentQuery.data.filter}`}
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
