import styled from "styled-components";

export const MemberInformationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const MemberDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const ProfilePicture = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 12px;
  background-color: gray;
`;

export const DeleteBox = styled.div`
  margin-top: 16px;
  border-radius: 16px;
  background: var(--bg, #f6f6fb);
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MemberActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
