import styled from 'styled-components';
import check from '@/assets/svg/checkS.svg';
import { BodyLMedium } from '../../typeScale/StyledTypeScale';

export const DepartmentListLayout = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 5px;
`;
export const LabelDiv = styled(BodyLMedium)`
  font-size: 14px;
  width: 80%;
  height: 48px;
  padding: 9px 21px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightPurple};

  :active {
    background: #eaeaf4;
  }

  &.selected {
    background: ${(props) => props.theme.colors.palePurple};
    outline-offset: -1px;
  }
`;

export const divWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DepartmentList = styled.div`
  display: flex;
  align-self: center;
  svg {
    width: 18px;
    height: 18px;
    stroke: ${(props) => props.theme.colors.black};
  }
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
