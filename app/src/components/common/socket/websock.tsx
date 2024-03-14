import React, { useEffect, useRef, useState } from 'react';
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
  const toastIdRef = useRef<string | null>(null);

  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const maxReconnectionAttempts = 5;
  const dispatch = useDispatch();

  // const simulateProgressUpdates = () => {
  //   // Mock messages at different intervals
  //   const messages = [
  //     { delay: 1000, message: 'Summarization process started' }, // After 1 second
  //     { delay: 3000, message: 'Processing Answers for: Question 1' }, // After 3 seconds
  //     { delay: 5000, message: 'Processing Answers for: Question 2' }, // After 5 seconds
  //     { delay: 7000, message: 'Summarization and QA processing completed' }, // After 7 seconds
  //   ];

  //   messages.forEach(({ delay, message }) => {
  //     setTimeout(() => handleUpdate(message), delay);
  //   });
  // };

  useEffect(() => {
    const savedStatusJson = localStorage.getItem('websocketStatus');
    if (savedStatusJson) {
      const savedStatus = JSON.parse(savedStatusJson);
      if (savedStatus) {
        setProgress(savedStatus.progress);
        dispatch(setStatus(savedStatus.status));
      }
    }
  }, [dispatch]);

  const handleUpdate = (message: string) => {
    setProgress((currentProgress) => {
      let newProgress = currentProgress;
      switch (true) {
        case message === 'Summarization process started':
          newProgress = Math.max(newProgress, 25);
          dispatch(setStatus('loading'));
          localStorage.setItem(
            'websocketStatus',
            JSON.stringify({ status: 'loading', progress: newProgress })
          );
          break;
        case message.startsWith('Processing Answers for:'):
          const increment = 5 + Math.random() * 5;
          newProgress = Math.min(75, newProgress + increment);
          break;
        case message === 'Summarization and QA processing completed':
          newProgress = 100;
          localStorage.setItem(
            'websocketStatus',
            JSON.stringify({ status: 'completed', progress: newProgress })
          );
          break;
      }
      if (newProgress === 100) {
        dispatch(setStatus('completed'));
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
      }
      return newProgress;
    });
  };

  // useEffect(() => {
  //   if (!newInterview) {
  //     // simulateProgressUpdates();
  //   }
  // }, [newInterview]);

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
      setReconnectionAttempts(0);
      dispatch(setStatus('loading'));
    };

    socket.onerror = socket.onclose = () => {
      setReconnectionAttempts((attempts) => attempts + 1);
    };

    socket.onmessage = (event) => {
      const { type, message } = JSON.parse(event.data);
      console.log('Received message:', message);
      if (type === 'update') {
        handleUpdate(message);
      }
    };

    return () => {
      socket.close();
    };
  }, [interviewRoundId, newInterview, reconnectionAttempts, dispatch]);

  useEffect(() => {
    if (progress === 100) {
      // Close dialog and toast automatically when progress is complete
      setShowDialog(false);
    }
  }, [progress]);

  useEffect(() => {
    if (newInterview && toastIdRef.current === null && !showDialog) {
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
        duration: progress === 100 ? 1000 : Infinity,
      });
      toastIdRef.current = id;
    }
  }, [newInterview, progress, showDialog, toast]);

  console.log(progress);

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
