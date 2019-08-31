import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 38px;
  background: white;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
`;

export const InputText = styled.span`
  font-size: 16px;
  font-family: 'Open Sans';
  color: rgb(106, 106, 106);
  font-weight: 600;
`;

export const InputDownIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #38470b transparent transparent transparent;
`;

export const CalendarArea = styled.div`
  position: absolute;
  /* width: 400px;
  height: 200px;
  background: pink; */
  top: 100%;
  left: 50%;
  transform: translate(-50%, 1px);
  z-index: 9999;
`;
