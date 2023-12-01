import styled, { css } from "styled-components";

interface IDropdownOpen {
  open: boolean;
}

export const CustomButton = styled.button`
  background: ${(props) => props.theme.colors.whisperGrey};
  height: 40px;
  border: 0;
  outline: none;
  font-size: 12px;
  transition: 0.5s;
  width: 100%;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }

  &:hover {
    cursor: pointer;
    border-radius: 0 0 0px 0px;
    background: ${(props) => props.theme.colors.palePurple};
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform: none;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

export const ButtonWrap = styled.div`
  text-align: center;
  background: ${(props) => props.theme.colors.whisperGrey};
  border-radius: 0 0 12px 12px;
  border: 1px solid black;

  padding-top: 18px;
  margin-top: -10px;
  padding-bottom: 8px;
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
            transform: rotate(90deg);
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
