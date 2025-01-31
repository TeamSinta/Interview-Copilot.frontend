import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { AppDispatch, RootState } from '@/store';
import { resetCurrentDepartment } from '@/features/authentication/authenticationSlice';
import SearchInput from '../../form/serchInput/SearchInput';
import { DepartmentId } from '@/types/department';
import { MemberListContainer } from '@/pages/Settings/StyledSettings';
import Stack from '@mui/material/Stack';
import { IOption } from '@/types/common';
import EditDepartmentMembersCard from '../../cards/editDepartmentMembersCard/editDepartmentMembersCard';
import { useMemo, useState } from 'react';
import MembersFilterDropdown from '../../dropDown/MembersFilterDropdown';
import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import {
  useAddDepartmentMembersMutation,
  useGetDepartmentMembersQuery,
} from '@/features/departments/departmentsAPI';
import {
  resetMemberSelection,
  selectCurrentMembers,
  toggleMemberSelected,
} from '@/features/members/memberSlice';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { Box } from '@mui/material';
import { BodyMMedium, BodySMedium } from '../../typeScale/StyledTypeScale';

const txtBtnCloseArg = {
  label: 'Close',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const textBtnAddArg = {
  label: 'Add Members',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

export interface IMemberId {
  id: [];
}

const EditDepartmentMembers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspace = useSelector((state: RootState) => state.workspace);
  const currentMembers = useSelector(selectCurrentMembers);
  const [addDepartmentMembers] = useAddDepartmentMembersMutation();
  const currentDepartment = useSelector(
    (state: RootState) => state.user.currentDepartment
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentId, setDepartmentId] = useState<DepartmentId>(
    currentDepartment.id
  );

  const { data: companyMembers } = useGetCompanyMembersQuery({
    company_id: workspace.id,
    sort_by: '',
  });

  const { data: departmentMembers } = useGetDepartmentMembersQuery({
    department_id: departmentId,
    sort_by: '',
  });

  const combinedMembers = useMemo(() => {
    const members = departmentId ? departmentMembers : companyMembers;
    return (
      members?.map((member) => ({
        ...member,
        selected: currentMembers.some((m) => m.id === member.id && m.selected),
      })) || []
    );
  }, [departmentMembers, companyMembers, currentMembers, departmentId]);

  const handleCancelClick = () => {
    dispatch(closeModal());
    dispatch(resetCurrentDepartment());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const memberDropdownOptions: IOption[] = [
    { name: 'All Company Members', value: '' },
    { name: currentDepartment.title, value: currentDepartment.id },
  ];

  const handleDepartmentChange = (selectedOption: DepartmentId) => {
    setDepartmentId(selectedOption);
  };

  const onMemberSelected = (memberId: string) => {
    dispatch(toggleMemberSelected(memberId));
  };

  const handleAddSelectedMembers = async () => {
    const selectedMembersIds = currentMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    try {
      await addDepartmentMembers({
        invitees: selectedMembersIds,
        department_id: currentDepartment.id,
      }).unwrap();
      dispatch(resetMemberSelection());
      setSearchTerm('');
      setDepartmentId(currentDepartment.id);
    } catch (error: any) {
      console.log('Error inviting members', error);
    }
  };

  const filteredMembers = useMemo(() => {
    return combinedMembers.filter(
      (member) =>
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, combinedMembers]);

  return (
    <ModalContentWrap>
      <BodySMedium>
        Manage who is a member of {currentDepartment.title}
      </BodySMedium>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          padding: '2px ',
          display: 'flex',
        }}
      ></Box>
      <Stack direction={'row'} gap={1.5}>
        <Box sx={{ width: '100%' }}>
          <SearchInput
            disable={false}
            onChange={handleSearchChange}
            placeholder={'Search by email or name'}
            value={searchTerm}
            error={false}
          />
        </Box>
        <ElWrap w={160}>
          <TextBtnL {...textBtnAddArg} onClick={handleAddSelectedMembers} />
        </ElWrap>
      </Stack>
      <MembersFilterDropdown
        departments={memberDropdownOptions}
        handleSetDepartment={handleDepartmentChange}
        workspaceId={workspace.id}
      />
      <MemberListContainer>
        <Box sx={{ marginBottom: '8px' }}>
          <BodySMedium>{filteredMembers.length} Members</BodySMedium>
        </Box>
        <Stack direction="column" gap={0.5}>
          {filteredMembers?.map((member) => (
            <EditDepartmentMembersCard
              onSelect={() => onMemberSelected(member.id)}
              key={member.id}
              user={member}
              onClick={() => {}}
              selected={member.selected}
            />
          ))}
        </Stack>
      </MemberListContainer>
      <TextBtnL {...txtBtnCloseArg} onClick={handleCancelClick} />
    </ModalContentWrap>
  );
};

export default EditDepartmentMembers;
