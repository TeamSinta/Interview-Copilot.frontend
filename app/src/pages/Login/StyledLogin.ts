import styled from "styled-components";
import {
  BodyLMedium,
  BodyMMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import { Box } from "@mui/material";

export const Container = styled(Box)`
  max-width: 480px;
  height: 100%;
  paddingx: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;

export const TextBox = styled(Box)`
  max-width: 500px;
  margin-bottom: 30px;
  display: flex;
  gap: 4px;
`;

export const StyledImage = styled.img`
  align-self: center;
  width: 360px;
  height: 292px;
  margin-bottom: 4px;

  @media (max-width: 1000px) {
    /* Adjust styles for screens with a max width of 768px */
    width: 90%;
  }
`;

export const StyledLogo = styled.img`
  width: 96px;
  height: 38px;
  margin: 30px;
  align-self: flex-start;
`;

export const TextRow = styled.div`
  display: flex;
  gap: 4px;
`;

export const GrayBodyLMedium = styled(BodyLMedium)`
  color: rgba(18, 18, 18, 0.5);
`;

export const GrayBodyMMedium = styled(BodyMMedium)`
  color: rgba(18, 18, 18, 0.5);
`;

export const MainContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
