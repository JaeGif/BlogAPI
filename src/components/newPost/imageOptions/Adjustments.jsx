import React from 'react';
import style from './adjustments.module.css';
function Adjustments() {
  return (
    <div className={style.adjustmentsContainer}>
      <div className={style.adjustmentWrapper}>
        <p>Brightness</p>
        <input type='range' />
      </div>
      <div className={style.adjustmentWrapper}>
        <p>Contrast</p>
        <input type='range' />
      </div>
      <div className={style.adjustmentWrapper}>
        <p>Saturation</p>
        <input type='range' />
      </div>
      <div className={style.adjustmentWrapper}>
        <p>Temperature</p>
        <input type='range' />
      </div>
      <div className={style.adjustmentWrapper}>
        <p>Fade</p>
        <input type='range' />
      </div>
      <div className={style.adjustmentWrapper}>
        <p>Vignette</p>
        <input type='range' />
      </div>
    </div>
  );
}

export default Adjustments;
