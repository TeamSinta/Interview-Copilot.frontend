import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import apiExportInterviewPdf from '@/features/export/exportAPI';

import { InterviewRoundId } from '@/types/common';

interface IInterviewRoundExportPdfError {
  response?: {
    status: number;
    data?: {
      message?: string;
      detail?: string;
    };
  };
  message: string;
}

function useExportToPdf() {
  const { toast } = useToast();

  const exportInterviewPdf = async (interview_round_id: InterviewRoundId) => {
    try {
      toast({
        title: 'Success',
        description:
          'The export has started. Your download will begin shortly.',
      });
      await apiExportInterviewPdf(interview_round_id);
    } catch (error) {
      console.error('Download error:', error);
      const typedError = error as IInterviewRoundExportPdfError;
      let action = undefined;
      let title = 'Error';
      let message = 'An unexpected error occurred. Please try again later.';
      if (typedError.response) {
        switch (typedError.response.status) {
          case 400:
            title = 'Bad request';
            message = 'Please check your request and try again.';
            break;
          case 403:
            title = 'Forbidden';
            message = 'You do not have permission to perform this action.';
            break;
          case 404:
            title = 'Not found';
            message = 'The requested resource was not found.';

            break;
          case 500:
            message =
              'Oops! Something went wrong on our end. If the problem persists, please contact support.';
            action = (
              <ToastAction
                altText="button to contact support"
                onClick={() => console.log('Placeholder for support link')}
              >
                Support
              </ToastAction>
            );
            break;
        }
      }
      toast({
        variant: 'destructive',
        title: title,
        description: message,
        action,
      });
    }
  };

  return { exportInterviewPdf };
}

export default useExportToPdf;
