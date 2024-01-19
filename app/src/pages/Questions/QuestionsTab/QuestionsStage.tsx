import GlobalModal from '@/components/common/modal/GlobalModal';

import ElWrap from '@/components/layouts/elWrap/ElWrap';
import {
  InterviewOverviewContainer,
  InterviewOverviewLayout,
  InterviewStageContainer,
  Title
} from '@/components/pages/interview/StyledInterview';
import CompetenciesFilter from './CompetenciesFilter';
import QuestionList from './QuestionsList';

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
