import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.form.dark.bg};
`;

export const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;
const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 2s;

  img {
    width: 200px;
    height: 200px;
  }
  form {
    margin: 48px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: ${props => props.theme.colors.form.dark.text};
      font-size: 24px;
      line-height: 28px;
      text-align: center;
    }

    a {
      color: ${props => props.theme.colors.form.dark.text};
      display: block;
      margin-top: 24px;

      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${props => shade(0.2, props.theme.colors.form.dark.text)};
      }
    }
  }

  > a {
    color: ${props => props.theme.colors.logo.color};
    display: flex;
    margin-top: 24px;

    align-items: center;
    justify-content: center;

    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${props => shade(0.2, props.theme.colors.logo.color)};
    }
    svg {
      margin-right: 16px;
    }
  }
`;
