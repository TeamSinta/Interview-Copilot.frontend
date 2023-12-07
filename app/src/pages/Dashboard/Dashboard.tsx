import React, { useRef, useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { RightBracketIcon } from "@/components/common/svgIcons/Icons";
import TemplateHomeCard from "@/components/common/cards/teamplateHomeCard/TemplateHomeCard";
import { useGetTemplatesQuery } from "@/features/templates/templatesAPISlice";
import {
  MainContainer,
  WelcomeHeading,
  DescriptionText,
  PendingReviewsHeading,
  Container,
  TextBox,
  TemplateCardsBox,
  YourNewContainer,
  YourMainContentContainer,
  ButtonContainer,
  EmptySectionContainer,
  TemplateEmptyBox,
  WavingHand,
} from "./StyledDashboard";
import dashboardImage from "src/assets/svg/SintaHomeFullScreen.svg";
import { StyledImage, StyledEmptyImage } from "./StyledDashboard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import Loading from "@/components/common/elements/loading/Loading";
import {
  TemplateQuestions,
  TemplateResponse,
} from "@/features/templates/templatesInterface";
import { createCall } from "@/utils/dailyVideoService/videoCallSlice";
import { BodyLMedium } from "@/components/common/typeScale/StyledTypeScale";
import EmptySectionsImage from "src/assets/svg/'Empty Questions Page Illustration.svg";
import { useGetTemplateQuestionsQuery } from "@/features/templates/templatesQuestionsAPISlice";

const DashBoard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [newTemplates, setTemplates] = useState<TemplateResponse[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const {
    data: templates,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTemplatesQuery();

  const handleButtonClick = () => {
    navigate("/templates");
  };

  const arg = {
    label: "Show All",
    icon: <RightBracketIcon />,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: handleButtonClick,
    disable: false,
  };
  const arg_empty = {
    label: "Go to Templates",
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
    navigate(`/templates/${templateId}`);
  };

  const handleSetDepartment = (value: string) => {
    setDepartmentId(value);
  };
  const handleSortMembers = (value: string) => {
    setSortCritiera(value);
  };

  useEffect(() => {
    if (isSuccess) {
      setTemplates(templates);
    }
  }, [isSuccess, templates]);

  if (isLoading) {
    return <Loading />; // Render the loading component when data is still loading
  }

  if (isError) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
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
    <>
      <YourNewContainer>
        <YourMainContentContainer>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            style={{
              width: "100%",
            }}
          >
            <MainContainer>
              <Container>
                <TextBox>
                  <WelcomeHeading>
                    Welcome back, {user.first_name} <WavingHand>👋</WavingHand>
                  </WelcomeHeading>
                  <DescriptionText>
                    Helping teams hire faster and better. Get{" "}
                    <DescriptionText>
                      {" "}
                      started by creating a template or launch a meeting .{" "}
                    </DescriptionText>
                  </DescriptionText>
                </TextBox>

                <ButtonContainer>
                  <ElWrap w={400}>
                    <TextIconBtnL
                      label="Start a Meeting"
                      onClick={startDemo}
                      icon={<RightBracketIcon />}
                      disable={false}
                      className={BackgroundColor.ACCENT_PURPLE}
                    />
                  </ElWrap>
                </ButtonContainer>
              </Container>
              <StyledImage src={dashboardImage} alt="dashboard_picture" />
            </MainContainer>
          </Stack>
        </YourMainContentContainer>

        {newTemplates.length === 0 ? (
          <TemplateEmptyBox>
            <EmptySectionContainer>
              {" "}
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
                  width: "248px",
                }}
              >
                <TextIconBtnL {...arg_empty} />
              </Box>
            </EmptySectionContainer>
          </TemplateEmptyBox>
        ) : (
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <PendingReviewsHeading>Recent Templates</PendingReviewsHeading>
              <Box
                style={{
                  width: "148px",
                }}
              >
                <TextIconBtnL {...arg} />
              </Box>
            </Stack>
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
        )}
      </YourNewContainer>
    </>
  );
};

export default DashBoard;
