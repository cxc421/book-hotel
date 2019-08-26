import { memo } from 'react';
import styled from 'styled-components';
import Amenities, { AmenityType } from './Amenities';
import BookingSteps from './BookingSteps';

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);

  transition: all 225ms;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
  }
`;

const DialogContainer = styled.div`
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

const Left = styled.form`
  background: #38470b;
  width: 445px;
  /* height: 100%; */
  padding: 50px 65px 26px 65px;
  flex-shrink: 0;
`;

const Label = styled.label`
  color: white;
  font-weight: 400;
  font-size: 14px;
  display: block;
`;

const InputText = styled.input`
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

const DayCountText = styled.div`
  font-weight: 400;
  color: #949c7c;
  font-size: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #949c7c;
`;

const MoneyTotal = styled.div`
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

const ConfirmBtn = styled.button`
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
    background: white;
    color: #38470b;
  }
`;

const WarnText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  margin-top: 18px;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: 39px;
  right: 39px;
  cursor: pointer;
`;

const Right = styled.div`
  padding: 51px 100px 26px 30px;
  flex-grow: 1;
  color: #38470b;
`;

const Title = styled.div`
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background: #949c7c;
    flex: 1;
    margin-left: 7px;
    display: block;
    margin-top: 5px;
    opacity: 0.6;
  }
`;

const P1 = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`;

const AmenitiesArea = styled.div`
  margin-top: 21px;
`;

const SubTitle = styled.div`
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
    margin-left: 7px;
    display: block;
    margin-top: 3px;
    opacity: 0.6;
  }
`;

const BookInfoUl = styled.ul`
  color: #38470b;
  font-size: 12px;
  padding-left: 22px;
  margin-top: 12px;
  > li {
    line-height: 26px;
  }
`;

const Dialog = ({ show = false, toClose, amenities }) => {
  const className = show ? 'show' : 'hide';

  function onSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <Mask className={className}>
      <DialogContainer>
        <CloseBtn src="/static/cancel.png" onClick={toClose} />
        <Left onSubmit={onSubmit}>
          <Label htmlFor="name-input" type="text">
            姓名
          </Label>
          <InputText id="name-input" required={true} />
          <Label htmlFor="phone-input">手機號碼</Label>
          <InputText id="phone-input" type="tel" required={true} />
          <Label htmlFor="checkin-input">入住日期</Label>
          <InputText
            id="checkin-input"
            type="date"
            defaultValue="2019-08-19"
            required={true}
          />
          <Label htmlFor="checkout-input">退房日期</Label>
          <InputText
            id="checkout-input"
            type="date"
            defaultValue="2019-08-20"
            required={true}
          />
          <DayCountText>2天，1晚平日</DayCountText>
          <MoneyTotal>
            <div>總計</div>
            <div>$1,380</div>
          </MoneyTotal>
          <ConfirmBtn type="submit">確認送出</ConfirmBtn>
          <WarnText>此預約系統僅預約功能，並不會對您進行收費</WarnText>
        </Left>
        <Right>
          <Title>Single Room</Title>
          <P1>
            1人・ 單人床・附早餐・ 衛浴1間・18平方公尺
            <br />
            平日（一～四）價格：1380 / 假日（五〜日）價格：1500
          </P1>
          <AmenitiesArea>
            <Amenities amenities={amenities} type={AmenityType.Tiny} />
          </AmenitiesArea>
          <SubTitle>訂房資訊</SubTitle>
          <BookInfoUl>
            <li>
              入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。
            </li>
            <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
            <li>好室旅店全面禁止吸菸。</li>
            <li>
              若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 -
              18:00 )。
            </li>
          </BookInfoUl>
          <SubTitle>預約流程</SubTitle>
          <BookingSteps />
        </Right>
      </DialogContainer>
    </Mask>
  );
};

export default memo(Dialog);
