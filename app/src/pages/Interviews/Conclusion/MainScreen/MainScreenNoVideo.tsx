import React, { useMemo, useState, ReactNode, useEffect } from 'react';
import { Divider, Grid, Stack } from '@mui/material';
import { NavButton } from '@/components/layouts/sidenavbar/StyledSideNavBar';
import '../index.css';

import styled from 'styled-components';
import InterviewQNA from './InterviewQNA/InterviewQNA';
import { ReactionButtonBox } from './reactionBox/ReactionBox';
import image from '@/assets/svg/EndVideoImage.svg';
import {
  getInterviewRoundFeedback,
  getInterviewRoundQuestions,
} from '@/features/interviews/interviewsAPI';
import { useCookies } from 'react-cookie';

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

const MainScreenNoVideo: React.FC<MainScreenProps> = ({ interviewRoundId }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [cookies, ,] = useCookies(['access_token']);

  const [interviewRoundQuestions, setInterviewRoundQuestions] =
    useState<any>(null); // Initialize with null
  const [interviewRoundFeedback, setInterviewRoundFeedback] =
    useState<any>(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviewRoundQuestions(
          interviewRoundId,
          cookies.access_token
        );
        const feedback = await getInterviewRoundFeedback(
          interviewRoundId,
          cookies.access_token
        );
        setInterviewRoundFeedback(feedback);
        setInterviewRoundQuestions(response);
      } catch (error) {
        console.error('Error fetching interview round questions:', error);
        // Handle the error as needed (e.g., show an error message)
      }
    };

    fetchData();
  }, [interviewRoundId, cookies.access_token]);


  const infoTabs = useMemo(
    () => (
      <TabContainer>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={1}
          isActive={activeTab === 1}
        >
          Notes
        </TabButton>
        <TabButton
          setActiveTab={setActiveTab}
          tabNumber={2}
          isActive={activeTab === 2}
        >
          Questions
        </TabButton>
      </TabContainer>
    ),
    [activeTab]
  );

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
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              style={{
                width: '100%',

                overflow: 'hidden',
                marginLeft: '-20px',
                padding: '20px',
                flex: '1',
              }}
            >
              <img
                src={image}
                alt="video-no"
                style={{
                  width: '100%',

                  maxHeight: '400px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              ></img>
            </Stack>
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
            {activeTab === 1 && interviewRoundFeedback ? (
              <InterviewQNA
                propData={interviewRoundFeedback}
                screen={'notes'}
              />
            ) : null}
            {activeTab === 2 && (
              <InterviewQNA
                propData={interviewRoundFeedback?.data}
                screen={'question'}
              />
            )}
          </ContentContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default MainScreenNoVideo;
