import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const QuestionsAPI = createApi({
  reducerPath: 'QuestionsAPI',
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
  tagTypes: ['Questions', 'QuestionBanks'],
  endpoints: (builder) => ({
    getQuestions: builder.query<any, undefined>({
      query: () => '/question/',
      transformResponse: (res) =>
        res.sort((a: string[], b: string[]) => b.id - a.id),
      providesTags: ['Questions'],
    }),
    addQuestion: builder.mutation({
      query: (template) => ({
        url: `/question/`,
        method: 'POST',
        body: template,
      }),
      invalidatesTags: ['Questions'],
    }),
    getQuestionDetail: builder.query({
      query: (id) => ({
        url: `/question/${id}/`,
      }),
    }),
    updateQuestion: builder.mutation({
      query: (question) => ({
        url: `/question/${question.id}/`,
        method: 'PATCH',
        body: question,
      }),
      invalidatesTags: ['Questions'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}/`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Questions'],
    }),
    getQuestionBanks: builder.query<any, undefined>({
      query: () => '/question/question-banks/',
      transformResponse: (res) =>
        res.sort((a: string[], b: string[]) => b.id - a.id),
      providesTags: ['QuestionBanks'],
    }),
    addQuestionBank: builder.mutation({
      query: (template) => ({
        url: '/question/question-banks/',
        method: 'POST',
        body: template,
      }),
    }),
    getQuestionBankDetail: builder.query({
      query: (id) => ({
        url: `/question/question-banks/${id}/`,
      }),
    }),
    updateQuestionBank: builder.mutation({
      query: (questionBank) => ({
        url: `/question/question-banks/${questionBank.id}/update/`,
        method: 'PATCH',
        body: questionBank,
      }),
      invalidatesTags: ['QuestionBanks'],
    }),
    deleteQuestionBank: builder.mutation({
      query: (id) => ({
        url: `/question/question-banks/${id}/`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['QuestionBanks'],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionDetailQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useAddQuestionBankMutation,
  useGetQuestionBanksQuery,
  useGetQuestionBankDetailQuery,
  useDeleteQuestionBankMutation,
  useUpdateQuestionBankMutation,
} = QuestionsAPI;
