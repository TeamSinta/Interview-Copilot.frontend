import styled from "styled-components";
import { Grid } from "@mui/material";

type StyledDecisionButtonProps = {
  activeValue: number;
  theme: {
    colors: {
      black: string;
      white: string;
    };
  };
};

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledSubmitDecision = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding: 2px;
  position: relative; /* This makes it a containing block for absolutely positioned elements */
  background-repeat: no-repeat;
  background-position: top right; /* Adjust this as needed */
  background-size: contain;
  width: 400px;
`;

export const StyledDecisionButton = styled.div<StyledDecisionButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 0;
  position: relative;
  outline: 1.2px solid black;
  outline-offset: -1;
  border-radius: 8px;
  box-shadow: 0px 2px 0px #121212;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.activeValue === 1
      ? "#DBFDDC"
      : props.activeValue === 2
      ? "#FABBCF"
      : "#FFFFFF"};

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 0px #121212;
    transition: 0.5s;
    background-color: ${(props) =>
      props.activeValue === 1 || 3
        ? "#B3E2B2"
        : props.activeValue === 2
        ? "#F49FB4"
        : "#D3D3D3"};
  }

  &:active {
    box-shadow: 0px 0px 0px #121212;
    transform: translateY(4px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.white {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    svg {
      width: 18px;
      height: 18px;
      stroke: ${(props) => props.theme.colors.black};
      display: flex;
      align-content: center;
    }
  }
`;

export const StyledButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
`;

export const ButtonStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.img`
  flex: 1;
  max-height: 325px;
  right: 10;

  width: 100px;
  height: auto;
`;
