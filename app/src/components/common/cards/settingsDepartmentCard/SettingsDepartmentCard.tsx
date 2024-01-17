import React from 'react';
import { MoreVertIcon } from '../../svgIcons/Icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { TruncateText } from '@/utils/Utils';

import {
  DepartmentCardContainer,
  EditButton2,
  DepartmentDetails,
  PermissionLevel,
} from './StyledDepartmentCard'; // Adjust the import path to match your file structure
import { BodyLMedium } from '../../typeScale/StyledTypeScale';

interface DepartmentCardProps {
  department: {
    id: number;
    name: string;
  };
  onClick: (department: any) => void;
}

const SettingsDepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  onClick,
}) => {
  return (
    <DepartmentCardContainer onClick={() => onClick(department)}>
      <Stack direction="row" gap="16px" sx={{ width: '316px' }}>
        <DepartmentDetails>
          <BodyLMedium>{TruncateText(department.name, 40)}</BodyLMedium>
        </DepartmentDetails>
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
          Dep. Role
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
    </DepartmentCardContainer>
  );
};

export default SettingsDepartmentCard;
