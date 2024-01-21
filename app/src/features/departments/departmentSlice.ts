import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepartment } from '../departments/departmentsInterface';

export interface DepartmentState {
  id: string;
  title: string;
}

const initialState: DepartmentState = {
  id: '',
  title: '',
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getDepartmentDetails: (state, actions) => {
      state.id = actions.payload.id;
      state.title = actions.payload.title;
    },
    updateDepartmentDetails: (state, actions: PayloadAction<IDepartment>) => {
      state.id = actions.payload.id;
      state.title = actions.payload.title;
    },
  },
});

export const { getDepartmentDetails, updateDepartmentDetails } =
  departmentSlice.actions;
export const selectDepartment = (state: RootState) => state.department;

export default departmentSlice.reducer;
