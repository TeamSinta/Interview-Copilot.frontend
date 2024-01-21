import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { ModalHeader } from '@/components/common/modal/GlobalModal';
import {
  ModalContainer,
  ModalLayout,
} from '@/components/common/modal/StyledModal';

export interface IModalProps {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const updatedModals = ['Gallery', 'New Question', 'Update Question'];
const updatedModalsRadius = ['New Question', 'Update Question'];

const Modal = (props: IModalProps) => {
  const dispatch = useDispatch();
  const modalWidth = updatedModals.includes(props.title) ? '784px' : '480px';
  const modalBorderRadius = updatedModalsRadius.includes(props.title)
    ? '8px'
    : '';
  return (
    <ModalLayout
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        style={{ width: modalWidth, borderRadius: modalBorderRadius }}
      >
        <ModalHeader title={props.title} icon={props.icon} />
        {props.children}
      </ModalContainer>
    </ModalLayout>
  );
};

export default Modal;
