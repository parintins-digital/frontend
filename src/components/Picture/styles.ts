import styled, {keyframes} from 'styled-components'
import {colors} from '../../colors'

const degrees = '1deg'

const flippedCardAnimation = keyframes`
  0%{
    transform: rotate(${degrees});
  }
  25%{
    transform: rotate(-${degrees});
  }
  50%{
    transform: rotate(${degrees});
  }
  75%{
    transform: rotate(-${degrees});
  }
  100%{
    transform: rotate(0);
  }
`

export const CardNotFlipped = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 0.2s alternate;
  animation: ${flippedCardAnimation} 0.4s;
  animation-iteration-count: infinite;

  :hover {
    transform: scale(1.1);
  }
`

export const FullScreenWrapper = styled.div`
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .clickarea {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 2;
    transition: 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 48px;
      height: auto;
      color: transparent;
      transition: color 0.2s;
    }
  }

  :hover {
    .clickarea {
      background-color: ${colors.secondary};
      opacity: 0.5;

      svg {
        color: ${colors.secondaryContrast};
      }
    }
  }
`
