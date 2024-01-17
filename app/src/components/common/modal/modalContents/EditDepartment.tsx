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
} from '@/features/roles/rolesSlice';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { InputLayout } from '../../form/input/StyledInput';

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
  // const { title } = useSelector(selectRole);
  const { title } = useSelector((state: RootState) => state.department);
  const dispatch = useDispatch<AppDispatch>();

  // const onMemberSelectd = (memberIdx: number) => {
  //   dispatch(selectedMember({ memberIdx: memberIdx }));
  // };

  // const onEditDepTtileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setEditDepTitleInput({ [e.target.name]: e.target.value }));
  // };

  // const onEditDepartmentClick = () => {
  //   dispatch(getMemberAsync());
  //   dispatch(postData());
  //   dispatch(closeModal());
  //   dispatch(inviteMemberSliceReset());
  //   dispatch(roleSliceReset());
  // };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput {...titleInputArg} onChange={(e) => {}} value={title} />
        <PhotoContainer>
          <BodySMedium>Members</BodySMedium>
        </PhotoContainer>
      </InputLayout>
      <TextIconBtnL {...textIconBtnArg} onClick={() => {}} />
    </ModalContentWrap>
  );
};

export default EditDepartment;
