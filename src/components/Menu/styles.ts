import styled from 'styled-components';

export const Container = styled.nav`
  grid-area: MB;

  height: 100vh;
  background-color: ${props => props.theme.colors.slider.bg};

  padding: 0 0 30px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.grayscale.black};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.slider.bg};
  }
`;
