// eslint-disable-next-line @typescript-eslint/no-redeclare
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type FeedbackData = {
  user: string | null;
  interview_round: string;
  score?: number;
  reaction?: number;
  note?: string;
  time: string;
  template_question?: string;
};
export type interviewType = {
  id: number,
  title: string
  candidate_id: number,
  candidate_name: string,
  interviewer?: {
      id: number,
      username: string,
      first_name: string,
      last_name: string,
      email: string,
      profile_picture: string
  },
  template_id: number,
  created_at: string,
  room_id: string,
  video_uri: string
}

export const interviewsApi = createApi({
    baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.user?.token?.access;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'interviewsAPI',
  tagTypes: ['Interviews'],
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
    createCandidate: builder.mutation({
      query: (candidateData) => ({
        url: '/interview-rounds/candidate/',
        method: 'POST',
        body: candidateData,
      }),
    }),
    getTemplate: builder.query<
      {
        data: interviewType;
      },
      {
        template_id: number ;
      }
    >({
      query: (template_id) => ({
        url: `templates/${template_id}/`
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
    getInterviewRoundFeedback: builder.query({
      query: (interviewRoundId: string) => ({
        url: `question_response/interviewer-feedback/${interviewRoundId}/`,
      }),
    }),
    getInterviewRoundQuestions: builder.query<
      {
        data: FeedbackData[];
      },
      {
        interviewRoundId: string;
      }
    >({
      query: ({ interviewRoundId }) => ({
        url: 'interview-rounds/interviewroundquestions/',
        params: { interviewRound: interviewRoundId },
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

    getInterviews: builder.query<object, void>({
      query: () => 'interview-rounds/',
      transformResponse: (res) =>
        res.sort((a: string[], b: string[]) => b.id - a.id),
      providesTags: ['Interviews'],
    }),


     getInterview: builder.query<
      {
        data: interviewType;
      },
      {
        interviewRoundId: number;
      }
    >({
      query: (interviewRoundId ) => ({
        url: `interview-rounds/${interviewRoundId}`,
      }),
    }),
        
    getTemplateQuestionsAndTopics: builder.query<
      {
        data: FeedbackData;
      },
      {
        template_id: number;
      }
    >({
      query: (template_id ) => ({
        url: `templates/${template_id}/questions/`,
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
    updateInterviewRound: builder.mutation({
      query: (data: any) => ({
        url: `/interview-rounds/${data.interview_round_id}/update/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetQuestionsBankQuery,
  useCreateInterviewRoundMutation,
  useCreateCandidateMutation,
  useGetTemplateQuery,
  useUpdateInterviewQuestionRatingMutation,
  useSendFeedbackMutation,
  useGetInterviewRoundFeedbackQuery,
  useGetInterviewRoundQuestionsQuery,
  useGetCandidateByUsernameQuery,
  useGetCandidateByIdQuery,
  useGetInterviewsQuery,
  useGetInterviewQuery,
  useGetTemplateQuestionsAndTopicsQuery,
  useGetInterviewRoundQuestionQuery,
  useUpdateInterviewRoundMutation,
} = interviewsApi;
