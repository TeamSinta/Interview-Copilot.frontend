import { createSlice } from "@reduxjs/toolkit";
import { videoCallState } from "./videoCallInterface";

// THIS IS AN EXAMPLE FOR VIDEOCALLSLICE AND STATES WE COULD UTILIZE THROUGHOUT THE APP
const initialState: videoCallState = {
  active_call: false,
  recording: false,
  participans: {
    interviewer: {
      name: "",
    },
    participant: {
      name: "",
    },
  },
};

export const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    startCall: (state, action) => {
      state.active_call = action.payload;
    },
    stopCall: (state) => {
      state.active_call = false;
    },
    startRecording: (state) => {
      state.recording = true;
    },
    stopRecording: (state) => {
      state.recording = false;
    },
  },
});

export const { startCall, stopCall, startRecording, stopRecording } =
  videoCallSlice.actions;

export default videoCallSlice.reducer;
