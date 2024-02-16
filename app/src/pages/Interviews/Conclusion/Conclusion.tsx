import {
  BodyMMedium,
  H1,
} from '@/components/common/typeScale/StyledTypeScale.js';
import React, { useMemo, useState, useEffect } from 'react';
import TopBar from './TopBar.js';
import MainScreen from './MainScreen/MainScreen.js';
import {} from '@/components/common/svgIcons/Icons.js';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom'; // <-- Import useNavigate
import SummarizerLoader from '@/components/common/elements/longLoading/LongLoading.js';
import { Container } from '@mui/material';
import { getInterview } from '@/features/interviews/interviewsAPI.js';
import { useCookies } from 'react-cookie';

import WebSockComp from '../../../components/common/socket/websock';
import MainScreenNoVideo from './MainScreen/MainScreenNoVideo.js';
import Loading from '@/components/common/elements/loading/Loading.js';
import { Flex, Heading, Text } from '@radix-ui/themes';

const NavBarContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  background-color: #fff; // Adjust the color to match your design
  padding: 10px 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

const TitleBox = styled.div`
  padding: 8px;
  background-color: var(--gray-a2);
  border-radius: var(--radius-3);
  // Add additional styling as needed
`;

const Username = styled.span`
  margin-right: 20px;
  font-size: 18px;
  // Add additional styling as needed
`;

const AddButton = styled.button`
  margin-right: 10px;
  // Style your add button here
`;

const PublishButton = styled.button`
  // Style your publish button here
`;

const MainWrapper = styled.div`
  padding: 20px;
  padding-left: 10px;
  padding-right: 0px;
`;

const Conclusion: React.FC = () => {
  const navigate = useNavigate(); // <-- Get the navigate function
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [cookies, ,] = useCookies(['access_token']);
  const [interviewTitle, setInterviewTitle] = useState('');
  const [interviewerName, setInterviewerName] = useState('');
  const [interviewerPicture, setInterviewerPicture] = useState('');
  const [interviewRound, setInterviewRound] = useState<any>(null);

  const [isVideoEmpty, setIsVideoEmpty] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const interviewData = await getInterview(
        location.state.id,
        cookies.access_token
      );
      setInterviewRound(interviewData); // Store interview data in the state
      setInterviewTitle(interviewData.title);
      setInterviewerPicture(interviewData.interviewer.profile_picture);
      setInterviewerName(
        `${interviewData.interviewer.first_name} ${
          interviewData.interviewer.last_name ?? ''
        }`
      );
      setIsVideoEmpty(!interviewData || !interviewData.video_uri);
    };

    fetchRatings();
  }, [cookies.access_token, location.state.id]);

  const endLoader = () => {
    setShowLoader(false);
  };

  const header = useMemo(() => {
    return (
      <>
        <NavBarContainer>
          <Flex>
            <Heading>{interviewTitle}</Heading>
          </Flex>
          <Flex style={{ alignItems: 'center' }}>
            <Text>{interviewerName}</Text>
            <AddButton>+</AddButton>
            <PublishButton>Publish</PublishButton>
          </Flex>
        </NavBarContainer>
      </>
    );
  }, [interviewTitle, interviewerName, interviewerPicture, navigate]);

  return (
    <>
      <Container
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          minWidth: '400px',
          maxWidth: '100%',
          background: '#F6F7FA',
        }}
      >
        <WebSockComp
          interviewRoundId={location.state.id}
          endLoader={endLoader}
        />
        {showLoader && location.state.useTimer ? (
          <SummarizerLoader /> // Show loader if showLoader is true
        ) : (
          <>
            {header}
            {/* <MainWrapper>
              <TopBar interviewRoundId={location.state.id} />
            </MainWrapper> */}
            {isVideoEmpty === null ? (
              // Show a loading indicator while fetching data
              <Loading />
            ) : isVideoEmpty ? (
              <MainScreenNoVideo interviewRoundId={location.state.id} />
            ) : (
              <MainScreen interviewRoundId={location.state.id} />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Conclusion;
