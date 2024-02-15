import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { WorkOS } from '@workos-inc/node';
import {
  useGoogleLoginMutation,
  useAuthKitLoginMutation,
} from '@/features/authentication/authenticationAPI';
import { useEffect, useMemo, useCallback } from 'react';
import { Token } from '@/features/authentication/authenticationInterface';

const workos = new WorkOS(import.meta.env.VITE_WORKOS_SECRETKEY);
interface IAuthKitLogin {
  email: string;
  code?: string;
}
interface GoogleLoginReturnType {
  HandleGoogleAuthUrl: () => void;
  HandleAuthKitLogin: (data: IAuthKitLogin) => Promise<void>;
}

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const useAuth = (): GoogleLoginReturnType => {
  const [googleLogin] = useGoogleLoginMutation();
  const [authKitLogin] = useAuthKitLoginMutation();
  const [, setCookies] = useCookies(['refresh_token', 'access_token']);
  const navigate = useNavigate();

  const query = useQuery();
  const code = query.get('code');

  const getUthUrl = (provider: string) => {
    return workos.userManagement.getAuthorizationUrl({
      clientId: import.meta.env.VITE_WORKOS_CLIENTID,
      provider,
      redirectUri: import.meta.env.VITE_WORKOS_REDIRECTURI,
    });
  };

  const setTokenAndNavigate = useCallback(
    (token: Token) => {
      setCookies('access_token', token['access'], { path: '/' });
      setCookies('refresh_token', token['refresh'], { path: '/' });
      navigate('/dashboard');
    },
    [navigate, setCookies]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (code?.length) {
        try {
          const result = await googleLogin({ code }).unwrap();
          if (result) {
            setTokenAndNavigate(result);
          }
        } catch (error) {
          console.log('Failed to login: ', error);
          const urlWithoutCode = window.location.href.split('?')[0];
          window.history.replaceState({}, document.title, urlWithoutCode);
        }
      }
    };
    fetchData();
  }, [code, googleLogin, setTokenAndNavigate]);

  const HandleGoogleAuthUrl = () => {
    window.location.href = getUthUrl('GoogleOAuth');
  };

  const HandleAuthKitLogin = async (data: IAuthKitLogin) => {
    try {
      const result = await authKitLogin(data).unwrap();
      if (data?.code && result?.access) setTokenAndNavigate(result);
      else if (result === true) navigate(`/verify?email=${data.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { HandleGoogleAuthUrl, HandleAuthKitLogin };
};

export default useAuth;
