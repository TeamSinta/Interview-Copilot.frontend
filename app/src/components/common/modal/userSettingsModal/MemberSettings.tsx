import { AppDispatch, RootState } from '@/app/store';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextBtnS } from '../../buttons/textBtn/TextBtn';
import { TextIconBtnL } from '../../buttons/textIconBtn/TextIconBtn';
import {
  BodyLMedium,
  BodyMMedium,
  H3Bold,
} from '../../typeScale/StyledTypeScale';
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
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  onClose: () => void;
}


const MemberSettings: React.FC<UserModalProps> = () => {
  const member = useSelector(selectSetMember);

  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const [, setMemberDepartments] = useState<IDepartment[]>([]);
  const [getMemberDepartments] = useGetUserDepartmentsMutation();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const [createDepartmentMember, { isSuccess, data}] = useCreateDepartmentMemberMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getMemberDepartments({
      user_id: member.id,
      company_id: member.id,
    }).then((response) => {
      if ('data' in response) {
        // const transformedData = (response.data)?.map(
        //   (department) => ({
        //     name: department.title,
        //     value: department.id.toString(),
        //   })
        // );
        setMemberDepartments(response.data as unknown as IDepartment[]);
      }
    });
  }, [getMemberDepartments, member]);

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const departments = useFetchCompanyDepartments(companyId as CompanyID);

  const handleSetDepartment = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleSave = async () => {
    const userData = {
      user_id: member.id,
      company_id: companyId,
      department_id: selectedDepartment,
    };
      createDepartmentMember(userData);
  };

  useEffect(()=>{
    if(isSuccess && data){
      dispatch(closeModal());
    }

  },[isSuccess, data, dispatch])
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
          onClick={handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
          label="Save"
        />
      </ElWrap>
    </ModalContentWrap>
  );
};

export default MemberSettings;
