import React, { useEffect, useState, useRef, useContext } from 'react';
import style from './previewimage.module.css';
import uniqid from 'uniqid';
import ImageContent from './Image';
import { PathContext } from '../../App';

function PreviewImage({
  images,
  imageData,
  isVideoPreview,
  imageIndex,
  handleIncIndex,
  handleDecIndex,
  isSubmit = false,
}) {
  const [leftShift, setLeftShift] = useState('0px');
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);
  const [hideBubbles, setHideBubbles] = useState(true);
  const ref = useRef([]);
  const basePath = useContext(PathContext);
  const pushRef = (el) => ref.current.push(el);
  const boundRef = useRef(null);
  const width = window.innerWidth;

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

  useEffect(() => {
    if (images.length === 1) {
      setHideBubbles(true);
      setLeftHidden(true);
      setRightHidden(true);
    }
  });
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
        <div className={`${style.previewImagesContainer}`}>
          {images.map((image, idx) => {
            return (
              <ImageContent
                key={idx}
                idx={idx}
                image={image}
                isVideoPreview={isVideoPreview}
                imageData={imageData}
                isSubmit={isSubmit}
              />
            );
          })}
        </div>
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
      <div className={hideBubbles ? '' : `${style.bubblesContainer}`}>
        {handleBubbleIndicators()}
      </div>
    </div>
  );
}

export default PreviewImage;
