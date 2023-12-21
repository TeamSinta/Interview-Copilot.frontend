import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MembersList, UserData } from './userSettingsInterface';
import {
	CompanyID,
	DepartmentID,
	UserID
} from './userSettingTypes';

export const userAPI = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as any)?.user?.token?.access;
			if (token) {
			  headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		  },
	}),
	tagTypes: ['Departments'],
	endpoints: (builder) => ({
		updateUser: builder.mutation<
			void,
			{ userData: UserData }
		>({
			query: ({ userData }) => {
				return {
					url: '/user/userdetails/',
					method: 'PUT',
					body: userData
				};
			}
		}),
		deactivateUser: builder.mutation({
			query: () => {
				return {
					url: '/user/delete/',
					method: 'DELETE',
				};
			}
		}),
		getCompanyMembers: builder.query<
			MembersList[],
			{
				company_id: CompanyID;
				department_id: DepartmentID;
				sort_by: string;
			}
		>({
			query: ({ company_id, department_id, sort_by }) => ({
				url: `/company/members?company=${company_id}&department=${department_id}&sort_by=${sort_by}`,
				method: 'GET',
			})
		}),
		getCompanyDepartments: builder.mutation<
			void,
			{
				company_id: CompanyID;
			}
		>({
			query: ({  company_id }) => {
				return {
					url: `/company/departments?company=${company_id}`,
					method: 'GET',
				};
			},
			providesTags: ['Departments']
		}),
		getUserDepartments: builder.mutation<
			void,
			{
				user_id: UserID;
				company_id: CompanyID;
			}
		>({
			query: ({ user_id, company_id }) => {
				return {
					url: `/user/${user_id}/company/${company_id}/departments/`,
					method: 'GET'
				};
			}
		}),
		createNewDepartment: builder.mutation<
			void,
			{
				company_id: CompanyID;
				departmentTitle: string; // Assuming the department has a title field
			}
		>({
			query: ({ company_id, departmentTitle }) => ({
				url: `/company/departments`, // Updated URL as per your API
				method: 'POST',
				body: {
					title: departmentTitle,
					company_id: company_id // Assuming 'title' is the expected field name for the department title
				}
			}),
			invalidatesTags: ['Departments']
		})
	})
});

export const {
	useUpdateUserMutation,
	useDeactivateUserMutation,
	useGetCompanyMembersQuery,
	useGetCompanyDepartmentsMutation,
	useGetUserDepartmentsMutation,
	useCreateNewDepartmentMutation
} = userAPI;
