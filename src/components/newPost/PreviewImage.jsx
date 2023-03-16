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
}) {
  const [leftShift, setLeftShift] = useState('0vw');
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);
  const [hideBubbles, setHideBubbles] = useState(false);
  const ref = useRef([]);
  const basePath = useContext(PathContext);
  const pushRef = (el) => ref.current.push(el);
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
    console.log(hideBubbles);
  });

  const calculateLeftShift = () => {
    // 35vw is the standard width, this will need to change for screen size.
    let value;
    if (width < 1000 && width > 750) {
      value = imageIndex * -1 * 60;
    } else if (width >= 1000) {
      value = imageIndex * -1 * 35;
    } else if (width < 750) {
      value = imageIndex * -1 * 100;
    }
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
                idx={idx}
                image={image}
                isVideoPreview={isVideoPreview}
                imageData={imageData}
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
