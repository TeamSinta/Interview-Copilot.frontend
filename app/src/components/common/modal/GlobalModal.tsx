import { closeModal, selectModal } from '@/features/modal/modalSlice';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@/components/common/svgIcons/Icons';
import { H2Bold } from '@/components/common/typeScale/StyledTypeScale';
import Modal from '@/components/common/modal/Modal';
import {
  ArrowIcon,
  CloseDiv,
  IconContainer,
  IconWithText,
  ModalHeaderWrap,
} from './StyledModal';

import CreateTemplate from '@/components/common/modal/modalContents/CreateTemplate';
import CreateDepartment from './modalContents/CreateDepartment';
import SelectValue from './modalContents/SelectValues';
import ModalL from './ModalL';
import SelectTemplate from './modalContents/SelectTemplate';
import EditMember from './userSettingsModal/EditMember';
import EditInterviews from './modalContents/EditInterview';
import AddCustomQuestion from './modalContents/AddCustomQuestion';
import EditInterviewers from './modalContents/EditInterviewrs';
import SelectAllQuestions from './modalContents/SelectAllQuestions';
import VideoSettingsContent from './modalContents/videoSettingsModal/VideoSettingsContent';
import CreateQuestionBank from './modalContents/CreateQuestionBank';
import Logo from 'src/assets/svg/icon.svg';
import Arrow from 'src/assets/svg/arrow.svg';
import CoverLibrary from './modalContents/CoversLibrary';
import EditDepartment from './modalContents/EditDepartment';
import DeleteDepartment from './modalContents/DeleteDepartment';
import { SetStateAction } from 'react';
import EditDepartmentMembers from './modalContents/EditDepartmentMembers';
import DeleteCompanyMember from './modalContents/DeleteCompanyMember';

export enum MODAL_TYPE {
  CREATE_DEP = 'CREATE_DEP',
  SELECT_DEP = 'SELECT_DEP',
  CREATE_INT = 'CREATE_INT',
  CREATE_QUEST_BANK = 'CREATE_QUEST_BANK',
  ADD_CUSTOM_QUESTION = 'ADD_CUSTOM_QUESTION',
  SELECT_VAL = 'SELECT_VAL',
  SELECT_TEM = 'SELECT_TEM',
  MEMBER_SET = 'MEMBER_SET',
  DEL_MEMBER = 'MEMBER_DEL',
  EDIT_INT = 'EDIT_INT',
  EDIT_MEM = 'EDIT_MEM',
  VIDEO_SETTINGS = 'VIDEO_SET',
  SELECT_ALL_QUESTIONS = 'SELECT_ALL_QUESTIONS',
  COVER_LIBRARY = 'COVER_LIBRARY',
  DEL_DEP = 'DEL_DEP',
  EDIT_DEP_MEM = 'EDIT_DEP_MEM',
}

interface IModalHeader {
  title: string;
  icon?: React.ReactNode;
}

interface IModalPortal {
  children: React.ReactElement;
}

export const ModalHeader = ({ title, icon }: IModalHeader) => {
  const dispatch = useDispatch();

  return (
    <ModalHeaderWrap>
      <H2Bold style={{ display: 'flex' }}>
        {icon && (
          <>
            <IconContainer>
              <IconWithText>
                {icon}
                <span style={{ marginLeft: '4px' }}>TEM</span>
              </IconWithText>
            </IconContainer>
            <ArrowIcon src={Arrow} alt="arrow" />
          </>
        )}
        {title}
      </H2Bold>
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
  const el = document.getElementById('modal')!;
  return ReactDOM.createPortal(children, el);
};

const GlobalModal = (): JSX.Element => {
  const { modalType, isOpen } = useSelector(selectModal);

  const modalData = useSelector(selectModal);
  const dataForEdit = modalData?.dataForEdit;

  const renderModal = () => {
    switch (modalType) {
      case MODAL_TYPE.CREATE_DEP:
        return (
          <Modal title="Create New Departments">
            <CreateDepartment />
          </Modal>
        );
      case MODAL_TYPE.SELECT_DEP:
        return (
          <Modal title="Department Details">
            <EditDepartment />
          </Modal>
        );
      case MODAL_TYPE.EDIT_DEP_MEM:
        return (
          <Modal title="Department Members">
            <EditDepartmentMembers />
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
          <Modal title="New Template">
            <CreateTemplate />
          </Modal>
        );
      case MODAL_TYPE.CREATE_QUEST_BANK:
        return (
          <Modal title="Create New Question Bank">
            <CreateQuestionBank />
          </Modal>
        );
      case MODAL_TYPE.ADD_CUSTOM_QUESTION:
        return (
          <div style={{ display: 'flex' }}>
            <Modal
              title={!dataForEdit ? 'New Question' : 'Update Question'}
              icon={<img src={Logo} alt="Logo" />}
            >
              <AddCustomQuestion />
            </Modal>
          </div>
        );
      case MODAL_TYPE.EDIT_INT:
        return (
          <Modal title="Interview Details">
            <EditInterviews />
          </Modal>
        );
      case MODAL_TYPE.EDIT_MEM:
        return (
          <Modal title="Interviewers">
            <EditInterviewers />
          </Modal>
        );
      case MODAL_TYPE.DEL_MEMBER:
        return (
          <Modal title="Confirmation">
            <DeleteCompanyMember />
          </Modal>
        );
      case MODAL_TYPE.SELECT_VAL:
        return (
          <Modal title="Sections">
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
          <Modal title="Member Settings">
            <EditMember />
          </Modal>
        );
      case MODAL_TYPE.COVER_LIBRARY:
        return (
          <Modal title="Gallery">
            <CoverLibrary
              setSelectedImg={function (
                value: SetStateAction<string | null>
              ): void {
                throw new Error('Function not implemented.');
              }}
            />
          </Modal>
        );
      case MODAL_TYPE.DEL_DEP:
        return (
          <Modal title="Confirmation">
            <DeleteDepartment />
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
