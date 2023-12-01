import styled from "styled-components";
export const StyledBottomBar = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #2a2535;
  height: fit-content;
  bottom: 0;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const BottomBarColumnsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1120px) {
    flex-direction: column;
    row-gap: 5px;
  }
`;

export const FinishButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const StyledColumns = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 786px) {
    width: 100%;
  }
`;

export const StyledMiddleColumns = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 786px) {
    width: 100%;
  }
`;

export const StyledBottomNavButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #433c53;
  padding: 10px;
  color: white;
  width: fit-content;
  font-family: "Chillax";
  margin: 5px;
  border: none;
  height: 35px;
  font-size: 14px;
  cursor: pointer;
  position: relative;

  :hover {
    cursor: pointer;
    box-shadow: 0px 2px 0px black;
    transition: 0.5s;
  }
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const EmojiTray = styled.div`
  position: absolute;
  bottom: 40px;
  background-color: #383246;
  z-index: 1000;
  padding: 10px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px;
`;

export const StyledFinishBtn = styled.button`
  cursor: pointer;
  float: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 35px;
  gap: 10px;
  background: transparent;
  border: 0;
  position: relative;
  outline: 1px solid ${(props) => props.theme.colors.white};
  outline-offset: -1px;
  border-radius: 12px;
  box-shadow: 0px 2px 0px white;
  height: 35px;
  width: fit-content;
  margin-bottom: 5px;
  margin-top: 5px;
  ${(props) =>
    !props.disabled &&
    `
    :hover {
      cursor: pointer;
      box-shadow: 0px 4px 0px white;
      transition: 0.5s;
    }

    :active {
      box-shadow: 0px 0px 0px white;
      transform: translateY(4px);
    }


    `}

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.accentPurple {
    background: ${(props) => props.theme.colors.accentPurple};
    color: ${(props) => props.theme.colors.white};
    svg {
      width: 18px;
      height: 18px;
      stroke: ${(props) => props.theme.colors.white};
      display: flex;
      align-content: center;
    }
  }

  &.white {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    svg {
      width: 18px;
      height: 18px;
      stroke: ${(props) => props.theme.colors.black};
      display: flex;
      align-content: center;
    }
  }
`;
