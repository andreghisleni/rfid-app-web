import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  position: relative;
  display: flex;

  padding-left: 32px;

  height: 46px;

  align-items: center;

  transition: 0.4s;

  text-decoration: none;

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.theme.colors.grayscale.gray.default};
  }

  span {
    padding-left: 24px;

    font-size: 16px;
    line-height: 20px;

    letter-spacing: 0.2px;

    color: ${props => props.theme.colors.grayscale.gray.default};
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    transition: background 0.4s;
    opacity: 0.08;
  }
  :hover div.bg {
    background-color: ${props => props.theme.colors.grayscale.gray.default};
  }
  :hover {
    cursor: pointer;
  }
  :hover span {
    color: ${props => props.theme.colors.accent.light};
  }

  &.active {
    padding-left: 29px;
    border-left-style: solid;
    border-left-width: 3px;
    border-left-color: ${props => props.theme.colors.accent.light};
  }
  &.active div.bg {
    background-color: ${props => props.theme.colors.grayscale.gray.default};
    opacity: 0.1;
  }
  &.active span {
    color: ${props => props.theme.colors.accent.light};
  }
  &.active svg {
    color: ${props => props.theme.colors.accent.light};
  }
  ul {
    margin-left: 20px;
    background: ${props => props.theme.colors.grayscale.gray.default};
  }
`;
