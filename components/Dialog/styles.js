import styled from 'styled-components';

export const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);

  transition: all 200ms;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
  }
`;

export const DialogContainer = styled.div`
  position: absolute;
  width: 1110px;
  /* height: 600px; */
  max-width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  background: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #38470b;
  display: flex;
`;

export const Left = styled.form`
  background: #38470b;
  width: 445px;
  /* height: 100%; */
  padding: 50px 65px 26px 65px;
  flex-shrink: 0;
`;

export const Label = styled.label`
  color: white;
  font-weight: 400;
  font-size: 14px;
  display: block;
`;

export const InputText = styled.input`
  width: 100%;
  height: 38px;
  margin-top: 7px;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 600;
  padding: 8px 10px;
  margin-bottom: 16px;
  display: block;
`;

export const DatePickerArea = styled.div`
  margin-top: 7px;
  margin-bottom: 16px;
`;

export const DayCountText = styled.div`
  font-weight: 400;
  color: #949c7c;
  font-size: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #949c7c;
`;

export const MoneyTotal = styled.div`
  color: white;
  text-align: right;
  margin-top: 10px;

  > * {
    &:nth-child(1) {
      font-weight: 400;
      font-size: 14px;
    }
    &:nth-child(2) {
      font-family: 'Open Sans';
      font-weight: 600;
      font-size: 26px;
    }
  }
`;

export const ConfirmBtn = styled.button`
  width: 100%;
  height: 44px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  margin-top: 20px;
  background: #38470b;
  cursor: pointer;

  &:hover {
    background: #949c7c;
    border-color: #949c7c;
  }

  &.have-error {
    border-color: lightgrey;
    color: lightgray;
    font-style: italic;
    pointer-events: none;
  }
`;

export const WarnText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  margin-top: 18px;
`;

export const CloseBtn = styled.img`
  position: absolute;
  top: 39px;
  right: 39px;
  cursor: pointer;
`;

export const Right = styled.div`
  padding: 51px 100px 26px 30px;
  flex-grow: 1;
  color: #38470b;
  overflow: hidden;
`;

export const Title = styled.div`
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 10px;

  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background: #949c7c;
    flex: 1;
    margin-left: 12px;
    display: block;
    margin-top: 5px;
    opacity: 0.6;
  }
`;

export const P1 = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
  line-height: 22px;
`;

export const AmenitiesArea = styled.div`
  margin-top: 21px;
`;

export const SubTitle = styled.div`
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background: #949c7c;
    flex: 1;
    margin-left: 12px;
    display: block;
    margin-top: 3px;
    opacity: 0.6;
  }
`;

export const BookInfoUl = styled.ul`
  color: #38470b;
  font-size: 12px;
  padding-left: 22px;
  margin-top: 12px;
  > li {
    line-height: 26px;
  }
`;

export const ErrorMsg = styled.span`
  color: red;
  margin-left: 10px;
  font-style: italic;
`;

export const ResultContent = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(56, 71, 11, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ResultImg = styled.img`
  margin-top: 125px;
`;

export const ResultTitle = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin-top: 42px;
  color: white;
`;

export const ResultParagraph = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-top: 41px;
  color: white;
  text-align: center;
`;
