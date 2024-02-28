import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import {
  CompetencyDropDownFilter,
  StatusDropdownFilter,
} from '../utils/utilEnum';

export interface IStateEdit {
  [key: string]: any;
  id: number;
  question_text: string;
  reply_time: string;
  guidelines: string;
  competency: string | CompetencyDropDownFilter;
  difficulty: string | StatusDropdownFilter;
}

export interface ModalState {
  modalType: string;
  templateID: string;
  isOpen: boolean;
  history: string;
  questionBankID: string;
  dataForEdit?: IStateEdit | null;
}

const initialState: ModalState = {
  modalType: '',
  isOpen: false,
  history: '',
  templateID: '',
  questionBankID: '',
  dataForEdit: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType, templateID, questionBankID, dataForEdit } =
        actions.payload;
      state.modalType = modalType;
      state.templateID = templateID;
      state.questionBankID = questionBankID;
      state.isOpen = true;
      state.dataForEdit = dataForEdit;
    },
    closeModal: (state) => {
      redirect(state.history);
      state.isOpen = false;
    },
    setHistory: (state, actions) => {
      const { history } = actions.payload;
      state.history = history;
    },
  },
});

export const { openModal, closeModal, setHistory } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
