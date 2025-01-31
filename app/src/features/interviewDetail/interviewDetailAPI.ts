import { instance } from '@/utils/axiosService/customAxios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/*  TODO: Update APIS with interface stastify TS */

export const getInterviewTemplate = async (templateId: string) => {
  const response = await instance.get(
    `${BACKEND_URL}/templates/templates/${templateId}/`
  );
  return response.data;
};

export const getInterviewSections = async (templateId: string) => {
  try {
    const response = await instance.get(`${BACKEND_URL}/templates/topics/`);
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
      `${BACKEND_URL}/templates/template_questions/`
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

export const saveContentToBackend = async (summaryId: string, description: any) => {
  try {
    const response = await instance.patch(
      `${BACKEND_URL}/summary/${summaryId}/update-description/`,
      {
        description: description // Assuming you want to update the description field
      }
    );
    return response.data;
  } catch (error) {
    // Handle errors as needed
    throw error;
  }
};
