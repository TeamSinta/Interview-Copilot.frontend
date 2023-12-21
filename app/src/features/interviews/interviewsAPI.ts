// eslint-disable-next-line @typescript-eslint/no-redeclare
import { instance } from '@/utils/axiosService/customAxios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type FeedbackData = {
  user: string;
  interview_round: string;
  score?: number;
  reaction?: number;
  note?: string;
  time: string;
};

export const getQuestionsBank = async () => {
  return await instance
    .get(`${BACKEND_URL}/question/question-banks/`)
    .then((result) => {
      return result.data;
    })
    .catch((e) => {});
};

export const createInterviewRound = async (
  title: string,
  template_id: string | null,
  meeting_room_id: string
) => {
  const data = {
    title: title,
    template_id: template_id,
    room_id: meeting_room_id,
  };

  const result = await instance.post(
    `${BACKEND_URL}/interview-rounds/create/`,
    data
  );

  return result.data;
};

export const getTemplate = async (template_id: string | null) => {
  const result = await instance.get(`${BACKEND_URL}/templates/${template_id}/`);

  return result.data;
};

export const updateInterviewQuestionRating = async (
  rating: number,
  question_id: string,
  interview_round_id: string
) => {
  const data = {
    interview_round_id: interview_round_id,
    question_id: question_id,
    rating: rating,
  };
  const result = await instance.post(
    `${BACKEND_URL}/interview-rounds/rateInterviewRoundQuestion/`,
    data
  );

  // return result.data;
};

export const sendFeedback = async (data: FeedbackData) => {
  try {
    const response = await instance.post(
      `${BACKEND_URL}/question_response/interviewer-feedback/`,
      data
    );
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error so that the calling function can handle it
  }
};

export const getInterviewRoundQuestions = async (interviewRoundId: string) => {
  try {
    const response = await instance.get(
      `${BACKEND_URL}/interview-rounds/interviewroundquestions/?interviewRound=${interviewRoundId}`
    );
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error so that the calling function can handle it
  }
};

export const getCandidateByUsername = async (username: string) => {
  const result = await instance.get(
    `${BACKEND_URL}/user/usersbyusername/${username}/`
  );

  return result.data;
};

export const getCandidateById = async (id: string) => {
  const result = await instance.get(`${BACKEND_URL}/user/usersbyid/${id}/`);

  return result.data;
};

export const getInterviews = async () => {
  const result = await instance.get(`${BACKEND_URL}/interview-rounds/`);

  return result.data;
};

export const getInterview = async (interviewRoundId: string) => {
  const result = await instance.get(
    `${BACKEND_URL}/interview-rounds/${interviewRoundId}`
  );

  return result.data;
};

export const getTemplateQuestionsAndTopics = async (template_id: number) => {
  const result = await instance.get(
    `${BACKEND_URL}/templates/${template_id}/questions/`
  );
  return result.data;
};

export const getInterviewRoundQuestion = async (
  interview_round_id: number,
  question_id: string
) => {
  const result = await instance.get(
    `${BACKEND_URL}/interview-rounds/${interview_round_id}/${question_id}/`
  );
  return result.data;
};
