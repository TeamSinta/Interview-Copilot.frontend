import React from "react";
import "./Tile.css";
import { DailyVideo, useMediaTrack } from "@daily-co/daily-react";
import Username from "../Username/Username";
import {
  BodyLMedium,
  BodyLSemiBold,
} from "@/components/common/typeScale/StyledTypeScale";

interface TileProps {
  id: string;
  isScreenShare: boolean;
  isLocal: boolean;
  isAlone: boolean;
}

export default function Tile({
  id,
  isScreenShare,
  isLocal,
  isAlone,
}: TileProps) {
  const videoState = useMediaTrack(id, "video");

  let containerCssClasses = isScreenShare ? "tile-screenshare" : "tile-video";

  if (isLocal) {
    containerCssClasses += " self-view";
    if (isAlone) {
      containerCssClasses += " alone";
    }
  }

  /* If a participant's video is muted, hide their video and
  add a different background color to their tile. */
  if (videoState.isOff) {
    containerCssClasses += " no-video";
  }

  return (
    <div className={containerCssClasses}>
      <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? "screenVideo" : "video"}
        style={{
          height: "100%",
          minWidth: "100%",
          flex: "1",
        }}
        fit={"cover"}
      />
      <BodyLSemiBold style={{ color: "white" }}>
        <Username id={id} isLocal={isLocal} />
      </BodyLSemiBold>
    </div>
  );
}
