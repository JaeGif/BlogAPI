import React, { useEffect, useState, useRef } from 'react';
import style from './imageslider.module.css';
import Content from './Content';

function ImageSlider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftShift, setLeftShift] = useState('0vw');
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);

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
  }, [imageIndex]);

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
    console.log(leftShift);
  };
  const handleBubbleIndicators = () => {
    return images.map((img) => (
      <div ref={pushRef} className={style.bubbles}></div>
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
          onClick={handleDecIndex}
          className={`${style.arrow}`}
          src='/assets/favicons/previous.svg'
          alt='left arrow'
        />
      </div>
      <div
        style={{ transform: `translate(${leftShift}, 0)` }}
        className={style.contentWrapper}
      >
        {images.map((img) => (
          <Content imageId={img} />
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
          onClick={handleIncIndex}
          className={`${style.arrow} `}
          src='assets/favicons/next.svg'
          alt='right arrow'
        />
      </div>
      <div className={style.bubblesContainer}>{handleBubbleIndicators()}</div>
    </div>
  );
}

export default ImageSlider;