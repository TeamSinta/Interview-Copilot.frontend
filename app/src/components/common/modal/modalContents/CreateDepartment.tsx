import { AppDispatch, RootState } from '@/app/store';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import Invite from '@/components/common/form/invite/Invite';
import TextInput from '@/components/common/form/textInput/TextInput';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { inviteMemberSliceReset } from '@/features/inviteMember/inviteMemberSlice';
import { closeModal } from '@/features/modal/modalSlice';
import { IMember } from '@/features/roles/rolesInterface';
import {
  getMemberAsync,
  postData,
  roleSliceReset,
  selectRole,
  selectedMember,
  setCreateDepTitleInput,
  useFetchSelectMembers,
} from '@/features/roles/rolesSlice';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import { useEffect, useRef, useState } from 'react';
import NewDepartment from '../../form/newDepartment/newDepartment';
import { useCreateDepartmentMutation } from '@/features/departments/departmentsAPI';

const titleInputArg = {
  label: 'Title',
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'title',
};

const textIconBtnArg = {
  label: 'CreateDepartment',
  icon: <PlusIcon />,
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const CreateDepartment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [createNewDepartment, { isLoading }] = useCreateDepartmentMutation();
  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const [validationError, setValidationError] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [sortCriteria] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const { members } = useFetchSelectMembers({
    company_id: companyId,
    department_id: departmentId,
    sortCriteria: sortCriteria,
  });

  const onMemberSelectd = (memberIdx: number) => {
    dispatch(selectedMember({ memberIdx: memberIdx }));
  };

  const onCreateDepTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDepartmentName(e.target.value);
  };

  const CreateNewDepartment = async () => {
    const trimmedDepartmentName = newDepartmentName.trim();
    if (!trimmedDepartmentName) {
      setValidationError('Title is required.');
      return;
    }

    try {
      await createNewDepartment({
        company_id: companyId,
        departmentTitle: trimmedDepartmentName,
      }).unwrap();

      // Handle success
      setNewDepartmentName('');
      setValidationError('');
    } catch (error: any) {
      setValidationError('Error creating department: ' + error.message);
    }
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  return (
    <ModalContentWrap>
      <TextInput
        {...titleInputArg}
        onChange={(e) => {
          onCreateDepTitleChange(e);
        }}
        value={newDepartmentName}
        validate={validateTitle}
        disable={isLoading}
      />
      <PhotoContainer>
        <BodySMedium>Members</BodySMedium>
        <Photos>
          {members.map((member: any, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                onSelect={onMemberSelectd}
                member_idx={member.id}
                member_firstName={member.first_name}
                member_lastName={member.last_name}
                photoType={PhotoType.L}
                member_url={member.profile_picture}
                selected={member.selected}
              />
            </ElWrap>
          ))}
        </Photos>
      </PhotoContainer>
      <TextIconBtnL {...textIconBtnArg} onClick={CreateNewDepartment} />
    </ModalContentWrap>
  );
};

export default CreateDepartment;
