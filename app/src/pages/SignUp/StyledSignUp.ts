import { BodyLMedium } from '@/components/common/typeScale/StyledTypeScale';
import { Box } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  max-width: 480px;
  height: 100%;
  min-width: 100px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  gap: 32px;
`;

export const SuperContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  margin-right: 66px;
  justify-content: flex-end;
  gap: 98px;

  @media (max-width: 900px) {
    /* Adjust styles for screens with a max width of 768px */
    margin-top: 30px;
    margin-right: 0px;

    gap: 28px;

    flex-direction: column-reverse;
  }
`;

export const StyledImage = styled.img`
  align-self: center;

  margin-bottom: 4px;
  width: 40%;
  height: 100%;
  max-height: 900px;

  @media (max-width: 900px) {
    /* Adjust styles for screens with a max width of 768px */
    max-height: 390px;
    width: 90%;
  }
`;

export const StyledLogo = styled.img`
  width: 96px;
  height: 38px;
  margin-top: 30px;
  margin-left: 30px;
  align-self: flex-start;
`;

export const TextRow = styled.div`
  display: flex;
  gap: 4px;
  align-self: flex-start;
`;

export const GrayBodyLMedium = styled(BodyLMedium)`
  color: rgba(18, 18, 18, 0.5);
`;

export const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-left: 52px;
  height: 100%;
  @media (max-width: 900px) {
    /* Adjust styles for screens with a max width of 768px */

    width: 90%;
  }
`;
