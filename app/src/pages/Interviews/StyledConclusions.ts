import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; // adjust this value for space between grid items
  // adjust this value for space around the grid

  @media (min-width: 2100px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 1900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1700px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
