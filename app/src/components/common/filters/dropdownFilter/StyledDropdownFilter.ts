import {
  BodySBold,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import { StatusDropdownFilter } from "@/features/utils/utilEnum";
import styled, { css } from "styled-components";

export enum DropdownLayoutType {
  FLEX = "FLEX",
  BLOCK = "BLOCK",
}

export interface IDropdownLayout {
  layoutType: DropdownLayoutType;
}

interface IDropdownOpen {
  open: boolean;
}

export const SelectedItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectedItemIcon = styled(BodySBold)`
  background: ${(props) => props.theme.colors.pastelPurple};
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
`;

export const DropdownArrowIconDiv = styled.div<IDropdownOpen>`
  right: 16px;
  top: 0;
  display: flex;
  align-items: center;
  height: 40px;

  svg {
    stroke: ${(props) => props.theme.colors.black};
  }

  ${(props) =>
    props.open
      ? css`
          svg {
            transform: rotate(-180deg);
            transition: all 0.2s linear;
          }
        `
      : css`
          svg {
            transform: rotate(0deg);
            transition: all 0.2s linear;
          }
        `}
`;

export const DropdownLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  width: 100%;
  :hover {
    border-radius: 12px;
  }
`;

export const DropdownWrap = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.colors.palePurple};
  border-radius: 12px;
  z-index: 1;

  &.hover {
    cursor: pointer;
    box-shadow: 0px 4px 0px ${(props) => props.theme.colors.palePurple};
    transition: 0.5s;
  }
`;

export const StatusDropdownLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  :hover {
    border-radius: 12px;
  }
`;

export const StatusDropdownWrap = styled(DropdownWrap)`
  position: relative;
  width: 100%;

  &.hover {
    cursor: pointer;
    box-shadow: 0px 4px 0px ${(props) => props.theme.colors.palePurple};
    transition: 0.5s;
    border-radius: 12px;
  }
`;

export const DropdownLabel = styled(BodySMedium)`
  display: flex;
  align-items: center;
`;

export const DropdownEl = styled.div<IDropdownOpen>`
  width: 100%;
  background: ${(props) => props.theme.colors.whisperGrey};
  border-radius: 12px;
  padding: 8px 16px;
  height: 40px;
  border: 0;
  font-size: 12px;

  ${(props) =>
    props.open
      ? css`
          outline: 1px solid ${(props) => props.theme.colors.palePurple};
        `
      : css`
          outline: none;
        `}

  div {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

interface IStatusDropdownEl {
  bg: StatusDropdownFilter | null;
}

export const StatusDropdownEl = styled(DropdownEl)<IStatusDropdownEl>`
  background: ${(props) =>
    props.bg === StatusDropdownFilter.WAITING
      ? "#FFFABF"
      : props.bg === StatusDropdownFilter.CLOSED
      ? "#FABBCF"
      : props.bg === StatusDropdownFilter.ACTIVE
      ? "#DBFDDC"
      : "#F6F6FB"};
`;

export const OptionLi = styled.li`
  opacity: 1;
  transform: translate(0, 0);
`;

export const OptionA = styled.a`
  cursor: pointer;
  display: block;
  padding: 8px 16px;
  font-size: 12px;
  text-decoration: none;
  outline: none;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const OptionUl = styled.ul<IDropdownOpen>`
  top: 0;
  padding: 12px 0;
  z-index: 2;
  ${(props) =>
    props.open
      ? css`
          top: 40px;
          padding: 12px 0;
          width: 100%;
          opacity: 1;
          visibility: visible;
          /* transition: opacity 0.3s ease, visibility 0.3s ease,
            transform 0.3s cubic-bezier(0.4, 0.6, 0.5, 1.32); */
          /* transition: 0.2s ease-in; */
          background: ${(props) => props.theme.colors.palePurple};
          border-radius: 6px;
          overflow-x: hidden;
          overflow-y: auto;
          transform-origin: 0 0;

          ${DropdownEl} {
            outline: 1px solid ${(props) => props.theme.colors.black};
            :hover {
              box-shadow: none;
              transition: 0.5s;
            }
          }
        `
      : css`
          margin: 0;
          padding: 0;
          list-style: none;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 42px;
          left: 0;
          z-index: 1;
          right: 0;
          border-radius: 6px;
          overflow-x: hidden;
          overflow-y: auto;
          transform-origin: 0 0;
          transition: opacity 0.2s ease, visibility 0.2s ease,
            transform 0.3s cubic-bezier(0.4, 0.6, 0.5, 1.32);
          /* transform: scale(0.8) translate(0, 4px); */
          ${OptionLi} {
            opacity: 0;
            transition: all 0.3s ease;

            ${OptionA} {
              opacity: 0;
              transition: all 0.1s ease;
            }
          }
        `}
`;
