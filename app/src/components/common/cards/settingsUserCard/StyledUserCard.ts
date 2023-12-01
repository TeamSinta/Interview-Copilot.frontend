import styled from "styled-components";

export const UserCardContainer = styled.div`
  width: 100%;
  height: 72px;
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

export const ProfilePicture = styled.img`
  margin-left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: gray;
`;

export const UserDetails = styled.div`
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
