// eslint-disable-next-line @typescript-eslint/no-redeclare
import { instance } from "@/utils/axiosService/customAxios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    .get(`${BASE_URL}/question/question-banks/`)
    .then((result) => {
      return result.data;
    })
    .catch((e) => {});
};

export const createInterviewRound = async (
  title: string,
  template_id: string | null,
  token: string,
  meeting_room_id: string
) => {
  const data = {
    title: title,
    template_id: template_id,
    room_id: meeting_room_id,
  };

  console.log(data);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const result = await instance.post(
    `${BASE_URL}/interview-rounds/create/`,
    data,
    config
  );

  return result.data;
};

export const getTemplate = async (
  template_id: string | null,
  token: string
) => {
  const result = await instance.get(`${BASE_URL}/templates/${template_id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

export const updateInterviewQuestionRating = async (
  rating: number,
  question_id: string,
  interview_round_id: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = {
    interview_round_id: interview_round_id,
    question_id: question_id,
    rating: rating,
  };
  const result = await instance.post(
    `${BASE_URL}/interview-rounds/rateInterviewRoundQuestion/`,
    data,
    config
  );

  // return result.data;
};

export const sendFeedback = async (data: FeedbackData, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await instance.post(
      `${BASE_URL}/question_response/interviewer-feedback/`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error so that the calling function can handle it
  }
};

export const getInterviewRoundQuestions = async (
  interviewRoundId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await instance.get(
      `${BASE_URL}/interview-rounds/interviewroundquestions/?interviewRound=${interviewRoundId}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error so that the calling function can handle it
  }
};

export const getCandidateByUsername = async (
  username: string,
  token: string
) => {
  const result = await instance.get(
    `${BASE_URL}/user/usersbyusername/${username}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result.data;
};

export const getCandidateById = async (id: string, token: string) => {
  const result = await instance.get(`${BASE_URL}/user/usersbyid/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

export const getInterviews = async (token: string) => {
  const result = await instance.get(`${BASE_URL}/interview-rounds/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

export const getInterview = async (interviewRoundId: string, token: string) => {
  const result = await instance.get(
    `${BASE_URL}/interview-rounds/${interviewRoundId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result.data;
};

export const getTemplateQuestionsAndTopics = async (
  template_id: number,
  token: string
) => {
  const result = await instance.get(
    `${BASE_URL}/templates/${template_id}/questions/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

export const getInterviewRoundQuestion = async (
  interview_round_id: number,
  question_id: string,
  token: string
) => {
  const result = await instance.get(
    `${BASE_URL}/interview-rounds/${interview_round_id}/${question_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};
