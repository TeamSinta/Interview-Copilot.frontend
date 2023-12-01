import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

export interface MemberState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // departments list
  pictureUrl: string;
}

const initialState: MemberState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  // departments list
  pictureUrl: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMemberInfo: (state, actions) => {
      state.id = actions.payload.id;
      state.firstName = actions.payload.firstName;
      state.lastName = actions.payload.lastName;
      state.email = actions.payload.email;
      state.pictureUrl = actions.payload.pictureUrl;
    },
  },
});

export const { setMemberInfo } = memberSlice.actions;
export const selectSetMember = (state: RootState) => state.member;

export default memberSlice.reducer;
