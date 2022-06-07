import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 80px;
  width: 100vw;
  height: 100vh;
  padding-bottom: 16px;

  img {
    cursor: pointer;
    width: 200px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
    align-items: center;
  }
`
