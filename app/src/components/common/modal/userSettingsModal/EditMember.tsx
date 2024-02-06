import { AppDispatch, RootState } from '@/app/store';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import {
  BodyLMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import { selectSetMember } from '@/features/members/memberSlice';
import { closeModal } from '@/features/modal/modalSlice';
import {
  useCreateDepartmentMemberMutation,
  useGetUserDepartmentsMutation,
} from '@/features/settingsDetail/userSettingsAPI';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { IOption } from '@/types/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from '../modalContents/StyledModalContents';
import {
  MemberActionContainer,
  MemberDetailsContainer,
  MemberInformationContainer,
  ProfilePicture,
} from './StyledMemberSettings';
import DepartmentDropDown from '@/components/common/dropDown/DepartmentDropdown';
import StyledDeleteBox from '../../form/deleteBox/deleteBox';
import { CompanyId } from '@/types/company';
import { IDepartment } from '@/types/department';
import { MODAL_TYPE } from '../GlobalModal';

interface MemberModalProps {
  user: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    role: string;
  };
  onClose: () => void;
}

const EditMember: React.FC<MemberModalProps> = () => {
  const [memberDepartments, setMemberDepartments] = useState<IOption[]>([]);
  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const member = useSelector(selectSetMember);
  const [sortCriteria, setSortCritiera] = useState('');

  const [getMemberDepartments] = useGetUserDepartmentsMutation();
  const [createDepartmentMember, { isSuccess, data }] =
    useCreateDepartmentMemberMutation();
  const dispatch = useDispatch<AppDispatch>();

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const departments = useFetchCompanyDepartments(companyId, sortCriteria);

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
  }, [getMemberDepartments, companyId, member, departments]);

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
        <ProfilePicture src={member.profilePicture} />
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
        <StyledDeleteBox
          targetModalType={MODAL_TYPE.DEL_MEMBER}
          disabled={true}
          deleteItemText="member"
          deleteFromText="all your companies"
        />
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

export default EditMember;
