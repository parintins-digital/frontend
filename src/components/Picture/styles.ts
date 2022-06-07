import styled, {keyframes} from 'styled-components'

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
