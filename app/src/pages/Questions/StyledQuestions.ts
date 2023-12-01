import { BoderBox, Title } from "@/components/pages/interview/StyledInterview";
import styled, { css, keyframes } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  padding: 0;
  gap: 24px; // Space between grid items
  justify-content: flex-start; // Center grid items in the container
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 200px)
  ); // Adjust as needed

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const fadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

export const CompetencesWrap = styled.div`
  padding-top: 22px;
  border-radius: 12px;
  height: 500px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  overflow-x: scroll;
`;
