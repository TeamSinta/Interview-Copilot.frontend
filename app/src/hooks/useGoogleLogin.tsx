import { useGoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { WorkOS } from '@workos-inc/node';
import { useGoogleLoginMutation } from '@/features/authentication/authenticationAPI';

const workos = new WorkOS(import.meta.env.VITE_WORKOS_SECRETKEY);
interface GoogleLoginReturnType {
  signIn: () => void;
}

const GoogleLogin = (): GoogleLoginReturnType => {
  const [googleLogin] = useGoogleLoginMutation();
  const [, setCookies] = useCookies(['refresh_token', 'access_token']);
  const navigate = useNavigate();

  const signIn = () => {
    const googleOAuthUrl = workos.userManagement.getAuthorizationUrl({
      clientId: import.meta.env.VITE_WORKOS_CLIENTID,
      provider: 'GoogleOAuth',
      redirectUri: import.meta.env.VITE_WORKOS_REDIRECTURI,
    });
    window.location.href = googleOAuthUrl;
  };

  return { signIn };
};

export default GoogleLogin;
