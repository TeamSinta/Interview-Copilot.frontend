import { AppDispatch, RootState } from '@/app/store';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import TextInput from '@/components/common/form/textInput/TextInput';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { useState } from 'react';
import { useCreateDepartmentMutation } from '@/features/departments/departmentsAPI';
import { closeModal } from '@/features/modal/modalSlice';
import {
  resetMemberSelection,
  selectedMember,
} from '@/features/company/companySlice';
import { CompanyId } from '@/types/company';

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
  const companyMembers = useSelector(
    (state: RootState) => state.company.members
  );

  const [validationError, setValidationError] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

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

    const selectedMemberIds = companyMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    const createDepartmentData = {
      company_id: companyId,
      departmentTitle: trimmedDepartmentName,
    };

    // THIS IS WHERE YOU GOT STUCK. FIX THE SEQUENCE OF GETTING THE ID FOR ADD DEP MEMBER
    try {
      const newDepartment =
        await createNewDepartment(createDepartmentData).unwrap();
      await addDepartmentMember({
        invitees: selectedMemberIds,
        department_id: newDepartment.id,
      }).unwrap();
      setNewDepartmentName('');
      setValidationError('');
      console.log('Department Data: ', createDepartmentData);
      dispatch(resetMemberSelection());
      dispatch(closeModal);
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
          {companyMembers.map((member: any, index: number) => (
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
function addDepartmentMember(selectedMemberId: any) {
  throw new Error('Function not implemented.');
}
