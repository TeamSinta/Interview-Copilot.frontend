import styled from 'styled-components';
import {
  BodyLMedium,
  BodyMMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import Box from '@mui/material/Box';

export const GrayBodyLMedium = styled(BodyLMedium)`
  color: rgba(18, 18, 18, 0.5);
`;

export const GrayBodyMMedium = styled(BodyMMedium)`
  color: rgba(18, 18, 18, 0.5);
`;


export const TextBox = styled(Box)`
  max-width: 500px;
  margin-bottom: 30px;
  display: flex;
  gap: 4px;
`;