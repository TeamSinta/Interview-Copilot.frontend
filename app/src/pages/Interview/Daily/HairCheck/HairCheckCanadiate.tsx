import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react';
import UserMediaError from '../UserMediaError/UserMediaError';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {
  VideoContainer,
  ButtonWrapper,
  SelectBox,
  HomeContainer,
  LogoImage,
} from './StyledHairCheckCandidate';
import { Stack } from '@mui/material';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
  DropUpIcon,
  RightBracketIcon,
  VideoCam,
  VideoCamoff,
  VideoMic,
  VideoMicOff,
  VideoSound,
} from '@/components/common/svgIcons/Icons';
import TextInput from '@/components/common/form/textInput/TextInput';
import { BodySMedium, H1 } from '@/components/common/typeScale/StyledTypeScale';
import DropUpBtn from '@/components/common/dropUpBtn/dropUpBtn';
import Sintaimage from '@/assets/images/SintaLogo.png';
import {
  DropdownButton,
  IconButtonWrapper,
  IconWrapper,
} from './StyledHairCheck';

interface HairCheckProps {
  joinCall: () => void;
  cancelCall: () => void;
}

export default function HairCheckCandidate({
  joinCall,
  cancelCall,
}: HairCheckProps) {
  const localParticipant = useLocalParticipant();
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    callObject.setUserName(e.target.value);
  };

  const join = (e: FormEvent) => {
    e.preventDefault();
    joinCall();
  };

  const updateMicrophone = (e: ChangeEvent<HTMLSelectElement>) => {
    setMicrophone(e.target.value);
  };

  const updateSpeakers = (e: ChangeEvent<HTMLSelectElement>) => {
    setSpeaker(e.target.value);
  };

  const updateCamera = (e: ChangeEvent<HTMLSelectElement>) => {
    setCamera(e.target.value);
  };

  const microphoneItems = microphones?.map((mic) => (
    <MenuItem
      key={`mic-${mic.device.deviceId}`}
      value={mic.device.deviceId}
      onClick={() => updateMicrophone(mic.device.deviceId)}
    >
      {mic.device.label}
    </MenuItem>
  ));

  const speakerItems = speakers?.map((speaker) => (
    <MenuItem
      key={`speaker-${speaker.device.deviceId}`}
      value={speaker.device.deviceId}
      onClick={() => updateSpeakers(speaker.device.deviceId)}
    >
      {speaker.device.label}
    </MenuItem>
  ));

  const cameraItems = cameras?.map((camera) => (
    <MenuItem
      key={`cam-${camera.device.deviceId}`}
      value={camera.device.deviceId}
      onClick={() => updateCamera(camera.device.deviceId)}
    >
      {camera.device.label}
    </MenuItem>
  ));

  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject?.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject?.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const [micMenuAnchorEl, setMicMenuAnchorEl] = useState(null);
  const [speakerMenuAnchorEl, setSpeakerMenuAnchorEl] = useState(null);
  const [cameraMenuAnchorEl, setCameraMenuAnchorEl] = useState(null);

  // Handlers for opening and closing menus
  const handleMicMenuClick = (event) => {
    setMicMenuAnchorEl(event.currentTarget);
  };

  const handleSpeakerMenuClick = (event) => {
    setSpeakerMenuAnchorEl(event.currentTarget);
  };

  const handleCameraMenuClick = (event) => {
    setCameraMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMicMenuAnchorEl(null);
    setSpeakerMenuAnchorEl(null);
    setCameraMenuAnchorEl(null);
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{
              paddingTop: '40px',
              color: 'gray',
              textAlign: 'center',
            }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      onSubmit={join}
      style={{ height: '93vh' }}
    >
      {/* Video preview */}
      <HomeContainer>
        {localParticipant && (
          <VideoContainer>
            <DailyVideo
              sessionId={localParticipant.session_id}
              mirror
              style={{ flex: '1', maxHeight: '410px', margin: '18px' }}
              fit={'cover'}
            />

            <Stack
              direction="row"
              sx={{ marginTop: '4px', gap: '4px', display: 'flex' }}
            >
              <IconButtonWrapper>
                <IconButton onClick={toggleVideo}>
                  {mutedVideo ? <VideoCamoff /> : <VideoCam />}
                </IconButton>
                <DropdownButton onClick={handleCameraMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>
              <Menu
                anchorEl={cameraMenuAnchorEl}
                keepMounted
                open={Boolean(cameraMenuAnchorEl)}
                onClose={handleClose}
              >
                {cameraItems}
              </Menu>
              {/* Toggle Audio Button */}
              <IconButtonWrapper>
                <IconButton onClick={toggleAudio}>
                  {mutedAudio ? <VideoMicOff /> : <VideoMic />}
                </IconButton>
                <DropdownButton onClick={handleMicMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>

              <Menu
                anchorEl={micMenuAnchorEl}
                keepMounted
                open={Boolean(micMenuAnchorEl)}
                onClose={handleClose}
              >
                {microphoneItems}
              </Menu>
              {/* Audio Button with Dropdown */}
              <IconButtonWrapper>
                <IconButton>
                  <VideoSound />
                </IconButton>
                <DropdownButton onClick={handleSpeakerMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>
              <Menu
                anchorEl={speakerMenuAnchorEl}
                keepMounted
                open={Boolean(speakerMenuAnchorEl)}
                onClose={handleClose}
              >
                {speakerItems}
              </Menu>

              {/* Microphone Button with Dropdown */}
            </Stack>
          </VideoContainer>
        )}

        <SelectBox>
          <div>
            <LogoImage
              className="m-bottom-6"
              src={Sintaimage}
              alt="Sinta Logo"
            />
          </div>
          <Stack direction="column" spacing={6} justifyContent="space-between">
            <Stack direction="column" alignItems="center" spacing={6}>
              <H1>What's Your Name?</H1>
              <TextInput
                name="username"
                disable={false}
                placeholder="Name"
                error={false}
                validate={validateTitle}
                onChange={onChange}
                value={localParticipant?.user_name || ' '}
              />
            </Stack>

            <ButtonWrapper>
              <ElWrap w={360} h={40}>
                <TextIconBtnL
                  disable={false}
                  label="Start Meeting"
                  icon={<RightBracketIcon />}
                  onClick={joinCall}
                  className={BackgroundColor.ACCENT_PURPLE}
                />
              </ElWrap>
            </ButtonWrapper>
          </Stack>
        </SelectBox>
      </HomeContainer>
    </Stack>
  );
}
