import {
  BodyLMedium,
  BodyLSemiBold,
  H2Bold
} from '@/components/common/typeScale/StyledTypeScale';
import Terms from '@/components/pages/login/Terms/Terms';
import GoogleLoginButton from '@/components/pages/login/googleLoginBtn/GoogleLoginButton';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from 'src/assets/images/SintaLogo.png';
import LoginPageImage from "src/assets/svg/'Sign Up' Page Illustration.svg";
import {
  Container,
  GrayBodyLMedium,
  MainContainer,
  StyledImage,
  StyledLogo,
  SuperContainer,
  TextRow
} from './StyledSignUp';

const SignUpScreen = () => {
  return (
    <>
      <StyledLogo src={LogoImage} alt="sinta_logo" />

      <SuperContainer>
        <MainContainer>
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
              <Link to={'/login'}>
                {' '}
                <BodyLSemiBold> Sign in.</BodyLSemiBold>
              </Link>
            </TextRow>
          </Container>
          <Terms />
        </MainContainer>
        <StyledImage src={LoginPageImage} alt="loginpage_picture" />
      </SuperContainer>
    </>
  );
};

export default SignUpScreen;
