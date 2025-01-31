import { RootState } from '@/store';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoImage } from '../../topnavbar/StyledTopBarNav';

const ProfileCardContainer = styled('div')({
  backgroundColor: `rgba(125, 136, 233, 0.17)`,
  borderRadius: `10px`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: `103%`,
  height: `79px`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
});

const FrameContainer = styled('div')({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  left: `16px`,
  top: `40px`, // Adjust this value as needed
  height: `2px`,
});

const EmailText = styled('div')({
  textAlign: `left`,
  whiteSpace: `nowrap`, // Keep text on one line
  overflow: `hidden`, // Hide overflow
  textOverflow: `ellipsis`,
  fontSynthesis: `none`,
  color: `rgba(18, 18, 18, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `500`,
  fontSize: `10px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `150%`,
  textTransform: `none`,
  position: `absolute`,
  left: `70px`,
  top: `44px`, // Adjust this value as needed
  width: `125px`, // Limit the width of the container
});

const NameText = styled('div')({
  textAlign: `left`,
  whiteSpace: `nowrap`, // Keep text on one line
  overflow: `hidden`, // Hide overflow
  textOverflow: `ellipsis`,
  fontSynthesis: `none`,
  color: `rgba(18, 18, 18, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `600`,
  fontSize: `12px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `150%`,
  textTransform: `none`,
  position: `absolute`,
  left: `70px`,
  top: `22px`,
  width: `130px`, // Adjust this value as needed
});

function ProfileCard() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <ProfileCardContainer>
      <Link to="/settings">
        <FrameContainer>
          <LogoImage src={user.profile_picture as string} alt="user photo" />
        </FrameContainer>
        <EmailText>{`${user.email}`}</EmailText>
        <NameText>{`${user.first_name} ${user.last_name ?? ''}`}</NameText>
      </Link>
    </ProfileCardContainer>
  );
}

export default ProfileCard;
