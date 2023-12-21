export interface IUserData {
  first_name: string | null;
  last_name: string | null;
};

export interface IMembersList {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_picture: string | null;
};

export interface IDepartment {
  title: string;
  id: string;
};
