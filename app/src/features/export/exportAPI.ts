import { InterviewRoundId } from '@/types/common';
import { instance } from '@/utils/axiosService/customAxios';

const exportInterviewPdf = async (interview_round_id: InterviewRoundId) => {
  const api_url = `${
    import.meta.env.VITE_BACKEND_URL
  }/export_to_pdf?interview_round_id=${interview_round_id}`;

  try {
    const response = await instance.get(api_url, { responseType: 'blob' });
    const blob = response.data;

    // Default filename in case parsing fails
    let filename = 'SintaInterviewExport.pdf';

    // Where the filename is picked up from the response
    const contentDisposition = response.headers['content-disposition'];

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    // Create a URL for the blob and initiate download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export default exportInterviewPdf;
