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
          src={
            isPosted
              ? `${basePath}/assets/favicons/grid.svg`
              : `${basePath}/assets/favicons/grid-grey.svg`
          }
          alt='grid icon'
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
          src={
            isSaved
              ? `${basePath}/assets/favicons/bookmark.svg`
              : `${basePath}/assets/favicons/bookmark-grey.svg`
          }
          alt='saved icon'
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
          src={
            isTagged
              ? `${basePath}/assets/favicons/tagged.svg`
              : `${basePath}/assets/favicons/tagged-grey.svg`
          }
          alt='tagged icon'
        />
        <p>Tagged</p>
      </div>
    </span>
  );
}

export default UserNavBar;
