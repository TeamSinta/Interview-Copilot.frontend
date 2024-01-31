export interface ICompany {
  id: string;
  name: string | null;
}

export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  username: string;
  role: string;
  selected?: boolean;
}

export type CompanyId = string;
