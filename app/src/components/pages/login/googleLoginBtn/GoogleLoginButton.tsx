import {
  ICON_BUTTON_VARIANTS,
  TextIconBtn,
  TextIconBtnL,
} from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { GoogleIcon } from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';
import useAuth from '@/hooks/useGoogleLogin';

const GoogleLoginButton = (): JSX.Element => {
  const { HandleGoogleAuthUrl } = useAuth();

  return (
    <TextIconBtn
      icon={<GoogleIcon />}
      label="Join with Google"
      onClick={HandleGoogleAuthUrl}
      variant={ICON_BUTTON_VARIANTS.outlined}
    />
  );
};

export default GoogleLoginButton;
