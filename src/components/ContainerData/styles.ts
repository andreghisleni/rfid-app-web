import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 80px);
  background-color: ${props => props.theme.colors.grayscale.bg};

  padding: 0 32px 30px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.grayscale.black};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.grayscale.gray.default};
  }
`;
