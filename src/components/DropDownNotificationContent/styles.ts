import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.grayscale.white};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 18px 22px;
  top: 60px;
  z-index: 1;
  cursor: auto;

  opacity: 0;
  transition: opacity 0.4s;
  visibility: hidden;

  &::before {
    content: '';
    border-style: solid;
    border-color: ${props => props.theme.colors.grayscale.white} transparent;
    border-width: 12px 12px 0 12px;
    top: -12px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transform: rotate(180deg);
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 10px;
  cursor: default;
  h1 {
    font-size: 18px;
    color: #312e38;
  }
  p {
    font-size: 15px;
    color: #6c6c80;
  }
  & + div {
    border-style: solid;
    border-color: ${props => props.theme.colors.grayscale.gray.light};
    border-width: 1px 0 0 0;
  }
`;
