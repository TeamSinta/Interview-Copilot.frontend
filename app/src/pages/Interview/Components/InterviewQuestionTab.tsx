import { StyledIconBtnM } from '@/components/common/buttons/button/StyledBtn';
import MarkdownFromatConatiner from '@/components/common/markdownFormatContainer/MarkdownFormatContainer';
import {
  LeftArrowIcon,
  RightArrowIcon,
  TwoArrowIcon,
} from '@/components/common/svgIcons/Icons';
import {
  BodyLMedium,
  BodySBold,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { InputLabelDiv } from '@/components/pages/interview/overview_detail/StyledOverviewDetail';
import { updateInterviewQuestionRating } from '@/features/interviews/interviewsAPI';
import { RatingComponentL } from '@/pages/Interviews/Conclusion/MainScreen/InterviewQNA/RatingComponent';
import { QuestionMeta } from '@/pages/Interviews/Conclusion/MainScreen/InterviewQNA/Tabs/QuestionTabQNA';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import Chat from '../Daily/Chat/Chat';
import InterviewStageSlider from '../InterviewStageSlider';
import {
  BottomQuestionButtons,
  CompetencyStyle,
  GuidelinesSection,
  IndexStyle,
  StyledAnswerPoints,
  StyledInnerWrapper,
  WhiteIndexStyle,
} from '../StyledInterview';

interface Info {
  data: any[];
  interviewDetails: any;
}

const InterviewQuestionTab: React.FC<Info> = (info) => {
  const { data, interviewDetails } = info;
  const [activeData, setActiveData] = useState(data[0]);
  const [activeQuestionInfo, setActiveQuestionInfo] = useState<any>('');
  const [activeNumber, setActiveNumber] = useState<any>('');
  const [collapseQuestion, setCollapseQuestion] = useState(false);
  const [questionRatings, setQuestionRatings] = useState({});
  const [prevNum, setPrevNum] = useState(0);
  const [nextNum, setNextNum] = useState(2);

  const showQuestionDetail = (questionInfo: any, index: any) => {
    setCollapseQuestion(true);
    setActiveQuestionInfo(questionInfo);
    setActiveNumber(index + 1);
    const currentNumber = parseInt(index + 1);
    const prevNumber = currentNumber - 1;
    const nextNumber = currentNumber + 1;

    setPrevNum(prevNumber);
    setNextNum(nextNumber);
  };
  const handleRating = (rating: number, question: any) => {
    // update interview round question rating to new rating
    setQuestionRatings((prevRatings) => ({
      ...prevRatings,
      [question.id]: rating,
    }));

    updateInterviewQuestionRating(
      rating,
      question.id,
      interviewDetails.id,
      interviewDetails.template_id
    );
  };

  useEffect(() => {
    setCollapseQuestion(false);
  }, [activeData]);

  useEffect(() => {}, [activeQuestionInfo]);

  function resetList() {
    setCollapseQuestion(false);
  }

  return (
    <>
      <div
        style={{
          padding: '2px',
          flex: '1',
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        {collapseQuestion ? (
          <Stack direction="row" justifyContent="space-between">
            <InterviewStageSlider
              data={data}
              setActiveData={setActiveData}
              resetList={resetList}
            />
            <span
              style={{
                marginLeft: '18px',

                backgroundColor: 'transparent',
              }}
              onClick={() => {
                setCollapseQuestion(false);
              }}
            >
              <ElWrap w={50}>
                <StyledIconBtnM
                  style={{ backgroundColor: 'white', stroke: 'white' }}
                >
                  <div
                    style={{
                      transform: 'rotate(45deg)',
                      stroke: '${(props) => props.theme.colors.white',
                    }}
                  >
                    <TwoArrowIcon />
                  </div>
                </StyledIconBtnM>
              </ElWrap>
            </span>
          </Stack>
        ) : (
          <InterviewStageSlider
            data={data}
            setActiveData={setActiveData}
            resetList={resetList}
          />
        )}
        <StyledInnerWrapper>
          {' '}
          {!collapseQuestion
            ? activeData?.questions?.map((a: any, index: any) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '12px',
                      lineHeight: '15px',
                      borderRadius: '10px',
                      padding: '15px 10px',
                      backgroundColor: 'white',
                      margin: '5px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      opacity: index === 0 ? '0.5' : '1',
                    }}
                    onClick={() => {
                      showQuestionDetail(a, index);
                    }}
                  >
                    <IndexStyle>
                      <div>
                        <span>{index + 1}</span>{' '}
                      </div>
                    </IndexStyle>
                    <div>{a.question}</div>
                  </div>
                );
              })
            : null}
          {collapseQuestion ? (
            <div
              className="question-detail"
              style={{
                fontSize: '14px',
              }}
            >
              <div style={{ marginTop: '18px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <div>
                    <Stack direction="row" justifyContent="space-between">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',

                          marginBottom: '12px',
                        }}
                      >
                        <WhiteIndexStyle>
                          <div>
                            <BodySBold>{activeNumber}</BodySBold>{' '}
                          </div>
                        </WhiteIndexStyle>

                        <CompetencyStyle>
                          <BodySMedium>
                            {activeQuestionInfo?.competency}
                          </BodySMedium>{' '}
                        </CompetencyStyle>
                      </div>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1}
                      >
                        <span
                          style={{
                            opacity: parseInt(activeNumber) === 1 ? '0.5' : '1',
                          }}
                          onClick={() => {
                            if (parseInt(activeNumber) !== 1) {
                              setNextNum(nextNum - 1);
                              setActiveNumber(prevNum);
                              setActiveQuestionInfo(
                                activeData?.questions?.filter(
                                  (a: any, index: number) =>
                                    index + 1 === prevNum
                                )[0]
                              );
                              setPrevNum(prevNum - 1);
                            }
                          }}
                        >
                          <ElWrap w={33}>
                            <StyledIconBtnM style={{ background: 'white' }}>
                              {/* this is actually left arrow icon */}
                              <RightArrowIcon />
                            </StyledIconBtnM>
                          </ElWrap>
                        </span>
                        <span
                          style={{
                            opacity:
                              parseInt(activeNumber) ===
                              activeData?.questions?.length
                                ? '0.5'
                                : '1',
                          }}
                          onClick={() => {
                            if (
                              parseInt(activeNumber) !==
                              activeData?.questions?.length
                            ) {
                              setActiveQuestionInfo(
                                activeData?.questions?.filter(
                                  (a: any, index: number) =>
                                    index + 1 === nextNum
                                )[0]
                              );
                              setActiveNumber(nextNum);
                              setNextNum(nextNum + 1);
                              setPrevNum(prevNum + 1);
                            }
                          }}
                        >
                          <ElWrap w={33}>
                            <StyledIconBtnM style={{ background: 'white' }}>
                              <LeftArrowIcon />
                            </StyledIconBtnM>
                          </ElWrap>
                        </span>{' '}
                      </Stack>
                    </Stack>{' '}
                    <Stack
                      alignItems="flex-start"
                      style={{ marginLeft: '8px' }}
                    >
                      <BodyLMedium
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          textAlign: 'start',
                          paddingTop: '16px',
                        }}
                      >
                        {activeQuestionInfo?.question}
                      </BodyLMedium>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          marginTop: '16px',
                          paddingBottom: '8px',
                        }}
                      >
                        <QuestionMeta
                          question={'low'}
                          duration={activeQuestionInfo?.duration}
                          difficulty={activeQuestionInfo?.difficulty}
                        />
                      </div>

                      <div style={{ marginTop: '16px', marginBottom: '28px' }}>
                        <RatingComponentL
                          interviewRoundId={interviewDetails.id}
                          question={activeQuestionInfo?.question}
                          initialActiveTab={activeQuestionInfo?.rating}
                          id={activeQuestionInfo?.id}
                          onUpdateRating={(rating: number) =>
                            handleRating(rating, activeQuestionInfo)
                          }
                          rating={
                            questionRatings[activeQuestionInfo.id] || null
                          }
                          width={40}
                          height={40}
                        />{' '}
                      </div>
                    </Stack>
                  </div>
                  <GuidelinesSection>
                    <StyledAnswerPoints>
                      <BodySBold style={{ marginBottom: '8px' }}>
                        {'Guidelines'}
                      </BodySBold>
                      <MarkdownFromatConatiner>
                        {activeQuestionInfo?.answer}
                      </MarkdownFromatConatiner>
                    </StyledAnswerPoints>
                  </GuidelinesSection>
                </div>
              </div>
            </div>
          ) : null}
        </StyledInnerWrapper>

        {collapseQuestion ? (
          <BottomQuestionButtons>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              alignItems="flex-end"
            >
              <InputLabelDiv style={{ width: '100%' }}>
                <Chat
                  notesEntered={notesEntered}
                  elapsedTime={initTime}
                  setReactClicked={setReactClicked}
                  activeQuestionID={activeQuestionInfo.id}
                  reactClicked={reactClicked}
                />
              </InputLabelDiv>
            </Stack>
          </BottomQuestionButtons>
        ) : null}
      </div>
    </>
  );
};

export default InterviewQuestionTab;
