import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  text-align: center;

  background: ${props => props.theme.colors.grayscale.white};

  border: 1px solid ${props => props.theme.colors.grayscale.divider};
  box-sizing: border-box;
  border-radius: 8px;

  padding: 32px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 47px;
    h1 {
      color: ${props => props.theme.colors.grayscale.black};
      font-size: 19px;
      line-height: 24px;
      letter-spacing: 0.4px;
    }
    button {
      background: transparent;
      border: none;
      width: 90px;
      height: 24px;

      display: flex;
      align-items: center;
      svg {
        width: 24px;
        height: 24px;
        color: ${props => props.theme.colors.grayscale.gray.light};

        margin-right: 5px;
      }

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: ${props => props.theme.colors.grayscale.black};

      &:hover {
        cursor: pointer;
      }
    }
  }

  table {
    font-size: 18px;
    border-collapse: collapse;

    width: 100%;
  }
  th p {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.2px;
    font-weight: 700;
    color: ${props => props.theme.colors.grayscale.gray.light};

    & + p {
      font-weight: 400;
    }
  }
  thead tr th {
    vertical-align: initial;
    padding-bottom: 12px;
    border-style: solid;
    border-bottom-width: 1.5px;
    border-color: ${props => props.theme.colors.grayscale.divider};
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }

  td {
    p {
      color: ${props => props.theme.colors.grayscale.black};
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.2px;

      & + p {
        font-weight: 400;
      }
    }
    img {
      width: 300px;
    }
  }

  tr {
    height: 70px;
  }
  tr + tr {
    border-style: solid;
    border-top-width: 1.5px;
    border-color: ${props => props.theme.colors.grayscale.divider};
  }
`;
export const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  button {
    display: flex;
    align-items: center;
    padding: 8px 11px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    color: #fff;

    svg {
      width: 24px;
      height: 24px;
    }
    &.edit {
      background: #3751ff;
    }
    &.delete {
      background: #f12b2c;
    }

    &.other {
      background: #6c757d;
    }
    & + button {
      margin-left: 16px;
    }
    p {
      margin-left: 6px;

      font-size: 15px;
      line-height: 16px;
      letter-spacing: 0.1px;

      color: #ffffff;
    }

    &:hover {
      cursor: pointer;
    }
    &.edit:hover {
      background: ${shade(0.2, '#3751ff')};
    }
    &.delete:hover {
      background: ${shade(0.2, '#f12b2c')};
    }
    &.other:hover {
      background: ${shade(0.2, '#6c757d')};
    }
  }
`;
