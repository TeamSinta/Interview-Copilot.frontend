export interface ICompany {
  id: string | null;
  name: string | null;
  members?: IMember[];
}

export interface IMember {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  member_type: string;
}
