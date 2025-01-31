import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import {
  setIsAuthenticated,
  resetUserState,
  checkUserAuthentication,
  setTokens,
} from '@/features/authentication/authenticationSlice';
import { RootState, AppDispatch } from '@/store';
import {
  useGetAccessTokenMutation,
  useGetUserMutation,
  useValidateTokenMutation,
} from '@/features/authentication/authenticationAPI';
import { setCurrentWorkspace } from '@/features/workspace/userWorkspaceSlice';
import Loading from '@/components/common/elements/loading/Loading';
import { AccessToken } from '@/features/settingsDetail/userSettingTypes';
import { setCompany } from '@/features/company/companySlice';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, status, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const workspace = useSelector((state: RootState) => state.workspace);
  const dispatch: AppDispatch = useDispatch();

  const [cookies, setCookies, removeCookies] = useCookies([
    'refresh_token',
    'access_token',
  ]);
  const accessToken: AccessToken = cookies.access_token;
  const refreshToken: AccessToken = cookies.refresh_token;

  const [validateToken] = useValidateTokenMutation();
  const [getUser] = useGetUserMutation();
  const [getAccessToken] = useGetAccessTokenMutation();

  const authenticateUser = async (accessToken: AccessToken) => {
    try {
      const result = await validateToken({ access: accessToken });
      if ('data' in result) {
        dispatch(setIsAuthenticated(true));
        dispatch(setTokens({ access: accessToken, refresh: refreshToken }));
        await getUser({ access: accessToken });
      } else {
        handleTokenRefresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        failedAuthentication();
      } else {
        failedAuthentication();
      }
    }
  };

  const handleTokenRefresh = async () => {
    if (refreshToken) {
      const newAccessToken = await getAccessToken({ refresh: refreshToken });
      if ('data' in newAccessToken && newAccessToken.data?.access) {
        const { access } = newAccessToken.data;
        setCookies('access_token', access);
        dispatch(setIsAuthenticated(true));
        dispatch(setTokens({ access: access, refresh: refreshToken }));
        await getUser({ access: access });
      } else {
        failedAuthentication();
      }
    } else {
      failedAuthentication();
    }
  };

  const setDefaultWorkspace = () => {
    if (user?.companies?.length > 0 && !workspace.id) {
      const defaultCompany = user.companies[0];
      dispatch(setCurrentWorkspace(defaultCompany));
      dispatch(setCompany(defaultCompany));
    }
  };

  const failedAuthentication = () => {
    removeCookies('access_token');
    removeCookies('refresh_token');
    dispatch(resetUserState());
    navigate('/login');
  };

  useEffect(() => {
    const initAuth = async () => {
      switch (status) {
        case 'IDLE':
          console.log('Checking authentication');
          if (!isAuthenticated) {
            if (accessToken) {
              await authenticateUser(accessToken);
            } else {
              await handleTokenRefresh();
            }
          }
          setDefaultWorkspace();
          break;

        case 'AUTHENTICATED':
          if (!user.email) {
            await getUser({ access: accessToken });
          }
          setDefaultWorkspace();
          console.log('Authenticated');
          break;

        case 'LOADING':
          console.log('Authentication Loading');
          break;

        case 'FAILED':
          console.log('Authentication Failed');
          failedAuthentication();
          break;
      }
    };

    initAuth();
  }, [accessToken, status, isAuthenticated, user.email]);

  if (status === 'IDLE' || status === 'LOADING') return <Loading />;
  return <>{children}</>;
};

// I think the logic works. Check the logs to make sure it doesn't like overly init the useEffect. I dont want it to reload unecessarily.
// The page initializes with isAuthenticated false + IDLE, so it still renders without the navbars first, which is annoying and looks ugly AF.. I want it to either show loading
// or nothing.
