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
const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateY(100px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 150px;
    height: 150px;
  }
  form {
    margin: 40px 0 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: ${props => props.theme.colors.form.dark.text};
      font-size: 24px;
      line-height: 28px;
      text-align: center;
    }
  }

  > a {
    color: ${props => props.theme.colors.form.dark.text};
    display: flex;
    margin-top: 24px;

    align-items: center;
    justify-content: center;

    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${props => shade(0.2, props.theme.colors.form.dark.text)};
    }
    svg {
      margin-right: 16px;
    }
  }
`;
