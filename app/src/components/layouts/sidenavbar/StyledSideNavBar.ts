import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

export const StyledStack = styled(Stack)`
  background-color: #ebeef2;
  min-height: 100vh;
  height: 100% !important;
  width: 240px;
  left: 0px;
  top: 0px;
  padding-left: 12px;
  padding-right: 16px;
  grid-area: side;
  position: -webkit-fixed; /* For Safari */
  position: fixed;
  overflow-y: auto;
  border-right: 1px solid #ccc;
`;

export const LogoImage = styled.img`
  width: 96px;
  height: 38px;
`;

export const NavButton = styled(Stack)`
  height: 38px;
  color: ${(props) => props.theme.colors.black};
  gap: 8px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;

  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 18px;
    height: 18px;
  }

  &:hover {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform: none;
    flex: none;
    order: 0;
    flex-grow: 0;
    /* border: 1px solid ${(props) => props.theme.colors.black}; */
  }

  &.active {
    border: 1px solid #3e63dd;
    /* border: 1.2px solid ${(props) => props.theme.colors.black}; */
    color: black;
  }

  .link {
    width: 100%;
    height: 100;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    gap: 8px;
    padding-left: 8px;
  }
`;

export const NavButtonDiscord = styled(Stack)`
  height: 38px;
  width: 222px;
  color: ${(props) => props.theme.colors.black};
  gap: 8px;
  border-radius: 6px;
  align-items: flex-start;
  justify-content: center;

  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 18px;
    height: 18px;
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
    padding-left: 8px;
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

export const StyledSideNavBarTitle = styled(BodySMedium)`
  color: '#7B7B7E';
  padding-left: 2px;
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

export const DropdownWrapButton = styled(Button)`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.colors.palePurple};
  border-radius: 12px;
  z-index: 1;
  color: ${(props) => props.theme.colors.palePurple};
  &.hover {
    cursor: pointer;
    box-shadow: 0px 4px 0px ${(props) => props.theme.colors.palePurple};
    transition: 0.5s;
  }
`;
