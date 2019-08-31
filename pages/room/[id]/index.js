import { getRoomById } from '../../../api';
import loading from '../../../loading';
import trans from '../../../translation';
import Amenities from '../../../components/Amenities';
import RoomSlide from '../../../components/RoomSlide';
import Dialog from '../../../components/Dialog';
import Calendar from '../../../components/Calendar';
import { getDateISO } from '../../../components/Calendar/helper';
import * as Styled from './styles';
import toCurrency from '../../../helpers/currency';

class RoomPage extends React.Component {
  static getInitialProps = async ({ query }) => {
    const roomData = await getRoomById(query.id);
    return {
      room: roomData.room[0],
      booking: roomData.booking,
      loadFromBrowser: !!process.browser
    };
  };

  state = {
    ...this.initState()
  };

  initState() {
    const disabledDates = this.props.booking.map(obj => obj.date);
    const today = new Date();
    let selectDateStart = new Date();
    while (disabledDates.includes(getDateISO(selectDateStart))) {
      selectDateStart.setDate(selectDateStart.getDate() + 1);
    }
    if (selectDateStart - today > 60 * 24 * 60 * 60 * 1000) {
      console.error('No date can select');
      selectDateStart = null;
    }
    let selectDateEnd = null;
    if (selectDateStart) {
      selectDateEnd = new Date(selectDateStart);
      selectDateEnd.setDate(selectDateEnd.getDate() + 1);
    }

    return {
      canDiaplsy: this.props.loadFromBrowser,
      showDiloag: false,
      selectDateStart: getDateISO(selectDateStart),
      selectDateEnd: getDateISO(selectDateEnd)
    };
  }

  componentDidMount() {
    if (!this.state.canDiaplsy) {
      loading.start();
      setTimeout(() => {
        loading.done();
        this.setState({ canDiaplsy: true });
      }, 1000);
    } else {
      loading.done();
    }
  }

  getShortDescription() {
    const {
      Bed: bedList,
      GuestMin,
      GuestMax,
      ['Private-Bath']: bathNum,
      Footage
    } = this.props.room.descriptionShort;

    const peopleStr =
      GuestMax === GuestMin ? `${GuestMax}人` : `${GuestMin}~${GuestMax}人`;

    const bedName = trans(bedList[0] + ' Bed');
    const bedStr =
      bedList.length > 1 ? `${bedList.length}張${bedName}` : bedName;

    return `${peopleStr}・ ${bedName}・ 附早餐・衛浴${bathNum}間・${Footage}平方公尺`;
  }

  get descriptionList() {
    const { description } = this.props.room;
    let list = description.split('. ');
    return list.map((sentence, index) => {
      if (index !== list.length - 1) {
        return sentence + '.';
      }
      return sentence;
    });
  }

  onSelectDatesChange = (startDateStr, endDateStr) => {
    this.setState({
      selectDateStart: startDateStr,
      selectDateEnd: endDateStr
    });
  };

  getPriceInfo() {
    const { selectDateStart, selectDateEnd } = this.state;
    const startDate = new Date(selectDateStart);
    const endDate = new Date(selectDateEnd);
    const oneDatMilSec = 86400000;
    const dayCount = (endDate - startDate) / oneDatMilSec;

    let normalDayCount = 0;
    let holidayCount = 0;
    for (let i = 0; i < dayCount; i++) {
      const date = new Date(startDate.getTime() + oneDatMilSec * i);
      const day = date.getDay();
      if (day >= 1 && day <= 4) {
        normalDayCount++;
      } else {
        holidayCount++;
      }
    }

    const info = { normalDayCount, holidayCount };
    return info;
  }

  closeDialog = () => {
    this.setState({ showDiloag: false });
  };

  openDialog = () => {
    this.setState({ showDiloag: true });
  };

  render() {
    if (!this.state.canDiaplsy) {
      return null;
    }
    const { selectDateStart, selectDateEnd } = this.state;
    const { room, booking } = this.props;
    const { normalDayPrice, holidayPrice } = room;
    const { normalDayCount, holidayCount } = this.getPriceInfo();
    const totalPrice =
      normalDayCount * normalDayPrice + holidayCount * holidayPrice;
    const totalCurrency = toCurrency(totalPrice);
    const totalNight = normalDayCount + holidayCount;
    const imgList = room.imageUrl.map(src => ({ src }));
    const shortDescription = this.getShortDescription();
    const priceDescription = `平日（一～四）價格：${normalDayPrice} \xa0\xa0/\xa0\xa0 假日（五〜日）價格：${holidayPrice}`;
    const { checkInEarly, checkInLate, checkOut } = room.checkInAndOut;
    const disabledDates = booking.map(obj => obj.date);

    // console.log({ booking });

    return (
      <>
        <RoomSlide
          imgList={imgList}
          onClickBookingBtn={this.openDialog}
          totalPrice={totalCurrency}
          totalNight={totalNight}
        />
        <Styled.ContentArea>
          <Styled.ContentTopRow>
            <Styled.Title>{room.name}</Styled.Title>
            <Styled.ShortDescription>
              {shortDescription}
            </Styled.ShortDescription>
          </Styled.ContentTopRow>
          <Styled.Paragraph>
            {priceDescription}
            <br />
            入住時間：{' '}
            <Styled.CheckInOutSpan>{checkInEarly}</Styled.CheckInOutSpan>
            （最早）<span style={{ marginRight: '5px' }}>/</span>{' '}
            <Styled.CheckInOutSpan>{checkInLate}</Styled.CheckInOutSpan>
            （最晚）
            <br />
            退房時間： <Styled.CheckInOutSpan>{checkOut}</Styled.CheckInOutSpan>
          </Styled.Paragraph>
          <Styled.FeatureList>
            {this.descriptionList.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </Styled.FeatureList>
          <Amenities amenities={room.amenities} />
          <Styled.EmptyRoomTitle>空房狀態查詢</Styled.EmptyRoomTitle>
          <Styled.CalendarArea>
            <Calendar
              disabledDates={disabledDates}
              defaultSelectStart={selectDateStart}
              defaultSelectEnd={selectDateEnd}
              onSelectDatesChange={this.onSelectDatesChange}
            />
          </Styled.CalendarArea>
        </Styled.ContentArea>
        <Dialog
          show={this.state.showDiloag}
          toClose={this.closeDialog}
          amenities={room.amenities}
          roomName={room.name}
          shortDescription={shortDescription}
          priceDescription={priceDescription}
          checkInEarly={checkInEarly}
          checkInLate={checkInLate}
          checkOut={checkOut}
          totalPrice={totalCurrency}
          normalDayCount={normalDayCount}
          holidayCount={holidayCount}
          selectDateStart={selectDateStart}
          selectDateEnd={selectDateEnd}
        />
      </>
    );
  }
}

export default RoomPage;
