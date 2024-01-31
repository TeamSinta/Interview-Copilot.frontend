import { RootState } from '@/app/store';
import { IMember } from '@/types/company';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MemberState {
  member: IMember;
  companyMembers: IMember[];
  departmentMembers: IMember[];
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
  companyMembers: [],
  departmentMembers: [],
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
    setDepartmentMembers: (state, action: PayloadAction<IMember[]>) => {
      state.departmentMembers = action.payload.map((member) => ({
        ...member,
        selected: member.selected ?? false,
      }));
    },
    setCompanyMembers: (state, action: PayloadAction<IMember[]>) => {
      state.departmentMembers = action.payload.map((member) => ({
        ...member,
        selected: member.selected ?? false,
      }));
    },
  },
});

export const { setMemberInfo, setDepartmentMembers, setCompanyMembers } =
  memberSlice.actions;
export const selectSetMember = (state: RootState) => state.member.member;

export default memberSlice.reducer;
