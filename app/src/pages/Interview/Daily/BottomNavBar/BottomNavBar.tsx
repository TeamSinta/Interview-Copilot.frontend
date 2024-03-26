import {
  useAudioTrack,
  useDaily,
  useDailyEvent,
  useLocalParticipant,
  useRecording,
  useScreenShare,
  useVideoTrack,
} from '@daily-co/daily-react';
import React, { useCallback, useEffect, useState } from 'react';

import {
  CamHideIcon,
  ChatIcon,
  EmojiIcon,
  MicMuteIcon,
  NavCamIcon,
  NavCircle,
  NavFullScreenIcon,
  NavMicIcon,
  NavScreenShareIcon,
  SettingIcon,
} from '@/components/common/svgIcons/Icons';

import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { updateInterviewRound } from '@/features/interviews/interviewsAPI';
import { openModal } from '@/features/modal/modalSlice';
import { useWindowSize } from '@/hooks/useWindowSize';
import RoomService from '@/utils/dailyVideoService/videoApi';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import Chat from '../Chat/Chat';
import RecordingPrompt from './RecordingPrompt';
import {
  BottomBarColumnsContainer,
  EmojiTray,
  FinishButtonContainer,
  StyledBottomBar,
  StyledBottomNavButtons,
  StyledColumns,
  StyledFinishBtn,
} from './StyledBottomNavBar';
import './index.css';
import { CustomSwitch } from '@/components/common/form/input/StyledInput';
import { useNavigate } from 'react-router-dom';

export interface IReactClickedState {
  clicked: number;
  message: string;
  position?: {
    left: number;
    top: number;
  };
}

interface IBottomNavBar {
  setReactClicked: (values: IReactClickedState) => void;
  reactClicked: IReactClickedState;
  leaveCall: () => void;
  emojiClicked: (
    e: React.MouseEvent,
    emoji: string,
    emojiNumber: number
  ) => void;
  setStartTime: (time: Date) => void;
  interviewRoundId: string;
}
const emojis = {
  '👍': 2,
  '👎': 3,
  '🔥': 1,
  '😂': 5,
  '😍 ': 4,
};

function BottomNavBar(props: IBottomNavBar) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [recordSwitch, setRecordSwitch] = useState(false);
  const [isRecordingStart, setIsRecordingStart] = useState<boolean>(false);

  const [isEmojiTrayOpened, setIsEmojiTrayOpened] = useState<boolean>(false);
  const {
    setReactClicked,
    reactClicked,
    leaveCall,
    emojiClicked,
    setStartTime,
    interviewRoundId,
  } = props;
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordingId,
    local,
    isLocalParticipantRecorded,
    updateRecording,
  } = useRecording();
  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id!);
  const localAudio = useAudioTrack(localParticipant?.session_id!);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const getMeetingURL = async (recordingId: string) => {
    const response = await RoomService.finishMeeting(recordingId);
    if (response?.download_link) {
      const data = {
        interview_round_id: interviewRoundId,
        video_uri: response.download_link,
      };
      await updateInterviewRound(data);
    }
  };

  const toggleVideo = useCallback(() => {
    callObject?.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject?.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleEmojiTray = () => {
    setIsEmojiTrayOpened(!isEmojiTrayOpened);
  };
  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(openModal({ modalType }));
  };

  const handleRecordingToggle = () => {
    if (recordSwitch) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecordSwitch(!recordSwitch);
    setIsRecordingStart(!isRecording);
  };

  const [showChat, setShowChat] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useDailyEvent(
    'app-message',
    useCallback(() => {
      if (!showChat) {
        setNewChatMessage(true);
      }
    }, [showChat])
  );

  const toggleScreenShare = () => {
    isSharingScreen ? stopScreenShare() : startScreenShare();
  };

  const toggleScreenRecord = async () => {
    const shouldUpload = isRecording;
    isRecording ? stopRecording() : startRecording();
    await callObject?.room();
    if (!shouldUpload) {
      setStartTime(new Date());
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
  };

  // Function to open the settings modal
  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    onClickModalOpen(MODAL_TYPE.VIDEO_SETTINGS);
  };

  // Function to close the settings modal
  // const closeSettingsModal = () => {
  //   setIsSettingsModalOpen(false);
  // };

  const callFinishedHandler = async () => {
    leaveCall();
    if (recordingId) {
      getMeetingURL(recordingId);
    }
    // Navigate to the call-end-screen
    navigate('/end-call-screen');
  };

  return (
    <>
      {isRecording && (
        <RecordingPrompt
          isOpen={isRecordingStart}
          isRecording={isRecordingStart}
        />
      )}{' '}
      <StyledBottomBar>
        <BottomBarColumnsContainer>
          {width && width > 1120 && (
            <Grid lg={3} md={3} sm={3} xl={3} xs={3}>
              <StyledColumns>
                <StyledBottomNavButtons
                  onClick={toggleScreenRecord}
                  style={{ marginLeft: '20px' }}
                >
                  {/* Your custom button */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="record-label"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      {isRecording ? 'Stop ' : 'Start '} Recording
                    </span>{' '}
                    <span className="icon" style={{ marginLeft: '5px' }}>
                      <CustomSwitch
                        checked={recordSwitch}
                        onChange={handleRecordingToggle}
                      />
                    </span>
                  </div>
                </StyledBottomNavButtons>
                <StyledBottomNavButtons onClick={toggleAudio} type="button">
                  {mutedAudio ? <MicMuteIcon /> : <NavMicIcon />}
                </StyledBottomNavButtons>
                <StyledBottomNavButtons onClick={toggleVideo} type="button">
                  {mutedVideo ? <CamHideIcon /> : <NavCamIcon />}
                </StyledBottomNavButtons>
                <StyledBottomNavButtons onClick={openSettingsModal}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      stroke: 'white',
                    }}
                  >
                    <SettingIcon />
                  </div>
                </StyledBottomNavButtons>
              </StyledColumns>
            </Grid>
          )}

          {width && width > 1120 && (
            <Grid lg={6} md={6} sm={6} xl={6} xs={6}>
              {' '}
              <StyledColumns>
                {/* Integrate Daily's tray components here */}

                {/* Your custom emoji buttons */}

                {Object.entries(emojis).map(([emoji, number]) => (
                  <StyledBottomNavButtons
                    onClick={(e) => {
                      emojiClicked(e, emoji, number);
                    }}
                  >
                    {emoji === '❤️' ? (
                      <i
                        className="fa fa-heart"
                        style={{ color: '#FF3D2F' }}
                      ></i>
                    ) : (
                      emoji
                    )}
                  </StyledBottomNavButtons>
                ))}
                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                  <NavCircle />
                </div>

                <StyledBottomNavButtons
                  onClick={toggleScreenShare}
                  type="button"
                  style={{ gap: '4px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="record-label"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      {isSharingScreen
                        ? ' Stop sharing screen'
                        : ' Share screen'}{' '}
                    </span>{' '}
                    <span className="icon" style={{ marginLeft: '5px' }}>
                      <div style={{ display: 'flex', stroke: 'white' }}>
                        <NavScreenShareIcon />
                      </div>
                    </span>
                  </div>
                </StyledBottomNavButtons>

                <StyledBottomNavButtons onClick={toggleChat} type="button">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      className="record-label"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      {showChat ? 'Hide Chat' : 'Chat'}
                    </span>{' '}
                    <span className="icon" style={{ marginLeft: '5px' }}>
                      {showChat ? (
                        <div style={{ display: 'flex', stroke: 'white' }}>
                          {' '}
                          <ChatIcon />{' '}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', stroke: 'white' }}>
                          {' '}
                          <ChatIcon />{' '}
                        </div>
                      )}
                    </span>
                  </div>
                </StyledBottomNavButtons>
              </StyledColumns>
            </Grid>
          )}

          <FinishButtonContainer>
            {' '}
            {width && width < 1120 && (
              <StyledColumns>
                <StyledBottomNavButtons
                  onClick={toggleScreenRecord}
                  style={{ marginLeft: '20px' }}
                >
                  {/* Your custom button */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="record-label"
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    >
                      {isRecording ? 'Stop ' : 'Start '} Recording
                    </span>{' '}
                    <span className="icon" style={{ marginLeft: '5px' }}>
                      <NavFullScreenIcon />
                    </span>
                  </div>
                </StyledBottomNavButtons>

                <StyledBottomNavButtons onClick={toggleAudio} type="button">
                  {mutedAudio ? <MicMuteIcon /> : <NavMicIcon />}
                </StyledBottomNavButtons>

                <StyledBottomNavButtons onClick={toggleVideo} type="button">
                  {mutedVideo ? <CamHideIcon /> : <NavCamIcon />}
                </StyledBottomNavButtons>

                {width < 1120 && (
                  <StyledBottomNavButtons
                    onClick={toggleEmojiTray}
                    type="button"
                  >
                    {isEmojiTrayOpened && (
                      <EmojiTray>
                        {Object.entries(emojis).map(([emoji, number]) => (
                          <StyledBottomNavButtons
                            onClick={() => {
                              setReactClicked({
                                clicked: reactClicked?.clicked + 1,
                                message: emoji,
                              });
                            }}
                          >
                            {emoji === '❤️' ? (
                              <i style={{ color: '#FF3D2F' }}>❤️</i>
                            ) : (
                              emoji
                            )}
                          </StyledBottomNavButtons>
                        ))}
                      </EmojiTray>
                    )}

                    <EmojiIcon />
                  </StyledBottomNavButtons>
                )}
              </StyledColumns>
            )}
            <Chat showChat={showChat} toggleChat={toggleChat} />
            <StyledColumns style={{ paddingRight: '20px', float: 'right' }}>
              <StyledFinishBtn
                className="accentPurple"
                onClick={callFinishedHandler}
              >
                Finish
              </StyledFinishBtn>
            </StyledColumns>
          </FinishButtonContainer>
        </BottomBarColumnsContainer>
      </StyledBottomBar>
      <GlobalModal />
    </>
  );
}

export default BottomNavBar;
