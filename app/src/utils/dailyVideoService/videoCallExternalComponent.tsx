import React, { useEffect, useState, useCallback, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "./utils";
import Header from "@/pages/Interview/Daily/Header/Header";
import {
  ApiErrorContainer,
  AppContainer,
  ApiErrorHeading1,
  ApiErrorParagraph,
  ApiErrorLink,
} from "./StyledVideoCall"; // Update the import path

import { useNavigate } from "react-router-dom";
import HairCheckCandidate from "@/pages/Interview/Daily/HairCheck/HairCheckCanadiate";
import InterviewScreenCandidate from "@/pages/Interview/InterviewScreenCandidate";
import EndCallScreen from "@/pages/Interview/Daily/Call/EndCallScreenExternal";

const STATE = {
  IDLE: "STATE_IDLE",
  CREATING: "STATE_CREATING",
  JOINING: "STATE_JOINING",
  JOINED: "STATE_JOINED",
  LEAVING: "STATE_LEAVING",
  ERROR: "STATE_ERROR",
  HAIRCHECK: "STATE_HAIRCHECK",
};

export default function VideoCallExternal() {
  const navigate = useNavigate();
  const [appState, setAppState] = useState(STATE.IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [apiError] = useState(false);

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
      navigate("/end-call-screen");
    }
  }, [callObject, appState]);

  const urlRef = useRef();

  useEffect(() => {
    if (roomUrl) {
      localStorage.setItem("roomUrl", roomUrl);
    } else {
      localStorage.removeItem("roomUrl");
    }
  }, [roomUrl]);

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url) {
      startHairCheck(url);
    }
  }, []);

  useEffect(() => {
    if (roomUrl !== null) {
      const pageUrl = pageUrlFromRoomUrl(roomUrl);
      if (pageUrl !== window.location.href) {
        window.history.replaceState(null, "", pageUrl);
      }
    }
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error", "camera-error"];

    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE.JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE.IDLE);
            navigate("/");
          });
          break;
        case "error":
          setAppState(STATE.ERROR);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  const showCall =
    !apiError && [STATE.JOINING, STATE.JOINED, STATE.ERROR].includes(appState);
  const showHairCheck = !apiError && appState === STATE.HAIRCHECK;
  const leaveCall = !apiError && appState === STATE.LEAVING;

  return (
    <AppContainer>
      {!showCall && <Header />}
      {apiError ? (
        <ApiErrorContainer>
          <ApiErrorHeading1>Error</ApiErrorHeading1>
          <ApiErrorParagraph>
            Room could not be created. Check if your `.env` file is set up
            correctly. For more information, see the{" "}
            <ApiErrorLink href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
              readme
            </ApiErrorLink>{" "}
            :
          </ApiErrorParagraph>
        </ApiErrorContainer>
      ) : showHairCheck ? (
        <DailyProvider callObject={callObject}>
          <HairCheckCandidate
            joinCall={joinCall}
            cancelCall={startLeavingCall}
          />
        </DailyProvider>
      ) : showCall ? (
        <DailyProvider callObject={callObject}>
          <InterviewScreenCandidate leaveCall={startLeavingCall} />
        </DailyProvider>
      ) : leaveCall ? (
        <DailyProvider callObject={callObject}>
          <EndCallScreen />
        </DailyProvider>
      ) : null}
    </AppContainer>
  );
}
