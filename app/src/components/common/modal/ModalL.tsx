import { closeModal } from "@/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { ModalContainerL, ModalLayout } from "./StyledModal";

export interface IModalProps {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
}

const ModalL = (props: IModalProps) => {
  const dispatch = useDispatch();

  return (
    <ModalLayout
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      <ModalContainerL onClick={(e) => e.stopPropagation()}>
        {/* <ModalHeader title={props.title}></ModalHeader> */}
        {props.children}
      </ModalContainerL>
    </ModalLayout>
  );
};

export default ModalL;
