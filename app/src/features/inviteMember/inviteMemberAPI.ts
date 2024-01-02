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