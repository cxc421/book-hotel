import { PureComponent } from 'react';
import { getRoomById } from '../../api';
import RoomPage from '../../components/[id]';

class RoomPageWrapper extends PureComponent {
  static getInitialProps = async ({ query }) => {
    const roomData = await getRoomById(query.id);
    return {
      room: roomData.room[0],
      booking: roomData.booking,
      loadFromBrowser: !!process.browser
    };
  };

  render() {
    return <RoomPage {...this.props} />;
  }
}

export default RoomPageWrapper;
