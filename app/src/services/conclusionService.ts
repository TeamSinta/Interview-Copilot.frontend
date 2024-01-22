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
        const TranscriptAPIResponse = await instance.get(TranscriptAPI);
        const summarizedAnswersAPIResponse = await instance.get(
          summarizedAnswersAPI
        );
        const summaryInfoAPIResponse = await instance.get(summaryInfoAPI);
        const videoUrlAPIResponse = await instance.get(videoUrlAPI);
        const emojiFeedbackApiResponse = await instance.get(emojiFeedbackApi);

        if (TranscriptAPIResponse?.status === 200)
          setQuestionsTranscript(TranscriptAPIResponse.data);
        if (summarizedAnswersAPIResponse?.status === 200)
          setSummarizedAnswers(summarizedAnswersAPIResponse.data);
        if (summaryInfoAPIResponse?.status === 200)
          setSummaryInfo(summaryInfoAPIResponse.data);
        if (videoUrlAPIResponse?.status === 200)
          setVideoUrl(videoUrlAPIResponse.data);
        if (emojiFeedbackApiResponse?.status === 200)
          setEmojisData(emojiFeedbackApiResponse.data);
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
