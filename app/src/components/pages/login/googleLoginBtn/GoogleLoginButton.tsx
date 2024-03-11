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
      label="Continue with Google"
      onClick={HandleGoogleAuthUrl}
      variant={ICON_BUTTON_VARIANTS.outlined}
      className=" hover:bg-slate-100"
    />
  );
};

export default GoogleLoginButton;
