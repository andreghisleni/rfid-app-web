import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100vh;
    background: ${props => props.theme.colors.grayscale.bg};
  }
  *, button, input{
    border: 0;
    outline: 0;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }


  ul{
    list-style: none;
  }

  .row {
    display: flex;
    flex-direction: row;

    justify-content: center;

    > div {
      margin-top: 0px;
      width: 100%;

      & + div {
        margin-top: 0px;
        margin-left: 10px;
      }
    }
    &.row + .row {
      width: 100%;
      margin-top: 33px;
    }
  }

  .text-row {
    width: 100%;
    margin-top: 33px;
    margin-bottom: 10px;
    color: #fb7070;
  }
`;
