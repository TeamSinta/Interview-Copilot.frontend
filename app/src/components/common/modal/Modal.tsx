import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { ModalHeader } from './GlobalModal';
import { ModalContainer, ModalLayout } from './StyledModal';

export interface IModalProps {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
}

const Modal = (props: IModalProps) => {
  const dispatch = useDispatch();
  const modalWidth = props.title === 'Covers Library' ? '720px' : '480px';
  return (
    <ModalLayout
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        style={{ width: modalWidth }}
      >
        <ModalHeader title={props.title}></ModalHeader>
        {props.children}
      </ModalContainer>
    </ModalLayout>
  );
};

export default Modal;
