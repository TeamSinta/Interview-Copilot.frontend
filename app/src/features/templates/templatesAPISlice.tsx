import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TemplateResponse } from "./templatesInterface";
import {
  AccessToken,
  CompanyID,
  DepartmentID,
  TemplateID,
} from "../settingsDetail/userSettingTypes";

export const templatesAPI = createApi({
  reducerPath: "templatesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
  }),
  tagTypes: ["Templates", "Topics"],
  endpoints: (builder) => ({
    getTemplates: builder.query<
      TemplateResponse[],
      {
        access: AccessToken;
        company_id: CompanyID;
        department_id: DepartmentID;
        sort_by: string;
      }
    >({
      query: ({ access, company_id, department_id, sort_by }) => ({
        url: `/templates/templates`,
        method: "GET",
        params: {
          company: company_id,
          department: department_id,
          sort_by: sort_by,
        },
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
      providesTags: ["Templates"],
    }),
    addTemplate: builder.mutation({
      query: (template) => ({
        url: `/templates/templates/`,
        method: "POST",
        body: template,
      }),
      invalidatesTags: ["Templates"],
    }),

    getTemplateDetail: builder.query<
      TemplateResponse[],
      {
        access: AccessToken;
        company_id: CompanyID;
        id: TemplateID;
      }
    >({
      query: ({ access, company_id, id }) => ({
        url: `/templates/templates/${id}`,
        method: "GET",
        params: {
          company: company_id,
        },
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
      providesTags: ["Templates"],
    }),

    updateTemplate: builder.mutation({
      query: (template) => ({
        url: `/templates/templates/${template.id}/`,
        method: "PATCH",
        body: template,
      }),
      invalidatesTags: ["Templates"],
    }),

    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Templates"],
    }),
    getTopics: builder.query<object, void>({
      query: () => "/templates/topics/",
      providesTags: ["Topics"],
    }),
    addTopic: builder.mutation({
      query: (template) => ({
        url: "/templates/topics/",
        method: "POST",
        body: template,
      }),
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/templates/topics/${id}/`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Topics"],
    }),
  }),
});

export const {
	useGetTemplatesQuery,
	useGetTemplateDetailQuery,
	useAddTemplateMutation,
	useDeleteTemplateMutation,
	useUpdateTemplateMutation,
	useAddTopicMutation,
	useGetTopicsQuery,
	useDeleteTopicMutation
} = templatesAPI;
