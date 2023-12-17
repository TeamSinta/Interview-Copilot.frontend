import styled from "styled-components";

export const ConclusionStyledContainer = styled.div`
  display: grid;
  grid-template-areas:
    "side header"
    "side main";
  grid-template-columns: 240px 1fr;
  max-width: 100%;

  /* Add more media queries for othesr screen sizes as needed */
`;

export const ConclusionStyledMain = styled.div`
  grid-area: main;
  overflow-x: hidden;
  padding: 0px 30px 30px 30px !important;
`;
