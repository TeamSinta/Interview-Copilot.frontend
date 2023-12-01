import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { GoogleIcon } from "@/components/common/svgIcons/Icons";
import { BackgroundColor } from "@/features/utils/utilEnum";
import useGoogleLogin from "@/hooks/useGoogleLogin";

const GoogleLoginButton = (): JSX.Element => {
  const { signIn } = useGoogleLogin();

  return (
    <TextIconBtnL
      icon={<GoogleIcon />}
      label="Sign in with Google"
      disable={false}
      onClick={signIn}
      className={BackgroundColor.ACCENT_PURPLE}
    />
  );
};

export default GoogleLoginButton;
