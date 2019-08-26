import styled from 'styled-components';
import { memo } from 'react';
import Amenity from './Amenity';

const Wrapper = styled.div`
  max-width: 740px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-right: 55px;
    margin-bottom: 25px;
    &:last-child {
      margin-right: 0;
    }
  }

  &.type-tiny {
    > * {
      margin-right: 30px;
      margin-bottom: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const AmenityType = {
  Full: 'amenity-type-full',
  Tiny: 'amenity-type-tiny'
};

function Amenities({ amenities, type = AmenityType.Full }) {
  // console.log(amenities);

  const showAmenityList = [
    {
      prop: 'Breakfast',
      text: '早餐',
      url: '/static/breakfast.png'
    },
    {
      prop: 'Mini-Bar',
      text: 'Mini Bar',
      url: '/static/mini_bar.png'
    },
    {
      prop: 'Room-Service',
      text: 'Room Service',
      url: '/static/room_service.png'
    },
    {
      prop: 'Wi-Fi',
      text: 'Wifi',
      url: '/static/wifi.png'
    },
    {
      prop: 'Child-Friendly',
      text: '適合兒童',
      url: '/static/child_friendly.png'
    },
    {
      prop: 'Television',
      text: '電話',
      url: '/static/phone.png'
    },
    {
      prop: 'Great-View',
      text: '漂亮的視野',
      url: '/static/great_view.png'
    },
    {
      prop: 'Refrigerator',
      text: '冰箱',
      url: '/static/refrigerator.png'
    },
    {
      prop: 'Sofa',
      text: '沙發',
      url: '/static/sofa.png'
    },
    {
      prop: 'Pet-Friendly',
      text: '攜帶寵物',
      url: '/static/pet.png'
    },
    {
      prop: 'Smoke-Free',
      text: '全面禁菸',
      url: '/static/no_smoke.png'
    },
    {
      prop: 'Air-Conditioner',
      text: '空調',
      url: '/static/ac.png'
    }
  ];

  if (type === AmenityType.Full) {
    return (
      <Wrapper>
        {showAmenityList.map(({ prop, text, url }) => (
          <Amenity
            key={prop}
            text={text}
            url={url}
            showCheckMark={true}
            disabled={!amenities[prop]}
          />
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper className="type-tiny">
      {showAmenityList
        .filter(({ prop }) => amenities[prop])
        .map(({ prop, text, url }) => (
          <Amenity
            key={prop}
            text={text}
            url={url}
            showCheckMark={false}
            disabled={!amenities[prop]}
            small={true}
          />
        ))}
    </Wrapper>
  );
}

export default memo(Amenities);
