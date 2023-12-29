import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const templatesAPI = createApi({
  reducerPath: 'templatesAPI',
  baseQuery: fetchBaseQuery({
<<<<<<< Updated upstream
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
=======
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the access token from cookies or any other storage
      const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      
      if (accessToken) {
        // Add the access token to the request headers
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        url: `/templates/templates/`,
        method: 'POST',
=======
        url: `/templates/templates`,
        method: "POST",
>>>>>>> Stashed changes
        body: template,
      }),
      invalidatesTags: ['Templates'],
    }),
    getTemplateDetail: builder.query({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
      }),
    }),

    updateTemplate: builder.mutation({
      query: (template) => ({
        url: `/templates/templates/${template.id}/`,
        method: 'PATCH',
        body: template,
      }),
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
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
  useAddTopicMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
} = templatesAPI;
