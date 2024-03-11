import React, { useEffect, useState, useCallback, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from './utils';
import Header from '@/pages/Interview/Daily/Header/Header';
import HairCheck from '@/pages/Interview/Daily/HairCheck/HairCheck';
import {
  ApiErrorContainer,
  AppContainer,
  ApiErrorHeading1,
  ApiErrorParagraph,
  ApiErrorLink,
} from './StyledVideoCall'; // Update the import path
import { Interview } from '@/pages/Interview';
import { useNavigate } from 'react-router-dom';
import { instance } from '../axiosService/customAxios';

const STATE = {
  IDLE: 'STATE_IDLE',
  CREATING: 'STATE_CREATING',
  JOINING: 'STATE_JOINING',
  JOINED: 'STATE_JOINED',
  LEAVING: 'STATE_LEAVING',
  EXITING: 'STATE_EXITING',
  ERROR: 'STATE_ERROR',
  HAIRCHECK: 'STATE_HAIRCHECK',
};

export default function VideoCall() {
  const navigate = useNavigate();
  const [appState, setAppState] = useState(STATE.IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [interviewRoundDetails, setInterviewRoundDetails] = useState(null);
  const [hasRecordingStarted, setHasRecordingStarted] = useState(false);
  const [apiError] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const startHairCheck = useCallback(async (url) => {
    const existingInstance = DailyIframe.getCallInstance();

    const newCallObject = existingInstance
      ? existingInstance
      : DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setRoomUrl(url);
    setAppState(STATE.HAIRCHECK);
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
  }, []);


  const startTranscriptionBot = async (meetingUrl, interviewRoundId) => {
    try {
      const response = await instance.post(
        `${BACKEND_URL}/new_transcription/start_transcription/`,
        {
          meeting_url: meetingUrl,
          interviewRoundID: interviewRoundId,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to start transcription bot');
      }
      console.log('Transcription bot started successfully');
    } catch (error) {
      console.error('Error starting transcription bot:', error);
    }
  };

  const setDetails = async (details: any) => {
    new Promise((res, rej) => {
      setInterviewRoundDetails(details);
      localStorage.setItem('interviewRoundId', details.id);
      res(true);
    });
  };

  // const { ejectDate } = useRoomExp({
  //   onCountdown: useCallback(({ hours, minutes, seconds }) => {
  //     // Update the countdown in the state
  //     setMeetingExpiration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  //   }, []),
  // });

  const joinCall = useCallback(async () => {
    callObject?.join({ url: roomUrl });
  }, [callObject, roomUrl]);

  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    if (appState === STATE.ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE.IDLE);
      });
    } else {
      setAppState(STATE.LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);

  const startExitingCall = useCallback(() => {
    if (!callObject) return;
    navigate('/dashboard');
    callObject.destroy().then(() => {
      setRoomUrl(null);
      setCallObject(null);
      setAppState(STATE.EXITING);
    });
  }, [callObject]);

  const startRecordingCall = useCallback(() => {
    callObject?.startRecording();
    setHasRecordingStarted(true);
  }, [callObject]);

  const stopRecordingCall = useCallback(() => {
    callObject?.stopRecording();
  }, [callObject]);

  useEffect(() => {
    if (roomUrl) {
      localStorage.setItem('roomUrl', roomUrl);
    } else {
      localStorage.removeItem('roomUrl');
    }
  }, [roomUrl]);

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url) {
      startHairCheck(url);
    }
  }, [startHairCheck]);

  useEffect(() => {
    if (roomUrl !== null) {
      const pageUrl = pageUrlFromRoomUrl(roomUrl);
      if (pageUrl !== window.location.href) {
        window.history.replaceState(null, '', pageUrl);
      }
    }
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) return;

    const events = [
      'joined-meeting',
      'left-meeting',
      'error',
      'camera-error',
      'exit',
    ];

    function handleNewMeetingState() {
      switch (callObject?.meetingState?.()) {
        case 'joined-meeting':
          const interviewRoundIdd = localStorage.getItem('interviewRoundId');
          setAppState(STATE.JOINED);
          if (roomUrl) {
            startTranscriptionBot(roomUrl, interviewRoundIdd);
          }
          break;
        case 'left-meeting':
          const interviewRoundId = localStorage.getItem('interviewRoundId');
          const checkContentAndNavigate = async () => {
            try {
              const response = await instance.get(
                `${BACKEND_URL}/interview-rounds/check-content/${interviewRoundId}/`
              );
              const { hasContent } = response.data;
              console.log(hasContent);
              if (hasContent || hasRecordingStarted) {
                navigate('/interviews/conclusion/', {
                  state: { id: interviewRoundId, newInterview: true },
                });
              } else {
                navigate('/dashboard');
              }
            } catch (error) {
              console.error('Error checking interview content:', error);
              navigate('/dashboard');
            }
          };
          localStorage.clear();
          callObject?.destroy?.().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE.IDLE);
            checkContentAndNavigate();
          });
          break;
        case 'error':
          setAppState(STATE.ERROR);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    events.forEach((event) => callObject?.on(event, handleNewMeetingState));

    return () => {
      events.forEach((event) => callObject?.off(event, handleNewMeetingState));
    };
  }, [callObject, navigate]);

  const showCall =
    !apiError && [STATE.JOINING, STATE.JOINED, STATE.ERROR].includes(appState);
  const showHairCheck = !apiError && appState === STATE.HAIRCHECK;

  return (
    <AppContainer>
      {!showCall && <Header />}
      {apiError ? (
        <ApiErrorContainer>
          <ApiErrorHeading1>Error</ApiErrorHeading1>
          <ApiErrorParagraph>
            Room could not be created. Check if your `.env` file is set up
            correctly. For more information, see the{' '}
            <ApiErrorLink href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
              readme
            </ApiErrorLink>{' '}
            :
          </ApiErrorParagraph>
        </ApiErrorContainer>
      ) : showHairCheck ? (
        <DailyProvider callObject={callObject}>
          <HairCheck
            joinCall={joinCall}
            cancelCall={startExitingCall}
            setInterviewRoundDetails={setDetails}
          />
        </DailyProvider>
      ) : showCall ? (
        <DailyProvider callObject={callObject}>
          <Interview
            interviewDetails={interviewRoundDetails}
            leaveCall={startLeavingCall}
            recordCall={startRecordingCall}
            stopRecord={stopRecordingCall}
          />
        </DailyProvider>
      ) : null}
    </AppContainer>
  );
}
