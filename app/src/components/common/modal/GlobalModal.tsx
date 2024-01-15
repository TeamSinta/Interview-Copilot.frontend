import { closeModal, selectModal } from '@/features/modal/modalSlice';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, RightBracketIcon } from '../svgIcons/Icons';
import { H2Bold } from '../typeScale/StyledTypeScale';
import Modal from './Modal';
import { ArrowDiv, CloseDiv, ModalHeaderIconWrap, ModalHeaderWrap } from './StyledModal';

import CreateTemplate from '@/components/common/modal/modalContents/CreateTemplate';
import CreateDepartment from './modalContents/CreateDepartment';
import SelectValue from './modalContents/SelectValues';
import ModalL from './ModalL';
import SelectTemplate from './modalContents/SelectTemplate';
import MemberSettings from './userSettingsModal/MemberSettings';
import EditInterviews from './modalContents/EditInterview';
import AddCustomQuestion from './modalContents/AddCustomQuestion';
import EditInterviewers from './modalContents/EditInterviewrs';
import SelectAllQuestions from './modalContents/SelectAllQuestions';
import VideoSettingsContent from './modalContents/videoSettingsModal/VideoSettingsContent';
import CreateQuestionBank from './modalContents/CreateQuestionBank';
import { StyledButton, StyledButtonM, StyledButtonS } from '../buttons/button/StyledBtn';
import ElWrap from '@/components/layouts/elWrap/ElWrap';

export enum MODAL_TYPE {
  CREATE_DEP = 'CREATE_DEP',
  CREATE_INT = 'CREATE_INT',
  CREATE_QUEST_BANK = 'CREATE_QUEST_BANK',
  ADD_CUSTOM_QUESTION = 'ADD_CUSTOM_QUESTION',
  SELECT_VAL = 'SELECT_VAL',
  SELECT_TEM = 'SELECT_TEM',
  MEMBER_SET = 'MEMBER_SET',
  EDIT_INT = 'EDIT_INT',
  EDIT_MEM = 'EDIT_MEM',
  VIDEO_SETTINGS = 'VIDEO_SET',
  SELECT_ALL_QUESTIONS = 'SELECT_ALL_QUESTIONS',
  // ModalL = "ModalL",
}

interface IModalHeader {
  title: string;
  btn?: string;
}

interface IModalPortal {
  children: React.ReactElement;
}

export const ModalHeader = ({ title , btn }: IModalHeader) => {
  const dispatch = useDispatch();

  return (
    <ModalHeaderWrap>
      <div style={{display:'flex', gap:10 }}>
      {btn && (
        <ModalHeaderIconWrap>
        <ElWrap w={44}>
        <StyledButton className='customizeHeight' >
          {btn}
        </StyledButton>
        </ElWrap>
        <ArrowDiv
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        <RightBracketIcon />
      </ArrowDiv>

        </ModalHeaderIconWrap>
      )}

      <H2Bold>{title}</H2Bold>
      </div>
     
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
          <Modal title="New Question" btn='Tem'>
            <AddCustomQuestion />
          </Modal>
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
          <Modal title="Member Setting">
            <MemberSettings
              user={{
                first_name: '',
                last_name: '',
                email: '',
                role: '',
              }}
              onClose={function (): void {
                throw new Error('Function not implemented.');
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
