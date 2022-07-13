import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;

    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;

      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  .columns {
    &.columns + .columns {
      width: 100%;
      margin-left: 44px;
    }
  }
  .column {
    width: 100%;
  }
`;

export const AvatarInput = styled.label`
  display: flex;
  margin-bottom: 32px;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 186px;
  height: 186px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    padding: 7.64px;
    border: 1.5px solid #dfe0eb;
    cursor: pointer;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: ${props => props.theme.colors.logo.color};
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${props => shade(0.2, props.theme.colors.logo.color)};
    }
    input {
      display: none;
    }
  }
`;
