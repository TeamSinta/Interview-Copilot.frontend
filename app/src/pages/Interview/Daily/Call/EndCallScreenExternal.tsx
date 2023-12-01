import {
  H2Bold,
  BodyLMedium,
  BodyLSemiBold,
  BodyMSemiBold,
  BodyMMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import GoogleLoginButton from "@/components/pages/login/googleLoginBtn/GoogleLoginButton";

import { Box, Stack } from "@mui/material";
import EndCallImage from "src/assets/svg/Sinta End Call 1.svg";
import LogoImage from "src/assets/images/SintaLogo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Box)`
  border-radius: 28px;
  border: 1px solid #e0e0e0;
  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;
  margin-top: 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow-x: auto; // Enable horizontal scrolling
  justify-content: center;
  padding: 24px;
`;

export const TextBox = styled(Box)`
  max-width: 500px;
  margin-bottom: 30px;
  display: flex;
  gap: 4px;
`;

export const StyledImage = styled.img`
  align-self: center;

  margin-bottom: 4px;

  @media (max-width: 1000px) {
    /* Adjust styles for screens with a max width of 768px */
    width: 90%;
  }
`;

export const StyledLogo = styled.img`
  width: 96px;
  height: 38px;
  margin: 12px;
  align-self: center;
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

const EndCallScreen = () => {
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Container>
          <StyledImage src={EndCallImage} alt="EndCall_image" />
          <Stack gap="8px">
            <H2Bold>You've left the call</H2Bold>
            <BodyLMedium>Have a nice day!</BodyLMedium>
            <StyledLogo src={LogoImage} alt="sinta_logo" />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default EndCallScreen;
