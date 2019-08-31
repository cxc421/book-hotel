import { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 21px;
  display: flex;
  align-items: flex-start;
`;

const Box = styled.div`
  width: 160px;
  height: 136px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #949c7c;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BoxTop = styled.div`
  height: 50px;
  background: #949c7c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxBottom = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NextIcon = styled.img`
  margin-left: 13px;
  margin-right: 10px;
  margin-top: 20px;
`;

const BookingSteps = () => {
  return (
    <Container>
      <Box>
        <BoxTop>
          <img src="/static/book1.png" alt="book1" />
        </BoxTop>
        <BoxBottom>
          <span>送出線上預約單</span>
        </BoxBottom>
      </Box>
      <NextIcon src="/static/next.svg" />
      <Box>
        <BoxTop>
          <img src="/static/book2.png" alt="book2" />
        </BoxTop>
        <BoxBottom>
          <span>系統立即回覆是否預訂成功 </span>
          <span>並以簡訊發送訂房通知</span>
          <span>(若未收到簡訊請來電確認)</span>
        </BoxBottom>
      </Box>
      <NextIcon src="/static/next.svg" />
      <Box>
        <BoxTop>
          <img src="/static/book3.png" alt="book3" />
        </BoxTop>
        <BoxBottom>
          <span>入住當日憑訂房通知</span>
          <span>以現金或刷卡付款即可</span>
          <span>(僅接受VISA.JCB.銀聯卡)</span>
        </BoxBottom>
      </Box>
    </Container>
  );
};

export default memo(BookingSteps);
