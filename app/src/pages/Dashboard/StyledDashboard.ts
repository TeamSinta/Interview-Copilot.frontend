import styled, { keyframes } from 'styled-components';
import {
  H2Bold,
  BodySMedium,
  H2Medium,
} from "@/components/common/typeScale/StyledTypeScale";
import { Box } from "@mui/material";

export const YourNewContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 60px;
  flex-direction: column;
  justify-content: space-between;
`;

export const YourMainContentContainer = styled.div`
  flex: 0.8; // Makes it grow to take all available space, pushing TemplateCardsBox to the bottom.
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  @media (min-width: 1500px) {
    /* Adjust styles for screens with a max width of 768px */
    padding-left: 248px;
    @media (min-height: 1150px) {
    /* Adjust styles for screens with a max width of 768px */
    padding-top: 100px;
    padding-bottom: 100px;
  }
  }



`;




export const waveAnimation = keyframes`
 0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }  /* The following five values can be played with to make the waving more or less extreme */
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }  /* Reset for the last half to pause */
  100% { transform: rotate( 0.0deg) }
`;

// Create a styled component for the waving hand emoji
export const WavingHand = styled.span`
  animation: ${waveAnimation} 3s 1;;
  animation-duration: 2.5s;
  transform-origin: 70% 70%;
  display: inline-block;
`;

export const WelcomeHeading = styled(H2Medium)`
  font-size: 52px;
  width: 400px;
  font-weight: 700;
  padding-bottom: 8px;

  @media (max-width: 1500px) {
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

  @media (max-width: 1500px) {
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
  @media (max-width: 1500px) {
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

export const TemplateEmptyBox = styled(Box)`
  border-radius: 28px;
  border: 1px solid #e0e0e0;
  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  width: 100%;
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

  @media (max-width: 1500px) {
    /* Adjust styles for screens with a max width of 768px */

    gap: 28px;
    justify-content: space-between;
    flex-direction: column-reverse;
  }
`;

export const StyledImage = styled.img`
  flex: 1;
  width: 1000px;
  opacity: 75%;

  @media (max-width: 1500px) {
    /* Adjust styles for screens with a max width of 768px */
    flex: 1;
    width: 100%;
    padding: 0 24px 24px 24px;

  }



  @media (min-width: 1700px) {
    /* Adjust styles for screens with a max width of 768px */
    flex: 1;
    min-width: 1000px;
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


export const EmptySectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 16px;
  flex-direction: column;
  text-align: center;
  opacity: 65%;
  max-width: 375px;
`;

export const StyledEmptyImage = styled.img`
  flex: 1;
  max-width: 100px;
  max-height: 100px;

`;
