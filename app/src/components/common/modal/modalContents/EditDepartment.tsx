import { AppDispatch, RootState } from '@/app/store';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import {
  BodySBold,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@/features/modal/modalSlice';
import { MemberPhotosContainer, ModalContentWrap } from './StyledModalContents';
import { InputLayout } from '../../form/input/StyledInput';
import { useRef, useState } from 'react';
import TextInput from '../../form/textInput/TextInput';
import {
  useGetDepartmentMembersQuery,
  useUpdateDepartmentMutation,
} from '@/features/departments/departmentsAPI';
import { setCurrentDepartment } from '@/features/departments/departmentSlice';
import StyledDeleteBox from '../../form/deleteBox/deleteBox';
import { selectedMember } from '@/features/roles/rolesSlice';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import Photo from '../../buttons/photo/Photo';
import { IconBtnS } from '../../buttons/iconBtn/IconBtn';
import { EditIcon } from '../../svgIcons/Icons';
import Stack from '@mui/material/Stack';
import { NumberIcon } from '../../cards/card/StyledCard';
import Box from '@mui/material/Box';
import { MODAL_TYPE } from '../GlobalModal';

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
  const { id } = useSelector(
    (state: RootState) => state.department.currentDepartment
  );
  const dispatch = useDispatch<AppDispatch>();
  const workspace = useSelector((state: RootState) => state.workspace);
  const currentDepartment = useSelector(
    (state: RootState) => state.department.currentDepartment
  );
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const [disableEdit, setDisableEdit] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [updateDepartment] = useUpdateDepartmentMutation();

  const { data: departmentMembers } = useGetDepartmentMembersQuery({
    department_id: currentDepartment.id,
    sort_by: '',
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

  const onClickModalOpen = (targetModalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: targetModalType,
      })
    );
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const onMemberSelectd = (memberIdx: number) => {
    dispatch(selectedMember({ memberIdx: memberIdx }));
  };

  const handleEditTitleClick = () => {
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
              onClick={handleEditTitleClick}
              disable={false}
              className={'BackgroundColor.ACCENT_PURPLE'}
            />
          </ElWrap>
        </Stack>
        <PhotoContainer>
          <BodySMedium>Members</BodySMedium>
          <Stack direction="row" spacing={1} justifyItems="space-between">
            <MemberPhotosContainer>
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {departmentMembers
                  ?.slice(0, departmentMembers.length > 4 ? 3 : 4)
                  .map((member: any, index: number) => (
                    <ElWrap w={40} h={40} key={index}>
                      <Photo
                        onSelect={onMemberSelectd}
                        id={member.id}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        profilePicture={member.profilePicture}
                        photoType={PhotoType.L}
                        selected={member.selected}
                      />
                    </ElWrap>
                  ))}
                <>
                  {departmentMembers?.length && departmentMembers.length > 4 ? (
                    <NumberIcon imgUrl="">
                      <BodySBold>+{departmentMembers.length - 3}</BodySBold>
                    </NumberIcon>
                  ) : (
                    <></>
                  )}
                </>
              </Box>
              <ElWrap w={150}>
                <TextIconBtnL
                  label="Edit Members"
                  className={BackgroundColor.WHITE}
                  disable={false}
                  icon={<EditIcon />}
                  onClick={() => onClickModalOpen(MODAL_TYPE.EDIT_DEP_MEM)}
                />
              </ElWrap>
            </MemberPhotosContainer>
          </Stack>
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
