import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import teamwork from '@/assets/images/teamwork.jpg';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useDispatch } from 'react-redux';
import { setStatus } from './websockSlice';

const WebSocketComponent = ({ interviewRoundId, newInterview }) => {
  const toast = useToast();
  const [showDialog, setShowDialog] = useState(newInterview);
  const [progress, setProgress] = useState(1);
  const [toastId, setToastId] = useState(null);

  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const maxReconnectionAttempts = 5;
  const dispatch = useDispatch();

  const handleUpdate = (message: string) => {
    setProgress((currentProgress) => {
      let newProgress = currentProgress;
      switch (true) {
        case message === 'Summarization process started':
          newProgress = Math.max(newProgress, 25);
          break;
        case message.startsWith('Processing Answers for:'):
          const increment = 5 + Math.random() * 5;
          newProgress = Math.min(75, newProgress + increment);
          break;
        case message === 'Summarization and QA processing completed':
          newProgress = 100;
          break;
      }
      // Check for dispatching 'Completed' status if newProgress reaches 100%
      if (newProgress === 100) {
        dispatch(setStatus('Completed'));
      }
      return newProgress;
    });
  };

  useEffect(() => {
    if (!newInterview || reconnectionAttempts >= maxReconnectionAttempts) {
      return;
    }

    const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host =
      import.meta.env.VITE_BACKEND_BASE_URL_SHORT || window.location.host;
    const socket = new WebSocket(
      `${wsScheme}://${host}/ws/transcription_consumer/${interviewRoundId}/`
    );

    socket.onopen = () => {
      setReconnectionAttempts(0); // Reset reconnection attempts on successful connection
      dispatch(setStatus('loading'));
    };

    socket.onerror = socket.onclose = () => {
      // Increment reconnection attempts and possibly attempt to reconnect
      setReconnectionAttempts((attempts) => attempts + 1);
    };

    socket.onmessage = (event) => {
      const { type, message } = JSON.parse(event.data);
      if (type === 'update') {
        handleUpdate(message);
        // Check for progress completion inside here to avoid overriding
        if (progress >= 100) {
          dispatch(setStatus('completed'));
        }
      }
    };

    // Removed the second onmessage definition

    return () => {
      socket.close();
    };
  }, [
    interviewRoundId,
    newInterview,
    reconnectionAttempts,
    dispatch,
    progress,
  ]);

  useEffect(() => {
    if (progress === 100 && toastId !== null) {
      // Close dialog and toast automatically when progress is complete
      setShowDialog(false);
      toast.dismiss(toastId);
      setToastId(null);
    }
  }, [progress, toast, toastId]);

  useEffect(() => {
    if (newInterview && toastId === null && !showDialog) {
      const id = toast.toast({
        title: 'Processing started',
        description: (
          <div className="flex flex-col items-start gap-1">
            <p className="text-xs text-slate-700 leading-tight mb-2">
              Initializing transcription and summarization...
            </p>
            <Progress value={progress} className="w-[360px]" />
          </div>
        ),
        duration: Infinity,
      });
      setToastId(id);
    }
  }, [newInterview, progress, toast]);

  return (
    <>
      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AspectRatio ratio={16 / 9} className="bg-white">
                <img
                  src={teamwork}
                  className="rounded-md object-cover"
                  alt="teamwork_image"
                />
              </AspectRatio>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-medium text-slate-800 leading-tight mb-2 mt-12">
                  We are obsessed with perfection 🤩
                </h1>
                <AlertDialogDescription>
                  Processing your transcription and summarization...
                </AlertDialogDescription>
                <Progress value={progress} className="w-[360px] my-6" />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setShowDialog(false)}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default WebSocketComponent;
