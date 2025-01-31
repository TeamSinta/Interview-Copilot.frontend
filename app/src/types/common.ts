export interface IOption {
  title?: string;
  name?: string;
  value: string;
  selected?: boolean;
}
export interface IMembersListResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  member_type: string;
  profile_picture: string;
  selected?: boolean;
}

export type InterviewRoundId = number;
export type AccessToken = string | undefined;
export type SortBy = string;
