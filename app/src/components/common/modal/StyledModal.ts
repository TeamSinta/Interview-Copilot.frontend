import styled, { keyframes } from 'styled-components';

export const ModalHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalHeaderIconWrap = styled.div`
  display: flex;
  height: 22px;
  margin-top: 5px;
  gap: 8px;
`;
export const ArrowDiv = styled.div`
  svg {
    stroke: ${(props) => props.theme.colors.black};
    width: 24px;
    height: 20px;
  }
  :hover {
    cursor: pointer;
  }
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

export const ModalContainerM = styled(ModalContainer)`
  width: 784px;
  height: 715px;
  gap: 30px;
  flex-direction: row;
`;

export const ModalContainerL = styled(ModalContainer)`
  width: 1140px;
  height: 715px;
  gap: 30px;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  width: 44.46px;
  height: 19.38px;
  position: relative;
  background: white;
  box-shadow: 0px 2.280125141143799px 0px #121212;
  border-radius: 6.84px;
  border: 1.14px #121212 solid;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 3px;
`;

export const IconWithText = styled.div`
  color: var(--Black-main, #121212);
  font-family: Inter;
  font-size: 8.606px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  padding-top: 2px;
`;

export const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  stroke-width: 1.354px;
  stroke: var(--Black-main, #121212);
  margin: 8px 11px 0px;
`;
