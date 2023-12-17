import { DefaultTheme } from "@/styles/StyleType";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
`;
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
`;

export const LoadingCircle = styled.div`
  position: absolute;
  border: 2px solid #ccc; /* Adjust the stroke style as needed */
  border-top: 6px solid ${DefaultTheme.colors.accentPurple}; /* Adjust the stroke color as needed */
  border-radius: 50%;
  width: 400px;
  height: 400px;
  animation: ${spin} 2s linear infinite;
  transition: max-height 0.5s ease-in-out; /* Add transition for smooth resizing */

  @media (max-width: 1268px) {
    /* Adjust max-height for smaller screens */
    max-height: 200px;
    max-width: 200px;
  }
`;

export const Image = styled.img`
  max-height: 350px;
  display: flex;
  justify-content: center;
  transition: max-height 0.5s ease-in-out; /* Add transition for smooth resizing */
  opacity: 85%;

  @media (max-width: 1268px) {
    /* Adjust max-height for smaller screens */
    max-height: 150px;
  }
`;
