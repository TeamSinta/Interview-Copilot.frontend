import styled, { keyframes } from "styled-components";

export const ModalHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CloseDiv = styled.div`
  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 24px;
    height: 24px;
  }

  :hover {
    cursor: pointer;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalLayout = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${(props) => props.theme.colors.purpleGrey};
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

export const ModalContainer = styled.div`
  padding: 30px;
  width: 480px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.colors.white};
  display: flex;
  gap: 24px;
  flex-direction: column;
  z-index: 999;
  position: relative;
`;

export const ModalContainerL = styled(ModalContainer)`
  width: 1140px;
  height: 715px;
  gap: 30px;
  flex-direction: row;
`;
