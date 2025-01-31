import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import './VideoPlayer.css'; // Import the CSS file

import { ICustomIconProps } from '@/components/common/svgIcons/CustomIcons';

import { FullscreenIcon, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MuteButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <Button variant="outline">
      <VolumeX className="h-4 w-4" />
    </Button>
  );
};
export const SoundButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <Button variant="outline">
      <Volume2 className="h-4 w-4" />
    </Button>
  );
};
export const PauseButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <Button>
      <Pause className="h-4 w-4" />
    </Button>
  );
};
export const PlayButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;

  return (
    <Button>
      <Play className="h-4 w-4" />
    </Button>
  );
};
export const FullscreenButton = (props: ICustomIconProps): JSX.Element => {
  // const { width, fill, active, height } = props;
  return (
    <Button variant="outline">
      <FullscreenIcon className="h-4 w-4" />
    </Button>
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
  const [emoticonData, setEmoticonData] = useState<any>([]);
  const timelineRef = useRef<any>(null);
  // const [timelineWidth, setTimelineWidth] = useState<any>(0);
  const [progress, setProgress] = useState<any>(0);
  const [tooltipData, setTooltipData] = useState<any>({
    question: '',
    time: 0,
  });

  const [interviewerData, setInterviewerData] = useState<any>([]);

  const emoticonKeyPairs = {
    '1': '🔥',
    '2': '👍🏻',
    '3': '👎🏻',
    '4': '❤️',
    '5': '😂',
  };

  // TODO: Convert questionsTranscript to resemble the questionData format.

  const response = {
    videoDuration: '0:55',
    questionData: [
      {
        id: 1,
        question: 'Tell me about yourself',
        startTime: '0:00',
        endTime: '0:13',
      },
      {
        id: 2,
        question:
          'Can you describe a recent project you worked on using React? ',
        startTime: '0:14',
        endTime: '1:30',
      },
      {
        id: 3,
        question:
          'Can you describe how you ensure code quality and adherence to best practices in your React projects?',
        startTime: '0:31',
        endTime: '3:42',
      },
      {
        id: 4,
        question: 'Can you give an example of a time when you...',
        startTime: '0:43',
        endTime: '4:49',
      },
      {
        id: 5,
        question: 'Closing Remarks',
        startTime: '0:50',
        endTime: '8:55',
      },
    ],
    interviewerData: [
      {
        id: 1,
        question: 'Tell me about yourself',
        speaker: 'interviewer',
        dialogue: 'Tell me about yourself',
        startTime: '0:00',
        endTime: '0:06',
        emoticon: {
          time: '0:02',
          type: '(Y)',
        },
        notes: {},
      },
      {
        id: 2,
        question: 'Tell me about yourself',
        speaker: 'candidate',
        dialogue: 'I like to code',
        startTime: '0:07',
        endTime: '0:13',
        emoticon: {},
        notes: {
          isNotes: true,
          time: '0:10',
        },
      },
      {
        id: 3,
        question: 'What are your strengths?',
        speaker: 'interviewer',
        dialogue: 'What are your strengths?',
        startTime: '0:14',
        endTime: '0:20',
        emoticon: {},
      },
      {
        id: 4,
        question: 'What are your strengths?',
        speaker: 'candidate',
        dialogue: 'Web Dev?',
        startTime: '0:21',
        endTime: '0:30',
        emoticon: {
          time: '0:02',
          type: '(Y)',
        },
      },
      {
        id: 5,
        question: 'Describe a challenging situation you faced',
        speaker: 'interviewer',
        dialogue: 'Describe a challenging situation you faced',
        startTime: '0:31',
        endTime: '0:35',
        emoticon: {},
      },
      {
        id: 6,
        question: 'Describe a challenging situation you faced',
        speaker: 'candidate',
        dialogue: 'Building Video Player',
        startTime: '0:36',
        endTime: '0:42',
        emoticon: {},
      },
      {
        id: 7,
        question: 'What is HTML',
        speaker: 'interviewer',
        dialogue: 'What is HTML',
        startTime: '0:43',
        endTime: '0:45',
        emoticon: {},
      },
      {
        id: 8,
        question: 'What is HTML',
        speaker: 'candidate',
        dialogue: 'What is HTML',
        startTime: '0:46',
        endTime: '0:49',
        emoticon: {},
      },
      {
        id: 9,
        question: 'What is Javascript?',
        speaker: 'interviewer',
        dialogue: 'What is Javascript?',
        startTime: '0:50',
        endTime: '0:51',
        emoticon: {},
      },
      {
        id: 10,
        question: 'What is Javascript?',
        speaker: 'candidate',
        dialogue: 'Good Language',
        startTime: '0:52',
        endTime: '0:55',
        emoticon: {},
      },
    ],
    emoticonData: [
      { id: 1, emoticon: '🤔', speaker: 'interviewer', time: '0:10' },
      { id: 2, emoticon: '😄', speaker: 'interviewer', time: '0:15' },
      { id: 3, emoticon: '👍', speaker: 'interviewer', time: '0:35' },
      { id: 4, emoticon: '🧊', speaker: 'interviewer', time: '0:45' },
      // Add more emoticons as needed
    ],
  };

  useEffect(() => {
    setInterviewerData(response?.interviewerData);

    setEmoticonData(emojisData);
    // setTotalDuration(response?.videoDuration);
  }, []);

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
    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
      return '0px';
    },
    [totalDuration]
  );

  const interviewerCandidateBar = useMemo(() => {
    return (
      <>
        <div style={{ display: 'flex', margin: '0px' }}>
          {interviewerData?.map((data: any, index: any) => {
            return (
              <div
                key={index}
                style={{
                  width: '100%',
                  marginRight: '0px',
                  marginLeft: '0px',
                  marginTop: '10px',
                  border: '1px solid #C1C3C5',

                  backgroundColor: '#blaxk',
                  opacity: data.speaker === 'candidate' ? '1' : '1',
                }}
              ></div>
            );
          })}
        </div>
      </>
    );
  }, [interviewerData, getQuestionWidth]);

  const handleProgressBarLeave = () => {
    setTooltipData({ question: '', time: null });
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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function convertTimeToSeconds(time: any) {
    if (time) {
      const [minutes, seconds] = time?.split(':');
      return parseFloat(minutes) * 60 + parseFloat(seconds);
    }
    return 0;
  }

  const renderEmoticonsOnTimeline = useMemo(() => {
    const timeline = timelineRef.current;
    if (timeline?.offsetWidth && emoticonData && totalDuration) {
      const videoDuration = convertTimeToSeconds(totalDuration);
      // const timelineWidth = timeline.offsetWidth;
      const barWidth = videoDuration;
      return emoticonData.map((emoticon: any, index: any) => {
        const timeInSeconds = convertTimeToSeconds(emoticon.time);
        const positionPercentage =
          timeInSeconds && videoDuration
            ? (timeInSeconds / videoDuration) * 100
            : 0;
        const positionPixels = (positionPercentage / 100) * barWidth;
        console.log(questionBarRef);
        return (
          <div
            key={emoticon.id}
            className="emoticon-hover-effect"
            style={{
              position: 'absolute',
              left: `${(positionPixels / barWidth) * 100}%`,
              fontSize: '14px',

              zIndex: '99',
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
      <span style={{ fontWeight: '600', fontSize: '12px' }}>
        {formatTime(currentTime ?? '0:00') +
          ' / ' +
          formatTime(convertTimeToSeconds(totalDuration ?? '0:00'))}
      </span>
    );
  };

  return (
    <>
      <div
        className="video-player-container"
        style={{ position: 'relative', width: '100%' }}
      >
        {' '}
        <div
          style={{
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            height: '100%',
            gap: '18px',
          }}
        >
          <div
            className={`video-wrapper`}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <video
                className={`${isPlaying ? '' : 'blurred'}`}
                ref={videoRef}
                onLoadedMetadata={handleLoadedMetadata}
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
              ></video>
            </div>
          </div>{' '}
          <div
            style={{
              flexGrow: 0,
              backgroundColor: '#EDEFF2',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              height: '120px',
            }}
            className="text-black "
          >
            <div
              ref={timelineRef}
              className="timeline"
              onMouseLeave={handleProgressBarLeave}
              onClick={handleProgressBarClick}
            >
              <div className=" flex flex-col ">
                <div className="mt-3 flex justify-between w-5/5 ">
                  <div
                    style={{
                      left: '0',
                      bottom: '0',

                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={handleMuteUnmute}
                    >
                      {isMuted ? (
                        <MuteButton width={30} height={30} active={0} />
                      ) : (
                        <SoundButton width={30} height={30} active={0} />
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      bottom: '0',

                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <PauseButton width={30} height={30} active={0} />
                    ) : (
                      <PlayButton width={30} height={30} active={0} />
                    )}
                  </div>
                  <div
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={handleFullScreen}
                  >
                    <FullscreenButton width={30} height={30} active={0} />
                  </div>
                </div>
                <span className="timer ml-2">
                  <Timer />
                </span>{' '}
              </div>
              {renderEmoticonsOnTimeline} {interviewerCandidateBar}
              <div
                className="progress-indicator"
                style={{ left: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
