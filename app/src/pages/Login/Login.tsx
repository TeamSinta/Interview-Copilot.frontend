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
} from "../Login/StyledLogin";
import { Stack } from "@mui/material";
import LoginPageImage from "src/assets/svg/LogInPageIllustration.svg";
import LogoImage from "src/assets/images/SintaLogo.png";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        style={{ height: "100vh" }}
      >
        <StyledLogo src={LogoImage} alt="sinta_logo" />
        <MainContainer>
          <Container>
            <StyledImage src={LoginPageImage} alt="loginpage_picture" />
            <Stack gap="8px">
              <H2Bold>Sign In to Sinta</H2Bold>
              <BodyLMedium>
                Continue with the Google account or email address you use to
                sign in.
              </BodyLMedium>
              <GoogleLoginButton />
            </Stack>
            <TextRow>
              <GrayBodyLMedium>New to Sinta?</GrayBodyLMedium>
              <Link to={"/sign-up"}>
                {" "}
                <BodyLSemiBold> Join.</BodyLSemiBold>
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
      </Stack>
    </>
  );
};

export default LoginScreen;
