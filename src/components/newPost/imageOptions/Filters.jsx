import React, { useContext, useEffect, useState } from 'react';
import { PathContext } from '../../../App';
import style from './filtersSelect.module.css';

function Filters({ chosenFilter, imageIndex, imageData }) {
  const [currentSelectedFilter, setCurrentSelectedFilter] =
    useState('filter-none');
  const basePath = useContext(PathContext);

  useEffect(() => {
    if (imageData) {
      for (let i = 0; i < imageData.length; i++) {
        if (imageIndex === imageData[i].index) {
          setCurrentSelectedFilter(imageData[i].filter);
          break;
        }
      }
    }
  });

  return (
    <div className={style.filtersContainer}>
      <div
        id='filter-none'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-none'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample}`}
          alt='original'
        ></img>
        <p>Original</p>
      </div>
      <div
        id='filter-1977'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-1977'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-1977`}
          alt='1977'
        ></img>
        <p>1977</p>
      </div>
      <div
        id='filter-aden'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-aden'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-aden`}
          alt='aden'
        ></img>
        <p>Aden</p>
      </div>
      <div
        id='filter-amaro'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-amaro'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-amaro`}
          alt='amaro'
        ></img>
        <p>Amaro</p>
      </div>
      <div
        id='filter-ashby'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-ashby'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-ashby`}
          alt='ashby'
        ></img>
        <p>Ashby</p>
      </div>
      <div
        id='filter-brannan'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-brannan'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-brannan`}
          alt='brannan'
        ></img>
        <p>Brannan</p>
      </div>

      <div
        id='filter-brooklyn'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-brooklyn'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-brooklyn`}
          alt='brooklyn'
        ></img>
        <p>Brooklyn</p>
      </div>
      <div
        id='filter-charmes'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-charmes'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-charmes`}
          alt='charmes'
        ></img>
        <p>Charmes</p>
      </div>
      <div
        id='filter-clarendon'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-clarendon'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-clarendon`}
          alt='clarendon'
        ></img>
        <p>Clarendon</p>
      </div>
      <div
        id='filter-crema'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-crema'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-crema`}
          alt='crema'
        ></img>
        <p>Crema</p>
      </div>
      <div
        id='filter-dogpatch'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-dogpatch'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-dogpatch`}
          alt='dogpatch'
        ></img>
        <p>Dogpatch</p>
      </div>
      <div
        id='filter-earlybird'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-earlybird'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-earlybird`}
          alt='earlybird'
        ></img>
        <p>Earlybird</p>
      </div>
      <div
        id='filter-gingham'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-gingham'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-gingham`}
          alt='gingham'
        ></img>
        <p>Gingham</p>
      </div>
      <div
        id='filter-ginza'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-ginza'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-ginza`}
          alt='ginza'
        ></img>
        <p>Ginza</p>
      </div>
      <div
        id='filter-hefe'
        onClick={(e) => chosenFilter(e, imageIndex)}
        className={
          currentSelectedFilter === 'filter-hefe'
            ? `${style.filterExampleWrapper} ${style.selected}`
            : `${style.filterExampleWrapper}`
        }
      >
        <img
          src={`${basePath}/filters/filterExamples/cityfilter.jpg`}
          className={`${style.filterExample} filter-hefe`}
          alt='hefe'
        ></img>
        <p>Hefe</p>
      </div>
    </div>
  );
}

export default Filters;
