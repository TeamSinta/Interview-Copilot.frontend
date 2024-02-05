import { IOption } from './common';

export interface IDepartment {
  title: string;
  id: string;
}

export type DepartmentsList = {
  id: string;
  title: string;
};

export interface IUserData {
  first_name: string | null;
  last_name: string | null;
}

export interface IDepartmentDropDown {
  departments: IOption[];
  handleSetDepartment: (value: DepartmentId) => void;
  workspaceId: string | null;
  multi?: boolean;
}

export interface IDepartmentListProps {
  onChange: (data: IOption) => void;
  data: IOption;
}

export interface IDepartmentState {
  allDepartments: IDepartment[];
}

export interface CreateDepartmentResponse {
  detail: string;
  id: number;
}
export type DepartmentId = string;
export type DepartmentTitle = string;
