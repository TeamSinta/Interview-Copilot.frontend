import React, { useMemo, useState, ReactNode } from 'react';
import { Divider, Grid, Stack } from '@mui/material';
import { NavButton } from '@/components/layouts/sidenavbar/StyledSideNavBar';
import '../index.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import { H3Bold } from '@/components/common/typeScale/StyledTypeScale';
import styled from 'styled-components';
import ConclusionData from '@/services/conclusionService';
import InterviewQNA from './InterviewQNA/InterviewQNA';
import SummaryTab from './SummaryTab/SummaryTab';
import { ReactionButtonBox } from './reactionBox/ReactionBox';

interface MainScreenProps {
  interviewRoundId: string;
}

interface setActiveTabProps {
  (tabNumber: number): void;
}

interface TabButtonProps {
  setActiveTab: setActiveTabProps;
  tabNumber: number;
  isActive: boolean;
  children: ReactNode;
}

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0;
  padding-bottom: 20px;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const StyledNavButton = styled(NavButton)`
  font-size: 12px;
  width: 100%;
  height: 35px;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 5px;

  @media (min-width: 1200px) {
    width: 100px;
    margin-bottom: 0;
  }

  &.active {
    // style for active class here
  }
`;

const ContentContainer = styled.div`
  background-color: #f6f6fb;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 0px;
  overflow-y: auto;
  max-height: calc(100vh - 40vh);
  min-height: 580px;

  @media (min-width: 1200px) {
    padding: 20px 20px;
  }
`;

const TabButton: React.FC<TabButtonProps> = ({
  setActiveTab,
  tabNumber,
  isActive,
  children,
}) => (
  <StyledNavButton
    onClick={() => setActiveTab(tabNumber)}
    direction="row"
    className={isActive ? 'rightTabs active' : 'rightTabs'}
  >
    <span>{children}</span>
  </StyledNavButton>
);

const MainScreen: React.FC<MainScreenProps> = ({ interviewRoundId }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const [
    summarizedAnswers,
    questionsTranscript,
    summarizedInterview,
    videoUrl,
    emojisData,
    loading,
    error,
  ] = ConclusionData(interviewRoundId);

  const infoTabs = useMemo(
    () => (
      <TabContainer>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={1}
          isActive={activeTab === 1}
        >
          Summary
        </TabButton>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={2}
          isActive={activeTab === 2}
        >
          Questions
        </TabButton>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={3}
          isActive={activeTab === 3}
        >
          Transcription
        </TabButton>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={4}
          isActive={activeTab === 4}
        >
          Notes
        </TabButton>
      </TabContainer>
    ),
    [activeTab]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5}
          style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          <Stack direction={'column'} spacing={2}>
            <H3Bold>Technical Interview</H3Bold>
            <div className="video-player-wrapper">
              <VideoPlayer
                questionsTranscript={questionsTranscript?.data}
                videoUrl={videoUrl?.url}
                emojisData={emojisData}
              />
            </div>
            <Divider
              style={{
                width: '50%',
                alignSelf: 'center',
              }}
            />
            <div className="button-container">
              <ReactionButtonBox />
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          {infoTabs}
          <ContentContainer>
            {activeTab === 1 && (
              <SummaryTab summaryInfo={summarizedInterview?.data} />
            )}

            {activeTab === 2 && (
              <InterviewQNA
                propData={summarizedAnswers?.data}
                screen={'question'}
              />
            )}

            {activeTab === 3 && (
              <InterviewQNA
                propData={questionsTranscript?.data}
                screen={'transcription'}
              />
            )}
            {activeTab === 4 && (
              <InterviewQNA propData={emojisData} screen={'notes'} />
            )}
          </ContentContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default MainScreen;
