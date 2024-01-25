import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import {
  BodyMMedium,
  BodyMSemiBold,
} from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { BinIcon } from '../../svgIcons/Icons';
import { useDeleteDepartmentMutation } from '@/features/departments/departmentsAPI';
import { AppDispatch, RootState } from '@/app/store';
import { resetCurrentDepartment } from '@/features/departments/departmentSlice';
import SearchInput from '../../form/serchInput/SearchInput';
import DropdownFilter from '../../filters/dropdownFilter/DropdownFilter';
import { DepartmentsList } from '@/types/department';
import DepartmentDropDown from '../../dropDown/DepartmentDropdown';
import { UserListContainer } from '@/pages/Settings/StyledSettings';
import Stack from '@mui/material/Stack';
import SettingsUserCard from '../../cards/settingsUserCard/SettingsUserCard';
import { setMemberInfo } from '@/features/members/memberSlice';
import { IOption } from '@/types/common';
import EditDepartmentMembersCard from '../../cards/editDepartmentMembersCard/editDepartmentMembersCard';

const textBtnArg = {
  label: 'Close',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const EditDepartmentMembers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentDepartment = useSelector(
    (state: RootState) => state.department.currentDepartment
  );
  const workspace = useSelector((state: RootState) => state.workspace);
  const allCompanyMembers = useSelector(
    (state: RootState) => state.company.members
  );

  const allDepartments = useSelector(
    (state: RootState) => state.department.allDepartments
  );

  const handleCancelClick = () => {
    dispatch(closeModal());
    dispatch(resetCurrentDepartment());
  };

  const transformedDepartments: IOption[] = allDepartments.map(
    (department) => ({
      name: department.title,
      value: department.id,
    })
  );

  const handleSetDepartment = () => {};
  // filter from selected department
  // fetch all members of company

  return (
    <ModalContentWrap>
      <SearchInput
        disable={false}
        placeholder={'Search by email or name'}
        error={false}
      />
      <DepartmentDropDown
        departments={transformedDepartments}
        handleSetDepartment={handleSetDepartment}
        workspaceId={workspace.id}
      />
      <UserListContainer>
        <Stack direction="column" spacing={0.5}>
          {allCompanyMembers.map((member) => (
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
