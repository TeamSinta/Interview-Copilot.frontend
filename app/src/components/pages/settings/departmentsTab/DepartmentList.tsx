import { AppDispatch } from '@/app/store';
import SettingsDepartmentCard from '@/components/common/cards/settingsDepartmentCard/SettingsDepartmentCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import PaginationComponent from '@/components/common/pagination/pagination';
import { setDepartmentInfo } from '@/features/departments/departmentSlice';
import { DepartmentsList } from '@/features/settingsDetail/userSettingsInterface';
import usePagination from '@/hooks/usePagination';
import { DepartmentListContainer } from '@/pages/Settings/StyledSettings';
import { Stack } from '@mui/material';

import React from 'react';
import { useDispatch } from 'react-redux';

const DepartmentList: React.FC<{
  departments: DepartmentsList[];
  onClickModalOpen: (modalType: MODAL_TYPE) => void;
}> = ({ departments, onClickModalOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ITEMS_PER_PAGE = 10;
  const {
    currentPageItems: currentDepartments,
    handlePageChange,
    currentPage,
    pageCount,
  } = usePagination(departments, ITEMS_PER_PAGE);

  return (
    <>
      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <DepartmentListContainer>
        <Stack direction="column" spacing={1}>
          {currentDepartments.map((department) => (
            <SettingsDepartmentCard
              key={department.id}
              department={department}
              onClick={() => {
                dispatch(
                  setDepartmentInfo({
                    id: department.id,
                    title: department.name,
                  })
                );
                onClickModalOpen(MODAL_TYPE.DEPARTMENT_SET);
              }}
            />
          ))}
        </Stack>
      </DepartmentListContainer>
    </>
  );
};

export default DepartmentList;
