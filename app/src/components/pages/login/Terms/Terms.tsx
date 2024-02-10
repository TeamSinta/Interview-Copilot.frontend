import { GrayBodyMMedium, TextBox } from './StyledTerms';

import {
  BodyMSemiBold
} from '@/components/common/typeScale/StyledTypeScale';

const Terms = () => {
  return (
    <TextBox>
      <GrayBodyMMedium>By signing in you agree to our</GrayBodyMMedium>
      <a href="https://teamsinta.com/terms">
        <BodyMSemiBold>Terms of Use</BodyMSemiBold>
      </a>
      <GrayBodyMMedium>and </GrayBodyMMedium>
      <a href="https://teamsinta.com/privacy-policy">
        <BodyMSemiBold>Privacy Policy</BodyMSemiBold>
      </a>
    </TextBox>
  );
};
export default Terms;
