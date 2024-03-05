import { instance } from '@/utils/axiosService/customAxios';
import { useState, useEffect } from 'react';


const useTranscriptData = (interviewRoundId:string) => {
  const [transcript, setTranscript] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`${import.meta.env.VITE_BACKEND_URL}/interview-rounds/GetTranscriptFromS3/${interviewRoundId}/`);
        setTranscript(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching transcript data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (interviewRoundId) {
      fetchData();
    }
  }, [interviewRoundId]);

  return { transcript, loading, error };
};

export default useTranscriptData;
