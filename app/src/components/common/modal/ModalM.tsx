import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { ModalContainerM, ModalLayout } from './StyledModal';

export interface IModalProps {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
}

const ModalM = (props: IModalProps) => {
  const dispatch = useDispatch();

  return (
    <ModalLayout
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      <ModalContainerM onClick={(e) => e.stopPropagation()}>
        {/* <ModalHeader title={props.title}></ModalHeader> */}
        {props.children}
      </ModalContainerM>
    </ModalLayout>
  );
};

export default ModalM;
