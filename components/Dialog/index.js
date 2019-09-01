import React, { memo, PureComponent } from 'react';
import * as Styled from './styles';
import DatePicker from '../Datepicker';
import Amenities, { AmenityType } from '../Amenities';
import BookingSteps from '../BookingSteps';
import { getDateISO } from '../Calendar/helper';
import getPriceInfo from '../../helpers/getPriceInfo';
import currency from '../../helpers/currency';

export const DialogType = {
  Form: 'dialog-form',
  Success: 'dialog-success',
  Failed: 'dialog-error'
};

class Dialog extends PureComponent {
  maskRef = React.createRef();

  state = {
    ...this.initStateByProps()
  };

  initStateByProps() {
    return {
      dialogSelectDateStart: this.props.selectDateStart,
      dialogSelectDateEnd: this.props.selectDateEnd
    };
  }

  getEndDisabledDate(selectDateStart, disabledDates) {
    const startDate = new Date(selectDateStart);
    const endDisabledDates = Array.from(disabledDates);
    for (let i = 0; i < endDisabledDates.length; i++) {
      const _date = new Date(endDisabledDates[i]);
      if (_date > startDate) {
        endDisabledDates.splice(i, 1);
        break;
      }
    }
    const today = new Date();
    let testDate = new Date(getDateISO(today));
    while (testDate <= startDate) {
      const testDateISO = getDateISO(testDate);
      if (!endDisabledDates.includes(testDateISO)) {
        endDisabledDates.push(testDateISO);
      }
      testDate.setDate(testDate.getDate() + 1);
    }
    return endDisabledDates.sort();
  }

  onSelectStartDateChange = newSelectStartStr => {
    const { dialogSelectDateEnd } = this.state;
    const startDate = new Date(newSelectStartStr);
    const endDate = new Date(dialogSelectDateEnd);
    if (startDate >= endDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      this.setState({
        dialogSelectDateStart: newSelectStartStr,
        dialogSelectDateEnd: getDateISO(newEndDate)
      });
    } else {
      this.setState({
        dialogSelectDateStart: newSelectStartStr
      });
    }
  };

  onSelectEndDateChange = newSelectEndStr => {
    this.setState({
      dialogSelectDateEnd: newSelectEndStr
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { dialogSelectDateStart, dialogSelectDateEnd } = this.state;
    const maskDOM = this.maskRef.current;
    if (!maskDOM) return;

    const nameInput = maskDOM.querySelector('#name-input');
    const phoneInput = maskDOM.querySelector('#phone-input');

    const name = nameInput.value;
    const tel = phoneInput.value;

    const date = [];
    let testDate = new Date(dialogSelectDateStart);
    const endDate = new Date(dialogSelectDateEnd);
    while (testDate < endDate) {
      date.push(getDateISO(testDate));
      testDate.setDate(testDate.getDate() + 1);
    }

    this.props.onSubmit({ name, tel, date });
  };

  dateErrorCheck = (startDateStr, endDateStr, disabledDates) => {
    let haveError = false;
    const endDate = new Date(endDateStr);
    let testDate = new Date(startDateStr);
    while (testDate < endDate) {
      if (disabledDates.includes(getDateISO(testDate))) {
        haveError = true;
        break;
      }
      testDate.setDate(testDate.getDate() + 1);
    }
    return haveError;
  };

  renderResult() {
    const { show, type } = this.props;
    const className = show ? 'show' : 'hide';
    const isSuccess = type === DialogType.Success;
    return (
      <Styled.Mask className={className} ref={this.maskRef}>
        <Styled.DialogContainer
          style={{
            height: 600
          }}
        >
          <Styled.ResultContent>
            <Styled.ResultImg
              src={
                isSuccess
                  ? '/static/book_success.png'
                  : '/static/book_failed.png'
              }
            />
            <Styled.ResultTitle>
              {isSuccess ? `預約成功` : `預約失敗`}
            </Styled.ResultTitle>
            <Styled.ResultParagraph>
              {isSuccess ? (
                <>
                  請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，
                  <br />
                  若未收到簡訊請來電確認，謝謝您
                </>
              ) : (
                <>
                  哎呀！晚了一步！您預約的日期已經被預約走了，
                  <br />
                  再看看其它房型吧
                </>
              )}
            </Styled.ResultParagraph>
          </Styled.ResultContent>
          <Styled.CloseBtn
            src="/static/result_cancel.png"
            onClick={this.props.toClose}
          />
        </Styled.DialogContainer>
      </Styled.Mask>
    );
  }

  render() {
    const {
      show = false,
      toClose,
      amenities,
      roomName,
      shortDescription,
      priceDescription,
      checkInEarly,
      checkInLate,
      checkOut,
      disabledDates,
      normalDayPrice,
      holidayPrice,
      type
    } = this.props;

    if (type !== DialogType.Form) {
      return this.renderResult();
    }

    const { dialogSelectDateEnd, dialogSelectDateStart } = this.state;
    const { normalDayCount, holidayCount } = getPriceInfo(
      dialogSelectDateStart,
      dialogSelectDateEnd
    );
    const totalPrice = currency(
      normalDayCount * normalDayPrice + holidayCount * holidayPrice
    );
    const className = show ? 'show' : 'hide';
    const dayString =
      normalDayCount +
      holidayCount +
      1 +
      '天' +
      (normalDayCount > 0 ? `，${normalDayCount}晚平日` : '') +
      (holidayCount > 0 ? `，${holidayCount}晚假日` : '');
    const endDisabledDates = this.getEndDisabledDate(
      dialogSelectDateStart,
      disabledDates
    );
    const haveDateError = this.dateErrorCheck(
      dialogSelectDateStart,
      dialogSelectDateEnd,
      disabledDates
    );

    return (
      <Styled.Mask className={className} ref={this.maskRef}>
        <Styled.DialogContainer>
          <Styled.CloseBtn src="/static/cancel.png" onClick={toClose} />
          <Styled.Left onSubmit={this.onSubmit}>
            <Styled.Label htmlFor="name-input" type="text">
              姓名
            </Styled.Label>
            <Styled.InputText
              id="name-input"
              required={true}
              placeholder="請輸入您的姓名"
            />
            <Styled.Label htmlFor="phone-input">手機號碼</Styled.Label>
            <Styled.InputText
              id="phone-input"
              type="tel"
              required={true}
              placeholder="請輸手機號碼"
            />
            <Styled.Label htmlFor="checkin-input">入住日期</Styled.Label>
            <Styled.DatePickerArea>
              <DatePicker
                selectDateStr={dialogSelectDateStart}
                onChange={this.onSelectStartDateChange}
                disabledDates={disabledDates}
              />
            </Styled.DatePickerArea>
            <Styled.Label htmlFor="checkout-input">
              退房日期
              {haveDateError && (
                <Styled.ErrorMsg>(中間已被人預約)</Styled.ErrorMsg>
              )}
            </Styled.Label>
            <Styled.DatePickerArea>
              <DatePicker
                selectDateStr={dialogSelectDateEnd}
                onChange={this.onSelectEndDateChange}
                disabledDates={endDisabledDates}
              />
            </Styled.DatePickerArea>
            <Styled.DayCountText>{dayString}</Styled.DayCountText>
            <Styled.MoneyTotal>
              <div>總計</div>
              <div>{totalPrice}</div>
            </Styled.MoneyTotal>
            <Styled.ConfirmBtn
              className={haveDateError ? 'have-error' : ''}
              type="submit"
            >
              確認送出
            </Styled.ConfirmBtn>
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
                若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00
                - 18:00 )。
              </li>
            </Styled.BookInfoUl>
            <Styled.SubTitle>預約流程</Styled.SubTitle>
            <BookingSteps />
          </Styled.Right>
        </Styled.DialogContainer>
      </Styled.Mask>
    );
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    const { show: prevShow } = prevProps;
    if (show !== prevShow && show) {
      this.setState(this.initStateByProps());
      const maskDOM = this.maskRef.current;
      if (!maskDOM) return;
      const nameInput = maskDOM.querySelector('#name-input');
      const phoneInput = maskDOM.querySelector('#phone-input');
      nameInput.value = '';
      phoneInput.value = '';
    }
  }
}

export default memo(Dialog);
