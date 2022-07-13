import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;

  padding: 20px 30px 40px;
  transition: 0.4s;

  img {
    width: 40px;
  }
  span {
    margin-left: 12px;
    color: ${props => props.theme.colors.slider.gray};

    font-weight: bold;
    font-size: 20px;
    line-height: 24px;

    letter-spacing: 0.4px;

    opacity: 0.7;
  }
  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    transition: background 0.4s;
    opacity: 0.08;
  }
  :hover div {
    background-color: ${props => props.theme.colors.grayscale.gray};
  }
  :hover {
    cursor: pointer;
  }
  :hover span {
    color: ${props => props.theme.colors.accent.light};
  }
`;
