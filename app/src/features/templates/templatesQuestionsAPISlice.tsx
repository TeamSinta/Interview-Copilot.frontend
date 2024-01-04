import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const templateQuestionsAPI = createApi({
  reducerPath: 'templateQuestionsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/templates/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Questions'],
  endpoints: (builder) => ({
    getTemplateQuestions: builder.query<object, void>({
      query: () => 'template_questions/',
      providesTags: ['Questions'],
    }),
    addTemplateQuestion: builder.mutation({
      query: (template) => ({
        url: `template_questions/`,
        method: 'POST',
        body: template,
      }),
      invalidatesTags: ['Questions'],
    }),
    updateTemplateQuestion: builder.mutation({
      query: (question) => ({
        url: `template_questions/${question.id}/`,
        method: 'PATCH',
        body: question,
      }),
      invalidatesTags: ['Questions'],
    }),
    deleteTemplateQuestion: builder.mutation({
      query: (id) => ({
        url: `template_questions/${id}/`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Questions'],
    }),
  }),
});

export const {
  useGetTemplateQuestionsQuery,
  useAddTemplateQuestionMutation,
  useUpdateTemplateQuestionMutation,
  useDeleteTemplateQuestionMutation,
} = templateQuestionsAPI;
