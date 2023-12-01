import React, { useCallback, useState } from "react";
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
} from "@daily-co/daily-react";

import {
  NavCamIcon,
  NavCircle,
  NavMicIcon,
  NavScreenShareIcon,
  CamHideIcon,
  MicMuteIcon,
  VideoSound,
  SoundIcon,
  SettingIcon,
  ChatIcon,
} from "@/components/common/svgIcons/Icons";

import {
  StyledBottomBar,
  StyledBottomNavButtons,
  StyledColumns,
  StyledFinishBtn,
  StyledMiddleColumns,
} from "./StyledBottomNavBar";
import { Grid } from "@mui/material";
import "./index.css";
import { openModal } from "@/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import Chat from "../Chat/Chat";

function BottomNavBarCandidate(props: any) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { setReactClicked, reactClicked, leaveCall } = props;
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();
  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const [showChat, setShowChat] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);

  useDailyEvent(
    "app-message",
    useCallback(() => {
      if (!showChat) {
        setNewChatMessage(true);
      }
    }, [showChat])
  );
  const dispatch: AppDispatch = useDispatch();

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(openModal({ modalType }));
  };

  const toggleScreenShare = () => {
    isSharingScreen ? stopScreenShare() : startScreenShare();
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
  };
  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    onClickModalOpen(MODAL_TYPE.VIDEO_SETTINGS);
  };
  return (
    <StyledBottomBar>
      <Grid container style={{ justifyContent: "space-between" }}>
        <Grid lg={2} md={2} sm={2} xl={2} xs={2}>
          <StyledColumns>
            <StyledBottomNavButtons
              style={{ marginLeft: "22px" }}
              onClick={toggleAudio}
              type="button"
            >
              {mutedAudio ? <MicMuteIcon /> : <NavMicIcon />}
            </StyledBottomNavButtons>
            <StyledBottomNavButtons onClick={toggleVideo} type="button">
              {mutedVideo ? <CamHideIcon /> : <NavCamIcon />}
            </StyledBottomNavButtons>
            <StyledBottomNavButtons onClick={openSettingsModal}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  stroke: "white",
                }}
              >
                <SettingIcon />
              </div>
            </StyledBottomNavButtons>
          </StyledColumns>
        </Grid>

        <Grid lg={6} md={6} sm={6} xl={6} xs={6}>
          {" "}
          <StyledMiddleColumns>
            {/* Integrate Daily's tray components here */}
            <StyledBottomNavButtons
              onClick={toggleScreenShare}
              type="button"
              style={{ gap: "4px" }}
            >
              {isSharingScreen ? (
                <NavScreenShareIcon />
              ) : (
                <NavScreenShareIcon />
              )}
              <span
                className="record-label"
                style={{ marginLeft: "5px", marginRight: "5px" }}
              >
                {isSharingScreen ? " Stop sharing screen" : " Share screen"}
              </span>
            </StyledBottomNavButtons>

            <div style={{ marginRight: "10px", marginLeft: "10px" }}>
              <NavCircle />
            </div>

            <StyledBottomNavButtons onClick={toggleChat} type="button">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="record-label"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                >
                  {showChat ? "Hide Chat" : "Chat"}
                </span>{" "}
                <span className="icon" style={{ marginLeft: "5px" }}>
                  {showChat ? (
                    <div style={{ display: "flex", stroke: "white" }}>
                      {" "}
                      <ChatIcon />{" "}
                    </div>
                  ) : (
                    <div style={{ display: "flex", stroke: "white" }}>
                      {" "}
                      <ChatIcon />{" "}
                    </div>
                  )}
                </span>
              </div>
            </StyledBottomNavButtons>
            {/* ... (other tray buttons) */}
          </StyledMiddleColumns>
        </Grid>

        <Grid lg={2} md={2} sm={2} xl={2} xs={2}>
          {" "}
          <Chat showChat={showChat} toggleChat={toggleChat} />
          <StyledColumns style={{ paddingRight: "20px", float: "right" }}>
            <StyledFinishBtn className="accentPurple" onClick={leaveCall}>
              Finish
            </StyledFinishBtn>
          </StyledColumns>
        </Grid>
      </Grid>
    </StyledBottomBar>
  );
}

export default BottomNavBarCandidate;
