import {
  BodyLSemiBold,
  BodyMMedium,
  H1,
} from "@/components/common/typeScale/StyledTypeScale.js";

import ElWrap from "@/components/layouts/elWrap/ElWrap";
import {
  InterviewOverviewContainer,
  InterviewOverviewLayout,
  InterviewStageContainer,
  InterviewStageTopContainer,
  Subtitle,
} from "@/components/pages/interview/StyledInterview";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom"; // <-- Import useNavigate
import { StyledIconBtnM } from "@/components/common/buttons/button/StyledBtn";
import { RightArrowIcon } from "@/components/common/svgIcons/Icons";
import { useEffect, useState } from "react";

import { BackgroundColor } from "@/features/utils/utilEnum";
import { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { TextBtnM } from "@/components/common/buttons/textBtn/TextBtn";
import QuestionBanksQuestionsList from "./QuestionsBankList";
import Loading from "@/components/common/elements/loading/Loading";
import { useGetQuestionBankDetailQuery } from "@/features/questions/questionsAPISlice";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 35px;
`;

const Title = styled.span`
  font-size: 20px;
  margin-left: 10px;
`;

const QuestionBankStage = () => {
  const navigate = useNavigate();
  const { questionBankId } = useParams(); // Replace 'questionBankId' with your actual parameter name

  const [QuestionBank, setQuestionBanks] = useState<string[]>([]);
  const {
    data: questionBankDetails,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetQuestionBankDetailQuery(questionBankId);

  useEffect(() => {
    if (isSuccess) {
      setQuestionBanks(questionBankDetails);
    }
  }, [isSuccess, questionBankDetails]);

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

  return (
    <>
      <InterviewStageContainer>
        <InterviewStageTopContainer>
          <HeaderWrapper>
            <IconWrapper>
              <StyledIconBtnM onClick={() => navigate(-1)}>
                {" "}
                {/* <-- Use the navigate function here */}
                <RightArrowIcon />
              </StyledIconBtnM>
            </IconWrapper>
            <Title>
              <H1>{QuestionBank.title}</H1>
            </Title>
          </HeaderWrapper>
          <Subtitle>
            <BodyLSemiBold>3 Competencies ·</BodyLSemiBold>
            <BodyLSemiBold>{QuestionBank.length} Questions</BodyLSemiBold>
          </Subtitle>
          <div
            style={{
              width: "720px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <BodyMMedium>
              The five main principles of UX design. There are many important
              principles within UX design but to simplify things a bit, we've
              broken them down into five main concepts: Empathy, strategy,
              usability, inclusivity, and validation.
            </BodyMMedium>
            <ElWrap w={100}>
              <TextBtnM
                label={"Edit"}
                disable={false}
                className={BackgroundColor.WHITE}
                onClick={() => {
                  onClickModalOpen(MODAL_TYPE.EDIT_INT);
                }}
              />
            </ElWrap>
          </div>
        </InterviewStageTopContainer>
        <InterviewOverviewContainer>
          <InterviewOverviewLayout>
            <QuestionBanksQuestionsList questionBank={QuestionBank} />
          </InterviewOverviewLayout>
        </InterviewOverviewContainer>
      </InterviewStageContainer>
    </>
  );
};

export default QuestionBankStage;
