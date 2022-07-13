import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  dark: boolean;
}
interface PasswordForceProps {
  value: number;
  dark: boolean;
}
interface SubContainerProps {
  dark: boolean;
}
export const Container = styled.div<ContainerProps>`
  label {
    color: ${props =>
      props.theme.colors.form[props.dark ? 'dark' : 'light'].input.border};
  }

  label + div {
    margin-top: 8px !important;
  }

  > div {
    background: ${props =>
      props.theme.colors.form[props.dark ? 'dark' : 'light'].input.bg};
    border-radius: 10px;
    line-height: 21px;
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;

    border: 0.2px solid
      ${props =>
        props.theme.colors.form[props.dark ? 'dark' : 'light'].input.border};
    color: ${props =>
      props.theme.colors.form[props.dark ? 'dark' : 'light'].input.placeholder};
    ${props =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

    ${props =>
      props.isFocused &&
      css`
        border-color: ${props.theme.colors.logo.color};
        color: ${props.theme.colors.logo.color};
      `}


  ${props =>
      props.isFilled &&
      css`
        color: ${props.theme.colors.logo.color};
      `}
  }
  & + div {
    margin-top: 8px;
  }
`;

export const SubContainer = styled.div<SubContainerProps>`
  line-height: 21px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  > svg {
    margin-right: 16px;
  }
  input {
    background: transparent;

    border: 0;

    font-size: 16px;

    color: ${props =>
      props.theme.colors.form[props.dark ? 'dark' : 'light'].input.text};
    flex: 1;

    &::placeholder {
      color: ${props =>
        props.theme.colors.form[props.dark ? 'dark' : 'light'].input
          .placeholder};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${props =>
        shade(
          -0.2,
          props.theme.colors.form[props.dark ? 'dark' : 'light'].input.text,
        )};
      -webkit-box-shadow: 0 0 0px 1000px
        ${props =>
          props.theme.colors.form[props.dark ? 'dark' : 'light'].input.bg}
        inset;

      transition: background-color 5000s ease-in-out 0s;
    }
  }
`;

export const PasswordForce = styled.progress<PasswordForceProps>`
  &::-webkit-progress-bar {
    border-radius: 0px 0px 10px 10px;
    background: ${props =>
      props.theme.colors.form[props.dark ? 'dark' : 'light'].input.bg};
  }

  &::-webkit-progress-value {
    border-bottom-left-radius: 10px;
    ${props =>
      props.value !== undefined &&
      props.value === 100 &&
      css`
        border-bottom-right-radius: 10px;
      `}

    background: ${props =>
      props.value !== undefined &&
      (props.value <= 25
        ? props.theme.colors.progress.red
        : props.value <= 50
        ? props.theme.colors.progress.orange
        : props.value <= 75
        ? props.theme.colors.progress.yellow
        : props.value <= 100 && props.theme.colors.progress.green)};
  }

  width: 100%;
  height: 4px;
`;

/**
 * 0 - 25 red
 * 25 - 50 orange
 * 50 -75  yellow
 * 75 - 100 green
 */
