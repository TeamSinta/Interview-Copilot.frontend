import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/features/modal/modalSlice';
import { ModalContentWrap } from './StyledModalContents';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { BinIcon } from '../../svgIcons/Icons';
import { useDeleteDepartmentMutation } from '@/features/departments/departmentsAPI';

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

const DeleteConfirm = ({ entityId, entityType, additionalId }) => {
  const [deactivateUser] = useDeactivateUserMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleDelete = () => {
    if (entityType === 'user') {
      deactivateUser({ userId: entityId });
    } else if (entityType === 'department') {
      deleteDepartment({ department_id: entityId, company_id: additionalId });
    }
    // ... handle other entity types
  };

  // const handleSaveClick = async () => {
  //   try {
  //     const departmentData = {
  //       title: newTitle || null,
  //     };
  //     const newDepartmentTitle = await updateDepartment({
  //       company_id: workspace.id,
  //       department_id: id,
  //       departmentData: departmentData,
  //     })?.unwrap();
  //     dispatch(setDepartment(newDepartmentTitle));
  //     dispatch(closeModal());
  //   } catch (error) {
  //     console.log('Failed to update Department', error);
  //   }
  // };
  return (
    <ModalContentWrap>
      <BodySMedium> Do you really want to remove xxxx from xxxx? </BodySMedium>
      <TextIconBtnL {...textIconBtnArg} onClick={() => {}} />
      <TextBtnL {...textBtnArg} onClick={() => {}} />
    </ModalContentWrap>
  );
};

export default DeleteConfirm;
