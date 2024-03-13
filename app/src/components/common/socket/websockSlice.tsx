import { createSlice } from '@reduxjs/toolkit';

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    status: 'loading', // Initial status can be 'Loading', 'Completed'
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = websocketSlice.actions;

export default websocketSlice.reducer;
