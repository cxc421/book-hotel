import styled, { css as _css } from 'styled-components';

export const DateWrapper = styled.div`
  position: relative;
  font-size: 11px;
  font-weight: 400;
  padding: 10px 0;
  color: rgba(56, 71, 11, 1);
  text-align: center;
  cursor: default;
  user-select: none;

  &:hover {
    .date-hover-circle {
      opacity: 1;
    }
  }
`;

const DateCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
`;

export const DateStartCircle = styled(DateCircle)`
  background: rgba(56, 71, 11, 1);
`;

export const DateEndCircle = styled(DateCircle)`
  background: rgba(148, 156, 124, 1);
`;

export const DateHoverCircle = styled(DateCircle)`
  background: rgba(56, 71, 11, 0.1);
  opacity: 0;
`;

export const DateThroughBg = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  top: 50%;
  left: 0;
  margin-top: -15px;
  background: rgba(215, 218, 206, 1);

  ${props => {
    if (props.noLeft && props.noRight) {
      return _css`
        width: 30px;
        left: 50%;
        margin-left: -15px;
        border-radius: 50%;
      `;
    }
    if (props.noLeft) {
      return _css`
        width: calc(50% + 15px);
        left: calc(50% - 15px);
        border-radius: 15px 0 0 15px;
      `;
    }
    if (props.noRight) {
      return _css`
        width: calc(50% + 15px);
        right: calc(50% - 15px);
        border-radius: 0 15px 15px 0;
      `;
    }
  }}
`;

export const DateText = styled.div`
  position: relative;
`;
