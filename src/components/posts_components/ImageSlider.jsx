import React, { useEffect, useState, useRef } from 'react';
import style from './imageslider.module.css';
import Content from './Content';
import uniqid from 'uniqid';

function ImageSlider({ images, handleUpdateIndex }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftShift, setLeftShift] = useState('0vw');
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);
  const [hideBubbles, setHideBubbles] = useState(false);

  const ref = useRef([]);

  const pushRef = (el) => ref.current.push(el);

  useEffect(() => {
    if (imageIndex === 0) {
      setLeftHidden(true);
    } else {
      setLeftHidden(false);
    }
    if (imageIndex < 0) {
      return;
    }
    if (imageIndex === images.length - 1) {
      setRightHidden(true);
    } else {
      setRightHidden(false);
    }
    if (imageIndex >= images.length) {
      return;
    }

    calculateLeftShift();
    changeCurrentIndicator();
    if (handleUpdateIndex) {
      handleUpdateIndex(imageIndex);
    }
  }, [imageIndex]);

  useEffect(() => {
    setImageIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length === 1) {
      setHideBubbles(true);
    }
  }, []);

  const handleIncIndex = () => {
    if (imageIndex === images.length - 1) {
      return;
    } else {
      setImageIndex(imageIndex + 1);
    }
  };
  const handleDecIndex = () => {
    if (imageIndex === 0) {
      return;
    } else {
      setImageIndex(imageIndex - 1);
    }
  };
  const calculateLeftShift = () => {
    // 35vw is the standard width, this will need to change for screen size.
    let value = imageIndex * -1 * 35;
    setLeftShift(`${value}vw`);
  };
  const handleBubbleIndicators = () => {
    return images.map((img) => (
      <div key={img.name} ref={pushRef} className={style.bubbles}></div>
    ));
  };
  const changeCurrentIndicator = () => {
    for (let i = 0; i < images.length; i++) {
      ref.current[i].classList.remove(`${style.active}`);
    }
    const bubbleRef = ref.current[imageIndex];
    bubbleRef.classList.add(`${style.active}`);
  };
  return (
    <div className={style.carouselWrapper}>
      <div
        className={
          leftHidden
            ? `${style.icon} ${style.previous} ${style.hidden}`
            : `${style.icon} ${style.previous}`
        }
      >
        <img
          loading='lazy'
          onClick={(e) => {
            e.stopPropagation();
            handleDecIndex();
          }}
          className={`${style.arrow}`}
          src='/assets/favicons/previous.svg'
          alt='left arrow'
        />
      </div>
      <div
        style={{ transform: `translate(${leftShift}, 0)` }}
        className={style.contentWrapper}
      >
        {images.map((img, index) => (
          <Content key={uniqid()} imageId={img} />
        ))}
      </div>
      <div
        className={
          rightHidden
            ? `${style.icon} ${style.next} ${style.hidden}`
            : `${style.icon} ${style.next}`
        }
      >
        <img
          loading='lazy'
          onClick={(e) => {
            e.stopPropagation();
            handleIncIndex();
          }}
          className={`${style.arrow} `}
          src='assets/favicons/next.svg'
          alt='right arrow'
        />
      </div>
      <div className={hideBubbles ? '' : `${style.bubblesContainer}`}>
        {handleBubbleIndicators()}
      </div>
    </div>
  );
}

export default ImageSlider;
