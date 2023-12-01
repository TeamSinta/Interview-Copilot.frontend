import React, { useState, useCallback, useMemo } from "react";
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
  useDaily,
  useVideoTrack,
} from "@daily-co/daily-react";

import "./Call.css";
import Tile from "../Tile/Tile";
import UserMediaError from "../UserMediaError/UserMediaError";
import {
  BodyLMedium,
  BodyLSemiBold,
  BodyMMedium,
  BodySMedium,
  H1,
  H2Bold,
} from "@/components/common/typeScale/StyledTypeScale";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { BackgroundColor } from "@/features/utils/utilEnum";

export default function CandidateCallScreen() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState<boolean>(false);

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );
  const callObject = useDaily();

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  const { screens } = useScreenShare();
  const remoteParticipantIds: string[] | null = useParticipantIds({
    filter: "remote",
  });

  /* This is for displaying our self-view. */
  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;

  const isAlone: boolean = useMemo(
    () => remoteParticipantIds?.length! < 1 || screens?.length! < 1,
    [remoteParticipantIds, screens]
  );
  console.log(localParticipant);

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = callObject.properties.url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Link copied to clipboard!");
  };

  const renderCandidateCallScreen = () => (
    <>
      <DailyAudio />
      <div className={screens.length! > 0 ? "is-screenshare" : "call-external"}>
        {localParticipant && !mutedVideo && (
          <Tile
            id={localParticipant.session_id}
            isLocal
            isAlone={isAlone}
            isScreenShare={false}
          />
        )}
        {mutedVideo && (
          <div className="join-now-box">
            <H2Bold style={{ color: "white" }}>
              {localParticipant?.user_name} (You)
            </H2Bold>
          </div>
        )}
        {remoteParticipantIds?.length! > 0 || screens?.length! > 0 ? (
          <>
            {remoteParticipantIds!.map((id) => (
              <div className="join-now-box">
                <Tile
                  key={id}
                  id={id}
                  isScreenShare={false}
                  isLocal={false}
                  isAlone={false}
                />
              </div>
            ))}
            {screens!.map((screen) => (
              <Tile
                key={screen.screenId}
                id={screen.session_id}
                isScreenShare
                isLocal={false}
                isAlone={false}
              />
            ))}
          </>
        ) : (
          <div className="join-now-box">
            <div className="content">
              <BodyLSemiBold style={{ color: "white" }}>
                ⚡️ Share the link with your candidate to start the meeting ⚡️
              </BodyLSemiBold>
              <div className="meeting-container">
                <div className="meeting-link">
                  <BodyMMedium style={{ color: "white" }}>
                    {callObject.properties.url}
                  </BodyMMedium>
                </div>
                <ElWrap w={120}>
                  <TextIconBtnL
                    label="Copy Link"
                    onClick={copyToClipboard}
                    disable={false}
                    className={BackgroundColor.ACCENT_PURPLE}
                  />
                </ElWrap>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return getUserMediaError ? <UserMediaError /> : renderCandidateCallScreen();
}
