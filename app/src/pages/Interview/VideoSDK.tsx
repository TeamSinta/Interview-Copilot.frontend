import { useEffect, useMemo, useState } from "react";
// import {
//   MeetingProvider,
//   useMeeting,
//   useParticipant, // Update this with the actual type for ParticipantData
// } from "@videosdk.live/react-sdk";
// import ReactPlayer from "react-player";
import {
  InterviewSideBarWrapper,
  StyledInterviewContent,
  StyledVideoActionContainer,
  StyledVideoActions,
  StyledVideoContainer,
  StyledVideoWindow,
} from "./StyledInterview";
// import {
//   CamHideIcon,
//   MicMuteIcon,
//   NavCamIcon,
//   NavMicIcon,
// } from "@/components/common/svgIcons/Icons";
import { CamIcon, MicIcon } from "@/components/common/svgIcons/CustomIcons";
import InterviewWork from "./InterviewWork";
import { Grid } from "@mui/material";

// type ParticipantViewProps = {
//   participantId: string;
// };

// function ParticipantView(props: ParticipantViewProps) {
//   const micRef = useRef<HTMLAudioElement>(null);
//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//     useParticipant(props.participantId);

//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);
//       return mediaStream;
//     }
//   }, [webcamStream, webcamOn]);

//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(micStream.track);

//         micRef.current.srcObject = mediaStream;
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           );
//       } else {
//         micRef.current.srcObject = null;
//       }
//     }
//   }, [micStream, micOn]);

//   return (
//     <div>
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//       {webcamOn && (
//         <ReactPlayer
//           playsinline // very very imp prop
//           pip={false}
//           light={false}
//           controls={false}
//           muted={true}
//           playing={true}
//           url={videoStream}
//           onError={(err) => {
//             console.log(err, "participant video error");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// function MeetingView() {
//   const [joined, setJoined] = useState<string | null>(null);
//   // Get the method which will be used to join the meeting.
//   // We will also get the participants list to display all participants
//   const { join, participants } = useMeeting({
//     // callback for when meeting is joined successfully
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//   });

//   const joinMeeting = () => {
//     setJoined("JOINING");
//     join();
//   };

//   return (
//     <div className="container">
//       {/* {joined && joined === "JOINED" ? (
//         <div style={{ display: "flex" }}>
//           {Array.from(participants).map(([participantId]) => (
//             <ParticipantView
//               participantId={participantId}
//               key={participantId}
//             />
//           ))}
//         </div>
//       ) : joined && joined === "JOINING" ? (
//         <p>Joining the meeting...</p>
//       ) : null
//       // <button onClick={joinMeeting}>Join the meeting</button>
//       } */}
//     </div>
//   );
// }

const VideoSDK = () => {
  const NUMBER_OF_PARTICIPANTS: any = useMemo(() => {
    return [
      { index: 1, content: "" },
      { index: 2, content: "" },
      { index: 3, content: "" },
      { index: 4, content: "" },
    ];
  }, []);
  // const [micEnabled, setMicEnabled] = useState(false);
  // const [camEnabled, setCamEnabled] = useState(false);
  const [activeMicIndexes, setActiveMicIndexes] = useState<any>([]);
  const [activeCamIndexes, setActiveCamIndexes] = useState<any>([]);
  useEffect(() => {}, [NUMBER_OF_PARTICIPANTS]);
  const addActiveMicIndex = (index: number) => {
    let val: any = [...activeMicIndexes];
    val.push({ index: index });
    setActiveMicIndexes(val);
  };
  const removeActiveMicIndex = (index: number) => {
    setActiveMicIndexes(activeMicIndexes.filter((a: any) => a.index !== index));
  };

  const addActiveCamIndex = (index: number) => {
    let val: any = [...activeCamIndexes];
    val.push({ index: index });
    setActiveCamIndexes(val);
  };
  const removeActiveCamIndex = (index: number) => {
    setActiveCamIndexes(activeCamIndexes.filter((a: any) => a.index !== index));
  };
  const findActiveCamIndex = (index: number) => {
    return activeCamIndexes.some((a: any) => a.index === index) ? true : false;
  };

  const findActiveMicIndex = (index: number) => {
    return activeMicIndexes.some((a: any) => a.index === index) ? true : false;
  };
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
      <div style={{ justifyContent: "flex-end", display: "flex" }}>
        {/* {header} */}
        <StyledInterviewContent isCollapsed={false}>
          <InterviewSideBarWaiting />
        </StyledInterviewContent>
      </div>
    );
  }
  return (
    <div>
      <StyledVideoContainer>
        {NUMBER_OF_PARTICIPANTS.map((a: any, index: number) => {
          return (
            <StyledVideoWindow
              isEnabled={findActiveCamIndex(index) ? true : false}
              key={index}
            >
              <StyledVideoActionContainer>
                <StyledVideoActions
                  onClick={() => {
                    if (findActiveMicIndex(index)) {
                      removeActiveMicIndex(index);
                    } else {
                      addActiveMicIndex(index);
                    }
                  }}
                >
                  <MicIcon
                    active={findActiveMicIndex(index) ? 1 : 0}
                    width={40}
                    height={40}
                  />
                </StyledVideoActions>
                <StyledVideoActions
                  onClick={() => {
                    if (findActiveCamIndex(index)) {
                      removeActiveCamIndex(index);
                    } else {
                      addActiveCamIndex(index);
                    }
                  }}
                >
                  {" "}
                  <CamIcon
                    active={findActiveCamIndex(index) ? 1 : 0}
                    width={40}
                    height={40}
                  />
                </StyledVideoActions>
              </StyledVideoActionContainer>
              {findActiveCamIndex(index) ? null : (
                <div
                  style={{ position: "absolute", top: "20px", right: "30px" }}
                >
                  <svg
                    width="4"
                    height="16"
                    viewBox="0 0 4 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                    <circle cx="2" cy="8" r="1.5" fill="white" />
                    <circle cx="2" cy="14" r="1.5" fill="white" />
                  </svg>
                </div>
              )}

              {findActiveCamIndex(index) ? null : (
                <img
                  alt="sample"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  width="100"
                  height="100"
                />
              )}
            </StyledVideoWindow>
          );
        })}
        <InterviewSideBarWrapper>
          <InterviewSideBar
            setReactClicked={findActiveCamIndex}
            reactClicked={findActiveCamIndex}
          />
        </InterviewSideBarWrapper>
      </StyledVideoContainer>

      {/* <MeetingProvider
        config={{
          meetingId: "mwqz-ee5u-7dr3",
          micEnabled: true,
          webcamEnabled: true,
          name: "Shehroz's Org",
        }}
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ODJhY2E0YS04NjRmLTRhZWItYjNiZi1hMDA4MjFlYjVhMTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDE0NDYxMywiZXhwIjoxNjkwMjMxMDEzfQ.gWl-J_z2D4La2oijO-5QF___qYX4XJZUb2DukyUq9Vg"
      >
        <MeetingView />
      </MeetingProvider> */}
    </div>
  );
};

export default VideoSDK;
