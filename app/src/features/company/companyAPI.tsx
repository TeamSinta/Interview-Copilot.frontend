import { IMembersList, SortBy } from '@/types/common';
import { CompanyId, ICompany } from '@/types/company';
import { DepartmentId } from '@/types/department';
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
      IMembersList[],
      {
        company_id: CompanyId;
        department_id: DepartmentId;
        sort_by: SortBy;
      }
    >({
      query: ({ company_id, department_id, sort_by }) => ({
        url: `/company/members?company=${company_id}&department=${department_id}&sort_by=${sort_by}`,
        method: 'GET',
      }),
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
