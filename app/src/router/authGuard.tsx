import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  setIsAuthenticated,
  resetUserState,
  checkUserAuthentication,
} from "@/features/authentication/authenticationSlice";
import { RootState, AppDispatch } from "@/app/store";
import {
  useGetAccessTokenMutation,
  useGetUserMutation,
  useValidateTokenMutation,
} from "@/features/authentication/authenticationAPI";
import { setCurrentWorkspace } from "@/features/workspace/userWorkspaceSlice";
import Loading from "@/components/common/elements/loading/Loading";

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
    "refresh_token",
    "access_token",
  ]);
  const accessToken: string | undefined = cookies.access_token;
  const refreshToken: string | undefined = cookies.refresh_token;

  const [validateToken] = useValidateTokenMutation();
  const [getUser] = useGetUserMutation();
  const [getAccessToken] = useGetAccessTokenMutation();

  const checkAuthentication = async () => {
    try {
      // Dispatch the checkUserAuthentication action to check if the user is authenticated
      await dispatch(checkUserAuthentication());

      // Check the user's authentication status
      if (!isAuthenticated) {
        // User is not authenticated, handle it accordingly
        if (accessToken) {
          console.log("Authenticating user with access token:", accessToken);
          await authenticateUser(accessToken);
        } else {
          console.log("Handling token refresh");
          await handleTokenRefresh();
        }
      }

      // Check if user email is missing and fetch it if needed
      if (!user.email) {
        await getUser({ access: accessToken });
      }

      // Set the default workspace if needed
      setDefaultWorkspace();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Authentication check failed:", error.message);
        failedAuthentication();
      } else {
        failedAuthentication();
      }
    }
  };

  const authenticateUser = async (accessToken: string) => {
    try {
      const result = await validateToken({ access: accessToken });
      if ("data" in result) {
        await getUser({ access: accessToken });
        dispatch(setIsAuthenticated(true));
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
      if ("data" in newAccessToken && newAccessToken.data?.access) {
        const { access } = newAccessToken.data;
        setCookies("access_token", access);
        dispatch(setIsAuthenticated(true));
        await getUser({ access: access });
      } else {
        failedAuthentication();
      }
    } else {
      failedAuthentication();
    }
  };

  const setDefaultWorkspace = () => {
    if (user.companies && user.companies.length > 0 && !workspace.id) {
      const defaultCompany = user.companies[0];
      dispatch(setCurrentWorkspace(defaultCompany));
    }
  };

  const failedAuthentication = () => {
    dispatch(resetUserState());
    removeCookies("access_token");
    removeCookies("refresh_token");
    navigate("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("Status:", status);
      console.log("IsAuthenticated:", isAuthenticated);
      switch (status) {
        case "IDLE":
          if (!isAuthenticated) {
            if (accessToken) {
              console.log(
                "Authenticating user with access token:",
                accessToken
              );
              await authenticateUser(accessToken);
            } else {
              console.log("Handling token refresh");

              await handleTokenRefresh();
            }
          }
          if (!user.email) {
            await getUser({ access: accessToken });
          }
          setDefaultWorkspace();
          break;

        case "AUTHENTICATED":
          if (!user.email) {
            await getUser({ access: accessToken });
          }
          setDefaultWorkspace();
          break;

        case "LOADING":
          console.log("CASE LOADING");
          break;

        case "FAILED":
          console.log("CASE FAILED");
          failedAuthentication();
          break;
      }
    };

    initAuth();
  }, [accessToken, status, isAuthenticated, user.email]);

  if (status === "IDLE" || status === "LOADING") return <Loading />;
  return <>{children}</>;
};

// I think the logic works. Check the logs to make sure it doesn't like overly init the useEffect. I dont want it to reload unecessarily.
// The page initializes with isAuthenticated false + IDLE, so it still renders without the navbars first, which is annoying and looks ugly AF.. I want it to either show loading
// or nothing.
