import { DataLoading } from "../utils/utilEnum";

export interface IMockMembers {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  member_type: string;
}

export interface IMember extends IMockMembers {
  member_idx: any;
  selected: boolean;
}

export interface RolesCreateSlice {
  title: string;
  all_members: IMember[];
  status:
    | DataLoading.UNSEND
    | DataLoading.FULFILLED
    | DataLoading.PENDING
    | DataLoading.REJECTED;
}
