import React from "react";
import InterviewQNA from "../InterviewQNA/InterviewQNA";
import { transcriptionInfo } from "./TranscriptionTabConstants";

const TranscriptionTab = () => {
  return (
    <InterviewQNA
      screen={"transcription"}
      questionData={transcriptionInfo?.questionData}
    />
  );
};

export default TranscriptionTab;
