import { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  /* background: skyblue; */
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: pink; */

  > span {
    margin-top: 7px;
    font-weight: 400;
    font-size: 10px;
  }
`;

const ImgArea = styled.div`
  position: relative;
`;

const CheckImg = styled.img`
  position: absolute;
  top: 3px;
  right: -4px;
  transform: translateX(100%);
`;

function Amenity({
  url,
  text,
  showCheckMark = false,
  disabled = false,
  small = false
}) {
  return (
    <Wrapper disabled={disabled}>
      <Left>
        <ImgArea>
          <img src={url} style={{ height: small ? 30 : 'auto' }} />
          {showCheckMark && (
            <CheckImg
              src={disabled ? '/static/inactive.png' : '/static/active.png'}
            />
          )}
        </ImgArea>
        <span style={{ color: small ? '#949C7C' : 'inherit' }}>{text}</span>
      </Left>
    </Wrapper>
  );
}

export default memo(Amenity);
