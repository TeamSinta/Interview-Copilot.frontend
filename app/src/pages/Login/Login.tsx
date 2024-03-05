import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import Loading from '@/components/common/elements/loading/Loading';
import TextInput from '@/components/common/form/textInput/TextInput';
import {
  BodyLMedium,
  BodyLSemiBold,
  H2Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import Terms from '@/components/pages/login/Terms/Terms';
import GoogleLoginButton from '@/components/pages/login/googleLoginBtn/GoogleLoginButton';
import { BackgroundColor } from '@/features/utils/utilEnum';
import useAuth, { useQuery } from '@/hooks/useGoogleLogin';
import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from 'src/assets/images/SintaLogo.png';
import LoginPageImage from 'src/assets/images/LogInPageIllustration.jpg';
import {
  Container,
  GrayBodyLMedium,
  MainContainer,
  StyledImage,
  StyledLogo,
  TextRow,
} from '../Login/StyledLogin';
import { useState } from 'react';

const LoginScreen = () => {
  const query = useQuery();
  const code = query.get('code');
  // create State for email
  const [email, setEmail] = useState('');

  const { HandleAuthKitLogin } = useAuth();

  if (code?.length) {
    return <Loading />;
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      style={{ height: '100vh' }}
    >
      <StyledLogo src={LogoImage} alt="sinta_logo" />
      <MainContainer>
        <Container>
          <StyledImage src={LoginPageImage} alt="loginpage_picture" />
          <Stack gap="8px">
            <H2Bold>Sign In to Sinta</H2Bold>
            <BodyLMedium>
              Continue with the Google account or email address you use to sign
              in.
            </BodyLMedium>
            <TextInput
              disable={false}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              value={email}
              validate={() => null}
            />
            <TextBtnL
              label="Login"
              disable={false}
              onClick={() => {
                HandleAuthKitLogin({ email });
              }}
              className={BackgroundColor.ACCENT_PURPLE}
            />
            <Box
              justifyContent={'center'}
              flexDirection={'row'}
              display={'flex'}
            >
              <GrayBodyLMedium>OR</GrayBodyLMedium>
            </Box>

            <GoogleLoginButton />
          </Stack>
          <TextRow>
            <GrayBodyLMedium>New to Sinta?</GrayBodyLMedium>
            <Link to={'/sign-up'}>
              {' '}
              <BodyLSemiBold> Join.</BodyLSemiBold>
            </Link>
          </TextRow>
        </Container>
        <Terms />
      </MainContainer>
    </Stack>
  );
};

export default LoginScreen;
