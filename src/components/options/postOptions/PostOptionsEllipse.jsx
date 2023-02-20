import React, { useContext, useState } from 'react';
import {
  ApiContext,
  PathContext,
  ProfileContext,
  TokenContext,
  UserContext,
} from '../../../App';
import style from '../../posts_components/post.module.css';
import Options from './Options';

function PostOptionsEllipse({ post }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const profileCheckout = useContext(ProfileContext);

  const [openOptions, setOpenOptions] = useState(false);
  const handleOpenOptions = () => {
    setOpenOptions(true);
  };
  const handleCloseOptions = () => {
    console.log('close');
    setOpenOptions(false);
  };
  return (
    <>
      <div onClick={handleOpenOptions} className={style.optionsEllipses}>
        <img
          className={style.optionsEllipses}
          src={`${basePath}/assets/favicons/horizontalellipse.svg`}
        ></img>
      </div>
      {openOptions && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleCloseOptions();
          }}
          className={style.fullPageCover}
        >
          <Options post={post} handleCloseOptions={handleCloseOptions} />
        </div>
      )}
    </>
  );
}

export default PostOptionsEllipse;
