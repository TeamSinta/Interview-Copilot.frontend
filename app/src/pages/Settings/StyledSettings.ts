import styled from "styled-components";

export const SettingsContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 32px;
  flex-direction: column;
`;

export const StyledImage = styled.img`
  width: 150px;
  height: 100%;
  min-width: 100px;
  border-radius: 16px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
    background-color: rgba(15, 13, 98, 0.5);
  }
`;

export const ProfilePictureContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 150px;

  &:hover::before {
    content: "Change Picture";
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(15, 13, 98, 0.5);
    color: #fff;
    border-radius: 16px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover input[type="file"] {
    opacity: 0.01;
    cursor: pointer;
  }

  &:hover::before,
  &:hover input[type="file"]:hover + .profile-picture {
    opacity: 1;
  }
`;

export const PageContainer = styled.div`
  background: white;
  display: flex;
  gap: 32px;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;

  @media (min-width: 1900px) {
    width: 75%;
    margin: 0 auto;
  }
`;

export const UserListContainer = styled.div`
  max-height: calc(100vh - 650px);
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.01rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const DeleteBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: var(--bg, #f6f6fb);
  display: flex;
  align-items: center;
  justify-content: center;
  .side {
    gap: 30px;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.devices.lg} {
      width: 100%;
    }
  }

  ${(props) => props.theme.devices.lg} {
    flex-wrap: wrap;
  }
`;

export const ChildElement = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
`;
