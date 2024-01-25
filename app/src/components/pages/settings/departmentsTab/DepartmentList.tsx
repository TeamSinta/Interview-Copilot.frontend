import { AppDispatch } from '@/app/store';
import SettingsDepartmentCard from '@/components/common/cards/settingsDepartmentCard/SettingsDepartmentCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import PaginationComponent from '@/components/common/pagination/PaginationComponent';
import { setCurrentDepartment } from '@/features/departments/departmentSlice';
import usePagination from '@/hooks/usePagination';
import { DepartmentListContainer } from '@/pages/Settings/StyledSettings';
import { IDepartment } from '@/types/department';
import { Stack } from '@mui/material';

import React from 'react';
import { useDispatch } from 'react-redux';

const DepartmentList: React.FC<{
  departments: IDepartment[];
  onClick: (modalType: MODAL_TYPE) => void;
}> = ({ departments, onClick }) => {
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
                  setCurrentDepartment({
                    id: department.id,
                    title: department.title,
                  })
                );
                onClick(MODAL_TYPE.SELECT_DEP);
              }}
            />
          ))}
        </Stack>
      </DepartmentListContainer>
    </>
  );
};

export default DepartmentList;
