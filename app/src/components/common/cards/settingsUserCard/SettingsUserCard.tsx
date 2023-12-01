import React from "react";
import { MoreVertIcon } from "../../svgIcons/Icons";
import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import {
  UserCardContainer,
  EditButton2,
  ProfilePicture,
  UserDetails,
  PermissionLevel,
} from "./StyledUserCard"; // Adjust the import path to match your file structure
import {
  BodyMMedium,
  BodyLMedium,
  BodySMedium,
} from "../../typeScale/StyledTypeScale";

interface UserCardProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role: string;
    profile_picture: string | null;
  };
  onClick: (user: any) => void;
}

const SettingsUserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <UserCardContainer onClick={() => onClick(user)}>
      <Stack direction="row" gap="16px" sx={{ width: "316px" }}>
        <ProfilePicture
          alt={`${user.username}'s Photo`}
          src={user.profile_picture || ""}
        />

        <UserDetails>
          <BodyLMedium>
            {user.first_name} {user.last_name}
          </BodyLMedium>
          <BodyMMedium style={{ opacity: 0.5 }}>{user.email}</BodyMMedium>
        </UserDetails>
      </Stack>
      <PermissionLevel>
        <div
          style={{
            background: "white",
            borderRadius: "11px",
            border: "1.5px #121212 solid",
            padding: "7px 21px",
          }}
        >
          <BodySMedium>{user.role}</BodySMedium>
        </div>
      </PermissionLevel>

      <EditButton2>
        <Tooltip title="Edit">
          <IconButton
            component="div"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              padding: "8.5px 0px",
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </EditButton2>
    </UserCardContainer>
  );
};

export default SettingsUserCard;
