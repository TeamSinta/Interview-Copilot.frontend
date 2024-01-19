import { AppDispatch, RootState } from '@/app/store';
import { TextBtnS } from '@/components/common/buttons/textBtn/TextBtn';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import {
  BodyLMedium,
  BodyMMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import DepartmentDropDown from '@/components/pages/settings/memberTab/DepartmentDropdown';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import { selectSetMember } from '@/features/members/memberSlice';
import { closeModal } from '@/features/modal/modalSlice';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import {
  useCreateDepartmentMemberMutation,
  useGetUserDepartmentsMutation,
} from '@/features/settingsDetail/userSettingsAPI';
import { IDepartment } from '@/features/settingsDetail/userSettingsInterface';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { IOption } from '@/types/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from '../modalContents/StyledModalContents';
import {
  DeleteBox,
  MemberActionContainer,
  MemberDetailsContainer,
  MemberInformationContainer,
  ProfilePicture,
} from './StyledMemberSettings';

interface UserModalProps {
  user: {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  onClose: () => void;
}

const MemberSettings: React.FC<UserModalProps> = () => {
  const [memberDepartments, setMemberDepartments] = useState<IOption[]>([]);
  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const member = useSelector(selectSetMember);

  const [getMemberDepartments] = useGetUserDepartmentsMutation();
  const [createDepartmentMember, { isSuccess, data }] =
    useCreateDepartmentMemberMutation();
  const dispatch = useDispatch<AppDispatch>();

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const departments = useFetchCompanyDepartments(companyId);

  useEffect(() => {
    getMemberDepartments({
      user_id: member.id,
      company_id: companyId,
    }).then((response) => {
      if ('data' in response) {
        const data = response.data as unknown as IDepartment[];
        const transformedData = departments.map((department: IOption) => ({
          ...department,
          selected: data.some(
            (userDepartment) =>
              Number(userDepartment.id) === Number(department.value)
          ),
        }));
        setMemberDepartments(transformedData);
      }
    });
  }, [getMemberDepartments, member, departments]);

  const handleSetDepartment = (data: IOption) => {
    const updatedDepartments = memberDepartments.map((department) => {
      if (department.value === data.value) {
        return data;
      }
      return department;
    });
    setMemberDepartments(updatedDepartments);
  };

  const handleSave = async () => {
    const userData = {
      user_id: member.id,
      company_id: companyId,
      // department_id: selectedDepartment,// Department id will for single select
      body: memberDepartments
        .filter((department) => department.selected === true)
        .map((department) => Number(department.value)),
    };
    createDepartmentMember(userData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(closeModal());
    }
  }, [isSuccess, data, dispatch]);

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
          departments={memberDepartments}
          handleSetDepartment={(data) => handleSetDepartment(data as IOption)}
          workspaceId={workspace.id}
          multi
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
          onClick={handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
          label="Save"
        />
      </ElWrap>
    </ModalContentWrap>
  );
};

export default MemberSettings;
