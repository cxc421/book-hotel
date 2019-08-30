import { memo } from 'react';
import * as Styled from './styles';
import Amenities, { AmenityType } from '../Amenities';
import BookingSteps from '../BookingSteps';

const Dialog = ({
  show = false,
  toClose,
  amenities,
  roomName,
  shortDescription,
  priceDescription,
  checkInEarly,
  checkInLate,
  checkOut,
  totalPrice,
  normalDayCount,
  holidayCount
}) => {
  const className = show ? 'show' : 'hide';
  const dayString =
    normalDayCount +
    holidayCount +
    1 +
    '天' +
    (normalDayCount > 0 ? `，${normalDayCount}晚平日` : '') +
    (holidayCount > 0 ? `，${holidayCount}晚假日` : '');

  function onSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <Styled.Mask className={className}>
      <Styled.DialogContainer>
        <Styled.CloseBtn src="/static/cancel.png" onClick={toClose} />
        <Styled.Left onSubmit={onSubmit}>
          <Styled.Label htmlFor="name-input" type="text">
            姓名
          </Styled.Label>
          <Styled.InputText id="name-input" required={true} />
          <Styled.Label htmlFor="phone-input">手機號碼</Styled.Label>
          <Styled.InputText id="phone-input" type="tel" required={true} />
          <Styled.Label htmlFor="checkin-input">入住日期</Styled.Label>
          <Styled.InputText
            id="checkin-input"
            type="date"
            defaultValue="2019-08-19"
            required={true}
          />
          <Styled.Label htmlFor="checkout-input">退房日期</Styled.Label>
          <Styled.InputText
            id="checkout-input"
            type="date"
            defaultValue="2019-08-20"
            required={true}
          />
          <Styled.DayCountText>{dayString}</Styled.DayCountText>
          <Styled.MoneyTotal>
            <div>總計</div>
            <div>{totalPrice}</div>
          </Styled.MoneyTotal>
          <Styled.ConfirmBtn type="submit">確認送出</Styled.ConfirmBtn>
          <Styled.WarnText>
            此預約系統僅預約功能，並不會對您進行收費
          </Styled.WarnText>
        </Styled.Left>
        <Styled.Right>
          <Styled.Title>{roomName}</Styled.Title>
          <Styled.P1>
            {shortDescription}
            <br />
            {priceDescription}
          </Styled.P1>
          <Styled.AmenitiesArea>
            <Amenities amenities={amenities} type={AmenityType.Tiny} />
          </Styled.AmenitiesArea>
          <Styled.SubTitle>訂房資訊</Styled.SubTitle>
          <Styled.BookInfoUl>
            <li>
              入住時間：最早 {checkInEarly}
              ，最晚 {checkInLate}；退房時間：{checkOut}，請自行確認行程安排。
            </li>
            <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
            <li>好室旅店全面禁止吸菸。</li>
            <li>
              若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 -
              18:00 )。
            </li>
          </Styled.BookInfoUl>
          <Styled.SubTitle>預約流程</Styled.SubTitle>
          <BookingSteps />
        </Styled.Right>
      </Styled.DialogContainer>
    </Styled.Mask>
  );
};

export default memo(Dialog);
