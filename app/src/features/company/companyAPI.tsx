import { IMembersListResponse, SortBy } from '@/types/common';
import { CompanyId, ICompany, IMember } from '@/types/company';
import { transformMemberList } from '@/utils/memberListTransform';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const companyAPI = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Company', 'Members'],
  endpoints: (builder) => ({
    getCompanyMembers: builder.query<
      IMember[],
      {
        company_id: CompanyId;
        sort_by: SortBy;
      }
    >({
      query: ({ company_id, sort_by }) => ({
        url: `/company/members?company=${company_id}&sort_by=${sort_by}`,
        method: 'GET',
      }),
      transformResponse: transformMemberList,
      providesTags: ['Members'],
    }),
    getCompany: builder.query<ICompany, CompanyId>({
      query: (company_id) => ({
        url: `/company/?company=${company_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCompanyQuery, useGetCompanyMembersQuery } = companyAPI;
