import axios from "axios";
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

  const TranscriptAPI = `${import.meta.env.VITE_BACKEND_URL}/transcription/get_transcripts_for_questions/${interviewRoundId}/`;
  const summarizedAnswersAPI = `${import.meta.env.VITE_BACKEND_URL}/question_response/question_summarized_answers/${interviewRoundId}/`;
  const summaryInfoAPI = `${import.meta.env.VITE_BACKEND_URL}/summary/generate/${interviewRoundId}/`;
  const videoUrlAPI = `${import.meta.env.VITE_BACKEND_URL}/interview-rounds/interviewRoundVideo/${interviewRoundId}/`;
  const emojiFeedbackApi = `${import.meta.env.VITE_BACKEND_URL}/question_response/interviewer-feedback/${interviewRoundId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(TranscriptAPI);
        const response2 = await axios.get(summarizedAnswersAPI);
        const response3 = await axios.get(summaryInfoAPI);
        const response4 = await axios.get(videoUrlAPI);
        const response5 = await axios.get(emojiFeedbackApi);

        setQuestionsTranscript(response1.data);
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
  }, [emojiFeedbackApi, summarizedAnswersAPI, summaryInfoAPI, videoUrlAPI]);

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
