import React, { useEffect, useState, useRef, useContext } from 'react';
import style from './imageslider.module.css';
import Content from './Content';
import uniqid from 'uniqid';
import { PathContext } from '../../App';

function ImageSlider({ images, handleUpdateIndex, removeEls }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftShift, setLeftShift] = useState('0px');
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);
  const [hideBubbles, setHideBubbles] = useState(true);
  const basePath = useContext(PathContext);
  const width = window.innerWidth;
  const ref = useRef([]);
  const boundRef = useRef(null);

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
    if (images.length > 1) {
      changeCurrentIndicator();
    }
    if (handleUpdateIndex) {
      handleUpdateIndex(imageIndex);
    }
  }, [imageIndex]);

  useEffect(() => {
    setImageIndex(0);
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
  useEffect(() => {
    if (images.length > 1) {
      setHideBubbles(false);
    }
  }, []);
  const calculateLeftShift = () => {
    // image slider now dynamically adjusts shift based completely on size of window.
    // px approach using boundingRect
    const contentBounds = boundRef.current.getBoundingClientRect();
    const contentWidth = contentBounds.right - contentBounds.left;
    const shift = imageIndex * contentWidth;

    setLeftShift(`-${shift}px`);
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
    <div ref={boundRef} className={style.carouselWrapper}>
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
          src={`${basePath}/assets/favicons/previous.svg`}
          alt='left arrow'
        />
      </div>
      <div
        style={{ transform: `translate(${leftShift}, 0)` }}
        className={style.contentWrapper}
      >
        {images.map((img, index) => (
          // removed unique key because it changes forcing a rerender of the memoized component.
          // I will never need the key of the component so it's ok also the img id is unique
          <Content key={img} imageId={img} removeEls={removeEls} />
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
          src={`${basePath}/assets/favicons/next.svg`}
          alt='right arrow'
        />
      </div>
      <div
        className={
          hideBubbles ? `${style.hidden}` : `${style.bubblesContainer}`
        }
      >
        {handleBubbleIndicators()}
      </div>
    </div>
  );
}

export default ImageSlider;
