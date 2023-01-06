import React, { useState } from 'react';
import style from './usernavbar.module.css';

function UserNavBar({
  handleNavPosted,
  handleNavSaved,
  handleNavTagged,
  isPosted,
  isSaved,
  isTagged,
}) {
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
        <p>Tagged</p>
      </div>
    </span>
  );
}

export default UserNavBar;
