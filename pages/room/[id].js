import styled from 'styled-components';
import { getRoomById } from '../../api';
import loading from '../../loading';
import trans from '../../translation';
import Amenities from '../../components/Amenities';
import RoomSlide from '../../components/RoomSlide';
import Dialog from '../../components/Dialog';

const ContentArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 58%;
  height: 100vh;
  padding: 40px;
  padding-top: 50px;
  padding-bottom: 30px;
  color: rgba(56, 71, 11, 1);
  overflow: auto;
`;

const ContentTopRow = styled.div`
  display: flex;
  align-items: baseline;
`;

const Title = styled.h1`
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  font-size: 40px;
`;

const ShortDescription = styled.h2`
  font-weight: 500;
  font-size: 14px;
  margin-left: 107px;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 350;
  margin-top: 38px;
  line-height: 23px;
`;

const FeatureList = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 35px;
  margin-bottom: 45px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 300;
  margin-top: 38px;
  line-height: 23px;
  > li {
    font-family: 'Open Sans', sans-serif;
  }
`;

const EmptyRoomTitle = styled.div`
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  margin-top: 3px;
`;

const CalendarArea = styled.div`
  max-width: 635px;
  margin-top: 8px;
  height: 310px;
  background: lightgray;
  overflow: hidden;
  text-align: center;
  font-family: 'Open Sans';
`;

const CheckInOutSpan = styled.span`
  letter-spacing: 2px;
`;

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
    canDiaplsy: this.props.loadFromBrowser,
    showDiloag: false
  };

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

  get shortDescriptionString() {
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

    const { room, booking } = this.props;
    const imgList = room.imageUrl.map(src => ({ src }));

    // console.log(this.descriptionList);

    return (
      <>
        <RoomSlide imgList={imgList} onClickBookingBtn={this.openDialog} />
        <ContentArea>
          <ContentTopRow>
            <Title>{room.name}</Title>
            <ShortDescription>{this.shortDescriptionString}</ShortDescription>
          </ContentTopRow>
          <Paragraph>
            平日（一～四）價格：{room.normalDayPrice}{' '}
            <span style={{ margin: '0 4px' }}>/</span> 假日（五〜日）價格：
            {room.holidayPrice}
            <br />
            入住時間：{' '}
            <CheckInOutSpan>{room.checkInAndOut.checkInEarly}</CheckInOutSpan>
            （最早）<span style={{ marginRight: '5px' }}>/</span>{' '}
            <CheckInOutSpan>{room.checkInAndOut.checkInLate}</CheckInOutSpan>
            （最晚）
            <br />
            退房時間：{' '}
            <CheckInOutSpan>{room.checkInAndOut.checkOut}</CheckInOutSpan>
          </Paragraph>
          <FeatureList>
            {this.descriptionList.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </FeatureList>
          <Amenities amenities={room.amenities} />
          <EmptyRoomTitle>空房狀態查詢</EmptyRoomTitle>
          <CalendarArea />
        </ContentArea>
        <Dialog
          show={this.state.showDiloag}
          toClose={this.closeDialog}
          amenities={room.amenities}
        />
      </>
    );
  }
}

export default RoomPage;
