import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";

import ElWrap from "@/components/layouts/elWrap/ElWrap";
import {
  InterviewOverviewContainer,
  InterviewOverviewLayout,
  InterviewStageContainer,
  InterviewStageTopContainer,
  Title,
} from "@/components/pages/interview/StyledInterview";
import InterviewOverviewDetails from "@/components/pages/interview/overview_detail/InterviewOverviewDetails";
import InterviewOverviewSections from "@/components/pages/interview/overview_section/InterviewOverviewSections";
import { BackgroundColor } from "@/features/utils/utilEnum";
import CompetenciesFilter from "./CompetenciesFilter";
import QuestionList from "./QuestionsList";

const QuestionsStage = () => {
  return (
    <InterviewStageContainer>
      <InterviewOverviewContainer>
        <Title>
          <ElWrap w={32} h={32}></ElWrap>
        </Title>
        <GlobalModal></GlobalModal>
        <InterviewOverviewLayout>
          <div className="side">
            <CompetenciesFilter />
          </div>
          <QuestionList />
        </InterviewOverviewLayout>
      </InterviewOverviewContainer>
    </InterviewStageContainer>
  );
};

export default QuestionsStage;
