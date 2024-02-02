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
import { useEffect, useState } from 'react';
import {
  useAddDepartmentMembersMutation,
  useCreateDepartmentMutation,
} from '@/features/departments/departmentsAPI';
import { closeModal } from '@/features/modal/modalSlice';
import { CompanyId } from '@/types/company';
import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import {
  setCurrentMembers,
  toggleMemberSelected,
  resetMemberSelection,
} from '@/features/members/memberSlice';

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
  const [addDepartmentMembers] = useAddDepartmentMembersMutation();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const currentMembers = useSelector(
    (state: RootState) => state.member.currentMembers
  );
  const [validationError, setValidationError] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const { data: companyMembers } = useGetCompanyMembersQuery({
    company_id: companyId,
    sort_by: '',
  });

  const onMemberSelectd = (memberId: string) => {
    dispatch(toggleMemberSelected(memberId));
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

    const selectedMemberIds = currentMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    const createDepartmentData = {
      company_id: companyId,
      departmentTitle: trimmedDepartmentName,
    };

    try {
      const newDepartment =
        await createNewDepartment(createDepartmentData).unwrap();
      if (newDepartment && newDepartment.id) {
        await addDepartmentMembers({
          invitees: selectedMemberIds,
          department_id: newDepartment.id,
        }).unwrap();
      }

      setNewDepartmentName('');
      setValidationError('');
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

  useEffect(() => {
    if (companyMembers) {
      dispatch(setCurrentMembers(companyMembers));
    }
  }, [companyMembers, dispatch]);

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
          {currentMembers.map((member: any, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                onSelect={onMemberSelectd}
                id={member.id}
                firstName={member.firstName}
                lastName={member.lastName}
                photoType={PhotoType.L}
                profilePicture={member.profilePicture}
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
