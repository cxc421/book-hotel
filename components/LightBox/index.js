import React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as Styled from './styles';

export default ({
  show,
  imgList,
  imgIdx,
  onImgIdxChange,
  onClose,
  toNextImg,
  toPrevImg
}) => {
  const leftArrowDisabled = imgIdx === 0;
  const rightArrowDisabled = imgIdx === imgList.length - 1;
  const imgSrc = imgList[imgIdx].src;
  const preventPropa = e => {
    e.stopPropagation();
  };
  const onClickLeft = e => {
    preventPropa(e);
    toPrevImg();
  };
  const onClickRight = e => {
    preventPropa(e);
    toNextImg();
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="lightbox"
      unmountOnExit={true}
      mountOnEnter={true}
    >
      <Styled.Mask onClick={onClose}>
        <Styled.ArrowImg
          src="/static/lightbox_left_arrow.svg"
          alt="prev img"
          onClick={onClickLeft}
          disabled={leftArrowDisabled}
        />
        <Styled.Img
          src={imgSrc}
          alt="preview room image"
          onClick={preventPropa}
        />
        <Styled.ArrowImg
          src="/static/lightbox_right_arrow.svg"
          alt="next img"
          onClick={onClickRight}
          disabled={rightArrowDisabled}
        />
      </Styled.Mask>
    </CSSTransition>
  );
};
