export interface ICompany {
  id: string;
  name: string | null;
  members: IMember[];
}

export interface IMember {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  email: string;
  username: string;
  role: string;
  member_type: string;
  selected?: boolean;
}

export type CompanyId = string;
