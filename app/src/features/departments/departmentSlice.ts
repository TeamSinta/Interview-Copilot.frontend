import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepartment } from '../departments/departmentsInterface';

export interface DepartmentState {
  currentDepartment: IDepartment;
  allDepartments: IDepartment[];
}

const initialState: DepartmentState = {
  currentDepartment: {
    id: '',
    title: '',
  },
  allDepartments: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getAllDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      state.allDepartments = action.payload;
    },
    getDepartmentDetails: (state, action: PayloadAction<IDepartment>) => {
      state.currentDepartment = action.payload;
    },
    updateDepartmentDetails: (state, action: PayloadAction<IDepartment>) => {
      state.currentDepartment = action.payload.id;
      state.currentDepartment = action.payload.title;
    },
  },
});

export const {
  getAllDepartments,
  getDepartmentDetails,
  updateDepartmentDetails,
} = departmentSlice.actions;
export const selectDepartment = (state: RootState) => state.department;

export const selectAllDepartments = (state: RootState) =>
  state.department.allDepartments;

export default departmentSlice.reducer;
