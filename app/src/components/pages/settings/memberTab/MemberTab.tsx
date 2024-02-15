import ElWrap from '@/components/layouts/elWrap/ElWrap';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { AppDispatch } from '@/app/store';
import { openModal } from '@/features/modal/modalSlice';
import Stack from '@mui/material/Stack';
import StyledInvitationBox from '@/components/common/form/inviteBox/InviteBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import MemberList from './MemberList';
import SortingDropdown from './SortingDropdown';
import { useFetchCompanyDepartments } from './useFetchAndSortMembers';
import { useState } from 'react';
import DepartmentDropDown from '@/components/common/dropDown/DepartmentDropdown';
import { SortBy } from '@/types/common';
import { CompanyId } from '@/types/company';
import { DepartmentId } from '@/types/department';
import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import { useGetDepartmentMembersQuery } from '@/features/departments/departmentsAPI';

const MemberTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria, setSortCritiera] = useState<SortBy>('');
  const [departmentId, setDepartmentId] = useState<DepartmentId>('');

  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const { data: companyMembers } = useGetCompanyMembersQuery({
    company_id: companyId,
    sort_by: sortCriteria,
  });

  const { data: departmentMembers } = useGetDepartmentMembersQuery({
    department_id: departmentId,
    sort_by: sortCriteria,
  });

  const membersToShow = departmentId ? departmentMembers : companyMembers;

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  const handleSortMembers = (value: SortBy) => {
    setSortCritiera(value);
  };

  const departments = useFetchCompanyDepartments(companyId, sortCriteria);

  const handleSetDepartment = (value: DepartmentId) => {
    setDepartmentId(value);
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
          <ElWrap w={270}>
            <DepartmentDropDown
              departments={departments}
              handleSetDepartment={handleSetDepartment}
              workspaceId={workspace.id}
            />
          </ElWrap>
          <ElWrap w={120}>
            <SortingDropdown
              sortCriteria={sortCriteria}
              handleSortMembers={handleSortMembers}
            />
          </ElWrap>
        </Stack>
        <MemberList
          members={membersToShow}
          onClickModalOpen={onClickModalOpen}
        />
      </Stack>
      <StyledInvitationBox />
      <GlobalModal></GlobalModal>
    </>
  );
};

export default MemberTab;
