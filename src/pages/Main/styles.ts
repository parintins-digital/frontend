import {color} from '@mui/system'
import styled from 'styled-components'
import {colors} from '../../colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: black;
  }

  .header {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: flex-end;
    gap: 40px;
    padding: 0px 8%;
    background: ${colors.primary};
    background: linear-gradient(
      90deg,
      rgba(247, 159, 31, 1) 0%,
      rgba(2, 0, 36, 1) 100%
    );
  }

  .main {
    display: flex;
    flex-direction: column;
  }

  .main .introduction {
    color: white;
    display: flex;
    flex-direction: column;
    height: 60vh;
    position: relative;
    background: ${colors.primary};
    background: linear-gradient(
      90deg,
      rgba(247, 159, 31, 1) 0%,
      rgba(2, 0, 36, 1) 100%
    );
    padding: 48px;
    border-radius: 0px 0px 24% 24%;

    .title {
      font-size: 40pt;
      line-height: 16px;
    }

    .subtitle {
      font-size: 16pt;
    }

    .button-group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
      margin-top: 64px;
    }
  }

  .main .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .main .about .cards {
    display: flex;
    flex-direction: row;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      flex: 1;
      position: relative;

      :nth-child(even) {
        background-color: ${colors.backgroundElement};
      }

      svg {
        color: ${colors.secondary};
        width: 64px;
        height: auto;
      }
    }
  }

  .main .about .divisor {
    padding: 8px 0px;
    color: ${colors.secondaryContrast};
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .footer {
    color: ${colors.default};
    font-size: 12pt;
    padding: 16px 48px;
    display: flex;
    justify-content: space-between;
  }
`
