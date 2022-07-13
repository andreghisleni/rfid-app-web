import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface INotificationContainer {
  isNotification: boolean;
}
export const Container = styled.nav`
  grid-area: MT;

  height: 80px;
  background-color: ${props => props.theme.colors.grayscale.bg};

  padding: 10px;

  position: relative;

  display: flex;

  justify-content: center;

  flex-direction: column;

  div.line {
    width: 100%;
    display: flex;

    justify-content: center;
  }
`;

export const InferiorBord = styled.span`
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 94%;

  background: ${props => props.theme.colors.grayscale.gray.light};
`;

export const DataContainer = styled.div`
  /* border: 1px solid red; */

  margin-left: 60px;
  margin-right: 60px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.3px;

    color: ${props => props.theme.colors.grayscale.black};
  }
`;
export const RigthContainer = styled.div`
  /* border: 1px solid red; */

  height: 50px;
  display: flex;

  align-items: center;
  padding: 2px;

  .line {
    left: 0;
    height: 1px;
    width: 32px;

    transform: rotate(90deg);

    background: ${props => props.theme.colors.grayscale.divider};
  }
`;

export const NotificationContainer = styled.div<INotificationContainer>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;

  &:hover {
    cursor: pointer;
  }

  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    svg {
      width: 30px;
      height: 30px;
      color: ${props => props.theme.colors.grayscale.gray.light};
    }
    ${
  // eslint-disable-next-line
  props => props.isNotification && css`
          &::before {
            content: '';
            border-style: solid;
            border-color: ${props.theme.colors.grayscale.bg};
            border-width: 8px;
            border-radius: 50%;
            position: absolute;
            right: 0;
            top: 0;
          }
          &::after {
            content: '';
            border-style: solid;
            border-color: #3751ff;
            border-width: 6px;
            border-radius: 50%;
            position: absolute;
            right: 1px;
            top: 1px;
          }
        `
  }
  }
`;
export const UserInfo = styled.div`
  position: relative;

  display: flex;

  flex-direction: row;
  align-items: center;

  margin-left: 32px;

  h2 {
    font-family: Roboto;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;

    text-align: right;
    letter-spacing: 0.2px;

    color: ${props => props.theme.colors.grayscale.black};

    margin-right: 14px;
  }

  img {
    width: 54px;
    height: 54px;

    padding: 2px;
    border-radius: 50%;

    border: 1.5px solid #dfe0eb;
  }

  &:hover {
    cursor: pointer;
    div {
      opacity: 1;

      visibility: visible;
    }
  }
`;

export const DropDownContent = styled.div`
  position: relative;

  background: ${props => props.theme.colors.grayscale.white};

  border: 1px ${props => props.theme.colors.grayscale.divider} solid;

  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;

  opacity: 0;
  transition: opacity 0.4s;
  visibility: hidden;

  position: absolute;
  top: 30px;
  left: 70%;
  transform: translateX(-50%);

  color: #312e38;

  z-index: 1;

  &::before {
    content: '';
    border-style: solid;
    border-color: ${props => props.theme.colors.grayscale.divider} transparent;
    border-width: 6px 6px 0 6px;
    top: -6px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transform: rotate(180deg);
  }

  display: flex;

  flex-direction: column;
  a,
  button {
    background: ${props => props.theme.colors.grayscale.white};
    border: none;
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;

    & + a,
    & + button {
      padding-top: 10px;
    }

    text-decoration: none;
    color: #312e38;

    &:hover {
      cursor: pointer;
      background: ${props => shade(0.1, props.theme.colors.grayscale.white)};
    }
  }
`;
