import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
function FlipCountClock({
  counter,
  color = 'white',
  bgColor = '#333',
  borderColor = 'mediumpurple'
}) {
  return <StyledUl $borderColor={borderColor}>
      {nums.map(num => {
      const isFront = num === counter;
      const isBack = num === (counter + 1) % 10;
      return <StyledLi key={num} className={`${isFront ? 'front' : ''} ${isBack ? 'back' : ''}`}>
            <StyledDiv className="upper">
              <StyledNum className="num" $customColor={color} $bgColor={bgColor} $borderColor={borderColor}>
                {num}
              </StyledNum>
            </StyledDiv>
            <StyledDiv className="lower">
              <StyledNum className="num" $customColor={color} $bgColor={bgColor} $borderColor={borderColor}>
                {num}
              </StyledNum>
            </StyledDiv>
          </StyledLi>;
    })}
    </StyledUl>;
}
export default memo(FlipCountClock);
const nums = Array.from({
  length: 10
}, (_, i) => i);
const increaseZindex = keyframes`
  0% {
    z-index: 4;
  }
  100% {
    z-index: 4;
  }
`;
const middleToBottom = keyframes`
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;
const topToMiddle = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(90deg);
  }
`;
const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const hide = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const StyledUl = styled.ul`
  position: relative;
  width: 35px;
  height: 50px;
  margin: 1px;
  border-radius: 4px;
  border: 1px solid ${props => props.$borderColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  list-style: none;
  padding: 0;
  overflow: hidden;
  @media screen and (min-width: 400px) {
    width: 40px;
    height: 55px;
  }

  @media screen and (min-width: 768px) {
    width: 45px;
    height: 65px;
    border-radius: 5px;
  }

  @media screen and (min-width: 990px) {
    width: 50px;
    height: 70px;
    border-radius: 6px;
    margin: 2px;
  }
`;
const StyledLi = styled.li`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.back {
    z-index: 3;

    .upper {
      z-index: 2;
      animation: ${topToMiddle} 0.5s linear both;
      &::before {
        top: 0;
        left: 0;
        animation: ${show} 0.5s linear both;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 1) 100%
        );
      }
    }

    .lower::before {
      top: 0;
      left: 0;
      animation: ${show} 0.5s linear both;
    }
  }

  &.front {
    z-index: 2;
    animation: ${increaseZindex} 0.5s 0.5s linear forwards;

    .upper::before {
      animation: ${hide} 0.5s 0.3s linear both;
    }

    .lower {
      z-index: 2;
      animation: ${middleToBottom} 0.5s 0.5s linear both;

      &::before {
        top: 0;
        left: 0;
        animation: ${hide} 0.5s 0.3s linear both;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.1) 100%
        );
      }
    }
  }
`;
const StyledDiv = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 50%;

  &::before {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    content: '';
  }

  &.upper {
    top: 0;
    transform-origin: 50% 100%;

    .num {
      top: 0;
    }

    &::after {
      position: absolute;
      z-index: 5;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.4);
      content: '';
    }
  }

  &.lower {
    bottom: 0;
    transform-origin: 50% 0%;

    .num {
      bottom: 0;
    }
  }
`;
const StyledNum = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  display: flex;
  width: 100%;
  height: 200%;
  align-items: center;
  justify-content: center;
  background-color: ${props => `${props.$bgColor}`};
  border: 1px solid ${props => props.$borderColor};
  box-sizing: border-box;
  border-radius: 6px;
  color: ${props => `${props.$customColor}`};
  font-size: 24px;

  @media screen and (min-width: 400px) {
    font-size: 26px;
  }

  @media screen and (min-width: 768px) {
    font-size: 32px;
    border-radius: 5px;
  }

  @media screen and (min-width: 990px) {
    font-size: 36px;
    border-radius: 6px;
  }
`;