import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import videoApi from "./videoApi";
import DailyIframe from "@daily-co/daily-js";

interface VideoCallState {
  roomUrl: string | null;
  callObject: any | null;
  appState: string;
  apiError: boolean; // Replace 'any' with the correct type if known
}

const initialState: VideoCallState = {
  roomUrl: null,
  callObject: null,
  appState: "STATE_IDLE",
  apiError: false,
};

export const createCall = createAsyncThunk("videoCall/createCall", async () => {
  try {
    const room = await videoApi.createRoom();
    return room.url;
  } catch (error) {
    console.error("Error creating room", error);
    throw new Error("Could not create room");
  }
});

export const startHairCheck = createAsyncThunk(
  "videoCall/startHairCheck",
  async (url: string) => {
    const newCallObject = DailyIframe.createCallObject();
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
    return { callObject: newCallObject, url };
  }
);

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setApiError: (state, action: PayloadAction<boolean>) => {
      state.apiError = action.payload;
    },
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  extraReducers: (builder) => {
    builder
      .addCase(createCall.fulfilled, (state, action: PayloadAction<string>) => {
        state.roomUrl = action.payload;
      })
      .addCase(
        startHairCheck.fulfilled,
        (state, action: PayloadAction<{ callObject: any; url: string }>) => {
          // Replace 'any' with the correct type if known
          state.callObject = action.payload.callObject;
          state.roomUrl = action.payload.url;
        }
      );
  },
});

export default videoCallSlice.reducer;
