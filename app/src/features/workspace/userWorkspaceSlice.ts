import { createSlice } from "@reduxjs/toolkit";

export interface WorkSpace {
  id: number | null;
  name: string | null;
}

const initialState = {
  id: null,
  name: "",
};

const userWorkspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    resetCurrentWorkspace: () => initialState,
  },
});

export const { setCurrentWorkspace, resetCurrentWorkspace } =
  userWorkspaceSlice.actions;
export default userWorkspaceSlice.reducer;
