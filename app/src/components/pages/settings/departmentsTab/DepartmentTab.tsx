import ElWrap from '@/components/layouts/elWrap/ElWrap';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { AppDispatch } from '@/app/store';
import { openModal } from '@/features/modal/modalSlice';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import SortingDropdown from './SortingDropdown';
import { useState } from 'react';
import DepartmentList from './DepartmentList';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { selectDepartment } from '@/features/departments/departmentSlice';
import { CompanyId } from '@/types/company';
import { SortBy } from '@/types/common';
import { useFetchAndSetCompanyDepartments } from '@/hooks/useFetchCompanyDepartments';
import { DepartmentId } from '@/types/department';
import { useFetchCompanyMembers } from '@/hooks/useFetchCompanyMembers';

const DepartmentTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const departmentState = useSelector(selectDepartment);
  const allDepartments = departmentState.allDepartments;
  const [sortCriteria, setSortCritiera] = useState<SortBy>('');

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const { companyMembers } = useFetchCompanyMembers({
    company_id: companyId,
    sortCriteria: sortCriteria,
  });

  useFetchAndSetCompanyDepartments(companyId, sortCriteria);

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  const handleSortDepartments = (value: SortBy) => {
    setSortCritiera(value);
  };

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          style={{}}
        >
          <ElWrap w={120}>
            <SortingDropdown
              sortCriteria={sortCriteria}
              handleSortDepartments={handleSortDepartments}
            />
          </ElWrap>
        </Stack>
        <DepartmentList
          departments={allDepartments}
          onClick={onClickModalOpen}
        />
      </Stack>
      <ElWrap h={40} w={282}>
        <TextIconBtnL
          label="Add Department"
          icon={<PlusIcon />}
          disable={false}
          className={BackgroundColor.ACCENT_PURPLE}
          onClick={() => {
            onClickModalOpen(MODAL_TYPE.CREATE_DEP);
          }}
        />
      </ElWrap>
      <GlobalModal></GlobalModal>
    </>
  );
};

export default DepartmentTab;
