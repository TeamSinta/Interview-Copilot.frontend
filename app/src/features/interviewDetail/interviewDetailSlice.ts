import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { DataLoading } from '../utils/utilEnum';
import { InterviewDetailAPI } from '../interviewDetail/interviewDetailAPI';

export const initialState = {
  template: {
    interviewers: [], // Placeholder for interviewers data
  },
  sections: [],
  questions: [],
  selectedSection: {
    id: null,
    topics_text: '',
    time: '',
  },
  status: DataLoading.UNSEND,
};

export const getInterviewDetailAsync = createAsyncThunk(
  'interviews/interviewDetail',
  async (templateId: string, { dispatch }) => {
    try {
      const templateResult = await dispatch(InterviewDetailAPI.endpoints.getInterviewTemplate.initiate(templateId));
      const sectionsResult = await dispatch(InterviewDetailAPI.endpoints.getInterviewSections.initiate(templateId));
      const questionsResult = await dispatch(InterviewDetailAPI.endpoints.getInterviewDetail.initiate(templateId));
      
      const template = templateResult.data;
      const sections = sectionsResult.data;
      const questions = questionsResult.data;

      return { template, sections, questions };
    } catch (error) {
      console.error('Error fetching interview detail:', error);
      throw error;
    }
  }
);

export const interviewDetailSlice = createSlice({
  name: 'interviewDetail',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getInterviewDetailAsync.fulfilled, (state, action) => {
      const { template, sections, questions } = action.payload;
      state.template = template;
      state.sections = sections;
      state.questions = questions;
      state.status = DataLoading.FULFILLED;
      state.selectedSection = sections[0]; // Initialize as needed
    });
    builder.addCase(getInterviewDetailAsync.rejected, (state) => {
      state.status = DataLoading.REJECTED;
    });
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
          },
  },
});

export const { setSelectedSection } = interviewDetailSlice.actions;
export const selectInterviewDetail = (state: RootState) => state.interviewDetail;
export default interviewDetailSlice.reducer;
