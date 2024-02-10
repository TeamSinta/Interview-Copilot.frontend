import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { GoogleIcon } from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';
import useAuth from '@/hooks/useGoogleLogin';

const GoogleLoginButton = (): JSX.Element => {
  const { HandleGoogleAuthUrl } = useAuth();

  return (
    <TextIconBtnL
      icon={<GoogleIcon />}
      label="Sign in with Google"
      disable={false}
      onClick={HandleGoogleAuthUrl}
      className={BackgroundColor.ACCENT_PURPLE}
    />
  );
};

export default GoogleLoginButton;
