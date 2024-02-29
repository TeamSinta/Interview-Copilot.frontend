import { Box, Flex } from '@radix-ui/themes';
import styled from 'styled-components';



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

`;


export const ContainerHome = styled(Box)`
height: 100vh;
padding: 0px;
background: #f3f7fb;
padding: 30px;

`
