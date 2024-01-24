import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DepartmentId, IDepartment, IUserData } from '@/types/department';
import { IMembersList, SortBy } from '@/types/common';
import { CompanyId } from '@/types/company';
import { UserId } from '@/types/user';

export const userAPI = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['Departments'],
  endpoints: (builder) => ({
    updateUser: builder.mutation<void, { userData: IUserData }>({
      query: ({ userData }) => {
        return {
          url: '/user/userdetails/',
          method: 'PUT',
          body: userData,
        };
      },
    }),
    deactivateUser: builder.mutation({
      query: () => {
        return {
          url: '/user/delete/',
          method: 'DELETE',
        };
      },
    }),
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
    getCompanyDepartments: builder.mutation<
      IDepartment[],
      {
        company_id: CompanyId;
        sort_by: SortBy;
      }
    >({
      query: ({ company_id, sort_by }) => {
        return {
          url: `/company/departments?company=${company_id}&sort_by=${sort_by}`,
          method: 'GET',
        };
      },
      providesTags: ['Departments'],
    }),
    getUserDepartments: builder.mutation<
      void,
      {
        user_id: UserId;
        company_id: CompanyId;
      }
    >({
      query: ({ user_id, company_id }) => {
        return {
          url: `/user/${user_id}/company/${company_id}/departments/`,
          method: 'GET',
        };
      },
    }),
    createDepartmentMember: builder.mutation({
      query: ({ company_id, department_id, user_id, body = {} }) => ({
        url: `/company/department/members?department=${department_id}&company=${company_id}&invitee=${user_id}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeactivateUserMutation,
  useGetCompanyMembersQuery,
  useGetCompanyDepartmentsMutation,
  useGetUserDepartmentsMutation,
  useCreateDepartmentMemberMutation,
} = userAPI;
