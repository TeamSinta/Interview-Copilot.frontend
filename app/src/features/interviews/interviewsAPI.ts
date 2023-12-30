// eslint-disable-next-line @typescript-eslint/no-redeclare
// import { instance } from '@/utils/axiosService/customAxios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type FeedbackData = {
  user: string;
  interview_round: string;
  score?: number;
  reaction?: number;
  note?: string;
  time: string;
};

export const interviewsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getQuestionsBank: builder.query({
      query: () => 'question/question-banks/',
    }),
    createInterviewRound: builder.mutation({
      query: (data) => ({
        url: 'interview-rounds/create/',
        method: 'POST',
        body: data,
      }),
    }),
    getTemplate: builder.query<
      {
        data: FeedbackData;
      },
      {
        template_id: string | null;
        token: string;
      }
    >({
      query: ({ template_id, token }) => ({
        url: `templates/${template_id}/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    updateInterviewQuestionRating: builder.mutation({
      query: (data) => ({
        url: 'interview-rounds/rateInterviewRoundQuestion/',
        method: 'POST',
        body: data,
      }),
    }),
    sendFeedback: builder.mutation({
      query: (data: FeedbackData) => ({
        url: 'question_response/interviewer-feedback/',
        method: 'POST',
        body: data,
      }),
    }),
    getInterviewRoundQuestions: builder.query<
      {
        data: FeedbackData[];
      },
      {
        interviewRoundId: string;
        token: string;
      }
    >({
      query: ({ interviewRoundId, token }) => ({
        url: 'interview-rounds/interviewroundquestions/',
        params: { interviewRound: interviewRoundId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getCandidateByUsername: builder.query<
      {
        data: FeedbackData;
      },
      {
        username: string;
        token: string;
      }
    >({
      query: ({ username, token }) => ({
        url: `user/usersbyusername/${username}/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getCandidateById: builder.query<
      {
        data: FeedbackData;
      },
      {
        id: string;
        token: string;
      }
    >({
      query: ({ id, token }) => ({
        url: `user/usersbyid/${id}/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getInterviews: builder.query<
      {
        data: FeedbackData[];
      },
      {
        token: string;
      }
    >({
      query: ({ token }) => ({
        url: 'interview-rounds/',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getInterview: builder.query<
      {
        data: FeedbackData;
      },
      {
        interviewRoundId: string;
        token: string;
      }
    >({
      query: ({ interviewRoundId, token }) => ({
        url: `interview-rounds/${interviewRoundId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getTemplateQuestionsAndTopics: builder.query<
      {
        data: FeedbackData;
      },
      {
        template_id: number;
        token: string;
      }
    >({
      query: ({ template_id, token }) => ({
        url: `templates/${template_id}/questions/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    getInterviewRoundQuestion: builder.query<
      {
        data: FeedbackData;
      },
      {
        interview_round_id: number;
        question_id: string;
        token: string;
      }
    >({
      query: ({ interview_round_id, question_id, token }) => ({
        url: `interview-rounds/${interview_round_id}/${question_id}/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetQuestionsBankQuery,
  useCreateInterviewRoundMutation,
  useGetTemplateQuery,
  useUpdateInterviewQuestionRatingMutation,
  useSendFeedbackMutation,
  useGetInterviewRoundQuestionsQuery,
  useGetCandidateByUsernameQuery,
  useGetCandidateByIdQuery,
  useGetInterviewsQuery,
  useGetInterviewQuery,
  useGetTemplateQuestionsAndTopicsQuery,
  useGetInterviewRoundQuestionQuery,
} = interviewsApi;
