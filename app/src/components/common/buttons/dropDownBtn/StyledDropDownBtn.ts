import styled, { css } from 'styled-components';

interface IDropdownOpen {
  open: boolean;
}

export const CustomButton = styled.div`
  background: ${(props) => props.theme.colors.whisperGrey};
  height: 40px;
  border: 0;
  outline: none;
  font-size: 12px;
  color: black;
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  position: relative;
  width: 100%;
  &.customQuestionButton {
    background: ${(props) => props.theme.colors.white};
    display: flex;
    justify: left;
    align-items: left;
    padding: 10px 16px;
    gap: 25;
  }

  svg {
    stroke: ${(props) => props.theme.colors.black} !important;
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
  &.customQuestionButton:hover {
    background: ${(props) => props.theme.colors.whisperGrey};
    border-radius: 8px;
  }
`;

export const ButtonWrap = styled.div`
  text-align: center;
  background: ${(props) => props.theme.colors.whisperGrey};
  border-radius: 0 0 8px 8px;
  transition: 0.5s;
  border: 1px solid black;
  width: 100%;
  padding-top: 18px;
  margin-top: 145px;
  padding-bottom: 8px;
  position: absolute;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.customDropDown {
    margin-top: 230px;
    border: none;
    border-radius: 8px;
    padding: 8px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0px 4px 32px -2px rgba(0, 0, 0, 0.25);
  }
`;
export const TransparentDropdownTitle = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  padding-left: 17px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c7c7c7;
  margin-bottom: 5px;
  color: rgba(32, 14, 50, 0.58);
  font-size: 13px;
`;

export const DropdownArrowIconDiv = styled.div<IDropdownOpen>`
  right: 16px;
  top: 0;
  display: flex;
  align-items: center;
  height: 40px;
  width: inherit;

  svg {
    stroke: ${(props) => props.theme.colors.black};
  }

  .right-bracket-icon {
    transition: transform 0.2s linear;
    svg {
      stroke: ${(props) => props.theme.colors.black};
    }

    ${(props) =>
      props.open
        ? css`
            transform: rotate(90deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;
