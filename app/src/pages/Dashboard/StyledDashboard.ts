import styled, { keyframes } from 'styled-components';
import {
  H2Bold,
  BodySMedium,
  BodyLBold,
  BodyMMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { Box } from '@mui/material';

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
  animation: ${waveAnimation} 3s 1;
  animation-duration: 2.5s;
  transform-origin: 70% 70%;
  display: inline-block;
`;

export const WelcomeHeading = styled(H2Bold)`
  flex: 1;
  font-weight: 900;
  padding-bottom: 8px;
  width: 100%;
  font-size: 26px;
  text-align: center;
  @media (max-width: 1500px) {
    /* Adjust styles for screens with a max width of 768px */

    font-size: 24px;
    padding-bottom: 8px;
  }
`;

export const DescriptionText = styled(BodySMedium)`
  /* Your styling for description text here */
  font-size: 14px;

  align-items: center;
  text-align: center;
`;

export const PendingReviewsHeading = styled(BodyLBold)`
  font-size: 16px;
`;

export const TextContainer = styled(Box)`
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

export const InterviewsBox = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  width: 100%;
  padding: 24px 24px 24px 24px;
`;

export const TemplateCardsBox = styled(Box)`
  border-radius: 8px;

  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;

  margin-top: 22px;
  width: 100%;
  overflow-x: auto; // Enable horizontal scrolling
  cursor: grab; // Set cursor style for dragging
`;

export const TemplateEmptyBox = styled(Box)`
  border-radius: 8px;
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
export const WorkspaceTextBox = styled(Box)`
  display: flex;
  gap: 16px;
  flex-direction: row;
  justify-content: space-between;
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
  border-radius: 8px;
  width: 100%;
  opacity: 100%;
  height: 100%;
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

export const UpgradeButton = styled(BodyMMedium)`
  background-color: white;
  color: #625df3;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;
