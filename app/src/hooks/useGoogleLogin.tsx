import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useGoogleLoginMutation } from "@/features/authentication/authenticationAPI";

interface GoogleLoginReturnType {
  signIn: () => void;
}

const GoogleLogin = (): GoogleLoginReturnType => {
  const [googleLogin] = useGoogleLoginMutation();
  const [, setCookies] = useCookies(["refresh_token", "access_token"]);
  const navigate = useNavigate();

  const signIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const code = codeResponse.code;

      try {
        const result = await googleLogin({ code }).unwrap();
        if (result) {
          setCookies("access_token", result["access"], { path: "/" });
          setCookies("refresh_token", result["refresh"], { path: "/" });
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Failed to login: ", error);
      }
    },
    onError: (errorResponse) => {
      console.log("Error", errorResponse);
    },
  });

  return { signIn };
};

export default GoogleLogin;
