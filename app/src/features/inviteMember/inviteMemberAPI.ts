import { instance } from "@/utils/axiosService/customAxios";
import { IInviteMember } from "./inviteMemberInterface";

const baseURL = "/inviteMember";

export const postInviteMember = async (inviteMember: IInviteMember) => {
  return await instance
    .post(baseURL, JSON.stringify(inviteMember), {
      headers: {
        "content-type": "text/json",
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
