import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// setCompany -- new workspace
// setMembers
// selectMember
import { RootState } from '@/app/store';
import { ICompany, IMember } from './companyInterface';

export interface CompanyState {
  currentCompany: ICompany | null;
  members?: IMember[];
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
      state.members = action.payload;
    },
  },
});

export const { setCompany, setMembers } = companySlice.actions;
export const selectCompany = (state: RootState) => state.company;

export default companySlice.reducer;
