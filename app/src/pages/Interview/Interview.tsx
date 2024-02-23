import { AppDispatch, RootState } from '@/app/store';
import { StyledIconBtnM } from '@/components/common/buttons/button/StyledBtn';
import {
  BottomArrowIcon,
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
import { NavButton } from '@/components/layouts/sidenavbar/StyledSideNavBar';
import { InputLabelDiv } from '@/components/pages/interview/overview_detail/StyledOverviewDetail';
import { startCall } from '@/features/videoCall/videoCallSlice';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useDaily } from '@daily-co/daily-react';
import { Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SintaLogo from 'src/assets/svg/Sinta_call_logo.svg';
import {
  getTemplateQuestionsAndTopics,
  sendFeedback,
  updateInterviewQuestionRating,
} from '../../features/interviews/interviewsAPI';
import { RatingComponentL } from '../Interviews/Conclusion/MainScreen/InterviewQNA/RatingComponent';
import { QuestionMeta } from '../Interviews/Conclusion/MainScreen/InterviewQNA/Tabs/QuestionTabQNA';
import { BottomNavBar } from './Daily/BottomNavBar';
import Call from './Daily/Call/Call';
import InterviewStageSlider from './InterviewStageSlider';
import { Notes } from './Notes';
import {
  BottomQuestionButtons,
  CompetencyStyle,
  EmojiOverlayWrapper,
  GridContainer,
  GuidelinesSection,
  IndexStyle,
  InterviewLayout,
  StyledAnswerPoints,
  StyledImage,
  StyledInnerDiv,
  StyledInnerWrapper,
  StyledTabInfo,
  StyledTopView,
  WhiteIndexStyle,
} from './StyledInterview';
import './index.css';

import Chat from '@/components/common/form/chatBox/ChatBox';
import { useCookies } from 'react-cookie';
import MarkdownFromatConatiner from '@/components/common/markdownFormatContainer/MarkdownFormatContainer';
import InfoTab from './Components/InfoTab';
import InterviewSideBar from './Components/InterviewSideBar';
import { IReactClickedState } from './Daily/BottomNavBar/BottomNavBar';

// const components = {
//   h3: H3,
// };

const Interview = ({ leaveCall, interviewDetails }: any) => {
  const stage = 'Round 3';
  const stageName = 'Pair-Programming';
  const { user } = useSelector((state: RootState) => state.user);
  const [cookies, ,] = useCookies(['access_token']);
  const [activeTab, setActiveTab] = useState(1);
  const [initTime, setInitTime] = useState('');
  const [templateQuestionsAndTopics, setTemplateQuestionsAndTopics] =
    useState(null);
  const { width } = useWindowSize();
  const [reactClicked, setReactClicked] = useState<IReactClickedState>({
    clicked: 0,
    message: '',
    position: {
      left: 0,
      top: 0,
    },
  });

  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setStartTime(now);
  }, []);
  const [isInterviewSideBarCollapsed, setIsInterviewSideBarCollapsed] =
    useState(false);
  const callObject = useDaily();

  const { active_call } = useSelector((state: RootState) => state.videoCall);
  const dispatch: AppDispatch = useDispatch();

  const collapseInterviewSideBar = () => {
    setIsInterviewSideBarCollapsed(!isInterviewSideBarCollapsed);
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    setInitTime(getCurrentTime());
    // placeholder dispatch for functionality, sets call as active to allow correct fullscreen rendering in App
    dispatch(startCall(true));

    // placeholder dispatch end //
  }, [active_call, dispatch]);

  useEffect(() => {
    const { message, position } = reactClicked;
    window.dispatchEvent(
      new CustomEvent('reaction_added', { detail: { message, position } })
    );
  }, [reactClicked]);

  useEffect(() => {
    if (width && width < 900) {
      setIsInterviewSideBarCollapsed(true);
    }
  }, [width]);

  useEffect(() => {
    const fetchQuestionsAndTopics = async () => {
      // get the template questions
      const response = await getTemplateQuestionsAndTopics(
        interviewDetails.template_id,
        cookies.access_token
      );
      setTemplateQuestionsAndTopics(response);
    };

    fetchQuestionsAndTopics();
  }, [interviewDetails, cookies]);

  const sidebarTabs = useMemo(() => {
    return (
      <div style={{ display: 'flex' }}>
        <span>
          <NavButton
            onClick={() => {
              setActiveTab(1);
            }}
            direction="row"
            style={{
              fontSize: '12px',
              height: '30px',
              borderRadius: '10px',
              width: 'fit-content',
              padding: '17px 19px',
              lineHeight: '125%',
            }}
            className={activeTab === 1 ? 'rightTabs active' : 'rightTabs'}
          >
            <span>Info</span>
          </NavButton>{' '}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(2)}
            direction="row"
            style={{
              fontSize: '12px',
              height: '30px',
              borderRadius: '10px',
              width: 'fit-content',
              marginLeft: '5px',
              padding: '17px 19px',
            }}
            className={activeTab === 2 ? 'rightTabs active' : 'rightTabs'}
          >
            <span>Questions</span>
          </NavButton>{' '}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(3)}
            direction="row"
            style={{
              fontSize: '12px',
              height: '30px',
              borderRadius: '10px',
              width: 'fit-content',
              marginLeft: '5px',
              padding: '17px 19px',
            }}
            className={activeTab === 3 ? 'rightTabs active' : 'rightTabs'}
          >
            <span>Notes</span>
          </NavButton>
        </span>
      </div>
    );
  }, [activeTab]);

  const InterviewQuestionTab = (info: any) => {
    const { data } = info;
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

      updateInterviewQuestionRating(rating, question.id, interviewDetails.id, interviewDetails.template_id);
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
                        opacity: index === 0 ? '1' : '1',
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
                              opacity:
                                parseInt(activeNumber) === 1 ? '0.5' : '1',
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

                        <div
                          style={{ marginTop: '16px', marginBottom: '28px' }}
                        >
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

  const interviewSideBarData = (
    <>
      <StyledTopView>
        <Grid lg={12}>
          <Grid container>
            <Grid item lg={10} md={10} sm={10} xs={10}>
              <span style={{ fontWeight: '600', fontFamily: 'InterSemi' }}>
                {interviewDetails.title}
              </span>
            </Grid>
            <Grid lg={2} md={2} sm={2} xs={2}>
              <span
                onClick={collapseInterviewSideBar}
                style={{ float: 'right' }}
              >
                <BottomArrowIcon />
              </span>
            </Grid>
          </Grid>
        </Grid>
        <br></br>
        <Grid lg={11}>
          <div
            style={{
              backgroundColor: '#F6F6FB',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              fontSize: '9px',
              alignItems: 'center',
              alignContent: 'center',
              width: 'fit-content',
            }}
          >
            <span style={{ fontWeight: 'lighter', marginLeft: '2px' }}>
              {'Deparment: '}
            </span>
            <span
              style={{
                fontWeight: '600',
                fontFamily: 'InterSemi',
                marginLeft: '2px',
              }}
            >
              {interviewDetails.department}
            </span>{' '}
          </div>
        </Grid>{' '}
        <br></br>
        {sidebarTabs}{' '}
      </StyledTopView>
      <br></br>
      <StyledInnerDiv>
        <StyledTabInfo>
          {activeTab === 1 ? (
            <>
              <p
                style={{
                  fontWeight: '600',
                  fontFamily: 'InterSemi',
                  fontSize: activeTab === 1 ? '20px' : '12px',
                }}
              >
                {interviewDetails.name}
              </p>{' '}
              <br></br>
            </>
          ) : null}

          {activeTab === 1 ? (
            <InfoTab interviewDetails={interviewDetails} />
          ) : null}
          {activeTab === 2 ? (
            <InterviewQuestionTab data={templateQuestionsAndTopics?.data} />
          ) : null}
          {activeTab === 3 ? (
            <Notes
              notesEntered={notesEntered}
              elapsedTime={initTime}
              setReactClicked={setReactClicked}
              reactClicked={reactClicked}
            />
          ) : null}
        </StyledTabInfo>
        <br></br>
      </StyledInnerDiv>
    </>
  );

  const getEmojiClickTime = () => {
    const reactClickTime = Date.now();

    // Calculate elapsed time in milliseconds
    const elapsedTime =
      reactClickTime - (startTime === null ? Date.now() : Number(startTime));

    // Convert elapsed time to minutes and seconds
    const minutes = Math.floor(elapsedTime / 60000);
    let seconds = ((elapsedTime % 60000) / 1000).toFixed(0);

    const secondsNum = parseInt(seconds, 10);

    // Format minutes and seconds to 'mm:ss'
    const formattedTime = `${minutes}:${secondsNum < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  };

  const emojiClicked = (
    e: React.MouseEvent,
    emoji: string,
    emojiNumber: number
  ) => {
    // send feedback
    const data = {
      interview_round: interviewDetails.id,
      user: user.id,
      reaction: emojiNumber,
      time: getEmojiClickTime(),
    };

    sendFeedback(data);
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    setReactClicked({
      clicked: reactClicked?.clicked + 1,
      message: emoji,
      position: {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      },
    });
  };

  function notesEntered(notes: string, activeQuestionID: string) {
    // send feedback
    const data = {
      interview_round: interviewDetails.id,
      user: user.id,
      note: notes,
      time: getEmojiClickTime(),
      template_question: activeQuestionID,
    };

    sendFeedback(data);
  }

  function EmojiOverlay() {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      window.addEventListener('reaction_added', handleSendFlyingEmoji);

      // Clean up the event listener
      return () => {
        window.removeEventListener('reaction_added', handleSendFlyingEmoji);
      };
    }, []);

    const handleRemoveFlyingEmoji = useCallback((node: any) => {
      if (!overlayRef.current) return;
      overlayRef.current.removeChild(node);
    }, []);

    function handleSendFlyingEmoji(e: { detail: { message: any; position: any; }; }) {
      const emoji = e.detail.message;
      const position = e.detail.position;

      if (emoji) {
        callObject?.sendAppMessage({ message: `${emoji}` }, '*');
        handleDisplayFlyingEmoji(emoji, position);
      }
    }

    const handleDisplayFlyingEmoji = useCallback(
      (emoji: string, position: { left: any; top: number }) => {
        if (!overlayRef.current) {
          return;
        }

        const node = document.createElement('div');
        node.appendChild(document.createTextNode(emoji));
        node.className =
          Math.random() * 1 > 0.5 ? 'emoji wiggle-1' : 'emoji wiggle-2';
        node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
        node.style.left = `${position.left}px`; // Starting position from the button
        node.style.top = `${position.top - 70}px`; // Starting position from the button
        node.style.position = 'absolute';
        overlayRef.current.appendChild(node);

        node.addEventListener('animationend', (e) =>
          handleRemoveFlyingEmoji(e.target)
        );
      },
      [handleRemoveFlyingEmoji]
    );

    return <EmojiOverlayWrapper ref={overlayRef} />;
  }

  return (
    <div>
      <GridContainer>
        <div
          style={{
            paddingLeft: '26px',
            marginTop: '26px',
            maxWidth: '200px',
            position: 'absolute',
          }}
        >
          <StyledImage src={SintaLogo} alt="Sinta_Logo" />
        </div>
        <InterviewLayout>
          <Call />
          <div className="side">
            <InterviewSideBar
              setReactClicked={setReactClicked}
              reactClicked={reactClicked}
              interviewDetails={interviewDetails}
              isInterviewSideBarCollapsed={isInterviewSideBarCollapsed}
              interviewSideBarData={interviewSideBarData}
            />
          </div>
        </InterviewLayout>
      </GridContainer>
      <BottomNavBar
        emojiClicked={emojiClicked}
        setReactClicked={setReactClicked}
        reactClicked={reactClicked}
        leaveCall={leaveCall}
        setStartTime={setStartTime}
        interviewRoundId={interviewDetails.id}
      />
      {<EmojiOverlay />}
    </div>
  );
};

export default Interview;
