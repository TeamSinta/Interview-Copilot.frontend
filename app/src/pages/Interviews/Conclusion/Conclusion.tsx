import React, { useMemo, useState, useEffect } from 'react';
import MainScreen from './MainScreen/MainScreen.js';
import {} from '@/components/common/svgIcons/Icons.js';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom'; // <-- Import useNavigate
import SummarizerLoader from '@/components/common/elements/longLoading/LongLoading.js';

import { getInterview } from '@/features/interviews/interviewsAPI.js';
import { useCookies } from 'react-cookie';

import { CaretDownIcon, PersonIcon, StarIcon } from '@radix-ui/react-icons';

import WebSockComp from '../../../components/common/socket/websock';

import {
  Flex,
  Heading,
  Text,
  HoverCard,
  Avatar,
  Box,
  Badge,
  Button,
} from '@radix-ui/themes';

const NavBarContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  background-color: #fff; // Adjust the color to match your design
  padding: 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); // This creates the drop shadow effect
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
          <Flex gap={'5'} align={'center'}>
            <Avatar
              size="3"
              fallback="R"
              radius="full"
              src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            />
            <Heading as="h1" size="6">
              {interviewTitle}
            </Heading>
            <Badge variant="outline" color="gray" size={'2'}>
              <Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Text>{interviewerName}</Text>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Flex gap="4">
                      <Avatar
                        size="3"
                        fallback="R"
                        radius="full"
                        src={interviewerPicture}
                      />
                      <Box>
                        <Heading size="3" as="h3">
                          {interviewerName}
                        </Heading>
                        <Text>{interviewTitle}</Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>{' '}
              </Text>
            </Badge>
          </Flex>
          <Flex style={{ alignItems: 'center' }}>
            <Button size={'3'}>
              {' '}
              <PersonIcon width="16" height="16" /> Decision{' '}
              <CaretDownIcon width="16" height="16" />
            </Button>
          </Flex>
        </NavBarContainer>
      </>
    );
  }, [interviewTitle, interviewerName, interviewerPicture]);

  return (
    <Flex
      style={{
        height: '100vh',
        background: '#F1F1F1',
        width: '100%',
        overflow: 'scroll',
      }}
      direction={'column'}
    >
      {header}
      <Flex
        style={{
          padding: '20px 86px 46px 86px',
        }}
      >
        <WebSockComp
          interviewRoundId={location.state.id}
          endLoader={endLoader}
        />
        {showLoader && location.state.useTimer ? (
          <SummarizerLoader /> // Show loader if showLoader is true
        ) : (
          <MainScreen interviewRoundId={location.state.id} />
        )}
      </Flex>
    </Flex>
  );
};

export default Conclusion;
