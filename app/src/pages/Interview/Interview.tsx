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
import HeadingMeeting from './Components/HeadingMeeting';
import RightArrow from 'src/assets/svg/rightArrowIcon.svg';

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
  const [showSecondComponent, setShowSecondComponent] = useState(false);

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
            className={`text-xs h-7 rounded-lg px-5 leading-snug ${
              activeTab === 1 ? 'rightTabs active' : 'rightTabs'
            }`}
          >
            <span>Info</span>
          </NavButton>{' '}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(2)}
            direction="row"
            className={`text-xs h-7 rounded-lg px-5 leading-snug ${
              activeTab === 2 ? 'rightTabs active' : 'rightTabs'
            }`}
          >
            <span>Notes</span>
          </NavButton>{' '}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(3)}
            direction="row"
            className={`text-xs h-7 rounded-lg px-5 leading-snug ${
              activeTab === 3 ? 'rightTabs active' : 'rightTabs'
            }`}
          >
            <span>Questions</span>
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
      <div className="h-full flex flex-col gap-2">
        <div className="p-3 rounded-b-xl bg-white mb-2">
          <p className="font-semibold text-2xl">
            {interviewDetails.name}
            <div className="bg-lightBg text-xs rounded-md p-2 my-2 flex items-center w-fit flex-col content-center">
              <p className="font-light ml-1 text-gray-500">
                Department:{' '}
                <span className="text-gray-800 font-semibold ">
                  {interviewDetails.department ?? 'Template'}
                </span>
              </p>
            </div>
          </p>
          {collapseQuestion ? (
            <Stack direction="row" justifyContent="space-between">
              <InterviewStageSlider
                data={data}
                setActiveData={setActiveData}
                resetList={resetList}
              />
            </Stack>
          ) : (
            <InterviewStageSlider
              data={data}
              setActiveData={setActiveData}
              resetList={resetList}
            />
          )}

          <div className="flex flex-col h-[36vh] overflow-y-auto min-h-0 relative interview-details bg-lightBg rounded-xl p-2">
            {!collapseQuestion
              ? activeData?.questions?.map((a: any, index: any) => {
                  return (
                    <div
                      className="flex items-center text-xs leading-4 rounded-lg p-4 bg-white m-1 mb-2 cursor-pointer opacity-100"
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
          </div>
        </div>
        {collapseQuestion ? (
          <div className="bg-white py-2 rounded-xl">
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              alignItems="flex-end"
              className="bg-white py-2"
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
          </div>
        ) : null}
      </div>
    );
  };

  const interviewSideBarData = (
    <div className={`rounded-xl ${activeTab !== 3 ? 'bg-white' : ''}`}>
      <div className="bg-white rounded-t-xl p-2 overflow-hidden flex justify-center items-center">
        {sidebarTabs}{' '}
      </div>
      <div
        className={`flex flex-col flex-grow overflow-x-hidden rounded-b-xl ${
          activeTab !== 3 ? 'bg-white p-3 h-[75vh]' : ''
        }`}
      >
        {activeTab === 1 ? (
          <>
            {showSecondComponent ? (
              <>
                <p className="font-semibold text-2xl">
                  {interviewDetails.name}
                  <div className="bg-lightBg text-xs rounded-md p-2 my-2 flex items-center w-fit flex-col content-center">
                    <p className="font-light ml-1 text-gray-500">
                      Department:{' '}
                      <span className="text-gray-800 font-semibold ">
                        {interviewDetails.department ?? 'Template'}
                      </span>
                    </p>
                  </div>
                </p>
                <InfoTab interviewDetails={interviewDetails} />
              </>
            ) : (
              <HeadingMeeting />
            )}
            <div className="flex justify-end items-end mb-10">
              <button
                className="text-primaryTextColor border border-primaryTextColor rounded-md py-2 px-4 flex right-0 justify-end w-fit items-center"
                onClick={() => setShowSecondComponent(!showSecondComponent)}
              >
                Templates <img src={RightArrow} alt="arrow" className="pl-2" />
              </button>
            </div>
          </>
        ) : null}
        {activeTab === 2 ? <Notes notesInfo={interviewDetails.notes} /> : null}
        {activeTab === 3 ? (
          <InterviewQuestionTab data={templateQuestionsAndTopics?.data} />
        ) : null}
      </div>
    </div>
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

    function handleSendFlyingEmoji(e: {
      detail: { message: any; position: any };
    }) {
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
