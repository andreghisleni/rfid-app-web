import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
  background: ${props => props.theme.colors.grayscale.bg};
  border: 1px ${props => props.theme.colors.grayscale.divider} solid;
  border-radius: 9px 9px 8px 8px;
  header {
    display: flex;
    align-items: center;
    height: 38px;
    padding: 0 22px;
    background: ${props => props.theme.colors.grayscale.divider};

    font-size: 19px;
    font-family: 'Roboto';
    font-weight: 700;
    border-radius: 8px 8px 0 0;
  }
`;
export const Content = styled.div`
  padding: 32px;
`;
