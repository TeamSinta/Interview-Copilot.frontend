import {
  BodyMMedium,
  H1,
} from '@/components/common/typeScale/StyledTypeScale.js';
import React, { useMemo, useState } from 'react';
import TopBar from './TopBar.js';
import MainScreen from './MainScreen/MainScreen.js';
import {
  BottomArrowIcon,
  CandidateIcon,
  RightArrowIcon,
} from '@/components/common/svgIcons/Icons.js';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom'; // <-- Import useNavigate
import SummarizerLoader from '@/components/common/elements/longLoading/LongLoading.js';
import { Container, Divider, Grid, Stack } from '@mui/material';
import { useGetInterviewQuery } from '@/features/interviews/interviewsAPI';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn.js';
import { BackgroundColor } from '@/features/utils/utilEnum.js';
import ElWrap from '@/components/layouts/elWrap/ElWrap.js';
import { IconBtnM } from '@/components/common/buttons/iconBtn/IconBtn.js';
import WebSockComp from '../../../components/common/socket/websock';
import MainScreenNoVideo from './MainScreen/MainScreenNoVideo.js';
import Loading from '@/components/common/elements/loading/Loading.js';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 35px;
`;
const ProfilePic = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 18px;
`;

const Title = styled.div`
  font-size: 20px;
`;
const CreatedContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  const [interviewTitle, setInterviewTitle] = useState('');
  const [interviewerName, setInterviewerName] = useState('');
  const [interviewerPicture, setInterviewerPicture] = useState('');
  const [interviewRound, setInterviewRound] = useState<any>(null);

  const [isVideoEmpty, setIsVideoEmpty] = useState<boolean | null>(null);
  const { data: interviewData, isSuccess } = useGetInterviewQuery(
    location.state.id
  );
  React.useEffect(() => {
    if (isSuccess) {
      setInterviewRound(interviewData);
      setInterviewTitle(interviewData.title);
      setInterviewerPicture(interviewData.interviewer.profile_picture);
      setInterviewerName(
        `${interviewData.interviewer.first_name} ${interviewData.interviewer.last_name}`
      );
      setIsVideoEmpty(!interviewData || !interviewData.video_uri);
    }
  }, [isSuccess, interviewData]);

  const endLoader = () => {
    setShowLoader(false);
  };

  const header = useMemo(() => {
    return (
      <>
        <Grid container className="bar ">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={'center'}
            style={{ width: '100%', padding: '12px' }}
          >
            <HeaderWrapper>
              <ElWrap w={38}>
                <IconBtnM
                  onClick={() => navigate(-1)}
                  icon={<RightArrowIcon />}
                  disable={false}
                  className={BackgroundColor.WHITE}
                />
              </ElWrap>

              <Stack direction="column" justifyContent="flex-start" spacing={2}>
                <Title>
                  <H1 style={{ lineHeight: '100%' }}>{` ${interviewTitle}`}</H1>
                </Title>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <ProfilePic src={interviewerPicture}></ProfilePic>

                  <BodyMMedium style={{ marginTop: '0px' }}>
                    {interviewerName}
                  </BodyMMedium>
                  <BodyMMedium> · </BodyMMedium>
                  <BodyMMedium style={{ marginTop: '0px' }}>Today</BodyMMedium>
                  <BodyMMedium> · </BodyMMedium>
                  <BodyMMedium style={{ marginTop: '0px' }}>
                    Not Shared
                  </BodyMMedium>
                  <BottomArrowIcon />
                </Stack>
              </Stack>
            </HeaderWrapper>
            <Stack
              direction="row"
              spacing={2}
              alignItems={'center'}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <CreatedContainer>
                <BodyMMedium> 1 / 3 Summaries Created</BodyMMedium>
              </CreatedContainer>
              <ElWrap w={227}>
                <TextIconBtnL
                  label="Share"
                  onClick={() => {}}
                  icon={<CandidateIcon />}
                  disable={false}
                  className={BackgroundColor.ACCENT_PURPLE}
                />
              </ElWrap>
            </Stack>
          </Stack>
        </Grid>
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
            <MainWrapper>
              <TopBar interviewRoundId={location.state.id} />
            </MainWrapper>
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
