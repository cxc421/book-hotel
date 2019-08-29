import React, { memo } from 'react';
import styled, { css as _css } from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  border: 1px solid rgb(56, 71, 11);
  padding: 27px 33px 22px;
  color: rgb(56, 71, 11);
  font-family: 'Open Sans';
  position: relative;
`;

export const CalendarWrapper = styled.div`
  position: relative;
  width: 272px;
  /* background: yellow; */
  margin-right: 24px;
  user-select: none;
  &:last-child {
    margin-right: 0;
  }
`;
/*
 *  Header
 */
export const Header = styled.div`
  display: flex;
  /* background: pink; */
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MonthAndYear = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

/**
 * Body
 */
export const Body = styled.div`
  margin-top: 14px;
  /* background: lightgray; */
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-row-gap: 1px;
`;

export const DayLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid rgba(56, 71, 11, 0.1);
  text-align: center;
  color: rgba(56, 71, 11, 0.5);
`;

const disabledDateCss = _css`
  text-decoration: line-through;
  color: rgba(56, 71, 11, 0.3);
  pointer-events: none;
`;

export const Date = styled.div`
  position: relative;
  font-size: 11px;
  font-weight: 400;
  padding: 10px 0;
  color: rgba(56, 71, 11, 1);
  text-align: center;
  cursor: default;

  ${props => {
    if (props.disabled) {
      return disabledDateCss;
    }
  }}

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
    opacity: 0.2;
    border-radius: 50%;
    top: 0;
    left: 0;
  }
`;

export const DisabledDate = styled.div`
  font-size: 11px;
  font-weight: 400;
  padding: 10px 0;
  color: rgba(56, 71, 11, 0.3);
  text-decoration: line-through;
  text-align: center;
  cursor: default;
`;

const Arrow = styled.img`
  display: block;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  top: 30px;
  /* background: rgb(245, 245, 245); */
`;

export const LeftArrow = styled(Arrow)`
  left: 20px;
`;

export const RightArrow = styled(Arrow)`
  right: 20px;
`;
