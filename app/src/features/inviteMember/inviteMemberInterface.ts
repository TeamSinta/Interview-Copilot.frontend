import { DataLoading } from "../utils/utilEnum";

export interface IInviteMemberCreateSlice {
  invited_member: {
    member_idx: number;
    member_name: string;
    member_url: string;
    member_type: string;
    selected: boolean;
  };
  invite_member: {
    member_email: string;
    admin: boolean;
  };
  status:
    | DataLoading.UNSEND
    | DataLoading.FULFILLED
    | DataLoading.PENDING
    | DataLoading.REJECTED;
}

export interface IInviteMember {
  member_email: string;
  admin: boolean;
}
