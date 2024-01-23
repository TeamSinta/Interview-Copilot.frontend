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
    // members: [],
  },
  allDepartments: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setAllDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      state.allDepartments = action.payload;
    },
    setDepartment: (state, action: PayloadAction<IDepartment>) => {
      state.currentDepartment = action.payload;
    },
  },
});

export const { setAllDepartments, setDepartment } = departmentSlice.actions;
export const selectDepartment = (state: RootState) => state.department;

export const selectAllDepartments = (state: RootState) =>
  state.department.allDepartments;

export default departmentSlice.reducer;
