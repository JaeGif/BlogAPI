import React from 'react';
import style from './previewimage.module.css';

function ImageOptions() {
  return (
    <div className={style.optionsWrapper}>
      <div className={style.optionsRuleSpanArea}>
        <p>Filters</p>
        <hr className={style.rule}></hr>
      </div>

      <div className={style.optionsRuleSpanArea}>
        <p>Adjustments</p>
        <hr className={style.rule}></hr>
      </div>
    </div>
  );
}

export default ImageOptions;
