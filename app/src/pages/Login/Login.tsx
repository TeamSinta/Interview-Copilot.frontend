import { TextBtn } from '@/components/common/buttons/textBtn/TextBtn';
import Loading from '@/components/common/elements/loading/Loading';
import TextInput from '@/components/common/form/textInput/TextInput';
import { TypographyH1 } from '@/components/common/typeScale/TypeScale';
import GoogleLoginButton from '@/components/pages/login/googleLoginBtn/GoogleLoginButton';
import useAuth, { useQuery } from '@/hooks/useGoogleLogin';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginLogo } from '@/assets/svg/login_logo.svg';
import Terms from '@/components/pages/login/Terms/Terms';

let pseudo = {
  before:
    "before:content-[' '] before:block before:absolute before:w-[145px] before:h-[1px] before:left-0 before:top-1/2 before:bg-foreground before:-translate-y-1/2",
  after:
    "after:content-[' '] after:block after:absolute after:w-[145px] after:h-[1px] after:right-0 after:top-1/2 after:bg-foreground after:-translate-y-1/2",
};

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
    <div className="flex">
      <div className="flex-initial w-1/2 h-dvh">
        <img
          className="object-cover w-full h-full p-8"
          src="src/assets/images/Sinta_cover_bright.jpeg"
          alt="login"
        />
      </div>
      <div className="flex-initial w-1/2">
        <div className="w-[450px] h-dvh flex flex-col gap-y-[17px] mx-auto my-0 items-center justify-center">
          {/*  === TITELS ===  */}
          <LoginLogo />
          <TypographyH1 content="Sign in"></TypographyH1>
          <div className=" rt-Card rt-r-size-4  rt-variant-surface p-12 m-3">
            <div className="w-[350px] flex flex-col gap-2">
              <p className="font-semibold">Email</p>

              {/*  === INPUTS ===  */}
              <div className="flex flex-col w-full gap-y-[20px]">
                <TextInput
                  disable={false}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  value={email}
                  validate={() => null}
                />
                <TextBtn
                  label="Continue"
                  className="hover:bg-indigo-700 bg-indigo-500"
                  onClick={() => {
                    HandleAuthKitLogin({ email });
                  }}
                ></TextBtn>

                <div
                  className={clsx(
                    'text-foreground relative text-center opacity-[.6]',
                    pseudo.before,
                    pseudo.after
                  )}
                >
                  or
                </div>
                <GoogleLoginButton />
              </div>
              {/*  === LAST ===  */}
              <div className="opacity-[.6] mt-3">
                No account?{' '}
                <Link to={'/sign-up'} className="text-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <Terms />
        </div>
      </div>
    </div>

    // <Stack
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="space-between"
    //   style={{ height: '100vh' }}
    // >
    //   <StyledLogo src={LogoImage} alt="sinta_logo" />
    //   <MainContainer>
    //     <Container>
    //       <StyledImage src={LoginPageImage} alt="loginpage_picture" />
    //       <Stack gap="8px">
    //         <H2Bold>Sign In to Sinta</H2Bold>
    //         <BodyLMedium>
    //           Continue with the Google account or email address you use to sign
    //           in.
    //         </BodyLMedium>
    // <TextInput
    //   disable={false}
    //   name="email"
    //   onChange={(e) => setEmail(e.target.value)}
    //   placeholder="Enter email"
    //   value={email}
    //   validate={() => null}
    // />
    //         <TextBtnL
    //           label="Login"
    //           disable={false}
    // onClick={() => {
    //   HandleAuthKitLogin({ email });
    // }}
    //           className={BackgroundColor.ACCENT_PURPLE}
    //         />
    //         <Box
    //           justifyContent={'center'}
    //           flexDirection={'row'}
    //           display={'flex'}
    //         >
    //           <GrayBodyLMedium>OR</GrayBodyLMedium>
    //         </Box>

    // <GoogleLoginButton />
    //       </Stack>
    //       <TextRow>
    //         <GrayBodyLMedium>New to Sinta?</GrayBodyLMedium>
    //         <Link to={'/sign-up'}>
    //           {' '}
    //           <BodyLSemiBold> Join.</BodyLSemiBold>
    //         </Link>
    //       </TextRow>
    //     </Container>
    //     <Terms />
    //   </MainContainer>
    // </Stack>
  );
};

export default LoginScreen;
