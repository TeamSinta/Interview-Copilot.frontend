import React from "react";
import Ellipse297Image from "src/assets/images/SintaLogo.png";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { LogoImage } from "../../topnavbar/StyledTopBarNav";

const ProfileCardContainer = styled("div")({
  backgroundColor: `rgba(125, 136, 233, 0.17)`,
  borderRadius: `10px`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: `212px`,
  height: `79px`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
});

const FrameContainer = styled("div")({
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
  width: `2px`,
});

const EmailText = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(18, 18, 18, 1)`,
  fontStyle: `normal`,
  fontFamily: `Chillax`,
  fontWeight: `500`,
  fontSize: `10px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `150%`,
  textTransform: `none`,
  position: `absolute`,
  left: `70px`,
  top: `44px`, // Adjust this value as needed
});

const NameText = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(18, 18, 18, 1)`,
  fontStyle: `normal`,
  fontFamily: `Chillax`,
  fontWeight: `600`,
  fontSize: `12px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `150%`,
  textTransform: `none`,
  position: `absolute`,
  left: `70px`,
  top: `22px`, // Adjust this value as needed
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
        <NameText>{`${user.first_name} ${user.last_name}`}</NameText>
      </Link>
    </ProfileCardContainer>
  );
}

export default ProfileCard;
