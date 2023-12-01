import {
  H2Bold,
  BodyLMedium,
  BodyLSemiBold,
  BodyMSemiBold,
} from "@/components/common/typeScale/StyledTypeScale";
import GoogleLoginButton from "@/components/pages/login/googleLoginBtn/GoogleLoginButton";
import {
  Container,
  GrayBodyLMedium,
  GrayBodyMMedium,
  MainContainer,
  StyledImage,
  StyledLogo,
  TextBox,
  TextRow,
} from "./StyledSignUp";
import { Stack } from "@mui/material";
import LoginPageImage from "src/assets/svg/'Sign Up' Page Illustration.svg";
import LogoImage from "src/assets/images/SintaLogo.png";
import { Link } from "react-router-dom";

const SignUpScreen = () => {
  return (
    <>
      <Stack direction="row" style={{ height: "100vh" }}>
        <MainContainer>
          <StyledLogo src={LogoImage} alt="sinta_logo" />

          <Container>
            <Stack gap="8px">
              <H2Bold>Sign up to Sinta</H2Bold>
              <BodyLMedium>
                Continue with the Google account or email address you use to
                sign in.
              </BodyLMedium>
              <GoogleLoginButton />
            </Stack>
            <TextRow>
              <GrayBodyLMedium>Already have an account?</GrayBodyLMedium>
              <Link to={"/login"}>
                {" "}
                <BodyLSemiBold> Sign in.</BodyLSemiBold>
              </Link>
            </TextRow>
          </Container>
          <TextBox>
            <GrayBodyMMedium>By signing in you agree to our</GrayBodyMMedium>
            <a href="https://teamsinta.com/terms">
              <BodyMSemiBold>Terms of Use</BodyMSemiBold>
            </a>
            <GrayBodyMMedium>and </GrayBodyMMedium>
            <a href="https://teamsinta.com/privacy-policy">
              <BodyMSemiBold>Privacy Policy</BodyMSemiBold>
            </a>
          </TextBox>
        </MainContainer>
        <StyledImage src={LoginPageImage} alt="loginpage_picture" />
      </Stack>
    </>
  );
};

export default SignUpScreen;
