import React from 'react';
import { MoreVertIcon } from '../../svgIcons/Icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import {
  MemberCardContainer,
  EditButton2,
  ProfilePicture,
  MemberDetails,
  PermissionLevel,
} from './StyledMemberCard'; // Adjust the import path to match your file structure
import {
  BodyMMedium,
  BodyLMedium,
  BodySMedium,
} from '../../typeScale/StyledTypeScale';

interface MemberCardProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    profilePicture: string | null;
  };
  onClick: (user: any) => void;
}

const SettingsMemberCard: React.FC<MemberCardProps> = ({ user, onClick }) => {
  return (
    <MemberCardContainer onClick={() => onClick(user)}>
      <Stack direction="row" gap="16px" sx={{ width: '316px' }}>
        <ProfilePicture
          alt={`${user.username}'s Photo`}
          src={user.profilePicture || ''}
        />

        <MemberDetails>
          <BodyLMedium>
            {user.firstName} {user.lastName}
          </BodyLMedium>
          <BodyMMedium style={{ opacity: 0.5 }}>{user.email}</BodyMMedium>
        </MemberDetails>
      </Stack>
      <PermissionLevel>
        <div
          style={{
            background: 'white',
            borderRadius: '11px',
            border: '1.5px #121212 solid',
            padding: '7px 21px',
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
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              padding: '8.5px 0px',
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </EditButton2>
    </MemberCardContainer>
  );
};

export default SettingsMemberCard;
