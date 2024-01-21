import styled from 'styled-components';

export const DepartmentCardContainer = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  background: #f6f6fb;
  transition: background-color 0.5s ease; /* Increase the duration of the transition for a slower effect */

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.palePurple};
  }
`;


export const DepartmentDetails = styled.div`
  margin-left: 16px;
  flex-direction: column;
`;

export const PermissionLevel = styled.div`
  justify-content: flex-start;
  gap: 8px;
`;

export const EditButton2 = styled.div`
  margin-right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
`;
