import Stack from "@mui/material/Stack";
import styled from "styled-components";

export const StyledStack = styled(Stack)`
  background-color: ${(props) => props.theme.colors.whisperGrey};
  min-height: 100vh;
  height: 100% !important;
  width: 240px;
  left: 0px;
  top: 0px;
  padding-left: 8px;
  padding-right: 16px;
  grid-area: side;
  position: -webkit-fixed; /* For Safari */
  position: fixed;
  overflow-y: auto;
`;

export const LogoImage = styled.img`
  width: 96px;
  height: 38px;
`;

export const NavButton = styled(Stack)`
  height: 44px;
  width: 220px;
  color: ${(props) => props.theme.colors.black};
  gap: 8px;
  border-radius: 8px;
  align-items: center;

  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${(props) => props.theme.colors.palePurple};
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform: none;
    flex: none;
    order: 0;
    flex-grow: 0;
    /* border: 1px solid ${(props) => props.theme.colors.black}; */
  }

  &.active {
    background: ${(props) => props.theme.colors.palePurple};
    /* border: 1.2px solid ${(props) => props.theme.colors.black}; */
    color: #625df4;
  }

  .link {
    width: 100%;
    height: 100;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    gap: 8px;
    padding-left: 16px;
  }
`;

export const DropWrapper = styled(Stack)`
  height: auto !important;
  width: 220px;
  display: flex;
  justify-content: flex-start;
`;

export const StyledLink = styled.link`
  width: 100%;
  height: 100;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const StyledSideNavBarTitle = styled.p`
  color: "#7B7B7E";
  padding-left: 16px;
  margin-bottom: 4px;
`;

export const StyledSideNavLinksWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`;

export const Spacer = styled.div`
  flex-grow: 0.9; // Takes up all available space
  padding-bottom: -8px;
`;
