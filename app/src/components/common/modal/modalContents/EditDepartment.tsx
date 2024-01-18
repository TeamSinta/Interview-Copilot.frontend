import { AppDispatch, RootState } from '@/app/store';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { InputLayout } from '../../form/input/StyledInput';
import { useRef, useState } from 'react';
import TextInput from '../../form/textInput/TextInput';
import { useUpdateDepartmentMutation } from '@/features/departments/departmentsAPI';

const titleInputArg = {
  label: 'Title',
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'title',
};

const textIconBtnArg = {
  label: 'Save Changes',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const EditDepartment = () => {
  const { title, id } = useSelector((state: RootState) => state.department);
  const workspace = useSelector((state: RootState) => state.workspace);
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [updateDepartment] = useUpdateDepartmentMutation();

  const dispatch = useDispatch<AppDispatch>();

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

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSaveClick = async () => {
    // dispatch(getMemberAsync());
    // dispatch(postData());
    // dispatch(closeModal());
    // dispatch(inviteMemberSliceReset());

    console.log('Hi', 'Company:', workspace.id, id);
    const departmentData = {
      title: newTitle || null,
    };

    try {
      await updateDepartment({
        company_id: workspace.id,
        department_id: id,
        departmentData: departmentData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium> Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          placeholder={`${title}`}
          onChange={inputOnChange}
          value={newTitle || ''}
          validate={validateTitle}
          ref={titleInputRef}
        />
        <PhotoContainer>
          <BodySMedium>Members</BodySMedium>
        </PhotoContainer>
      </InputLayout>
      <TextIconBtnL {...textIconBtnArg} onClick={handleSaveClick} />
    </ModalContentWrap>
  );
};

export default EditDepartment;
