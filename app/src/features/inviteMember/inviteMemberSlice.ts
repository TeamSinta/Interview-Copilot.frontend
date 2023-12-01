import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataLoading } from "../utils/utilEnum";
import {
  IInviteMember,
  IInviteMemberCreateSlice,
} from "./inviteMemberInterface";
import { postInviteMember } from "./inviteMemberAPI";

export const initialState: IInviteMemberCreateSlice = {
  invited_member: {
    member_idx: 0,
    member_name: "",
    member_url: "",
    member_type: "",
    selected: false,
  },
  invite_member: {
    member_email: "",
    admin: false,
  },
  status: DataLoading.UNSEND,
};

export const postInviteMemberAsync = createAsyncThunk(
  "inviteMember/postInviteMember",
  async (inviteMember: IInviteMember) => {
    const response = await postInviteMember(inviteMember);
    return response;
  }
);
//[Where]: How
export const inviteMemberSlice = createSlice({
  name: "inviteMember",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postInviteMemberAsync.pending, (state) => {
      state.status = DataLoading.PENDING;
    });
    builder.addCase(postInviteMemberAsync.fulfilled, (state, action) => {
      // Object.assign(state.invite_member, initialState.invite_member);
      state.invited_member = { ...action.payload, selected: false };
      state.status = DataLoading.FULFILLED;
    });
  },
  reducers: {
    // [Invite] : checked invite member as admin
    setInviteAsAdmin: (state, actions) => {
      const { admin } = actions.payload;
      state.invite_member.admin = admin;
    },
    // [Invite] : invite member email adress
    setInviteMemberInput: (state, actions) => {
      const { invite_member } = actions.payload;
      state.invite_member.member_email = invite_member;
    },
    inviteMemberSliceReset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setInviteAsAdmin,
  setInviteMemberInput,
  inviteMemberSliceReset,
} = inviteMemberSlice.actions;

export const selectInviteMember = (state: RootState) => state.inviteMember;
export default inviteMemberSlice.reducer;
