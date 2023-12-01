import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataLoading } from "../utils/utilEnum";
import { RootState } from "@/app/store";
import { getQuestionsBank } from "./interviewsAPI";
import { IQuestion } from "./interviewsInterface";

export const initialState = {
  round: {
    title: "",
    description: "",
    members: [
      {
        member_idx: 0,
        member_name: "",
        member_url: "",
        member_type: "",
        selected: false,
      },
    ],
  },
  values: [],
  selectedValue: [],
  questionBanks: [],
  questions: [] as IQuestion[],
  selectedQuestionBank: {
    id: 0,
    title: "",
  },
  selectedQuestion: [] as IQuestion[],
  status: DataLoading.UNSEND,
};

export const getQuestionsBanksAsync = createAsyncThunk(
  "interviews/templates",
  async () => {
    const response = await getQuestionsBank();
    return response; // Adjust the response data
  }
);

export const interviewsSlice = createSlice({
  name: "questionBanks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuestionsBanksAsync.fulfilled, (state, action) => {
      state.questionBanks = action.payload;
      state.status = DataLoading.FULFILLED;
    });
  },
  reducers: {
    setSelectedQuestionBanks: (state, actions) => {
      const data = actions.payload;
      state.selectedQuestionBank = data;
    },
    selectQuestionBank: (state, actions) => {
      const { questionBank } = actions.payload;
      state.selectedQuestionBank = questionBank;
      state.questions = questionBank.questions;
    },
    setSelectedQuestion: (state, actions) => {
      const { selectedQuestion } = actions.payload;
      const exists = state.selectedQuestion.find(
        (question) => question.id === selectedQuestion.id
      );
      if (!exists) {
        state.selectedQuestion.push(selectedQuestion);
      } else {
        state.selectedQuestion = state.selectedQuestion.filter(
          (question) => question.id !== selectedQuestion.id
        );
      }
    },
    setAllQuestionsSelected: (state, actions) => {
      state.selectedQuestion = actions.payload;
    },
    resetQuestionBank: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSelectedQuestionBanks,
  selectQuestionBank,
  setSelectedQuestion,
  resetQuestionBank,
  setAllQuestionsSelected,
} = interviewsSlice.actions;

export const selectInterview = (state: RootState) => state.questionBanks;
export default interviewsSlice.reducer;
