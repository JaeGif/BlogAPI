import React, { useState, useEffect } from 'react';

function UserPostPreview({ post }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    if (post.image.contentType === 'video/mp4') {
      setIsVideo(true);
    }
  });

  return (
    <div>
      {isVideo ? (
        <video>
          <source src={`${apiURL}/${post.image.url}`} type='video/mp4'></source>
        </video>
      ) : (
        <img src={`${apiURL}/${post.image.url}`} />
      )}
    </div>
  );
}

export default UserPostPreview;
