import { instance } from '@/utils/axiosService/customAxios';
import { useState, useEffect } from 'react';

const ConclusionData = (interviewRoundId: string) => {
  const [summaryInfo, setSummaryInfo] = useState([]);
  const [questionsTranscript, setQuestionsTranscript] = useState([]);
  const [summarizedAnswers, setSummarizedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [emojisData, setEmojisData] = useState([]);
  const [error, setError] = useState(null);

  const TranscriptAPI = `${
    import.meta.env.VITE_BACKEND_URL
  }/transcription/get_transcripts_for_questions/${interviewRoundId}/`;
  const summarizedAnswersAPI = `${
    import.meta.env.VITE_BACKEND_URL
  }/question_response/question_summarized_answers/${interviewRoundId}/`;
  const summaryInfoAPI = `${
    import.meta.env.VITE_BACKEND_URL
  }/summary/generate/${interviewRoundId}/`;
  const videoUrlAPI = `${
    import.meta.env.VITE_BACKEND_URL
  }/interview-rounds/interviewRoundVideo/${interviewRoundId}/`;
  const emojiFeedbackApi = `${
    import.meta.env.VITE_BACKEND_URL
  }/question_response/interviewer-feedback/${interviewRoundId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // commented these lines for now
        // const response1 = await instance.get(TranscriptAPI);
        // const response2 = await instance.get(summarizedAnswersAPI);
        // const response3 = await instance.get(summaryInfoAPI);
        const response4 = await instance.get(videoUrlAPI);
        const response5 = await instance.get(emojiFeedbackApi);

        // commented these lines for now
        // setQuestionsTranscript(response1.data);
        // setSummarizedAnswers(response2.data);
        // setSummaryInfo(response3.data);
        setVideoUrl(response4.data);
        setEmojisData(response5.data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    TranscriptAPI,
    emojiFeedbackApi,
    summarizedAnswersAPI,
    summaryInfoAPI,
    videoUrlAPI,
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
