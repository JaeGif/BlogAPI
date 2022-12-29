import React, { useState } from 'react';
import style from './previewimage.module.css';
import Filters from './imageOptions/Filters';
import Adjustments from './imageOptions/Adjustments';

function ImageOptions() {
  const [selectedFilter, setSelectedFilter] = useState(true);

  const clickedAdjustOrFilter = (clicked) => {
    if (clicked === 'filter') {
      setSelectedFilter(true);
    } else {
      setSelectedFilter(false);
    }
  };
  return (
    <div className={style.optionsWrapper}>
      <div className={style.headerOptsContainer}>
        <div
          className={style.optionsRuleSpanArea}
          onClick={() => clickedAdjustOrFilter('filter')}
        >
          <p className={style.adjustmentBtns}>Filters</p>
          {selectedFilter ? (
            <hr className={`${style.rule} ${style.selected}`} />
          ) : (
            <hr className={style.rule} />
          )}
        </div>
        <div
          className={style.optionsRuleSpanArea}
          onClick={() => clickedAdjustOrFilter('adjust')}
        >
          <p className={style.adjustmentBtns}>Adjustments</p>
          {selectedFilter ? (
            <hr className={style.rule} />
          ) : (
            <hr className={`${style.rule} ${style.selected}`} />
          )}
        </div>
      </div>
      {selectedFilter ? <Filters /> : <Adjustments />}
    </div>
  );
}

export default ImageOptions;
