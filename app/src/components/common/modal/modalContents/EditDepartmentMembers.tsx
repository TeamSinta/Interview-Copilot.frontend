import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { BinIcon } from '../../svgIcons/Icons';
import { AppDispatch, RootState } from '@/app/store';
import { resetCurrentDepartment } from '@/features/departments/departmentSlice';
import SearchInput from '../../form/serchInput/SearchInput';
import { DepartmentId } from '@/types/department';
import { UserListContainer } from '@/pages/Settings/StyledSettings';
import Stack from '@mui/material/Stack';
import { setMemberInfo } from '@/features/members/memberSlice';
import { IOption } from '@/types/common';
import EditDepartmentMembersCard from '../../cards/editDepartmentMembersCard/editDepartmentMembersCard';
import { useEffect, useState } from 'react';
import MembersFilterDropdown from '../../dropDown/MembersFilterDropdown';
import { useFetchCompanyMembers } from '@/hooks/useFetchCompanyMembers';

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
  const allCompanyMembers = useSelector(
    (state: RootState) => state.company.members
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentId, setDepartmentId] = useState<DepartmentId>('');
  const [filteredMembers, setFilteredMembers] = useState(allCompanyMembers);

  const { companyMembers } = useFetchCompanyMembers({
    company_id: workspace.id,
    department_id: departmentId,
    sortCriteria: '',
  });

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
    { name: 'All', value: '' },
    { name: currentDepartment.title, value: currentDepartment.id },
  ];

  const handleDepartmentChange = (selectedOption: DepartmentId) => {
    setDepartmentId(selectedOption);
  };

  useEffect(() => {
    let filteredMembers = companyMembers;

    if (searchTerm) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filteredMembers);
  }, [searchTerm, companyMembers]);

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
      <UserListContainer>
        <Stack direction="column" spacing={0.5}>
          {filteredMembers.map((member) => (
            <EditDepartmentMembersCard
              key={member.id}
              user={member}
              onClick={() => {
                dispatch(
                  setMemberInfo({
                    id: member.id,
                    firstName: member.first_name,
                    lastName: member.last_name,
                    email: member.email,
                    pictureUrl: member.profile_picture,
                  })
                );
              }}
            />
          ))}
        </Stack>
      </UserListContainer>
      <TextBtnL {...textBtnArg} onClick={handleCancelClick} />
    </ModalContentWrap>
  );
};

export default EditDepartmentMembers;
