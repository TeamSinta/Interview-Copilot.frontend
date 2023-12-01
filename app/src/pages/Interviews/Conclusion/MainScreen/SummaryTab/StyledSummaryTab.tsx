import styled from "styled-components";
import { Grid } from "@mui/material";
export const StyledSummaryTitle = styled.span`
   {
    font-weight: bold;
    font-size: 12px;
  }
`;
export const StyledSummaryDescription = styled.div`
   {
    margin-top: 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    min-width: 100px;

    @media (min-width: 1600px) {
      /* Adjust styles for screens with a max width of 768px */
      min-width: 300px;
    }
  }
`;

export const AIGeneratedImageContainer = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  float: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  align: center;
  margin-bottom: 80px;
  gap: 8px;
  @media (min-width: 1600px) {
    /* Adjust styles for screens with a max width of 768px */
    min-height: 100px;
    max-width: 900px;
    max-height: 150px;
  }
`;

export const StyledRoundBox = styled.div`
   {
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    padding-bottom: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 12px;

    @media (min-width: 1400px) {
      /* Adjust styles for screens with a max width of 768px */
      min-height: 320px;
    }
  }
`;
export const StyledSubmitDecision = styled.div`
   {
    font-weight: bold;
    font-size: 12px;
    margin-left: 20px;
  }
`;

export const StyledDecisionButton = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 28px;
    gap: 10px;
    background: transparent;
    border: 0;
    position: relative;
    outline: 1px solid ${(props) => props.theme.colors.black};
    outline-offset: -1px;
    border-radius: 12px;
    box-shadow: 0px 2px 0px #121212;
    height: 200%;
    width: 100%;
    background-color: ${(props) =>
      props.activeValue === 1
        ? "#DBFDDC"
        : props.activeValue === 2
        ? "#FABBCF"
        : "#FFFFFF"};

    :hover {
      cursor: pointer;
      box-shadow: 0px 4px 0px #121212;
      transition: 0.5s;
      background-color: ${(props) =>
        props.activeValue === 1
          ? "#B3E2B2"
          : props.activeValue === 2
          ? "#F49FB4"
          : "#D3D3D3"};  // Lighter colors on hover
    }

    :active {
      box-shadow: 0px 0px 0px #121212;
      transform: translateY(4px);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }


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
  }
`;

export const StyledSummaryTab = styled.div`
   {
    margin: 15px 10px;

    @media (min-width: 1400px) {
      /* Adjust styles for screens with a max width of 768px */
      min-width: 590px;
    }
  }
`;

export const StyledButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
`;

export const StyledDecisionGrid = styled(Grid)`
  padding: 20px;
`;

export const ButtonStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.img`
  width: 100%;
  margin: 0px;
  flex: 1;
  min-height: 325px;

  @media (min-width: 1600px) {
    /* Adjust styles for screens with a max width of 768px */
    flex: 1;
    width: 100%;
    min-height: 300px;
  }
`;
