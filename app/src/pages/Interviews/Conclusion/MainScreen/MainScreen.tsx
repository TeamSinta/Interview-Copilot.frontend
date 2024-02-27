import React, { useMemo, useState, ReactNode } from 'react';
import '../index.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import styled from 'styled-components';
import ConclusionData from '@/services/conclusionService';
import InterviewQNA from './InterviewQNA/InterviewQNA';
import SummaryTab from './SummaryTab/SummaryTab';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from '@radix-ui/themes';
import { BodyMMedium } from '@/components/common/typeScale/StyledTypeScale';
import { BoxShadow, FlexShadow } from '../../StyledConclusions';

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
  border-radius: 10px;
  margin-top: 0px;
  overflow-y: auto;
  max-height: calc(100vh - 20vh);
  min-height: calc(100vh - 20vh);
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
          <Grid gap="6" width="100%">
            <Box>
              {informationType === 'video' && (
                <Flex className="mt-3">
                  <VideoPlayer
                    questionsTranscript={questionsTranscript?.data}
                    videoUrl={videoUrl?.url}
                    emojisData={emojisData}
                  />
                </Flex>
              )}
              {informationType === 'info' && (
                <Flex className="mt-3 m-0 " direction="column">
                  <Card size="3" className="bg-blue-400">
                    <Flex gap="3" align="center" className="mb-3">
                      <Avatar
                        size="5"
                        radius="medium"
                        fallback="T"
                        color="indigo"
                      />
                      <Box>
                        <Text as="div" size="2" color="gray">
                          Engineering
                        </Text>
                        <Text as="div" size="4" weight="bold">
                          Teodros Girmay
                        </Text>
                      </Box>
                    </Flex>
                    <Flex direction={'row'} gap={'9'} style={{}}>
                      {' '}
                      <Box>
                        <Text as="div" size="2" color="gray">
                          Email
                        </Text>
                        <Text as="div" size="3" weight="normal">
                          Teodros Girmay
                        </Text>
                      </Box>
                      <Box>
                        <Text as="div" size="2" color="gray">
                          Resume
                        </Text>
                        <Text as="div" size="3" weight="normal">
                          Teodros Girmay
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Flex>
              )}
            </Box>
            <Flex direction={'column'} gap={'3'} width={'100%'}>
              <Heading as="h4" size="3">
                {' '}
                Leslie McDonalds with you
              </Heading>
              <Flex direction={'column'}>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-300">
                  {' '}
                  Properties
                </h4>
                <BodyMMedium className="text-sm font-medium leading-none mt-2">
                  {' '}
                  Date
                </BodyMMedium>
                <BodyMMedium className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Time
                </BodyMMedium>
                <BodyMMedium className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Job Title
                </BodyMMedium>
                <BodyMMedium className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Interview Subject
                </BodyMMedium>
                <BodyMMedium className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Department
                </BodyMMedium>
              </Flex>
              <Flex direction={'column'}>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight  text-gray-300">
                  {' '}
                  Results
                </h4>

                <small className="text-sm font-medium leading-none mt-2">
                  {' '}
                  Questions asked
                </small>
                <small className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Candidate Time
                </small>
                <small className="text-sm font-medium leading-none mt-1">
                  {' '}
                  Interview duration
                </small>
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
