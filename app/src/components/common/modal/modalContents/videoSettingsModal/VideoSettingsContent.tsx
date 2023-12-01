import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import {
  DailyVideo,
  useDevices,
  useLocalParticipant,
} from "@daily-co/daily-react";
import { ModalContentWrap, SelectContentWrap } from "../StyledModalContents";
import {
  CamHideIcon,
  NavCamIcon,
  VideoCam,
  VideoMic,
  VideoSound,
} from "@/components/common/svgIcons/Icons";

import { CamIcon } from "../../../svgIcons/CustomIcons";
import { BodyMMedium, BodySMedium } from "../../../typeScale/StyledTypeScale";

const SettingsOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const CustomDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const CustomDropdownButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
`;

const CustomDropdownContent = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 12px 12px;

  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000; /* Ensure it appears above other elements */
`;

const CustomDropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface VideoSettingsContentProps {}

const VideoSettingsContent: React.FC<VideoSettingsContentProps> = ({}) => {
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();

  const localParticipant = useLocalParticipant();
  const [isMicrophoneDropdownOpen, setMicrophoneDropdownOpen] = useState(false);
  const [isSpeakerDropdownOpen, setSpeakerDropdownOpen] = useState(false);
  const [isCameraDropdownOpen, setCameraDropdownOpen] = useState(false);

  const [selectedMicrophone, setSelectedMicrophone] = useState(""); // State to store selected microphone
  const [selectedSpeaker, setSelectedSpeaker] = useState(""); // State to store selected speaker
  const [selectedCamera, setSelectedCamera] = useState(""); // State to store selected camera

  const toggleMicrophoneDropdown = () => {
    setMicrophoneDropdownOpen(!isMicrophoneDropdownOpen);
  };

  const toggleSpeakerDropdown = () => {
    setSpeakerDropdownOpen(!isSpeakerDropdownOpen);
  };

  const toggleCameraDropdown = () => {
    setCameraDropdownOpen(!isCameraDropdownOpen);
  };

  const updateMicrophone = (deviceId: string) => {
    setMicrophone(deviceId);
    setSelectedMicrophone(deviceId); // Update selected microphone
    toggleMicrophoneDropdown();
  };

  const updateSpeaker = (deviceId: string) => {
    setSpeaker(deviceId);
    setSelectedSpeaker(deviceId); // Update selected speaker
    toggleSpeakerDropdown();
  };

  const updateCamera = (deviceId: string) => {
    setCamera(deviceId);
    setSelectedCamera(deviceId); // Update selected camera
    toggleCameraDropdown();
  };

  return (
    <ModalContentWrap>
      <SelectContentWrap>
        <DailyVideo
          automirror
          sessionId={localParticipant.session_id}
          type={"video"}
          style={{
            height: "100%",
            minWidth: "100%",
            flex: "1",
          }}
          fit={"cover"}
        />
        <SettingsOptionsContainer>
          <CustomDropdown>
            <BodySMedium> Select Microphone</BodySMedium>
            <div style={{ display: "flex" }}></div>
            <CustomDropdownButton onClick={toggleMicrophoneDropdown}>
              <BodyMMedium>
                {selectedMicrophone
                  ? microphones?.find(
                      (mic) => mic.device.deviceId === selectedMicrophone
                    )?.device.label
                  : "Select Microphone"}
              </BodyMMedium>
            </CustomDropdownButton>
            {isMicrophoneDropdownOpen && (
              <CustomDropdownContent>
                {microphones?.map((mic) => (
                  <CustomDropdownItem
                    key={`mic-${mic.device.deviceId}`}
                    onClick={() => updateMicrophone(mic.device.deviceId)}
                  >
                    {mic.device.label}
                  </CustomDropdownItem>
                ))}
              </CustomDropdownContent>
            )}
          </CustomDropdown>
          <CustomDropdown>
            <BodySMedium> Select Speaker</BodySMedium>

            <CustomDropdownButton onClick={toggleSpeakerDropdown}>
              <BodyMMedium>
                {selectedSpeaker
                  ? speakers?.find(
                      (speaker) => speaker.device.deviceId === selectedSpeaker
                    )?.device.label
                  : "Select Microphone"}
              </BodyMMedium>
            </CustomDropdownButton>
            {isSpeakerDropdownOpen && (
              <CustomDropdownContent>
                {speakers?.map((speaker) => (
                  <CustomDropdownItem
                    key={`speaker-${speaker.device.deviceId}`}
                    onClick={() => updateSpeaker(speaker.device.deviceId)}
                  >
                    {speaker.device.label}
                  </CustomDropdownItem>
                ))}
              </CustomDropdownContent>
            )}
          </CustomDropdown>
          <CustomDropdown>
            <BodySMedium> Select Camera</BodySMedium>

            <CustomDropdownButton onClick={toggleCameraDropdown}>
              <BodyMMedium>
                {selectedCamera
                  ? cameras?.find(
                      (camera) => camera.device.deviceId === selectedCamera
                    )?.device.label
                  : "Select Camera"}
              </BodyMMedium>
            </CustomDropdownButton>

            {isCameraDropdownOpen && (
              <CustomDropdownContent>
                {cameras?.map((camera) => (
                  <CustomDropdownItem
                    key={`cam-${camera.device.deviceId}`}
                    onClick={() => updateCamera(camera.device.deviceId)}
                  >
                    {camera.device.label}
                  </CustomDropdownItem>
                ))}
              </CustomDropdownContent>
            )}
          </CustomDropdown>
        </SettingsOptionsContainer>
      </SelectContentWrap>
    </ModalContentWrap>
  );
};

export default VideoSettingsContent;
