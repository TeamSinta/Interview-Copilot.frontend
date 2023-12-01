import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import VideoCallExternal from "@/utils/dailyVideoService/videoCallExternalComponent";
import VideoCallComponent from "@/utils/dailyVideoService/videoCallComponent";

function CheckType() {
  const { isAuthenticated, status, user } = useSelector(
    (state: RootState) => state.user
  );

  console.log(user, isAuthenticated);

  if (user && isAuthenticated) {
    return <VideoCallComponent />;
  } else {
    // Return the VideoCallExternal component for candidates
    return <VideoCallExternal />;
  }
}

export default CheckType;
