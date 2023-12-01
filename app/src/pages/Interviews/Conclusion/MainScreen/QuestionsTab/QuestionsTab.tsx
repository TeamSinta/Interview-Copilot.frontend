import InterviewQNA from "../InterviewQNA/InterviewQNA";
import { questionTabInfo } from "./QuestionsTabConstants";

const QuestionsTab = () => {
  return (
    <InterviewQNA questionData={questionTabInfo?.data} screen={"question"} />
  );
};

export default QuestionsTab;
