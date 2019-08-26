import { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Slider, { SliderType } from './Slider';

const SliderArea = styled.div`
  width: 42%;
  height: 100vh;
  background: lightgray;
  position: fixed;
  top: 0;
  left: 0;
`;

const PrePageAnchor = styled.a`
  color: rgba(56, 71, 11, 1);
  font-weight: thin;
  position: absolute;
  left: 25%;
  top: 87px;
  font-size: 14px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    background-image: url('/static/surface1.svg');
    background-repeat: no-repeat;
    background-position: center center;
    width: 16px;
    height: 16px;
    top: 50%;
    margin-top: -8px;
    left: -20px;
  }

  &::after {
    content: '';
    position: absolute;
    background: rgba(56, 71, 11, 1);
    bottom: -4px;
    width: calc(100% + 10px);
    height: 1px;
    left: -10px;
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

const BookingBtnArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: 35%;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingPrice = styled.div`
  color: rgba(56, 71, 11, 1);
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > * {
    &:nth-child(1) {
      font-size: 36px;
      font-family: 'Open Sans', sans-serif;
    }
    &:nth-child(2) {
      font-size: 20px;
      font-weight: 500;
      margin-left: 19px;
      margin-right: 18px;
    }
    &:nth-child(3) {
      font-size: 20px;
      font-weight: 400;
    }
  }
`;

const BookingBtn = styled.div`
  width: 252px;
  height: 44px;
  color: white;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 71, 11, 1);
  cursor: pointer;
  transition: opacity 200ms;

  &:hover {
    opacity: 0.8;
  }
`;

const RoomSlide = ({ imgList, onClickBookingBtn }) => {
  return (
    <SliderArea>
      <Slider type={SliderType.NormalCenter} imgList={imgList} />
      <Link href="/" passHref={true}>
        <PrePageAnchor>查看其它房型</PrePageAnchor>
      </Link>
      <BookingBtnArea>
        <BookingPrice>
          <span>$1,380</span>
          <span>/</span>
          <span>1晚</span>
        </BookingPrice>
        <BookingBtn onClick={onClickBookingBtn}>Booking now</BookingBtn>
      </BookingBtnArea>
    </SliderArea>
  );
};

export default memo(RoomSlide);
