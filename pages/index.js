import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getAllRooms } from '../api';
import Slider from '../components/Slider';
import loading from '../loading';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Logo = styled.img`
  position: absolute;
  left: 137px;
  top: 120.55px;
`;

const IntroBlock = styled.div`
  position: absolute;
  bottom: 109px;
  left: 128px;
  color: white;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Sentence = styled.p`
  font-weight: 100;
  font-size: 12px;
  margin-top: 6px;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
`;

const RoomCardArea = styled.div`
  position: absolute;
  top: 109px;
  left: 413px;
  right: 128px;
  bottom: 109px;
  background: rgba(255, 255, 255, 0.5);
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 0px;
`;

const RoomCard = styled.div`
  position: relative;
  background-image: url(${prop => prop.imageUrl});
  background-size: cover;
  background-position: center 80%;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &::after {
    content: '${prop => prop.name}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(56, 71, 11, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 19px;
    font-family: 'Open Sans', sans-serif;
    opacity: 0;
    transition: opacity 300ms;
    /* transform: scale(0.2); */
  }

  &:hover {
    &::after {
      opacity: 1;
      /* transform: scale(1); */
    }
  }
`;

class IndexPage extends React.Component {
  static getInitialProps = async () => {
    const rooms = await getAllRooms();
    return {
      rooms
    };
  };

  componentDidMount() {
    loading.done();
  }

  render() {
    const { rooms } = this.props;

    return (
      <Container>
        <Slider
          imgList={[
            { src: '/static/mainBg1.png' },
            { src: '/static/mainBg2.png' },
            { src: '/static/mainBg3.png' },
            { src: '/static/mainBg4.png' }
          ]}
        />
        <Logo src="/static/logo.png" />
        <IntroBlock>
          <Title>好室旅店。HOUSE HOTEL</Title>
          <Sentence>花蓮縣花蓮市國聯一路1號</Sentence>
          <Sentence>03-8321155</Sentence>
          <Sentence>HOUSE@HOTEL.COM</Sentence>
        </IntroBlock>
        <RoomCardArea>
          {rooms.map(room => (
            <Link key={room.id} href={`/room/[id]`} as={`/room/${room.id}`}>
              <a>
                <RoomCard imageUrl={room.imageUrl} name={room.name} />
              </a>
            </Link>
          ))}
        </RoomCardArea>
      </Container>
    );
  }
}

export default IndexPage;
