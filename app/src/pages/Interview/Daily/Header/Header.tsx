import React from "react";
import SintaLogo from "src/assets/svg/Sinta_call_logo.svg";
import { HeaderContainer, HeaderSection, StyledImage } from "./StyledHeader";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderSection>
        <StyledImage src={SintaLogo} alt="Sinta_Logo" />
      </HeaderSection>
    </HeaderContainer>
  );
}
