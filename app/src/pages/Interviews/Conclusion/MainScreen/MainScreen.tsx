import React, { useMemo, useState, ReactNode } from 'react';
import '../index.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import styled from 'styled-components';
import ConclusionData from '@/services/conclusionService';
import InterviewQNA from './InterviewQNA/InterviewQNA';
import SummaryTab from './SummaryTab/SummaryTab';
import { Box, Button, Flex, Grid, Heading } from '@radix-ui/themes';

type summaryType = 'summary' | 'question' | 'transcription' | 'notes';

interface MainScreenProps {
  interviewRoundId: string;
}

interface setActiveTabProps {
  (tabType: summaryType): void;
}

interface TabButtonProps {
  onClick: () => any;
  // tabType: summaryType;
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
  gap: 8px;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const InfoTabContainer = styled.div`
  display: flex;
  margin-top: 0;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const StyledNavButton = styled(Button)`
  color: black;

  padding: 6px;

  @media (min-width: 1200px) {
    width: 100px;
    margin-bottom: 0;
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
  onClick,
  isActive,
  children,
}) => (
  <StyledNavButton onClick={onClick} variant={isActive ? 'outline' : 'none'}>
    <span>{children}</span>
  </StyledNavButton>
);

const MainScreen: React.FC<MainScreenProps> = ({ interviewRoundId }) => {
  const [summaryType, setSummaryType] = useState<
    'summary' | 'question' | 'transcription' | 'notes'
  >('summary');
  const [informationType, setInformationType] = useState<'video' | 'info'>(
    'video'
  );

  const [
    summarizedAnswers,
    questionsTranscript,
    summarizedInterview,
    videoUrl,
    emojisData,
    loading,
  ] = ConclusionData(interviewRoundId);

  const infoTabs = useMemo(
    () => (
      <TabContainer>
        <TabButton
          onClick={() => setSummaryType('summary')}
          isActive={summaryType === 'summary'}
        >
          Summary
        </TabButton>
        <TabButton
          onClick={() => setSummaryType('question')}
          isActive={summaryType === 'question'}
        >
          Questions
        </TabButton>
        <TabButton
          onClick={() => setSummaryType('transcription')}
          isActive={summaryType === 'transcription'}
        >
          Transcription
        </TabButton>
        <TabButton
          onClick={() => setSummaryType('notes')}
          isActive={summaryType === 'notes'}
        >
          Notes
        </TabButton>
      </TabContainer>
    ),
    [summaryType]
  );

  const mainTabs = useMemo(
    () => (
      <InfoTabContainer>
        <TabButton
          onClick={() => setInformationType('video')}
          isActive={informationType === 'video'}
        >
          Video
        </TabButton>
        <TabButton
          onClick={() => setInformationType('info')}
          isActive={informationType === 'info'}
        >
          Info
        </TabButton>
      </InfoTabContainer>
    ),
    [informationType]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const BoxShadow = styled(Box)`
    background: white;
    border-radius: 8px; // Adjust the border-radius as needed
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // This creates the drop shadow effect
    padding: 20px; // Adjust the padding as needed
  `;
  const FlexShadow = styled(Flex)`
    background: white;
    border-radius: 8px; // Adjust the border-radius as needed
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // This creates the drop shadow effect
    align-items: center;
    padding: 24px;
    justify-content: flex-start;
    height: 100%;
  `;

  return (
    <>
      <Grid columns="1fr 2fr" gap="3" width="100%" height={'100%'}>
        <FlexShadow
          style={{
            background: 'white',
          }}
          direction={'column'}
        >
          {mainTabs}
          <Grid rows="1fr 1fr" gap="2" width="100%" height={'100%'}>
            <Box>
              {informationType === 'video' && (
                <div className="video-player-wrapper">
                  <VideoPlayer
                    questionsTranscript={questionsTranscript?.data}
                    videoUrl={videoUrl?.url}
                    emojisData={emojisData}
                  />
                </div>
              )}
            </Box>
            <Flex direction={'column'} gap={'3'} width={'100%'}>
              <Heading as="h4" size="3">
                {' '}
                Leslie McDonalds with you
              </Heading>
              <Flex direction={'column'}>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {' '}
                  Properties
                </h4>
                <small className="leading-7 [&:not(:first-child)]:mt-6"> Date</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6">  Time</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6">  Job Title</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6">  Interview Subject</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6">  Department</small>
              </Flex>
              <Flex direction={'column'}>
              <h2 className="text-sm bg-red-400">
                  {' '}
                  Results
                </h2>

                <small className="leading-7 [&:not(:first-child)]:mt-6"> Questions asked</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6"> Candidate Time</small>
                <small className="leading-7 [&:not(:first-child)]:mt-6"> Interview duration</small>
              </Flex>
            </Flex>
          </Grid>
        </FlexShadow>

        <BoxShadow style={{ background: 'white' }} grow={'1'}>
          {infoTabs}
          <ContentContainer>
            {summaryType === 'summary' && (
              <SummaryTab summaryInfo={summarizedInterview?.data} />
            )}

            {summaryType === 'question' && (
              <InterviewQNA
                propData={summarizedAnswers?.data}
                screen={'question'}
              />
            )}

            {summaryType === 'transcription' && (
              <InterviewQNA
                propData={questionsTranscript?.data}
                screen={'transcription'}
              />
            )}
            {summaryType === 'notes' && (
              <InterviewQNA propData={emojisData} screen={'notes'} />
            )}
          </ContentContainer>
        </BoxShadow>
      </Grid>
    </>
  );
};

export default MainScreen;
