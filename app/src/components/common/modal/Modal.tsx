import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { ModalHeader } from './GlobalModal';
import { ModalContainer, ModalLayout } from './StyledModal';

export interface IModalProps {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const Modal = (props: IModalProps) => {
  const dispatch = useDispatch();
  const modalWidth =
    props.title === 'Covers Library' || 'New Question' ? '784px' : '480px';
  const modalBorderRadius = props.title === 'New Question' ? '8px' : '';
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
        <ModalHeader title={props.title} icon={props.icon}></ModalHeader>
        {props.children}
      </ModalContainer>
    </ModalLayout>
  );
};

export default Modal;
