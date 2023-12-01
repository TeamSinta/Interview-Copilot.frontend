import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { IMockMembers } from "../roles/rolesInterface";
// import { InterviewDetailResponse } from "./inverviewDetailInterface";
import { RootState } from "@/app/store";
import { DataLoading } from "../utils/utilEnum";
import {
  getInterviewTemplate,
  getInterviewSections,
  getInterviewDetail,
} from "./interviewDetailAPI";

export const initialState = {
  template: {
    interviewers: [], // Placeholder for interviewers data
  },
  sections: [],
  questions: [],
  selectedSection: {
    id: null,
    topics_text: "",
    time: "",
  },
  status: DataLoading.UNSEND,
};

export const getInterviewDetailAsync = createAsyncThunk(
  "interviews/interviewDetail",
  async (templateId: string) => {
    const template = await getInterviewTemplate(templateId);
    const sections = await getInterviewSections(templateId);
    const questions = await getInterviewDetail(templateId);

    return { template, sections, questions };
  }
);

export const interviewDetailSlice = createSlice({
  name: "interviewDetail",
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
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
  },
});

export const { setSelectedSection } = interviewDetailSlice.actions;
export const selectInterviewDetail = (state: RootState) =>
  state.interviewDetail;
export default interviewDetailSlice.reducer;
