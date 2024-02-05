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
      transformResponse: (res) => {
        // Sort the templates first
        res.sort((a: string[], b: string[]) => b.id - a.id);

        // Transform each template
        return res.map((template) => {
          // Transform the interviewers array and assign it back to the template
          template.interviewers = template.interviewers.map((interviewer) => ({
            id: interviewer.id,
            firstName: interviewer.first_name,
            lastName: interviewer.last_name,
            profilePicture: interviewer.profile_picture,
          }));

          return {
            ...template, // Copy other properties of the template
            interviewers: template.interviewers, // Include the transformed interviewers array
          };
        });
      },
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
    getTemplateDetail: builder.query({
      query: (id) => ({
        url: `/templates/templates/${id}/`,
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
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
  useAddTopicMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
} = templatesAPI;
