import React, { useContext, useEffect, useState } from 'react';
import { PathContext } from '../../../App';
import style from '../newpost.module.css';

function AddLocation({ changeLocation, lastLocation }) {
  const basePath = useContext(PathContext);

  return (
    <span className={style.locationWrapper}>
      <input
        onChange={(e) => changeLocation(e)}
        name='location'
        type='text'
        placeholder='Add location'
        defaultValue={lastLocation}
        className={style.locationInput}
      />
      <img
        className={style.locationIcon}
        src={`${basePath}/assets/favicons/location.svg`}
      />
    </span>
  );
}

export default AddLocation;
