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
import { AppDispatch, RootState } from '@/store';
import { resetCurrentDepartment } from '@/features/authentication/authenticationSlice';

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

const DeleteDepartment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const currentDepartment = useSelector(
    (state: RootState) => state.user.currentDepartment
  );
  const workspace = useSelector((state: RootState) => state.workspace);

  const handleDeleteClick = async () => {
    try {
      await deleteDepartment({
        company_id: workspace.id,
        department_id: currentDepartment.id,
      })?.unwrap();
      dispatch(closeModal());
      dispatch(resetCurrentDepartment());
    } catch (error) {
      console.log('Failed to remove department', error);
    }
  };

  const handleCancelClick = () => {
    dispatch(closeModal());
    dispatch(resetCurrentDepartment());
  };

  return (
    <ModalContentWrap>
      <BodyMMedium style={{ display: 'inline' }}>
        {' '}
        Do you really want to remove department:{' '}
        <BodyMSemiBold style={{ display: 'inline' }}>
          {currentDepartment.title}{' '}
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

export default DeleteDepartment;
