// import { AppDispatch } from '@/app/store';
import SettingsDepartmentCard from '@/components/common/cards/settingsDepartmentCard/SettingsDepartmentCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
// import { setMemberInfo } from '@/features/members/memberSlice';
import { DepartmentsList } from '@/features/settingsDetail/userSettingsInterface';
import { DepartmentListContainer } from '@/pages/Settings/StyledSettings';
import { Stack } from '@mui/material';

import React from 'react';
// import { useDispatch } from 'react-redux';

const DepartmentList: React.FC<{
  departments: DepartmentsList[];
  onClickModalOpen: (modalType: MODAL_TYPE) => void;
}> = ({ departments, onClickModalOpen }) => {
  // const dispatch = useDispatch<AppDispatch>();
  return (
    <DepartmentListContainer>
      <Stack direction="column" spacing={1}>
        {departments.map((department) => (
          <SettingsDepartmentCard
            key={department.id}
            department={department}
            onClick={() => {
              onClickModalOpen(MODAL_TYPE.DEPARTMENT_SET);
            }}
          />
        ))}
      </Stack>
    </DepartmentListContainer>
  );
};

export default DepartmentList;
