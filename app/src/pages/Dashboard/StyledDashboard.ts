import styled from "styled-components";
import {
  H2Bold,
  BodySMedium,
  H2Medium,
} from "@/components/common/typeScale/StyledTypeScale";
import { Box } from "@mui/material";

export const YourNewContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 80px;
  flex-direction: column;
  justify-content: space-between;
`;

export const YourMainContentContainer = styled.div`
  flex: 0.8; // Makes it grow to take all available space, pushing TemplateCardsBox to the bottom.
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  @media (min-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */
    padding-left: 248px;
  }

  @media (min-height: 1150px) {
    /* Adjust styles for screens with a max width of 768px */
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;
export const WelcomeHeading = styled(H2Medium)`
  font-size: 52px;
  width: 400px;
  font-weight: 700;
  padding-bottom: 8px;

  @media (max-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */
    text-align: center;
    font-size: 38px;
    padding-bottom: 8px;
    width: 600px;
  }
`;

export const DescriptionText = styled(BodySMedium)`
  /* Your styling for description text here */
  font-size: 16px;
  width: 400px;
  align-items: center;
  text-align: center;

  @media (max-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */

    width: 600px;
  }
`;

export const PendingReviewsHeading = styled(H2Bold)`
  font-size: 22px;
`;

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-content: flex-end;
  @media (max-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */
    gap: 28px;
    align-items: center;
    text-align: center;
    padding-bottom: 16px;
  }
`;

export const TemplateCardsBox = styled(Box)`
  border-radius: 28px;
  border: 1px solid #e0e0e0;
  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;
  margin-top: 22px;
  width: 100%;
  overflow-x: auto; // Enable horizontal scrolling
  cursor: grab; // Set cursor style for dragging
  padding: 24px 0px 24px 24px;
`;

export const TextBox = styled(Box)`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const IconStyle = styled.div`
  svg {
    width: 20px;
    height: 22px;
    stroke: ${(props) => props.theme.colors.black};
  }
`;

export const MainContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 88px;
  justify-content: space-between;

  @media (min-width: 1900px) {
    /* Adjust styles for screens with a max width of 768px */
    justify-content: space-between;
  }

  @media (max-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */

    gap: 28px;
    justify-content: space-between;
    flex-direction: column-reverse;
  }
`;

export const StyledImage = styled.img`
  flex: 1;
  width: 1000px;

  @media (max-width: 1450px) {
    /* Adjust styles for screens with a max width of 768px */
    flex: 1;
    width: 650px;
    padding-bottom: 30px;
  }

  @media (min-width: 1700px) {
    /* Adjust styles for screens with a max width of 768px */
    flex: 1;
    min-width: 1200px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    /* Adjust styles for screens with a max width of 768px */
    flex-direction: column;
    gap: 8px;
  }
`;
