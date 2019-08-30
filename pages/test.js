import { useState } from 'react';
import styled from 'styled-components';
import Calendar from '../components/Calendar';
import DatePicker from '../components/Datepicker';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DatePickerArea = styled.div`
  margin-top: 20px;
  width: 315px;
  padding: 20px;
  box-sizing: content-box;
  background: rgb(56, 71, 11);
`;

export default () => {
  const [selectDateStr, setSelectDateStr] = useState('2019-09-09');

  const onSelectDatesChange = (dateStartStr, dateEndStr) => {
    console.log({ dateStartStr, dateEndStr });
  };

  function onSelectDateChange(newSelectDateStr) {
    setSelectDateStr(newSelectDateStr);
  }

  return (
    <Container>
      {/* <Calendar
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
        onSelectDatesChange={onSelectDatesChange}
      /> */}
      <DatePickerArea>
        <DatePicker
          selectDateStr={selectDateStr}
          onChange={onSelectDateChange}
        />
      </DatePickerArea>
    </Container>
  );
};
