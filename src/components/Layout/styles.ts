import styled from 'styled-components';
// MB menu-bar
// MT top menu
// CD data container
export const Container = styled.div`
  display: grid;

  grid-template-columns: 255px auto;
  grid-template-rows: 80px auto;

  grid-template-areas:
    'MB MT'
    'MB CD';
`;
