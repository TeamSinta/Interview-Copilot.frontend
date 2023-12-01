import React, { useCallback, useState, ChangeEvent, FormEvent } from "react";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import UserMediaError from "../UserMediaError/UserMediaError";
import { MenuItem } from "@mui/material";
import {
  VideoContainer,
  ButtonWrapper,
  SelectBox,
  HomeContainer,
  LogoImage,
} from "./StyledHairCheckCandidate";
import { Stack } from "@mui/material";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import {
  RightBracketIcon,
  VideoCam,
  VideoMic,
  VideoSound,
} from "@/components/common/svgIcons/Icons";
import TextInput from "@/components/common/form/textInput/TextInput";
import { H1 } from "@/components/common/typeScale/StyledTypeScale";
import DropUpBtn from "@/components/common/dropUpBtn/dropUpBtn";
import Sintaimage from "@/assets/images/SintaLogo.png";

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
  const [activeTab, setActiveTab] = useState("devices");

  useDailyEvent(
    "camera-error",
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

  const updateSpeaker = (e: ChangeEvent<HTMLSelectElement>) => {
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
      onClick={() => updateSpeaker(speaker.device.deviceId)}
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

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      onSubmit={join}
      style={{ height: "93vh" }}
    >
      {/* Video preview */}
      <HomeContainer>
        {localParticipant && (
          <VideoContainer>
            <DailyVideo
              sessionId={localParticipant.session_id}
              mirror
              style={{ flex: "1", maxHeight: "410px", margin: "18px" }}
              fit={"cover"}
            />

            <Stack direction="row" sx={{ gap: "4px", display: "flex" }}>
              <DropUpBtn
                mainButtonContent={<VideoMic />}
                dropdownItems={microphoneItems}
              />
              <DropUpBtn
                mainButtonContent={<VideoSound />}
                dropdownItems={speakerItems}
              />
              <DropUpBtn
                mainButtonContent={<VideoCam />}
                dropdownItems={cameraItems}
              />
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
                onChange={onChange}
                value={localParticipant?.user_name || " "}
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
