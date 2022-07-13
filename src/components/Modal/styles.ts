import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 18, 20, 0.7);
  padding: 20px;

  overflow: visible;

  .close {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  .modal {
    max-width: 736px;
    width: 100%;

    max-height: 90vh;

    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.colors.form.light.bg};
    border-radius: 6px;
    position: relative;
    padding: 10px;

    overflow: auto;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    margin-top: 11px;
  }
`;
