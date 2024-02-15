import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ICompany, IMember } from '@/types/company';

export interface CompanyState {
  currentCompany: ICompany | null;
  members: IMember[];
}

const initialState: CompanyState = {
  currentCompany: null,
  members: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<ICompany>) => {
      state.currentCompany = action.payload;
    },
    setMembers: (state, action: PayloadAction<IMember[]>) => {
      state.members = action.payload.map((member) => ({
        ...member,
        selected: member.selected ?? false,
      }));
    },
    selectedMember: (state, actions) => {
      const { memberIdx } = actions.payload;
      const selectedMember = state.members.find(
        (member: IMember) => member.id === memberIdx
      );
      if (selectedMember) {
        selectedMember.selected
          ? (selectedMember.selected = false)
          : (selectedMember.selected = true);
      }
    },
    resetMemberSelection: (state) => {
      state.members.map((member) => ({
        ...member,
        selected: false,
      }));
    },
  },
});

export const { setCompany, setMembers, selectedMember, resetMemberSelection } =
  companySlice.actions;
export const selectCompany = (state: RootState) => state.company;

export default companySlice.reducer;
