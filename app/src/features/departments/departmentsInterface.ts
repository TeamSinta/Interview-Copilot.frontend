export interface IDepartment {
  id: string;
  title: string;
}

export interface IDepartments {
  departments: {
    department: IDepartment[];
  };
}
