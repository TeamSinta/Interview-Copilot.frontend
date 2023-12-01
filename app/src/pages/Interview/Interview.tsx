import { Grid, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  StyledIcon,
  StyledInfoDescription,
  StyledInterviewContent,
  StyledTabInfo,
  IndexStyle,
  CompetencyStyle,
  WhiteIndexStyle,
  StyledInnerWrapper,
  StyledAnswerPoints,
  StyledInnerDiv,
  StyledTopView,
  BottomQuestionButtons,
  EmojiOverlayWrapper,
  StyledImage,
  GridContainer,
  InterviewSideBarWrapper,
  GuidelinesSection,
  InterviewLayout,
} from "./StyledInterview";
import { NavButton } from "@/components/layouts/sidenavbar/StyledSideNavBar";
import { CANDIDATE_DETAILS } from "./InterviewConstant";
import {
  BottomArrowIcon,
  EmailIcon,
  LeftArrowIcon,
  LinkedinIcon,
  MapIcon,
  PhoneIcon,
  ResumeIcon,
  RightArrowIcon,
  TwoArrowIcon,
} from "@/components/common/svgIcons/Icons";
import InterviewStageSlider from "./InterviewStageSlider";
import { QuestionMeta } from "../Interviews/Conclusion/MainScreen/InterviewQNA/Tabs/QuestionTabQNA";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { StyledIconBtnM } from "@/components/common/buttons/button/StyledBtn";
import { Notes } from "./Notes";
import "./index.css";
import { BottomNavBar } from "./Daily/BottomNavBar";
import { RatingComponentL } from "../Interviews/Conclusion/MainScreen/InterviewQNA/RatingComponent";
import Call from "./Daily/Call/Call";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { startCall } from "@/features/videoCall/videoCallSlice";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  getTemplateQuestionsAndTopics,
  sendFeedback,
  updateInterviewQuestionRating,
} from "../../features/interviews/interviewsAPI";
import { useCookies } from "react-cookie";
import { useDaily } from "@daily-co/daily-react";
import SintaLogo from "src/assets/svg/Sinta_call_logo.svg";
import {
  BodyLMedium,
  BodySBold,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import { InputLabelDiv } from "@/components/pages/interview/overview_detail/StyledOverviewDetail";

import ReactMarkdown from "react-markdown";
import { H3 } from "@/components/common/typeScale/TypeScale";
import Chat from "@/components/common/form/chatBox/ChatBox";

const components = {
  h3: H3,
};

const Interview = ({ leaveCall, interviewDetails }) => {
  const title = "FrontEnd Developer";
  const stage = "Round 3";
  const stageName = "Pair-Programming";
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState(1);
  const [initTime, setInitTime] = useState("");
  const [templateQuestionsAndTopics, setTemplateQuestionsAndTopics] =
    useState(null);
  const { width } = useWindowSize();
  const [reactClicked, setReactClicked] = useState({
    clicked: 0,
    message: "",
    position: {
      left: 0,
      top: 0,
    },
  });
  const [startTime, setStartTime] = useState(null);
  const [isInterviewSideBarCollapsed, setIsInterviewSideBarCollapsed] =
    useState(false);
  const [cookies, ,] = useCookies(["access_token"]);
  const callObject = useDaily();

  // Placeholder for functionality. Moe will have to update this once the videoscreen is done and we have correct reducers/states.

  const { active_call } = useSelector((state: RootState) => state.videoCall);
  const dispatch: AppDispatch = useDispatch();

  const collapseInterviewSideBar = () => {
    setIsInterviewSideBarCollapsed(!isInterviewSideBarCollapsed);
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
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
      new CustomEvent("reaction_added", { detail: { message, position } })
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
      console.log(response);
      setTemplateQuestionsAndTopics(response);
    };

    fetchQuestionsAndTopics();
  }, [cookies.access_token, interviewDetails]);

  const sidebarTabs = useMemo(() => {
    return (
      <div style={{ display: "flex" }}>
        <span>
          <NavButton
            onClick={() => {
              setActiveTab(1);
            }}
            direction="row"
            style={{
              fontSize: "12px",
              height: "30px",
              borderRadius: "10px",
              width: "fit-content",
              padding: "17px 19px",
              lineHeight: "125%",
            }}
            className={activeTab === 1 ? "rightTabs active" : "rightTabs"}
          >
            <span>Info</span>
          </NavButton>{" "}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(2)}
            direction="row"
            style={{
              fontSize: "12px",
              height: "30px",
              borderRadius: "10px",
              width: "fit-content",
              marginLeft: "5px",
              padding: "17px 19px",
            }}
            className={activeTab === 2 ? "rightTabs active" : "rightTabs"}
          >
            <span>Questions</span>
          </NavButton>{" "}
        </span>
        <span>
          <NavButton
            onClick={() => setActiveTab(3)}
            direction="row"
            style={{
              fontSize: "12px",
              height: "30px",
              borderRadius: "10px",
              width: "fit-content",
              marginLeft: "5px",
              padding: "17px 19px",
            }}
            className={activeTab === 3 ? "rightTabs active" : "rightTabs"}
          >
            <span>Notes</span>
          </NavButton>
        </span>
      </div>
    );
  }, [activeTab]);

  const InfoTab = () => {
    const ImageText = (data: any) => {
      const { icon, text } = data;
      return (
        <div
          style={{
            display: "flex",
            fontSize: "10px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginRight: "5px",
            }}
          >
            <StyledIcon>{icon}</StyledIcon>
          </span>
          <span>{text}</span>
        </div>
      );
    };

    const ImageLinkText = (data: any) => {
      const { icon, text, link, textDecoration } = data;
      return (
        <div
          style={{
            display: "flex",
            fontSize: "10px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginRight: "5px",
            }}
          >
            <StyledIcon>{icon}</StyledIcon>
          </span>
          <span>
            <a style={{ textDecoration: textDecoration }} href={link}>
              {text}
            </a>
          </span>
        </div>
      );
    };
    const briefInfo = useMemo(() => {
      return (
        <>
          <Grid container>
            {" "}
            <ImageText icon={<EmailIcon />} text={interviewDetails.email} />
          </Grid>
          <br></br>
          <Grid container>
            <Grid md={6}>
              {" "}
              <ImageText
                icon={<MapIcon />}
                text={CANDIDATE_DETAILS.LOCATION}
              />{" "}
              <br></br>
              <ImageLinkText
                icon={<ResumeIcon />}
                text={"Resume.pdf"}
                link={CANDIDATE_DETAILS.LINKEDIN}
                textDecoration={"normal"}
              />
            </Grid>
            <Grid md={6}>
              {" "}
              <ImageText
                icon={<PhoneIcon />}
                text={CANDIDATE_DETAILS.PHONE}
              />{" "}
              <br></br>
              <ImageLinkText
                icon={<LinkedinIcon />}
                text={"LinkedIn "}
                link={CANDIDATE_DETAILS.LINKEDIN}
                textDecoration={"underline"}
              />
            </Grid>
          </Grid>
        </>
      );
    }, []);
    const jobDescription = useMemo(() => {
      return (
        <StyledInfoDescription>
          {CANDIDATE_DETAILS.DESCRIPTION}
        </StyledInfoDescription>
      );
    }, []);

    const competencies = useMemo(() => {
      return (
        <div style={{ fontSize: "12px" }}>
          <p
            style={{
              fontWeight: "600",
              fontSize: "12px",
              fontFamily: "ChillaxSemi",
            }}
          >
            {"Competencies"}
          </p>
          <br></br>
          <div style={{ display: "flex" }}>
            {CANDIDATE_DETAILS.COMPETENCIES.map((a) => {
              return <CompetencyStyle>{a}</CompetencyStyle>;
            })}{" "}
          </div>
        </div>
      );
    }, []);

    return (
      <>
        {briefInfo}
        <br></br>
        {jobDescription} <br></br>
        {competencies}
      </>
    );
  };

  interface IState {
    notes: string;
  }
  const InterviewQuestionTab = (info: any) => {
    const { data } = info;
    const [activeData, setActiveData] = useState(data[0]);
    const [activeQuestionInfo, setActiveQuestionInfo] = useState<any>("");
    const [activeNumber, setActiveNumber] = useState<any>("");
    const [collapseQuestion, setCollapseQuestion] = useState(false);
    const [prevNum, setPrevNum] = useState(0);
    const [nextNum, setNextNum] = useState(2);
    const [inputValue, setInputValue] = useState<IState>({
      notes: "",
    });

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
    const handleRating = (rating: number, question: string) => {
      // update interview round question rating to new rating
      updateInterviewQuestionRating(
        rating,
        question,
        interviewDetails.id,
        cookies.access_token
      );
    };

    useEffect(() => {
      setCollapseQuestion(false);
    }, [activeData]);

    useEffect(() => {
      console.log(activeQuestionInfo);
    }, [activeQuestionInfo]);

    function resetList() {
      setCollapseQuestion(false);
    }

    const textAreaOnChange = (value: string) => {
      inputValue["notes"] = value;
    };
    return (
      <>
        <div
          style={{
            padding: "2px",
            flex: "1",
            flexDirection: "column",
            display: "flex",
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
                  marginLeft: "18px",

                  backgroundColor: "transparent",
                }}
                onClick={() => {
                  setCollapseQuestion(false);
                }}
              >
                <ElWrap w={50}>
                  <StyledIconBtnM
                    style={{ backgroundColor: "white", stroke: "white" }}
                  >
                    <div
                      style={{
                        transform: "rotate(45deg)",
                        stroke: "${(props) => props.theme.colors.white",
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
            {" "}
            {!collapseQuestion
              ? activeData?.questions?.map((a: any, index: any) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        lineHeight: "15px",
                        borderRadius: "10px",
                        padding: "15px 10px",
                        backgroundColor: "white",
                        margin: "5px",
                        marginBottom: "10px",
                        cursor: "pointer",
                        opacity: index === 0 ? "0.5" : "1",
                      }}
                      onClick={() => {
                        showQuestionDetail(a, index);
                      }}
                    >
                      <IndexStyle>
                        <div>
                          <span>{index + 1}</span>{" "}
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
                  fontSize: "14px",
                }}
              >
                <div style={{ marginTop: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div>
                      <Stack direction="row" justifyContent="space-between">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",

                            marginBottom: "12px",
                          }}
                        >
                          <WhiteIndexStyle>
                            <div>
                              <BodySBold>{activeNumber}</BodySBold>{" "}
                            </div>
                          </WhiteIndexStyle>

                          <CompetencyStyle>
                            <BodySMedium>
                              {activeQuestionInfo?.competency}
                            </BodySMedium>{" "}
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
                                parseInt(activeNumber) === 1 ? "0.5" : "1",
                            }}
                            onClick={() => {
                              console.log(activeNumber);
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
                              <StyledIconBtnM style={{ background: "white" }}>
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
                                  ? "0.5"
                                  : "1",
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
                              <StyledIconBtnM style={{ background: "white" }}>
                                <LeftArrowIcon />
                              </StyledIconBtnM>
                            </ElWrap>
                          </span>{" "}
                        </Stack>
                      </Stack>{" "}
                      <Stack
                        alignItems="flex-start"
                        style={{ marginLeft: "8px" }}
                      >
                        <BodyLMedium
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            textAlign: "flex-start",
                            paddingTop: "16px",
                          }}
                        >
                          {activeQuestionInfo?.question}
                        </BodyLMedium>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            marginTop: "16px",
                            paddingBottom: "8px",
                          }}
                        >
                          <QuestionMeta
                            question={"low"}
                            duration={activeQuestionInfo?.duration}
                          />
                        </div>

                        <div
                          style={{ marginTop: "16px", marginBottom: "28px" }}
                        >
                          <RatingComponentL
                            interviewRoundId={interviewDetails.id}
                            question={activeQuestionInfo?.question}
                            id={activeQuestionInfo?.id}
                            setRating={handleRating}
                            rating={activeQuestionInfo?.rating}
                            width={40}
                            height={40}
                          />{" "}
                        </div>
                      </Stack>
                    </div>
                    <GuidelinesSection>
                      <StyledAnswerPoints>
                        <BodySBold style={{ marginBottom: "8px" }}>
                          {"Guidelines"}
                        </BodySBold>
                        <ReactMarkdown components={components}>
                          {activeQuestionInfo?.answer}
                        </ReactMarkdown>
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
                <InputLabelDiv style={{ width: "100%" }}>
                  {/* <TextArea
                    disable={false}
                    placeholder={"Notes"}
                    error={false}
                    onChange={textAreaOnChange}
                    name={"notes"}
                    value={inputValue["notes"]}
                  /> */}
                  <Chat
                    notesEntered={notesEntered}
                    elapsedTime={initTime}
                    setReactClicked={setReactClicked}
                    activeQuestionID={activeQuestionInfo.id}
                    reactClicked={reactClicked}
                  />
                  {console.log(activeQuestionInfo.id)}
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
            <Grid lg={10} md={10} sm={10} xs={10}>
              <span style={{ fontWeight: "600", fontFamily: "ChillaxSemi" }}>
                {interviewDetails.title}
              </span>
            </Grid>
            <Grid lg={2} md={2} sm={2} xs={2}>
              <span
                onClick={collapseInterviewSideBar}
                style={{ float: "right" }}
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
              backgroundColor: "#F6F6FB",
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              fontSize: "9px",
              alignItems: "center",
              alignContent: "center",
              width: "fit-content",
            }}
          >
            <span style={{ fontWeight: "lighter", marginLeft: "2px" }}>
              {stage + ": "}
            </span>
            <span
              style={{
                fontWeight: "600",
                fontFamily: "ChillaxSemi",
                marginLeft: "2px",
              }}
            >
              {stageName}
            </span>{" "}
          </div>
        </Grid>{" "}
        <br></br>
        {sidebarTabs}{" "}
      </StyledTopView>
      <br></br>
      <StyledInnerDiv>
        <StyledTabInfo>
          {activeTab === 1 ? (
            <>
              <p
                style={{
                  fontWeight: "600",
                  fontFamily: "ChillaxSemi",
                  fontSize: activeTab === 1 ? "20px" : "12px",
                }}
              >
                {interviewDetails.name}
              </p>{" "}
              <br></br>
            </>
          ) : null}

          {activeTab === 1 ? <InfoTab /> : null}
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

  const InterviewSideBarWaiting = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
      // This function will toggle the opacity between 1 and 0
      const fade = () => {
        setOpacity((prevOpacity) => (prevOpacity === 1 ? 0 : 1));
      };

      // Start an interval to toggle the opacity
      const intervalId = setInterval(fade, 2000); // Change opacity every 3 seconds

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    return (
      <Grid
        style={{
          height: "100%", // Adjust the height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontFamily: "ChillaxSemi",
            fontSize: "1.5em",
            width: "100%",
            opacity: opacity, // Apply dynamic opacity value
            transition: "opacity 1.5s ease-in-out", // Smooth transition for opacity change
          }}
        >
          Waiting for candidate...
        </span>
      </Grid>
    );
  };

  function InterviewSideBar(props: any) {
    const { reactClicked, setReactClicked } = props;
    return (
      <div>
        {/* {header} */}
        <StyledInterviewContent isCollapsed={isInterviewSideBarCollapsed}>
          {interviewDetails.name !== "" || interviewDetails.name !== null ? (
            interviewSideBarData
          ) : (
            <InterviewSideBarWaiting />
          )}
        </StyledInterviewContent>
      </div>
    );
  }

  const getEmojiClickTime = () => {
    const reactClickTime = Date.now();

    // Calculate elapsed time in milliseconds
    const elapsedTime =
      reactClickTime - (startTime === null ? Date.now() : startTime);

    // Convert elapsed time to minutes and seconds
    const minutes = Math.floor(elapsedTime / 60000);
    let seconds = ((elapsedTime % 60000) / 1000).toFixed(0);

    const secondsNum = parseInt(seconds, 10);

    // Format minutes and seconds to 'mm:ss'
    const formattedTime = `${minutes}:${secondsNum < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
  };

  const emojiClicked = (e, emoji: string, emojiNumber: number) => {
    // send feedback
    const data = {
      interview_round: interviewDetails.id,
      user: interviewDetails.candidate_id,
      reaction: emojiNumber,
      time: getEmojiClickTime(),
    };

    sendFeedback(data, cookies.access_token);
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

  function notesEntered(notes: string) {
    // send feedback
    const data = {
      interview_round: interviewDetails.id,
      user: interviewDetails.candidate_id,
      note: notes,
    };

    sendFeedback(data, cookies.access_token);
  }

  function EmojiOverlay() {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      window.addEventListener("reaction_added", handleSendFlyingEmoji);

      // Clean up the event listener
      return () => {
        window.removeEventListener("reaction_added", handleSendFlyingEmoji);
      };
    }, []);

    const handleRemoveFlyingEmoji = useCallback((node) => {
      if (!overlayRef.current) return;
      overlayRef.current.removeChild(node);
    }, []);

    function handleSendFlyingEmoji(e) {
      const emoji = e.detail.message;
      const position = e.detail.position;

      if (emoji) {
        callObject.sendAppMessage({ message: `${emoji}` }, "*");
        handleDisplayFlyingEmoji(emoji, position);
      }
    }

    const handleDisplayFlyingEmoji = useCallback(
      (emoji, position) => {
        if (!overlayRef.current) {
          return;
        }

        const node = document.createElement("div");
        node.appendChild(document.createTextNode(emoji));
        node.className =
          Math.random() * 1 > 0.5 ? "emoji wiggle-1" : "emoji wiggle-2";
        node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
        node.style.left = `${position.left}px`; // Starting position from the button
        node.style.top = `${position.top - 70}px`; // Starting position from the button
        node.style.position = "absolute";
        overlayRef.current.appendChild(node);

        node.addEventListener("animationend", (e) =>
          handleRemoveFlyingEmoji(e.target)
        );
      },
      [handleRemoveFlyingEmoji]
    );

    const handleReceiveFlyingEmoji = useCallback(
      (e) => {
        if (!overlayRef.current) {
          return;
        }
        handleDisplayFlyingEmoji(e.data.message, e.data.position);
      },
      [handleDisplayFlyingEmoji]
    );

    return <EmojiOverlayWrapper ref={overlayRef} />;
  }

  return (
    <div>
      <GridContainer>
        <div
          style={{
            paddingLeft: "26px",
            marginTop: "26px",
            maxWidth: "200px",
            position: "absolute",
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
      />
      {<EmojiOverlay />}
    </div>
  );
};

export default Interview;
