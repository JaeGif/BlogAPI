import React, { useContext, useState } from 'react';
import { PathContext } from '../../App';
import style from './usernavbar.module.css';

function UserNavBar({
  handleNavPosted,
  handleNavSaved,
  handleNavTagged,
  isPosted,
  isSaved,
  isTagged,
}) {
  const basePath = useContext(PathContext);

  return (
    <span className={style.navLayout}>
      <div
        className={
          isPosted
            ? `${style.optionWrapper} ${style.selected}`
            : `${style.optionWrapper}`
        }
        onClick={() => handleNavPosted()}
      >
        <img
          className={style.icons}
          src={`${basePath}/assets/favicons/grid.svg`}
        />

        <p>Posts</p>
      </div>
      <div
        className={
          isSaved
            ? `${style.optionWrapper} ${style.selected}`
            : `${style.optionWrapper}`
        }
        onClick={() => handleNavSaved()}
      >
        <img
          className={style.icons}
          src={`${basePath}/assets/favicons/bookmark.svg`}
        />

        <p>Saved</p>
      </div>
      <div
        className={
          isTagged
            ? `${style.optionWrapper} ${style.selected}`
            : `${style.optionWrapper}`
        }
        onClick={() => handleNavTagged()}
      >
        <img
          className={style.icons}
          src={`${basePath}/assets/favicons/tagged.svg`}
        />
        <p>Tagged</p>
      </div>
    </span>
  );
}

export default UserNavBar;
