import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';

export interface ModalState {
  modalType: string;
  templateID: string;
  isOpen: boolean;
  history: string;
  questionBankID: string;
  entityId?: string;
  entityType?: string;
  additionalId?: string;
}

const initialState: ModalState = {
  modalType: '',
  isOpen: false,
  history: '',
  templateID: '',
  questionBankID: '',
  // maybe we can adapt this to just allow 2 types of IDs throughout?
  entityId: '',
  entityType: '',
  additionalId: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const {
        modalType,
        templateID,
        questionBankID,
        entityId,
        entityType,
        additionalId,
      } = actions.payload;
      state.modalType = modalType;
      state.templateID = templateID;
      state.questionBankID = questionBankID;
      state.isOpen = true;
      state.entityId = entityId;
      state.entityType = entityType;
      state.additionalId = additionalId;
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
