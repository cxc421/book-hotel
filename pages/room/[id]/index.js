import { getRoomById, bookRoom, cancelRequest } from '../../../api';
import loading from '../../../loading';
import trans from '../../../translation';
import Amenities from '../../../components/Amenities';
import RoomSlide from '../../../components/RoomSlide';
import Dialog, { DialogType } from '../../../components/Dialog';
import Calendar from '../../../components/Calendar';
import { getDateISO } from '../../../components/Calendar/helper';
import * as Styled from './styles';
import toCurrency from '../../../helpers/currency';
import getPriceInfo from '../../../helpers/getPriceInfo';
import Lightbox from '../../../components/LightBox';

class RoomPage extends React.Component {
  static getInitialProps = async ({ query }) => {
    const roomData = await getRoomById(query.id);
    return {
      room: roomData.room[0],
      booking: roomData.booking,
      loadFromBrowser: !!process.browser
    };
  };

  updateBooking(booking) {
    const {
      selectDateStart,
      selectDateEnd
    } = this.computeDefaultDatesByBooking(booking);

    this.setState({
      booking,
      selectDateStart,
      selectDateEnd
    });
  }

  async refetchData() {
    loading.start();
    const roomData = await getRoomById(this.props.room.id);
    this.updateBooking(roomData.booking);
    this.setState({ canDiaplsy: true });
    loading.done();
  }

  state = {
    ...this.initState(),
    lightboxShow: false,
    lightboxImgIndex: 0
  };

  onClickSlide = index => {
    this.setState({
      lightboxShow: true,
      lightboxImgIndex: index
    });
  };

  closeLightBox = () => {
    this.setState({
      lightboxShow: false
    });
  };

  toNextLightboxImg = () => {
    const { lightboxImgIndex } = this.state;
    const maxLength = this.props.room.imageUrl.length - 1;
    if (lightboxImgIndex < maxLength) {
      this.setState({ lightboxImgIndex: lightboxImgIndex + 1 });
    }
  };

  toPrevLightboxImg = () => {
    const { lightboxImgIndex } = this.state;
    if (lightboxImgIndex > 0) {
      this.setState({ lightboxImgIndex: lightboxImgIndex - 1 });
    }
  };

  computeDefaultDatesByBooking(booking) {
    const disabledDates = booking.map(obj => obj.date);
    const today = new Date();
    let selectDateStart = new Date();
    selectDateStart.setDate(today.getDate() + 1);
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

    const result = {
      selectDateStart: getDateISO(selectDateStart),
      selectDateEnd: getDateISO(selectDateEnd)
    };
    // console.log(result);
    return result;
  }

  initState() {
    const {
      selectDateStart,
      selectDateEnd
    } = this.computeDefaultDatesByBooking(this.props.booking);

    return {
      canDiaplsy: this.props.loadFromBrowser,
      showDiloag: false,
      dialogType: DialogType.Form,
      selectDateStart,
      selectDateEnd,
      booking: this.props.booking
    };
  }

  componentDidMount() {
    if (!this.state.canDiaplsy) {
      console.log('load by browser');
      this.refetchData();
    } else {
      console.log('load by server');
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

  closeDialog = () => {
    this.setState({ showDiloag: false });
  };

  openDialog = () => {
    this.setState({ showDiloag: true, dialogType: DialogType.Form });
  };

  onSubmit = async data => {
    const roomId = this.props.room.id;
    if (!roomId) {
      return false;
    }

    loading.start();
    const result = await bookRoom(roomId, data);
    loading.done();

    if (result.success) {
      const newBooking = [...this.state.booking, ...result.booking];

      this.updateBooking(newBooking);
      console.log('success');
      console.log('new booking:', newBooking);

      this.setState({
        dialogType: DialogType.Success,
        showDiloag: true
      });
    } else {
      this.setState({
        dialogType: DialogType.Failed,
        showDiloag: true
      });
    }
  };

  getDisabledDates = (() => {
    let preJson = null;
    let preDisabledDates = [];
    return booking => {
      const bookingJson = JSON.stringify(booking);
      if (bookingJson !== preJson) {
        preJson = bookingJson;
        preDisabledDates = booking.map(obj => obj.date).sort();
      }
      return preDisabledDates;
    };
  })();

  render() {
    if (!this.state.canDiaplsy) {
      return null;
    }
    const {
      selectDateStart,
      selectDateEnd,
      booking,
      showDiloag,
      dialogType,
      lightboxShow,
      lightboxImgIndex
    } = this.state;
    const { room } = this.props;
    const { normalDayPrice, holidayPrice } = room;
    const { normalDayCount, holidayCount } = getPriceInfo(
      selectDateStart,
      selectDateEnd
    );
    const totalPrice =
      normalDayCount * normalDayPrice + holidayCount * holidayPrice;
    const totalCurrency = toCurrency(totalPrice);
    const totalNight = normalDayCount + holidayCount;
    const imgList = room.imageUrl.map(src => ({ src }));
    const shortDescription = this.getShortDescription();
    const priceDescription = `平日（一～四）價格：${normalDayPrice} \xa0\xa0/\xa0\xa0 假日（五〜日）價格：${holidayPrice}`;
    const { checkInEarly, checkInLate, checkOut } = room.checkInAndOut;
    const disabledDates = this.getDisabledDates(booking);

    return (
      <>
        <RoomSlide
          imgList={imgList}
          onClickBookingBtn={this.openDialog}
          totalPrice={totalCurrency}
          totalNight={totalNight}
          onClickSlide={this.onClickSlide}
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
              selectStartStr={selectDateStart}
              selectEndStr={selectDateEnd}
              onSelectDatesChange={this.onSelectDatesChange}
            />
          </Styled.CalendarArea>
        </Styled.ContentArea>
        <Dialog
          show={showDiloag}
          type={dialogType}
          toClose={this.closeDialog}
          amenities={room.amenities}
          roomName={room.name}
          shortDescription={shortDescription}
          priceDescription={priceDescription}
          checkInEarly={checkInEarly}
          checkInLate={checkInLate}
          checkOut={checkOut}
          selectDateStart={selectDateStart}
          selectDateEnd={selectDateEnd}
          disabledDates={disabledDates}
          normalDayPrice={normalDayPrice}
          holidayPrice={holidayPrice}
          onSubmit={this.onSubmit}
        />
        <Lightbox
          show={lightboxShow}
          onClose={this.closeLightBox}
          imgList={imgList}
          imgIdx={lightboxImgIndex}
          toNextImg={this.toNextLightboxImg}
          toPrevImg={this.toPrevLightboxImg}
        />
      </>
    );
  }
}

export default RoomPage;
