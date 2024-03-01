import styled from 'styled-components';
import { Box } from '@mui/material';

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
`;

export const StyledTopNavBar = styled(Box)`
  grid-area: header;
  padding: 30px 30px 24px 30px;
  grid-area: header;
  padding: 30px 30px 24px 30px;
  position: sticky;
  top: 0; // Stick to the top of the viewport
  z-index: 2000; // Ensures the navbar is above other content
  box-shadow: 0 0.5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #EBEFF6;
  background: white;
`;
