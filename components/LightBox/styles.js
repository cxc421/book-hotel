import styled from 'styled-components';

export const Mask = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 300ms;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 120px;
  padding-right: 120px;

  &.lightbox-enter {
    opacity: 0;
  }
  &.lightbox-enter-active {
    opacity: 1;
  }
  &.lightbox-enter-done {
    opacity: 1;
  }
  &.lightbox-exit {
    opacity: 1;
  }
  &.lightbox-exit-active {
    opacity: 0;
  }
  &.lightbox-exit-done {
    opacity: 0;
  }
`;

export const Img = styled.img`
  max-height: calc(100% - 60px);
  max-width: calc(100% - 340px);
`;

const ArrowImgWrapper = styled.div`
  width: 50px;
  height: 70px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  /* background: pink; */
  cursor: pointer;

  > * {
    transition: transform 200ms;
  }
  &:hover {
    > * {
      transform: scale(1.35);
    }
  }

  &.disabled {
    opacity: 0.2;
    pointer-events: none;
  }
`;

export const ArrowImg = ({ src, alt, onClick, disabled }) => {
  const className = disabled ? 'disabled' : '';
  return (
    <ArrowImgWrapper onClick={onClick} className={className}>
      <img src={src} alt={alt} />
    </ArrowImgWrapper>
  );
};
