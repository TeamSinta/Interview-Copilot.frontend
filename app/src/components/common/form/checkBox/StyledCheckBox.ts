import styled from "styled-components";
import check from "@/assets/svg/checkS.svg";

export const CheckBoxWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CheckInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  outline: 1px solid ${(props) => props.theme.colors.black};
  outline-offset: -1px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:checked {
    border-color: transparent;
    background-image: url(${check});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.colors.accentPurple};
    transition: 0.2s ease-in-out;
  }

  :disabled {
    cursor: not-allowed;
  }
`;
