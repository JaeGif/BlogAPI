import React from 'react';

function Adjustments() {
  return (
    <div>
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
