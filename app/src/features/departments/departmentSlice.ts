import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

export interface DepartmentState {
  id: string;
  title: string;
}

const initialState: DepartmentState = {
  id: '',
  title: '',
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartmentInfo: (state, actions) => {
      state.id = actions.payload.id;
      state.title = actions.payload.title;
    },
  },
});

export const { setDepartmentInfo } = departmentSlice.actions;
export const selectSetDepartment = (state: RootState) => state.department;

export default departmentSlice.reducer;
