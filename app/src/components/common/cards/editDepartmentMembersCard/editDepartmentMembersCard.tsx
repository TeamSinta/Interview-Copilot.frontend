import React from 'react';
import { MoreVertIcon } from '../../svgIcons/Icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import {
  MemberCardContainer,
  EditButton2,
  ProfilePicture,
  UserDetails,
  PermissionLevel,
} from './StyledEditDepartmentMembersCard'; // Adjust the import path to match your file structure
import { BodyMMedium, BodySMedium } from '../../typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { TruncateText } from '@/utils/Utils';

interface UserCardProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role: string;
    profile_picture: string | null;
  };
  onClick: (user: any) => void;
}

const editDepartmentMembersCard: React.FC<UserCardProps> = ({
  user,
  onClick,
}) => {
  return (
    <MemberCardContainer onClick={() => onClick(user)}>
      <Stack
        direction="row"
        alignItems={'center'}
        gap="8px"
        sx={{ width: '312px' }}
      >
        <ProfilePicture
          alt={`${user.username}'s Photo`}
          src={user.profile_picture || ''}
        />
        <ElWrap w={200}>
          <UserDetails>
            <BodyMMedium>
              {TruncateText(user.first_name + ' ' + user.last_name, 25)}
            </BodyMMedium>
            <BodySMedium style={{ opacity: 0.5 }}>
              {TruncateText(user.email, 25)}
            </BodySMedium>
          </UserDetails>
        </ElWrap>
      </Stack>
      <PermissionLevel>
        <div
          style={{
            background: 'white',
            borderRadius: '11px',
            border: '1.5px #121212 solid',
            padding: '4px 10px',
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

export default editDepartmentMembersCard;
