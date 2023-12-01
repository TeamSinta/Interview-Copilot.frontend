import { closeModal, selectModal } from "@/features/modal/modalSlice";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../svgIcons/Icons";
import { H2Bold } from "../typeScale/StyledTypeScale";
import Modal from "./Modal";
import { CloseDiv, ModalHeaderWrap } from "./StyledModal";

import CreateInterviews from "@/components/common/modal/modalContents/CreateInterviews";
import CreateDepartment from "./modalContents/CreateDepartment";
import SelectValue from "./modalContents/SelectValues";
import ModalL from "./ModalL";
import SelectTemplate from "./modalContents/SelectTemplate";
import MemberSettings from "./userSettingsModal/MemberSettings";
import EditInterviews from "./modalContents/EditInterview";
import EditInterviewers from "./modalContents/EditInterviewrs";
import SelectAllQuestions from "./modalContents/SelectAllQuestions";
import VideoSettings from "./modalContents/videoSettingsModal/VideoSettings";
import VideoSettingsContent from "./modalContents/videoSettingsModal/VideoSettingsContent";

export enum MODAL_TYPE {
  CREATE_DEP = "CREATE_DEP",
  CREATE_INT = "CREATE_INT",
  SELECT_VAL = "SELECT_VAL",
  SELECT_TEM = "SELECT_TEM",
  MEMBER_SET = "MEMBER_SET",
  EDIT_INT = "EDIT_INT",
  EDIT_MEM = "EDIT_MEM",
  VIDEO_SETTINGS = "VIDEO_SET",
  SELECT_ALL_QUESTIONS = "SELECT_ALL_QUESTIONS",
  // ModalL = "ModalL",
}

interface IModalHeader {
  title: string;
}

interface IModalPortal {
  children: React.ReactElement;
}

export const ModalHeader = ({ title }: IModalHeader) => {
  const dispatch = useDispatch();

  return (
    <ModalHeaderWrap>
      <H2Bold>{title}</H2Bold>
      <CloseDiv
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        <CloseIcon />
      </CloseDiv>
    </ModalHeaderWrap>
  );
};

const ModalPortal = ({ children }: IModalPortal) => {
  const el = document.getElementById("modal")!;
  return ReactDOM.createPortal(children, el);
};

const GlobalModal = (): JSX.Element => {
  const { modalType, isOpen } = useSelector(selectModal);

  const renderModal = () => {
    switch (modalType) {
      case MODAL_TYPE.CREATE_DEP:
        return (
          <Modal title="Create New Departments">
            <CreateDepartment />
          </Modal>
        );
      case MODAL_TYPE.SELECT_ALL_QUESTIONS:
        return (
          <ModalL title="All Questions Library">
            <SelectAllQuestions />
          </ModalL>
        );
      case MODAL_TYPE.CREATE_INT:
        return (
          <Modal title="Create New Interview">
            <CreateInterviews />
          </Modal>
        );
      case MODAL_TYPE.EDIT_INT:
        return (
          <Modal title="Edit Interview">
            <EditInterviews />
          </Modal>
        );
      case MODAL_TYPE.EDIT_MEM:
        return (
          <Modal title="Interviewers">
            <EditInterviewers />
          </Modal>
        );
      case MODAL_TYPE.SELECT_VAL:
        return (
          <Modal title="Create your Sections">
            <SelectValue />
          </Modal>
        );
      case MODAL_TYPE.SELECT_TEM:
        return (
          <ModalL title="Select your values">
            <SelectTemplate />
          </ModalL>
        );
      case MODAL_TYPE.VIDEO_SETTINGS:
        return (
          <Modal title="Settings">
            <VideoSettingsContent />
          </Modal>
        );
      case MODAL_TYPE.MEMBER_SET:
        return (
          <Modal title="Member Setting">
            <MemberSettings
              user={{
                first_name: "",
                last_name: "",
                email: "",
                role: "",
              }}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        );
    }
  };

  if (!isOpen) return <></>;

  return (
    <ModalPortal>{isOpen ? <div>{renderModal()}</div> : <></>}</ModalPortal>
  );
};

export default GlobalModal;
