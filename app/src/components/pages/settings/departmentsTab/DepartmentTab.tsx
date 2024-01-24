import ElWrap from '@/components/layouts/elWrap/ElWrap';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { AppDispatch } from '@/app/store';
import { openModal } from '@/features/modal/modalSlice';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
// import MemberList from './DepartmentList';
import SortingDropdown from './SortingDropdown';
import { useEffect, useState } from 'react';
import DepartmentList from './DepartmentList';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useGetCompanyDepartmentsQuery } from '@/features/departments/departmentsAPI';
import {
  setAllDepartments,
  selectDepartment,
} from '@/features/departments/departmentSlice';
import { setCompany, setMembers } from '@/features/company/companySlice';
import {
  useGetCompanyMembersQuery,
  useGetCompanyQuery,
} from '@/features/company/companyAPI';
import { CompanyId } from '@/types/company';
import { SortBy } from '@/types/common';

const DepartmentTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const departmentState = useSelector(selectDepartment);
  const allDepartments = departmentState.allDepartments;
  const [sortCriteria, setSortCritiera] = useState('');
  const [departmentId, ,] = useState('');

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  /// testing

  // const { data: companyData } = useGetCompanyQuery(companyId);
  const { data: companyMembers } = useGetCompanyMembersQuery({
    company_id: companyId,
    department_id: departmentId,
    sort_by: null,
  });

  //// testing

  const handleSortDepartments = (value: SortBy) => {
    setSortCritiera(value);
  };

  const {
    data: departmentsData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCompanyDepartmentsQuery({
    company_id: companyId,
    sort_by: sortCriteria,
  });

  // const { data: company } = useGetCompanyQuery(companyId);

  useEffect(() => {
    if (isSuccess && departmentsData) {
      dispatch(setAllDepartments(departmentsData));
      if (companyMembers) {
        dispatch(setMembers(companyMembers));
      }
    }
  }, [isSuccess, dispatch, companyMembers, departmentsData, sortCriteria]);

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
