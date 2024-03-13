import { createSlice } from '@reduxjs/toolkit';

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    status: 'idle', // Example initial state
    progress: 0,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    // potentially other reducers...
  },
});

export const { setStatus, setProgress } = websocketSlice.actions;

export default websocketSlice.reducer;
