import styled from 'styled-components';

export const ContentArea = styled.div`
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

export const ContentTopRow = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  font-size: 40px;
`;

export const ShortDescription = styled.h2`
  font-weight: 500;
  font-size: 14px;
  margin-left: 107px;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 350;
  margin-top: 38px;
  line-height: 23px;
`;

export const FeatureList = styled.ul`
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

export const EmptyRoomTitle = styled.div`
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  margin-top: 3px;
`;

export const CalendarArea = styled.div`
  margin-top: 8px;
  overflow: hidden;
  font-family: 'Open Sans';
`;

export const CheckInOutSpan = styled.span`
  letter-spacing: 2px;
`;
