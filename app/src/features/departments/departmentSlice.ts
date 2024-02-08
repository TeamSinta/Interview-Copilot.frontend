import { RootState } from '@/app/store';
import { IDepartment, IDepartmentState } from '@/types/department';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IDepartmentState = {
  allDepartments: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setAllDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      state.allDepartments = action.payload;
    },
  },
});

export const { setAllDepartments } = departmentSlice.actions;
export const selectDepartment = (state: RootState) => state.department;

export const selectAllDepartments = (state: RootState) =>
  state.department.allDepartments;

export default departmentSlice.reducer;
