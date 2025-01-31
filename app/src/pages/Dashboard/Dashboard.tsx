import { AppDispatch, RootState } from '@/store';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import TemplateHomeCard from '@/components/common/cards/teamplateHomeCard/TemplateHomeCard';
import Loading from '@/components/common/elements/loading/Loading';
import { RightBracketIcon } from '@/components/common/svgIcons/Icons';
import {
  BodyLBold,
  BodyLMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import TopNavBarDash from '@/components/layouts/topnavbar/TopNavBarDash';
import { useGetTemplatesQuery } from '@/features/templates/templatesAPISlice';
import {
  TemplateQuestions,
  TemplateResponse,
} from '@/features/templates/templatesInterface';
import { useGetTemplateQuestionsQuery } from '@/features/templates/templatesQuestionsAPISlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { createCall } from '@/utils/dailyVideoService/videoCallSlice';
import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmptySectionsImage from "src/assets/images/'Empty Questions Page Illustration.jpg";
import dashboardImage from 'src/assets/images/HomePage_2.jpg';
import {
  DescriptionText,
  EmptySectionContainer,
  InterviewsBox,
  PendingReviewsHeading,
  StyledEmptyImage,
  StyledImage,
  TemplateCardsBox,
  TemplateEmptyBox,
  TextBox,
  UpgradeButton,
  WavingHand,
  WelcomeHeading,
  WorkspaceTextBox,
} from './StyledDashboard';
import Workspace from './WorkSpaceCounter';

const DashBoard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [newTemplates, setTemplates] = useState<TemplateResponse[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const workspaceData = {
    title: 'Workspace',
    items: [
      { label: 'Plan type', value: 'Pro' },
      { label: 'Collaborators', value: '1 of 3' },
      { label: 'Summaries', value: '1 of 3' },
      { label: 'Interviews', value: '1' },
      { label: 'Templates', value: '9' },
    ],
    buttonText: 'Upgrade',
  };

  const { data: templates, isLoading, isSuccess } = useGetTemplatesQuery();

  const handleButtonClick = () => {
    navigate('/templates');
  };

  const arg_empty = {
    label: 'Go to Templates',
    icon: <RightBracketIcon />,
    className: BackgroundColor.WHITE,
    onClick: handleButtonClick,
    disable: false,
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: templateQuestions } = useGetTemplateQuestionsQuery();

  const getFilteredTemplateQuestionsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): object => {
    if (!templateQuestions || !templateId) {
      return [];
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    return filteredQuestions;
  };

  const getFilteredTemplateTopicsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): object => {
    if (!templateQuestions || !templateId) {
      return {};
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    const topics = Array.from(
      new Set(filteredQuestions.map((question) => question.topic))
    );
    return topics;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const x = scrollContainerRef.current
      ? e.pageX - scrollContainerRef.current.offsetLeft
      : e.pageX; // if there's no ref, just use the pageX value as fallback
    setStartX(x);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = scrollContainerRef.current
      ? e.pageX - scrollContainerRef.current.offsetLeft
      : e.pageX;

    const scrollDistance = x - startX;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollDistance;
    }

    setStartX(x);
  };

  const handleCardClick = (templateId: string) => {
    if (templateId) navigate(`/templates/${templateId}`);
  };

  useEffect(() => {
    if (isSuccess && templates?.length > 0) {
      setTemplates(templates);
    }
  }, [isSuccess, templates]);

  if (isLoading) {
    return <Loading />; // Render the loading component when data is still loading
  }

  const startDemo = async () => {
    try {
      // response after creating a room
      const responseRoom = await dispatch(createCall());
      navigate(`/video-call/?roomUrl=${encodeURIComponent(responseRoom.payload)}
      `);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth={'lg'}
      style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <TopNavBarDash />

      {/* 'lg' can be changed based on your design requirements */}
      <Grid container spacing={4} justifyContent="center">
        <Grid xs={12} md={12} lg={4}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Container style={{ minWidth: '320px', padding: '0px' }}>
              <InterviewsBox style={{ padding: '42px' }}>
                <TextBox>
                  <WelcomeHeading>
                    Welcome back, {user.first_name} <WavingHand>👋</WavingHand>
                  </WelcomeHeading>
                  <DescriptionText>
                    Helping teams hire faster and better. Get started by
                    creating a template or launch a meeting.{' '}
                    <DescriptionText> </DescriptionText>
                  </DescriptionText>
                </TextBox>
              </InterviewsBox>
            </Container>{' '}
            <Container style={{ minWidth: '320px', padding: '0px' }}>
              {' '}
              <InterviewsBox style={{ padding: '36px' }}>
                {' '}
                <WorkspaceTextBox>
                  <BodyLBold>Workspace</BodyLBold>
                  <UpgradeButton>Upgrade</UpgradeButton>
                </WorkspaceTextBox>
                <Workspace {...workspaceData} />
              </InterviewsBox>
            </Container>{' '}
          </div>
        </Grid>
        <Grid
          xs={12}
          md={12}
          lg={8}
          justifyContent="center"
          alignItems="center"
          minWidth={'xs'}
        >
          <Container style={{ padding: '0px' }}>
            <StyledImage src={dashboardImage} alt="dashboard_picture" />
          </Container>
        </Grid>
        {newTemplates.length === 0 ? (
          <Grid xs={12}>
            <TemplateEmptyBox>
              <EmptySectionContainer>
                {' '}
                <StyledEmptyImage
                  src={EmptySectionsImage}
                  alt="dashboard_picture"
                />
                <BodyLMedium>
                  Create a Template to be used during interviews or share with a
                  teammate.
                </BodyLMedium>
                <Box
                  style={{
                    width: '248px',
                  }}
                >
                  <TextIconBtnL {...arg_empty} />
                </Box>
              </EmptySectionContainer>
            </TemplateEmptyBox>
          </Grid>
        ) : (
          <Grid xs={12}>
            <InterviewsBox>
              <Stack direction="column" spacing={2}>
                <PendingReviewsHeading>Recent Templates</PendingReviewsHeading>
                <TemplateCardsBox
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseUp}
                  ref={scrollContainerRef}
                >
                  {newTemplates.map((interviewRound) => (
                    <TemplateHomeCard
                      key={interviewRound.id}
                      title={interviewRound.role_title}
                      disable={false}
                      questions={getFilteredTemplateQuestionsLength(
                        templateQuestions,
                        interviewRound.id
                      )}
                      sections={getFilteredTemplateTopicsLength(
                        templateQuestions,
                        interviewRound.id
                      )}
                      imageUrl={interviewRound.image}
                      members={interviewRound.interviewers || []}
                      onClick={() => handleCardClick(interviewRound.id)} // Use interviewRound.id as the template ID
                    />
                  ))}
                </TemplateCardsBox>
              </Stack>
            </InterviewsBox>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DashBoard;
