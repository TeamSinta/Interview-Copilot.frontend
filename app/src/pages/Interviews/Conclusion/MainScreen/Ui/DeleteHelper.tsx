import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { instance } from '@/utils/axiosService/customAxios';
import { useNavigate } from 'react-router-dom';

const DeleteDialog = ({ interviewRoundId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Using Axios for the delete request
      await instance.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/interview-rounds/delete/${interviewRoundId}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            // Include other necessary headers, such as authorization tokens
          },
        }
      );

      navigate('/interviews');
    } catch (error) {
      console.error('Failed to delete interview round:', error);
      // Handle error based on error.response or error.message as needed
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'link'} className="decoration-transparent">
            Delete this Interview?
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              interview and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={'destructive'} onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
