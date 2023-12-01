import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-areas:
    "side header"
    "side main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 100px 1fr;
  max-width: 100%;

  /* Add more media queries for othesr screen sizes as needed */
`;

export const StyledMain = styled.div`
  grid-area: main;
  padding: 30px !important;
  overflow-x: hidden;
`;
