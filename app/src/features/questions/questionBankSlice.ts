import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestionsBanks } from '../interviews/interviewsInterface';

interface QuestionsBankState {
  questionsBank: IQuestionsBanks[];
}

const initialState: QuestionsBankState = {
  questionsBank: [],
};

const questionBankSlice = createSlice({
  name: 'questionsBank',
  initialState,
  reducers: {
    addNewQuestionBank: (state, action: PayloadAction<IQuestionsBanks>) => {
      return {
        ...state,
        questionsBank: [action.payload, ...state.questionsBank],
      };
    },
    getQuestionsBank: (state, action: PayloadAction<IQuestionsBanks[]>) => {
      return {
        ...state,
        questionsBank: action.payload,
      };
    },
  },
});

export const { addNewQuestionBank, getQuestionsBank } =
  questionBankSlice.actions;

export const selectQuestionsBank = (state: RootState) =>
  state.questionsBankSlice;

export default questionBankSlice.reducer;
