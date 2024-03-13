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

const WebSocketComponent = ({ interviewRoundId, newInterview }) => {
  const toast = useToast();
  const [showDialog, setShowDialog] = useState(newInterview);
  const [progress, setProgress] = useState(1);
  const [toastId, setToastId] = useState(null);

  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const maxReconnectionAttempts = 5;

  const handleUpdate = (message: string) => {
    let newProgress = progress;
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

    setProgress(newProgress);
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

    let messageReceived = false;

    socket.onopen = () => {
      setReconnectionAttempts(0); // Reset reconnection attempts on successful connection
    };

    socket.onerror = socket.onclose = () => {
      // Increment reconnection attempts and possibly attempt to reconnect
      setReconnectionAttempts((attempts) => attempts + 1);
    };

    socket.onmessage = (event) => {
      messageReceived = true;
      const { type, message } = JSON.parse(event.data);
      if (type === 'update') {
        handleUpdate(message);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!messageReceived) {
        setShowDialog(false);
        if (toastId) {
          toast.dismiss(toastId);
        }
      }
    }, 30000); // 30 seconds

    return () => {
      socket.close();
      clearTimeout(timeoutId);
    };
  }, [interviewRoundId, newInterview, reconnectionAttempts]);

  useEffect(() => {
    if (progress === 100) {
      // Close dialog and toast automatically when progress is complete
      setShowDialog(false);
      if (toastId) {
        toast.dismiss(toastId); // Adjusted this line
      }
    }
  }, [progress, toast, toastId]);

  useEffect(() => {
    if (newInterview) {
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
