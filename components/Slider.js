import { memo } from 'react';
import styled, { css } from 'styled-components';
import Slick from 'react-slick';

export const SliderType = {
  DarkLeft: 'dark-left',
  NormalCenter: 'normal-center'
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: black;
  overflow: hidden;

  .slick-custom-common {
    *:focus {
      outline: 0;
      outline: none;
    }
    .slick-dots {
      bottom: 0px;

      li > button {
        text-align: center;
        position: relative;
      }

      li > button::before {
        content: '';
        width: 12px;
        height: 12px;
        display: inline-block;
        border: 1px solid white;
        border-radius: 50%;
        position: absolute;
        top: 4px;
        left: 4px;
        opacity: 1;
      }
      li.slick-active > button::before {
        background: white;
      }
    }
  }

  .slick-custom-darkleft {
    .slick-dots {
      bottom: 47px;
      text-align: left;
      padding-left: 168px;

      li > button::before {
        border-color: white;
      }
      li.slick-active > button::before {
        background: white;
      }
    }
  }

  .slick-custom-normalcenter {
    .slick-dots {
      bottom: 29%;
      text-align: center;

      li > button::before {
        border-color: rgba(56, 71, 11, 1);
      }
      li.slick-active > button::before {
        background: rgba(56, 71, 11, 1);
      }
    }
  }
`;

const ImgListWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`;

const Img = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  ${props => {
    if (props.type === SliderType.NormalCenter) {
      return css`
        background-image: url(${props.src});
      `;
    } else {
      // prettier-ignore
      return css`
        background-image: linear-gradient( to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${props.src});
      `;
    }
  }}
`;

const Slider = ({ imgList = [], type = SliderType.DarkLeft, onClick }) => {
  const imgNum = imgList.length;
  const wrapperStyle = {
    width: imgNum * 100 + '%'
  };
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    className:
      'slick-custom-common ' +
      (type === SliderType.NormalCenter
        ? 'slick-custom-normalcenter'
        : 'slick-custom-darkleft')
  };

  function onClickImg(index) {
    onClick && onClick(index);
  }

  return (
    <Container>
      <Slick {...slickSettings}>
        {imgList.map((img, index) => (
          <div key={index}>
            <Img src={img.src} type={type} onClick={() => onClickImg(index)} />
          </div>
        ))}
      </Slick>
    </Container>
  );
};

export default memo(Slider);
