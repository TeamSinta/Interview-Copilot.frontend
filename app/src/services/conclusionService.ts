import axios from "axios";
import config from "@/config.json";
import { useState, useEffect } from "react";

const ConclusionData = (interviewRoundId: string) => {
  const [summaryInfo, setSummaryInfo] = useState([]);
  const [questionsTranscript, setQuestionsTranscript] = useState([]);
  const [summarizedAnswers, setSummarizedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [emojisData, setEmojisData] = useState([]);
  const [error, setError] = useState(null);

  // TODO: Swap out '1' with the interview ID.

  // const questionsTranscriptAPI = `${config.apiURL}/transcription/get_transcripts_for_questions/${interviewRoundId}/`;
  const summarizedAnswersAPI = `${config.apiURL}/question_response/question_summarized_answers/${interviewRoundId}/`;
  const summaryInfoAPI = `${config.apiURL}/summary/generate/${interviewRoundId}/`;
  const videoUrlAPI = `${config.apiURL}/interview-rounds/interviewRoundVideo/${interviewRoundId}/`;
  const emojiFeedbackApi = `${config.apiURL}/question_response/interviewer-feedback/${interviewRoundId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response1 = await axios.get(questionsTranscriptAPI);
        const response2 = await axios.get(summarizedAnswersAPI);
        const response3 = await axios.get(summaryInfoAPI);
        const response4 = await axios.get(videoUrlAPI);
        const response5 = await axios.get(emojiFeedbackApi);

        setQuestionsTranscript([]);
        setSummarizedAnswers(response2.data);
        setSummaryInfo(response3.data);
        setVideoUrl(response4.data);
        setEmojisData(response5.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    ,
    // questionsTranscriptAPI
    summarizedAnswersAPI,
    summaryInfoAPI,
  ]);

  return [
    summarizedAnswers,
    questionsTranscript,
    summaryInfo,
    videoUrl,
    emojisData,
    loading,
    error,
  ];
};

export default ConclusionData;
