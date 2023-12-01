import Call from "./Daily/Call/Call";
import BottomNavBarCandidate from "./Daily/BottomNavBar/BottomNavBarCandidate ";
import {
  GridContainer,
  InterviewLayout,
  InterviewLayoutExternal,
  StyledImage,
} from "./StyledInterview";
import SintaLogo from "src/assets/svg/Sinta_call_logo.svg";
import CandidateCallScreen from "./Daily/Call/CallCandidate";

const InterviewScreenCandidate = ({ leaveCall }) => {
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
        <InterviewLayoutExternal>
          <CandidateCallScreen />
        </InterviewLayoutExternal>
      </GridContainer>
      <BottomNavBarCandidate leaveCall={leaveCall} />
    </div>
  );
};

export default InterviewScreenCandidate;
