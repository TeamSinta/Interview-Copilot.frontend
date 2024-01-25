import { AppDispatch, RootState } from '@/app/store';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { InputLayout } from '../../form/input/StyledInput';
import { useRef, useState } from 'react';
import TextInput from '../../form/textInput/TextInput';
import { useUpdateDepartmentMutation } from '@/features/departments/departmentsAPI';
import { setCurrentDepartment } from '@/features/departments/departmentSlice';
import StyledDeleteBox from '../../form/deleteBox/deleteBox';
import {
  selectedMember,
  useFetchSelectMembers,
} from '@/features/roles/rolesSlice';
import Photos from '../../buttons/photo/Photos';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import Photo from '../../buttons/photo/Photo';
import { CompanyId } from '@/types/company';
import { IconBtnS } from '../../buttons/iconBtn/IconBtn';
import { EditIcon } from '../../svgIcons/Icons';
import Stack from '@mui/material/Stack';

const titleInputArg = {
  label: 'Title',
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'title',
};

const textIconBtnArg = {
  label: 'Close and Save Changes',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const EditDepartment = () => {
  const { title, id } = useSelector(
    (state: RootState) => state.department.currentDepartment
  );
  const dispatch = useDispatch<AppDispatch>();
  const workspace = useSelector((state: RootState) => state.workspace);
  const user = useSelector((state: RootState) => state.user.user);
  const currentDepartment = useSelector(
    (state: RootState) => state.department.currentDepartment
  );
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const [disableEdit, setDisableEdit] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [updateDepartment] = useUpdateDepartmentMutation();

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const { members } = useFetchSelectMembers({
    company_id: companyId,
    department_id: currentDepartment.id,
    sortCriteria: '',
  });

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

  const onMemberSelectd = (memberIdx: number) => {
    dispatch(selectedMember({ memberIdx: memberIdx }));
  };

  const handleEditClick = () => {
    setDisableEdit(!disableEdit);
  };
  const handleSaveClick = async () => {
    try {
      const departmentData = {
        title: newTitle || null,
      };
      const newDepartmentTitle = await updateDepartment({
        company_id: workspace.id,
        department_id: id,
        departmentData: departmentData,
      })?.unwrap();
      dispatch(setCurrentDepartment(newDepartmentTitle));
      dispatch(closeModal());
    } catch (error) {
      console.log('Failed to update Department', error);
    }
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium> Title</BodySMedium>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <TextInput
            {...titleInputArg}
            onChange={inputOnChange}
            value={newTitle || ''}
            validate={validateTitle}
            ref={titleInputRef}
            disable={disableEdit}
          />
          <ElWrap h={32} w={32}>
            <IconBtnS
              icon={<EditIcon />}
              onClick={handleEditClick}
              disable={false}
              className={'BackgroundColor.ACCENT_PURPLE'}
            />
          </ElWrap>
        </Stack>
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
      </InputLayout>
      <TextIconBtnL {...textIconBtnArg} onClick={handleSaveClick} />

      <StyledDeleteBox
        deleteItemText="department"
        deleteFromText="this company"
        disabled={false}
      />
    </ModalContentWrap>
  );
};

export default EditDepartment;
