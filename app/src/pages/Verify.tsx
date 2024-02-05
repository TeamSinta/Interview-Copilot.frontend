import VerificationInput from 'react-verification-input';

import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import {
  BodyLMedium,
  H2Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import Terms from '@/components/pages/login/Terms/Terms';
import { BackgroundColor } from '@/features/utils/utilEnum';
import useAuth, { useQuery } from '@/hooks/useGoogleLogin';
import { Stack, Box } from '@mui/material';
import { useState } from 'react';
import LogoImage from 'src/assets/images/SintaLogo.png';
import LoginPageImage from 'src/assets/svg/LogInPageIllustration.svg';
import {
  Container,
  MainContainer,
  StyledImage,
  StyledLogo,
} from '@/pages/Login/StyledLogin';

const LoginScreen = () => {
  const [code, setCode] = useState('');

  const { HandleAuthKitLogin } = useAuth();
  const query = useQuery();
  const email = query.get('email');

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
            <H2Bold>Verify Your Code</H2Bold>
            <BodyLMedium>Enter the code sent to {email}</BodyLMedium>
            <Box display={'flex'} flexDirection={'row'} justifyContent={"center"}>
              <VerificationInput
                value={code}
                autoFocus
                onChange={setCode}
                validChars="0-9"
                length={6}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]',
                  autoComplete: 'one-time-code',
                }}
                classNames={{
                  // container: "container",
                  // character: "character",
                  // characterInactive: "character--inactive",
                  // characterSelected: "character--selected",
                  // characterFilled: "character--filled",
                }}
              />
            </Box>
            <TextBtnL
              label="Vefiry"
              disable={false}
              onClick={() => {
                HandleAuthKitLogin({ code, email: email! });
              }}
              className={BackgroundColor.ACCENT_PURPLE}
            />
          </Stack>
        </Container>
        <Terms />
      </MainContainer>
    </Stack>
  );
};

export default LoginScreen;
