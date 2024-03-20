import { instance } from '@/utils/axiosService/customAxios';
import { useState, useEffect } from 'react';

const ConclusionData = (interviewRoundId: string, websocketStatus: string) => {
  const [summaryInfo, setSummaryInfo] = useState([]);
  const [questionsTranscript, setQuestionsTranscript] = useState([]);
  const [summarizedAnswers, setSummarizedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [emojisData, setEmojisData] = useState([]);
  const [error, setError] = useState(null);

  const shouldRefetch = websocketStatus === 'completed';

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        `/transcription/get_transcripts_for_questions/${interviewRoundId}/`,
        `/question_response/question_summarized_answers/${interviewRoundId}/`,
        `/summary/generate/${interviewRoundId}/`,
        `/interview-rounds/interviewRoundVideo/${interviewRoundId}/`,
        `/question_response/interviewer-feedback/${interviewRoundId}/`,
      ];

      try {
        setLoading(true);
        const results = await Promise.allSettled(
          urls.map((url) => instance.get(`${import.meta.env.VITE_BACKEND_URL}${url}`))
        );

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            switch (index) {
              case 0:
                setQuestionsTranscript(result.value.data);
                break;
              case 1:
                setSummarizedAnswers(result.value.data);
                break;
              case 2:
                setSummaryInfo(result.value.data);
                break;
              case 3:
                setVideoUrl(result.value.data);
                break;
              case 4:
                setEmojisData(result.value.data);
                break;
              default:
                break;
            }
          } else {
            console.error(`Error fetching data from URL index ${index}:`, result.reason);
            setError(result.reason);
          }
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interviewRoundId, shouldRefetch]);

  return [summarizedAnswers, questionsTranscript, summaryInfo, videoUrl, emojisData, loading, error];
};

export default ConclusionData;
