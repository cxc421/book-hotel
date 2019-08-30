import React, { memo } from 'react';
import * as Styled from './styles';

const Date = ({
  disabled = false,
  title,
  children,
  isSelecting,
  isSelectStart,
  isSelectThrough,
  isSelectEnd,
  onClick,
  onMouseEnter
}) => {
  if (disabled) {
    isSelectStart = isSelectEnd = isSelectThrough = false;
  }

  const wrapperStyle = {
    pointerEvents: disabled ? 'none' : 'auto'
  };

  const textStyle = {
    textDecoration: disabled ? 'line-through' : 'none',
    opacity: disabled ? 0.3 : 1,
    color: !isSelecting && (isSelectStart || isSelectEnd) ? 'white' : 'inherit'
  };

  return (
    <Styled.DateWrapper
      title={title}
      style={wrapperStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <Styled.DateHoverCircle className="date-hover-circle" />
      {isSelectThrough && (
        <Styled.DateThroughBg noLeft={isSelectStart} noRight={isSelectEnd} />
      )}
      {isSelectEnd && !isSelecting && <Styled.DateEndCircle />}
      {isSelectStart && !isSelecting && <Styled.DateStartCircle />}
      <Styled.DateText style={textStyle}>{children}</Styled.DateText>
    </Styled.DateWrapper>
  );
};

export default memo(Date);
