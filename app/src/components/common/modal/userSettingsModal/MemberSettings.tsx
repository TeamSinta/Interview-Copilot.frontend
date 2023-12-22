import React, { useEffect, useState } from 'react';
import { instance } from '@/utils/axiosService/customAxios';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { TextIconBtnL } from '../../buttons/textIconBtn/TextIconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
  DeleteBox,
  MemberDetailsContainer,
  MemberActionContainer,
  MemberInformationContainer,
  ProfilePicture,
} from './StyledMemberSettings';
import { ModalContentWrap } from '../modalContents/StyledModalContents';
import {
  BodyLMedium,
  BodyMMedium,
  H3Bold,
} from '../../typeScale/StyledTypeScale';
import DropdownFilter from '../../filters/dropdownFilter/DropdownFilter';
import { TextBtnS } from '../../buttons/textBtn/TextBtn';
import { selectSetMember } from '@/features/members/memberSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetDepartmentMembersQuery,
  useGetUserDepartmentsMutation,
  useUpdateDepartmentMutation,
  useUpdateUserMutation,
} from '@/features/settingsDetail/userSettingsAPI';
import { AppDispatch, RootState } from '@/app/store';
import { closeModal } from '@/features/modal/modalSlice';
import DepartmentDropDown from '@/components/pages/settings/memberTab/DepartmentDropdown';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';

interface UserModalProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  onClose: () => void;
}

type Department = {
  title: string;
  id: string;
};

const MemberSettings: React.FC<UserModalProps> = () => {
  const member = useSelector(selectSetMember);

  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const [memberDepartments, setMemberDepartments] = useState([]);
  const [getMemberDepartments] = useGetUserDepartmentsMutation();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();
  // const [updateUserDepartment] = useGetDepartmentMembersQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getMemberDepartments({
      user_id: member.id,
      company_id: member.id,
    }).then((response) => {
      if ('data' in response) {
        const transformedData = response.data?.map(
          (department: Department) => ({
            name: department.title,
            value: department.id.toString(),
          })
        );
        setMemberDepartments(transformedData);
      }
    });
  }, [getMemberDepartments]);

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const departments = useFetchCompanyDepartments(companyId as CompanyID);

  const handleSetDepartment = (value: string) => {
    setSelectedDepartment(value);
    console.log({ value });
  };

  const handleSave = async () => {
    const userData = {
      user_id: member.id,
      company_id: companyId,
      department_id: selectedDepartment,
    };
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      instance.post(
        `${BACKEND_URL}/company/department/members?department=${selectedDepartment}&inviteeId=${member.id}`,
        {}
      );
      dispatch(closeModal());
    } catch (error) {
      console.error('Error updating user department:', error);
    }
  };
  return (
    <ModalContentWrap>
      <MemberInformationContainer>
        <ProfilePicture src={member.pictureUrl} />
        <MemberDetailsContainer>
          <H3Bold>
            {member.firstName} {member.lastName}
          </H3Bold>
          <BodyLMedium style={{ opacity: 0.5 }}>{member.email}</BodyLMedium>
        </MemberDetailsContainer>
      </MemberInformationContainer>
      <MemberActionContainer>
        <DepartmentDropDown
          departments={departments}
          handleSetDepartment={handleSetDepartment}
          workspaceId={workspace.id}
        />

        {/* Disabled checkbox for now 
        <CheckBox
          inputName="Check Box"
          label="Make Admin"
          onChange={() => {}}
          checked={false}
          disabled={true}
        />
        */}
        <DeleteBox>
          <BodyMMedium style={{ opacity: 0.5 }}>You can </BodyMMedium>
          <ElWrap w={50} h={10}>
            <TextBtnS
              label="delete"
              onClick={() => {}}
              disable={true} // Temporarily disabled
              className=""
            />
          </ElWrap>
          <BodyMMedium style={{ opacity: 0.5 }}>
            {' '}
            your team members from all workspaces.
          </BodyMMedium>
        </DeleteBox>
      </MemberActionContainer>

      <ElWrap>
        <TextIconBtnL
          disable={false}
          onClick={() => handleSave()}
          className={BackgroundColor.ACCENT_PURPLE}
          label="Save"
        />
      </ElWrap>
    </ModalContentWrap>
  );
};

export default MemberSettings;
