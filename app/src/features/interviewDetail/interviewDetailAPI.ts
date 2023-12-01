// import { InterviewDetailResponse } from "./inverviewDetailInterface";
// import { interviewDetail } from "@/mocks/mockDatas";
// export const getInterviewDetail = () => {
//   return new Promise<{ data: IInterviewDetailStaging }>((resolve) =>
//     setTimeout(() => resolve({ data: interviewDetail }), 500)
//   );
// };

import { instance } from "@/utils/axiosService/customAxios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/*  TODO: Update APIS with interface stastify TS */

export const getInterviewTemplate = async (templateId: string) => {
  const response = await instance.get(
    `${BASE_URL}/templates/templates/${templateId}/`
  );
  return response.data;
};

export const getInterviewSections = async (templateId: string) => {
  try {
    const response = await instance.get(`${BASE_URL}/templates/topics/`);
    const topics = response.data;
    const filteredTopics = topics.filter(
      (topic) => topic.template_id.toString() === templateId
    );

    return filteredTopics;
  } catch (error) {
    // Handle errors as needed
    throw error;
  }
};

export const getInterviewDetail = async (templateId: string) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/templates/template_questions/`
    );
    const questions = response.data;
    const filteredQuestions = questions.filter(
      (question) => question.template_id.toString() === templateId
    );

    return filteredQuestions;
  } catch (error) {
    // Handle errors as needed
    throw error;
  }
};
