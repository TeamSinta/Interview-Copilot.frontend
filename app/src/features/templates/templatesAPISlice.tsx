import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const templatesAPI = createApi({
  reducerPath: 'templatesAPI',
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

  tagTypes: ['Templates', 'Topics'],
  endpoints: (builder) => ({
    getTemplates: builder.query<object, void>({
      query: () => '/templates/templates/',
      transformResponse: (res) =>
        res.sort((a: string[], b: string[]) => b.id - a.id),
      providesTags: ['Templates'],
    }),
    addTemplate: builder.mutation({
      query: (template) => ({
        url: `/templates/templates/`,
        method: 'POST',
        body: template,
      }),
      invalidatesTags: ['Templates'],
    }),
    addTemplateQuestions: builder.mutation({
      query: (obj) => ({
        url: `templates/${obj.templateID}/questions/add/`,
        method: 'POST',
        body: obj.template,
      }),
      invalidatesTags: ['Templates'],
    }),
    getTemplateDetail: builder.query({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
      }),
    }),
    getTemplateTopics: builder.query({
      query: (templateID) => ({
        url: `templates/${templateID.templateID}/topics/`,
      }),
    }),

    updateTemplate: builder.mutation({
      query: (template) => {
        const id =
          template instanceof FormData ? template.get('id') : template.id;
        return {
          url: `/templates/templates/${id}/`,
          method: 'PATCH',
          body: template,
        };
      },
      invalidatesTags: ['Templates'],
    }),

    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Templates'],
    }),
    getTopics: builder.query<object, void>({
      query: () => '/templates/topics/',
      providesTags: ['Topics'],
    }),
    addTopic: builder.mutation({
      query: (template) => ({
        url: '/templates/topics/',
        method: 'POST',
        body: template,
      }),
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/templates/topics/${id}/`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Topics'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateDetailQuery,
  useGetTemplateTopicsQuery,
  useAddTemplateMutation,
  useAddTemplateQuestionsMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
  useAddTopicMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
} = templatesAPI;
