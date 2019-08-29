import styled from 'styled-components';
import Calendar from '../components/Calendar';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Container>
      <Calendar
        disabledDates={[
          '2019-08-01',
          '2019-08-02',
          '2019-08-03',
          '2019-08-17',
          '2019-08-18',
          '2019-08-19',
          '2019-08-24',
          '2019-08-25',
          '2019-08-26',
          '2019-08-27',
          '2019-08-31',
          '2019-09-11'
        ]}
      />
    </Container>
  );
};
