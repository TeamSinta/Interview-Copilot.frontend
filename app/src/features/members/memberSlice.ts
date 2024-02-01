import { RootState } from '@/app/store';
import { IMember } from '@/types/company';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MemberState {
  member: IMember;
  currentMembers: IMember[];
}

const initialState: MemberState = {
  member: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    username: '',
    role: '',
  },
  currentMembers: [],
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberInfo: (state, actions) => {
      state.member.id = actions.payload.id;
      state.member.firstName = actions.payload.firstName;
      state.member.lastName = actions.payload.lastName;
      state.member.email = actions.payload.email;
      state.member.profilePicture = actions.payload.profilePicture;
      state.member.role = actions.payload.role;
    },

    setCurrentMembers: (state, action: PayloadAction<IMember[]>) => {
      state.currentMembers = action.payload.map((member) => ({
        ...member,
        selected: member.selected ?? false,
      }));
    },
    toggleMemberSelected: (state, action: PayloadAction<string>) => {
      const memberId = action.payload;
      const memberIndex = state.currentMembers.findIndex(
        (member) => member.id === memberId
      );
      if (memberIndex !== -1) {
        state.currentMembers[memberIndex].selected =
          !state.currentMembers[memberIndex].selected;
      }
    },
  },
});

export const { setMemberInfo, setCurrentMembers, toggleMemberSelected } =
  memberSlice.actions;
export const selectSetMember = (state: RootState) => state.member.member;
export const selectCurrentMembers = (state: RootState) =>
  state.member.currentMembers;

export default memberSlice.reducer;
