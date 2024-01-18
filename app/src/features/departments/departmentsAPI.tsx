import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  tagTypes: ['Departments'],
  endpoints: (builder) => ({
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
    }),
  }),
});

export const { useUpdateDepartmentMutation } = departmentsAPI;
