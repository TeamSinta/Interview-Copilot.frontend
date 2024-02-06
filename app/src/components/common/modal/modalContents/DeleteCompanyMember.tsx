import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import {
  BodyMMedium,
  BodyMSemiBold,
} from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { BinIcon } from '../../svgIcons/Icons';
import { useDeleteDepartmentMutation } from '@/features/departments/departmentsAPI';
import { AppDispatch, RootState } from '@/app/store';
import { resetCurrentDepartment } from '@/features/authentication/authenticationSlice';
import { resetMemberInfo } from '@/features/members/memberSlice';

const textIconBtnArg = {
  label: 'Delete',
  icon: <BinIcon />,
  disable: false,
  className: BackgroundColor.WHITE,
};

const textBtnArg = {
  label: 'No, leave them',
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const DeleteCompanyMember = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const member = useSelector((state: RootState) => state.member.member);
  const workspace = useSelector((state: RootState) => state.workspace);

  const handleDeleteClick = async () => {
    try {
      await DeleteCompanyMember({
        company_id: workspace.id,
        member_id: member.id,
      });

      if (DeleteCompanyMember.isSuccess(response)) {
        dispatch(closeModal());
        dispatch(resetMemberInfo());
      } else {
        console.log('Failed to remove user ', response.error);
      }
    } catch (error) {
      console.log('Failed to remove user', error);
    }
  };

  const handleCancelClick = () => {
    dispatch(closeModal());
    dispatch(resetMemberInfo());
  };

  return (
    <ModalContentWrap>
      <BodyMMedium style={{ display: 'inline' }}>
        {' '}
        Do you really want to remove member:{' '}
        <BodyMSemiBold style={{ display: 'inline' }}>
          {member.firstName}{' '}
        </BodyMSemiBold>
        from{' '}
        <BodyMSemiBold style={{ display: 'inline' }}>
          {workspace.name}?{' '}
        </BodyMSemiBold>
      </BodyMMedium>
      <TextIconBtnL {...textIconBtnArg} onClick={handleDeleteClick} />
      <TextBtnL {...textBtnArg} onClick={handleCancelClick} />
    </ModalContentWrap>
  );
};

export default DeleteCompanyMember;
