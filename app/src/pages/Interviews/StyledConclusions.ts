import { Box, Flex } from '@radix-ui/themes';
import styled from 'styled-components';

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

export const BoxShadow = styled(Box)`
background: white;
border-radius: 8px; // Adjust the border-radius as needed
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // This creates the drop shadow effect
padding: 20px; // Adjust the padding as needed
`;


export const FlexShadow = styled(Flex)`
background: white;
border-radius: 8px; // Adjust the border-radius as needed
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // This creates the drop shadow effect
align-items: center;
padding: 20px;
justify-content: flex-start;
height: 100%;
`;
