import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const templatesAPI = createApi({
  reducerPath: "templatesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Templates", "Topics"],
  endpoints: (builder) => ({
    getTemplates: builder.query<object, void>({
      query: () => "/templates/templates/",
      transformResponse: (res) =>
        res.sort((a: string[], b: string[]) => b.id - a.id),
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
    getTemplateDetail: builder.query({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
      }),
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
  useDeleteTopicMutation,
} = templatesAPI;
