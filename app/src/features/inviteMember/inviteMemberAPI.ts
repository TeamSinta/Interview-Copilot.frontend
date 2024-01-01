// import { instance } from '@/utils/axiosService/customAxios';
// import { IInviteMember } from './inviteMemberInterface';

// const baseURL = '/inviteMember';

// export const postInviteMember = async (inviteMember: IInviteMember) => {
//   return await instance
//     .post(baseURL, JSON.stringify(inviteMember), {
//       headers: {
//         'content-type': 'text/json',
//       },
//     })
//     .then((result) => {
//       return result.data;
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IInviteMember } from './inviteMemberInterface';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const InviteMemberAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    postInviteMember: builder.mutation({
      query: (inviteMember: IInviteMember) => ({
        url: '/inviteMember',
        method: 'POST',
        body: JSON.stringify(inviteMember),
        headers: {
          'Content-Type': 'text/json',
        },
      }),
    }),
  }),
});

export const { usePostInviteMemberMutation } = InviteMemberAPI;

export default InviteMemberAPI;