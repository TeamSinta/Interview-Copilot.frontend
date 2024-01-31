import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { AppDispatch, RootState } from '@/app/store';
import { resetCurrentDepartment } from '@/features/departments/departmentSlice';
import SearchInput from '../../form/serchInput/SearchInput';
import { DepartmentId } from '@/types/department';
import { MemberListContainer } from '@/pages/Settings/StyledSettings';
import Stack from '@mui/material/Stack';
import { IOption } from '@/types/common';
import EditDepartmentMembersCard from '../../cards/editDepartmentMembersCard/editDepartmentMembersCard';
import { useEffect, useState } from 'react';
import MembersFilterDropdown from '../../dropDown/MembersFilterDropdown';
import { selectedMember } from '@/features/company/companySlice';
import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import { useGetDepartmentMembersQuery } from '@/features/departments/departmentsAPI';

const textBtnArg = {
  label: 'Close',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const EditDepartmentMembers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspace = useSelector((state: RootState) => state.workspace);
  const currentDepartment = useSelector(
    (state: RootState) => state.department.currentDepartment
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
  const membersToShow = departmentId ? departmentMembers : companyMembers;

  const [filteredMembers, setFilteredMembers] = useState(membersToShow);

  const handleCancelClick = () => {
    dispatch(closeModal());
    dispatch(resetCurrentDepartment());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length > 1) {
      setSearchTerm(inputValue);
    } else {
      setSearchTerm('');
    }
  };

  const memberDropdownOptions: IOption[] = [
    { name: 'All Company Members', value: '' },
    { name: currentDepartment.title, value: currentDepartment.id },
  ];

  const handleDepartmentChange = (selectedOption: DepartmentId) => {
    setDepartmentId(selectedOption);
  };

  const onMemberSelected = (memberIdx: string) => {
    dispatch(selectedMember({ memberIdx }));
  };

  const selectedMemberIds = filteredMembers
    .filter((member) => member.selected)
    .map((member) => member.id);

  useEffect(() => {
    let filteredMembers = membersToShow;

    if (searchTerm) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filteredMembers);
  }, [searchTerm, membersToShow]);

  return (
    <ModalContentWrap>
      <SearchInput
        disable={false}
        onChange={handleSearchChange}
        placeholder={'Search by email or name'}
        error={false}
      />
      <MembersFilterDropdown
        departments={memberDropdownOptions}
        handleSetDepartment={handleDepartmentChange}
        workspaceId={workspace.id}
      />
      <MemberListContainer>
        <Stack direction="column" spacing={0.5}>
          {filteredMembers.map((member) => (
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
      <TextBtnL {...textBtnArg} onClick={handleCancelClick} />
    </ModalContentWrap>
  );
};

export default EditDepartmentMembers;
