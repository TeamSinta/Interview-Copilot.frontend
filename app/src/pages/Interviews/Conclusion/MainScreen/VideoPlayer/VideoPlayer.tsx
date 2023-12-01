import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import "./VideoPlayer.css"; // Import the CSS file
import { transcriptionInfo } from "../TranscriptionTab/TranscriptionTabConstants";
import { VideoControlBtnM } from "@/components/common/buttons/button/StyledBtn";
import {
  MuteIcon,
  PlayIcon,
  SoundIcon,
  FullScreenIcon,
  PauseIcon,
} from "@/components/common/svgIcons/Icons";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { ICustomIconProps } from "@/components/common/svgIcons/CustomIcons";
import {
  StyledInterviewerImage,
  StyledCandidateImage,
} from "./StyledVideoPlayer";

export const MuteButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <div style={{ marginRight: "5px" }}>
      <ElWrap w={24}>
        <VideoControlBtnM
          style={{
            background: "white",
          }}
        >
          <MuteIcon />
        </VideoControlBtnM>
      </ElWrap>
    </div>
  );
};
export const SoundButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <div style={{ marginRight: "5px" }}>
      <ElWrap w={24}>
        <VideoControlBtnM
          style={{
            background: "white",
          }}
        >
          <SoundIcon />
        </VideoControlBtnM>
      </ElWrap>
    </div>
  );
};
export const PauseButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <div style={{ marginRight: "5px" }}>
      <ElWrap w={24}>
        <VideoControlBtnM
          style={{
            background: "#6462F1",
          }}
        >
          <PauseIcon />
        </VideoControlBtnM>
      </ElWrap>
    </div>
  );
};
export const PlayButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <div style={{ marginRight: "5px" }}>
      <ElWrap w={24}>
        <VideoControlBtnM
          style={{
            background: "#6462F1",
          }}
        >
          <PlayIcon />
        </VideoControlBtnM>
      </ElWrap>
    </div>
  );
};
export const FullscreenButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;
  return (
    <div style={{ marginRight: "5px" }}>
      <ElWrap w={24}>
        <VideoControlBtnM
          style={{
            background: "white",
          }}
        >
          <FullScreenIcon />
        </VideoControlBtnM>
      </ElWrap>
    </div>
  );
};

const VideoPlayer = ({ questionsTranscript, videoUrl, emojisData }) => {
  const videoRef = useRef<any>(null);
  const questionBarRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<any>(false);
  const [isMuted, setIsMuted] = useState<any>(false);
  // const [isFullScreen, setIsFullScreen] = useState<any>(false);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [totalDuration, setTotalDuration] = useState<any>(0);
  const currentQuestion = useRef("");
  const [emoticonData, setEmoticonData] = useState<any>([]);
  const timelineRef = useRef<any>(null);
  // const [timelineWidth, setTimelineWidth] = useState<any>(0);
  const [progress, setProgress] = useState<any>(0);
  const [tooltipData, setTooltipData] = useState<any>({
    question: "",
    time: 0,
  });
  const [tooltipPosition, setTooltipPosition] = useState<any>({ x: 0, y: 0 });

  const [interviewerData, setInterviewerData] = useState<any>([]);
  const [questionData, setQuestionData] = useState<any>([]);

  const emoticonKeyPairs = {
    "1": "🔥",
    "2": "👍🏻",
    "3": "👎🏻",
    "4": "❤️",
    "5": "😂",
  };

  // TODO: Convert questionsTranscript to resemble the questionData format.

  const response = {
    videoDuration: "0:55",
    questionData: [
      {
        id: 1,
        question: "Tell me about yourself",
        startTime: "0:00",
        endTime: "0:13",
      },
      {
        id: 2,
        question: "What are your strengths?",
        startTime: "0:14",
        endTime: "0:30",
      },
      {
        id: 3,
        question: "Describe a challenging situation you faced",
        startTime: "0:31",
        endTime: "0:42",
      },
      {
        id: 4,
        question: "What is HTML",
        startTime: "0:43",
        endTime: "0:49",
      },
      {
        id: 5,
        question: "What is Javascript?",
        startTime: "0:50",
        endTime: "0:55",
      },
    ],
    interviewerData: [
      {
        id: 1,
        question: "Tell me about yourself",
        speaker: "interviewer",
        dialogue: "Tell me about yourself",
        startTime: "0:00",
        endTime: "0:06",
        emoticon: {
          time: "0:02",
          type: "(Y)",
        },
        notes: {},
      },
      {
        id: 2,
        question: "Tell me about yourself",
        speaker: "candidate",
        dialogue: "I like to code",
        startTime: "0:07",
        endTime: "0:13",
        emoticon: {},
        notes: {
          isNotes: true,
          time: "0:10",
        },
      },
      {
        id: 3,
        question: "What are your strengths?",
        speaker: "interviewer",
        dialogue: "What are your strengths?",
        startTime: "0:14",
        endTime: "0:20",
        emoticon: {},
      },
      {
        id: 4,
        question: "What are your strengths?",
        speaker: "candidate",
        dialogue: "Web Dev?",
        startTime: "0:21",
        endTime: "0:30",
        emoticon: {
          time: "0:02",
          type: "(Y)",
        },
      },
      {
        id: 5,
        question: "Describe a challenging situation you faced",
        speaker: "interviewer",
        dialogue: "Describe a challenging situation you faced",
        startTime: "0:31",
        endTime: "0:35",
        emoticon: {},
      },
      {
        id: 6,
        question: "Describe a challenging situation you faced",
        speaker: "candidate",
        dialogue: "Building Video Player",
        startTime: "0:36",
        endTime: "0:42",
        emoticon: {},
      },
      {
        id: 7,
        question: "What is HTML",
        speaker: "interviewer",
        dialogue: "What is HTML",
        startTime: "0:43",
        endTime: "0:45",
        emoticon: {},
      },
      {
        id: 8,
        question: "What is HTML",
        speaker: "candidate",
        dialogue: "What is HTML",
        startTime: "0:46",
        endTime: "0:49",
        emoticon: {},
      },
      {
        id: 9,
        question: "What is Javascript?",
        speaker: "interviewer",
        dialogue: "What is Javascript?",
        startTime: "0:50",
        endTime: "0:51",
        emoticon: {},
      },
      {
        id: 10,
        question: "What is Javascript?",
        speaker: "candidate",
        dialogue: "Good Language",
        startTime: "0:52",
        endTime: "0:55",
        emoticon: {},
      },
    ],
    emoticonData: [
      { id: 1, emoticon: "🤔", speaker: "interviewer", time: "0:10" },
      { id: 2, emoticon: "😄", speaker: "interviewer", time: "0:15" },
      { id: 3, emoticon: "👍", speaker: "interviewer", time: "0:35" },
      { id: 4, emoticon: "🧊", speaker: "interviewer", time: "0:45" },
      // Add more emoticons as needed
    ],
  };

  useEffect(
    () => {
      setInterviewerData(response?.interviewerData);
      setQuestionData(response?.questionData);
      setEmoticonData(emojisData);
      // setTotalDuration(response?.videoDuration);
      console.log(emoticonData);
    },
    [
      // response?.emoticonData,
      // response?.interviewerData,
      // response?.questionData,
      // response?.videoDuration,
      // emojisData,
    ]
  );

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const progressPercentage =
      (video.currentTime / video.duration.toFixed(0)) * 100;
    setProgress(progressPercentage);
    setCurrentTime(video.currentTime);
    if (
      video.currentTime.toFixed(0) ===
      convertTimeToSeconds(totalDuration)?.toFixed(0)
    ) {
      console.log(
        video.currentTime.toFixed(0),
        convertTimeToSeconds(totalDuration)?.toFixed(0)
      );
      setIsPlaying(false);
      video.pause();
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    // console.log(formattedDuration);
    setTotalDuration(formattedDuration);
  };

  const handleProgressBarClick = (event: any) => {
    const progressBar = event.currentTarget;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left + 1;
    // Calculate the seek time based on the click position and progress bar width
    const seekTime =
      (clickPosition / progressBarWidth) * videoRef.current.duration;
    // Update the video's current time
    videoRef.current.currentTime = seekTime;
    // Update the progress and tooltip based on the seek time
    handleTimeUpdate();
  };

  const handleProgressBarHover = (event: any) => {
    const video = videoRef.current;
    // const progressBar = event.target;
    const progressBarWidth = questionBarRef?.current?.offsetWidth;
    const hoverPosition =
      event.clientX - questionBarRef?.current.getBoundingClientRect().left;
    const hoverTime = Math.floor(
      (hoverPosition / progressBarWidth) * video.duration.toFixed(0)
    );
    const filteredQuestions = questionData?.filter(
      (question: any) =>
        convertTimeToSeconds(question?.startTime) <= hoverTime &&
        convertTimeToSeconds(question?.endTime) >= hoverTime
    );
    const tooltipQuestion =
      filteredQuestions.length > 0 ? filteredQuestions[0] : null;
    setTooltipData({
      question: tooltipQuestion?.question || "",
      time: hoverTime,
    });
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    handleTimeUpdate();
  };
  const getCurrentQuestionNumber = () => {
    const currentQuestion1 = questionData.find(
      (question: any) =>
        convertTimeToSeconds(question?.startTime) <= currentTime &&
        convertTimeToSeconds(question?.endTime) >= currentTime
    );
    if (currentQuestion1) {
      currentQuestion.current = currentQuestion1?.question;
    }
    return currentQuestion1 ? (
      <p>
        <span>{currentQuestion1.id}. </span> {currentQuestion1?.question}
      </p>
    ) : (
      "..."
    );
  };

  const getQuestionWidth = useCallback(
    (question: any) => {
      if (question?.endTime) {
        const durationInSeconds =
          question?.endTime && question?.startTime
            ? convertTimeToSeconds(question?.endTime) +
              1 -
              convertTimeToSeconds(question?.startTime)
            : 0;
        const videoDuration = convertTimeToSeconds(totalDuration);
        const widthPercentage = (durationInSeconds / videoDuration) * 100;
        return `${widthPercentage}%`;
      }
      return "0px";
    },
    [totalDuration]
  );

  const questionBar = useMemo(() => {
    return (
      <div
        style={{ display: "flex" }}
        ref={questionBarRef}
        className="ques-bar"
      >
        {questionData?.map((question: any) => (
          <div
            key={question.id}
            style={{
              width: getQuestionWidth(question),
              margin: "1px",
              backgroundColor: "white",
              border: "1px solid white",
              opacity:
                currentQuestion.current !== question.question ? "0.5" : "1",
            }}
          ></div>
        ))}
      </div>
    );
  }, [questionData, getQuestionWidth]);
  const interviewerCandidateBar = useMemo(() => {
    return (
      <>
        <StyledInterviewerImage>
          {/* <img
            width="20"
            height="20"
            style={{
              color: "white",
              fontSize: "10px",
              paddingLeft: "2px",
              marginTop: "6px",
            }}
            src={
              transcriptionInfo.questionData[0].transcription[0].userImageUrl
            }
            alt="styled interviewer img"
          /> */}
          <span style={{ color: "white", fontSize: "10px", padding: "2px" }}>
            {"Reactions"}
          </span>
        </StyledInterviewerImage>
        {/* <StyledCandidateImage>
          <img
            width="20"
            height="20"
            style={{
              color: "white",
              fontSize: "10px",
              paddingLeft: "2px",
              marginTop: "6px",
            }}
            src={
              transcriptionInfo.questionData[1].transcription[1].userImageUrl
            }
            alt="styled candidate img"
          />
          <span style={{ color: "white", fontSize: "10px", padding: "2px" }}>
            {"Harry - Candidate"}
          </span>
        </StyledCandidateImage> */}
        {/* <div style={{ display: "flex", margin: "0px" }}>
          {interviewerData?.map((data: any) => {
            return (
              <>
                <div
                  key={data.id}
                  style={{
                    width: getQuestionWidth(data),
                    marginRight: "0px",
                    marginLeft: "0px",
                    marginTop: "40px",
                    border: "1px solid white",
                    backgroundColor: "white",
                    opacity: data.speaker === "interviewer" ? "0.75" : "0.5",
                  }}
                ></div>
              </>
            );
          })}
        </div> */}
        <div style={{ display: "flex", margin: "0px" }}>
          {interviewerData?.map((data: any) => {
            return (
              <>
                <div
                  key={data.id}
                  style={{
                    width: getQuestionWidth(data),
                    marginRight: "0px",
                    marginLeft: "0px",
                    marginTop: "45px",
                    border: "1px solid white",

                    backgroundColor: "white",
                    opacity: data.speaker === "candidate" ? "0.75" : "0.5",
                  }}
                ></div>
              </>
            );
          })}
        </div>
      </>
    );
  }, [interviewerData, getQuestionWidth]);

  const handleProgressBarLeave = () => {
    setTooltipData({ question: "", time: null });
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullScreen = () => {
    const elem = videoRef.current;
    elem.requestFullscreen();
    if (elem.requestFullscreen) {
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function convertTimeToSeconds(time: any) {
    if (time) {
      const [minutes, seconds] = time?.split(":");
      return parseFloat(minutes) * 60 + parseFloat(seconds);
    }
    return 0;
  }

  const renderEmoticonsOnTimeline = useMemo(() => {
    const timeline = timelineRef.current;
    if (timeline?.offsetWidth && emoticonData && totalDuration) {
      const videoDuration = convertTimeToSeconds(totalDuration);
      // const timelineWidth = timeline.offsetWidth;
      const barWidth = questionBarRef?.current?.offsetWidth;
      return emoticonData.map((emoticon: any) => {
        const timeInSeconds = convertTimeToSeconds(emoticon.time);
        const positionPercentage =
          timeInSeconds && videoDuration
            ? (timeInSeconds / videoDuration) * 100
            : 0;
        const positionPixels = (positionPercentage / 100) * barWidth;
        return (
          <div
            style={{
              position: "absolute",
              left: `${(positionPixels / barWidth) * 100}%`,
              fontSize: "10px",
              marginTop: "35px",
              zIndex: "99",
            }}
          >
            {emoticonKeyPairs[emoticon.reaction]}
          </div>
        );
      });
    } else return null;
  }, [questionBarRef, timelineRef, emoticonData, totalDuration]);

  const Timer = () => {
    return (
      <span style={{ color: "white", fontSize: "10px" }}>
        {formatTime(currentTime ?? "0:00") +
          " / " +
          formatTime(convertTimeToSeconds(totalDuration ?? "0:00"))}
      </span>
    );
  };

  return (
    <>
      <div className="video-player-container" style={{ position: "relative" }}>
        {" "}
        <div
          style={{
            backgroundColor: "#6462F1",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <div
            className={`video-wrapper`}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <video
                className={`${isPlaying ? "" : "blurred"}`}
                ref={videoRef}
                onLoadedMetadata={handleLoadedMetadata}
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
              ></video>
            </div>
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleMuteUnmute}
                >
                  {isMuted ? (
                    <MuteButton width={30} height={30} active={0} />
                  ) : (
                    <SoundButton width={30} height={30} active={0} />
                  )}
                </button>
                <span className="timer">
                  <Timer />
                </span>{" "}
              </div>
              <button
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  bottom: "0",
                  marginBottom: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <PauseButton width={30} height={30} active={0} />
                ) : (
                  <PlayButton width={30} height={30} active={0} />
                )}
              </button>
              <button
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  marginBottom: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleFullScreen}
              >
                <FullscreenButton width={30} height={30} active={0} />
              </button>
            </div>
          </div>{" "}
          <div
            style={{
              flexGrow: 0,
              backgroundColor: "#6462F1",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              paddingBottom: "20px",
            }}
          >
            <div className="currentQuestionLabel">
              {getCurrentQuestionNumber()}
            </div>
            <div
              ref={timelineRef}
              className="timeline"
              onClick={handleProgressBarClick}
              onMouseMove={handleProgressBarHover}
              onMouseLeave={handleProgressBarLeave}
            >
              {questionBar}
              {tooltipData.question !== "" && (
                <div
                  className="tooltip"
                  style={{
                    left: tooltipPosition.x - 12,
                    top: tooltipPosition.y - 30,
                    display: "block",
                  }}
                >
                  <p style={{ fontWeight: "800" }}>
                    {formatTime(tooltipData.time)}
                  </p>
                  <br></br>
                  <p>{tooltipData.question}</p>
                </div>
              )}
              <div
                className="progress-indicator"
                style={{ left: `${progress}%` }}
              ></div>
              {renderEmoticonsOnTimeline} {interviewerCandidateBar}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
