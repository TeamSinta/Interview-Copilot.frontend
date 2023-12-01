import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MembersList, UserData } from './userSettingsInterface';
import {
	AccessToken,
	CompanyID,
	DepartmentID,
	UserID
} from './userSettingTypes';

export const userAPI = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`
	}),
	tagTypes: ['Departments'],
	endpoints: (builder) => ({
		updateUser: builder.mutation<
			void,
			{ access: AccessToken; userData: UserData }
		>({
			query: ({ access, userData }) => {
				return {
					url: '/user/userdetails/',
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${access}`
					},
					body: userData
				};
			}
		}),
		deactivateUser: builder.mutation<void, { access: AccessToken }>({
			query: ({ access }) => {
				return {
					url: '/user/delete/',
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${access}`
					}
				};
			}
		}),
		getCompanyMembers: builder.query<
			MembersList[],
			{
				access: AccessToken;
				company_id: CompanyID;
				department_id: DepartmentID;
				sort_by: string;
			}
		>({
			query: ({ access, company_id, department_id, sort_by }) => ({
				url: `/company/members?company=${company_id}&department=${department_id}&sort_by=${sort_by}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access}`
				}
			})
		}),
		getCompanyDepartments: builder.mutation<
			void,
			{
				access: AccessToken;
				company_id: CompanyID;
			}
		>({
			query: ({ access, company_id }) => {
				return {
					url: `/company/departments?company=${company_id}`,
					method: 'GET',
					headers: {
						Authorization: `Bearer ${access}`
					}
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
				access: AccessToken;
				company_id: CompanyID;
				departmentTitle: string; // Assuming the department has a title field
			}
		>({
			query: ({ access, company_id, departmentTitle }) => ({
				url: `/company/departments`, // Updated URL as per your API
				method: 'POST',
				headers: {
					Authorization: `Bearer ${access}`
				},
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
