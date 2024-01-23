import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDepartment } from './departmentsInterface';
import { CompanyID } from '../settingsDetail/userSettingTypes';

export const departmentsAPI = createApi({
  reducerPath: 'departmentsApi',
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
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getCompanyDepartments: builder.query<
      IDepartment[],
      {
        company_id?: CompanyID;
        sort_by: string;
      }
    >({
      query: ({ company_id, sort_by }) => {
        return {
          url: `/company/departments?company=${company_id}&sort_by=${sort_by}`,
          method: 'GET',
        };
      },
      providesTags: ['Department'],
    }),
    createDepartment: builder.mutation<
      void,
      { company_id: any; departmentTitle: any }
    >({
      query: ({ departmentTitle, company_id }) => {
        return {
          url: `/company/departments`,
          method: 'POST',
          body: {
            title: departmentTitle,
            company_id: company_id,
          },
        };
      },
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation<
      void,
      { company_id: any; department_id: any; departmentData: any }
    >({
      query: ({ departmentData, company_id, department_id }) => {
        return {
          url: `/company/departments?company=${company_id}&department=${department_id}`,
          method: 'PUT',
          body: departmentData,
        };
      },
      invalidatesTags: ['Department'],
    }),
    deleteDepartment: builder.mutation<
      void,
      { company_id: any; department_id: any }
    >({
      query: ({ company_id, department_id }) => {
        return {
          url: `/company/departments?company=${company_id}&department=${department_id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  useGetCompanyDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsAPI;
