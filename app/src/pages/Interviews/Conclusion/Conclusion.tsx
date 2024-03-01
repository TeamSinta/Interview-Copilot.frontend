import React, { useMemo, useState, useEffect } from 'react';
import MainScreen from './MainScreen/MainScreen.js';
import {} from '@/components/common/svgIcons/Icons.js';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom'; // <-- Import useNavigate
import SummarizerLoader from '@/components/common/elements/longLoading/LongLoading.js';

import { getInterview } from '@/features/interviews/interviewsAPI.js';
import { useCookies } from 'react-cookie';


import WebSockComp from '../../../components/common/socket/websock';

import { Flex } from '@radix-ui/themes';

import { ConclusionToolbar } from './MainScreen/ConclusionNavBar/ConclusionNavBar.js';

const Conclusion: React.FC = () => {
  const navigate = useNavigate(); // <-- Get the navigate function
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [cookies, ,] = useCookies(['access_token']);
  const [, setInterviewTitle] = useState('');
  const [interviewerName, setInterviewerName] = useState('');
  const [interviewerPicture, setInterviewerPicture] = useState('');
  const [interviewRound, setInterviewRound] = useState<any>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const interviewData = await getInterview(
          location.state.id,
          cookies.access_token
        );
        setInterviewRound(interviewData); // Store interview data in state
        console.log(interviewData);
        setInterviewTitle(interviewData.title);
        setInterviewerPicture(interviewData.interviewer.profile_picture);
        setInterviewerName(
          `${interviewData.interviewer.first_name} ${
            interviewData.interviewer.last_name ?? ''
          }`
        );
        setShowLoader(false); // Hide loader once data is fetched
      } catch (error) {
        console.error('Failed to fetch interview data', error);
        setShowLoader(false); // Hide loader in case of an error
      }
    };

    fetchRatings();
  }, [cookies.access_token, location.state.id]);

  if (showLoader || !interviewRound) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const endLoader = () => {
    setShowLoader(false);
  };

  // const header = useMemo(() => {
  //   return (
  //     <>
  //       <ConclusionToolbar
  //         initialData={interviewRound}
  //         interviewerName={interviewerName}
  //         interviewerPicture={interviewerPicture}
  //       />
  //     </>
  //   );
  // }, [interviewRound, interviewerName, interviewerPicture]);

  return (
    <Flex
      style={{
        height: '100vh',
        background: '#f3f7fb',
        width: '100%',
        overflow: 'scroll',
      }}
      direction={'column'}
    >
      <ConclusionToolbar
        initialData={interviewRound}
        interviewerName={interviewerName}
        interviewerPicture={interviewerPicture}
      />
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
