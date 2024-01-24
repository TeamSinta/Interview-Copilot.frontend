export interface IOption {
  name: string;
  value: string;
  selected?: boolean;
}
export interface IMembersList {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_picture: string | null;
  selected?: boolean;
}

export type AccessToken = string | undefined;
export type SortBy = string;
