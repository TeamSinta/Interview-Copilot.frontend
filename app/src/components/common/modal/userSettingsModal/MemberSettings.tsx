import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import {
  useGetUserDepartmentsMutation,
  useUpdateUserMutation,
} from '@/features/settingsDetail/userSettingsAPI';
import { RootState } from '@/app/store';

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
  const [memberDepartments, setMemberDepartments] = useState([]);
  const [getMemberDepartments] = useGetUserDepartmentsMutation();
  const [, setSelectedDepartment] = useState<string>('');
  const [updateUserDepartment] = useUpdateUserMutation();

  useEffect(() => {
    getMemberDepartments({ user_id: member.id, company_id: workspace.id }).then(
      (response) => {
        if ('data' in response) {
          console.log('response ====> ', response);
          console.log('response data ====> ', response.data);
          const transformedData = response.data?.map(
            (department: Department) => ({
              name: department.title,
              value: department.id.toString(),
            })
          );
          setMemberDepartments(transformedData);
        }
      }
    );
  }, [getMemberDepartments]);

  const handleSave = async (selectedValue: string) => {
    setSelectedDepartment(selectedValue);
    try {
      await updateUserDepartment;
    } catch (error) {
      console.log(error);
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
        <DropdownFilter
          key={workspace.id}
          label="Departments"
          value="Select Department"
          onChange={() => {}}
          optionArr={memberDepartments}
          dropdownName="Placeholder"
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
          onClick={() => handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
          label="Save"
        />
      </ElWrap>
    </ModalContentWrap>
  );
};

export default MemberSettings;
