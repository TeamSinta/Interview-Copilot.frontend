// import { InterviewDetailResponse } from "./inverviewDetailInterface";
// import { interviewDetail } from "@/mocks/mockDatas";
// export const getInterviewDetail = () => {
//   return new Promise<{ data: IInterviewDetailStaging }>((resolve) =>
//     setTimeout(() => resolve({ data: interviewDetail }), 500)
//   );
// };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/*  TODO: Update APIS with interface stastify TS */

export const InterviewDetailAPI = createApi({
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
  endpoints: (builder) => ({
    getInterviewTemplate: builder.query({
      query: (templateId) => `templates/templates/${templateId}/`,
    }),
    getInterviewSections: builder.query({
      query: (templateId) => `templates/topics/?templateId=${templateId}`,
    }),
    getInterviewDetail: builder.query({
      query: (templateId) =>
        `templates/template_questions/?templateId=${templateId}`,
    }),
  }),
});

export const {
  useGetInterviewTemplateQuery,
  useGetInterviewSectionsQuery,
  useGetInterviewDetailQuery,
} = InterviewDetailAPI;

export default InterviewDetailAPI;
