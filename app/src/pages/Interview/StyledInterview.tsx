import styled from "styled-components";
interface StyledVideoActionsProps {
  isEnabled: boolean;
}

interface StyledInterviewContent {
  isCollapsed: boolean;
}

export const EmojiOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Ensure it doesn't interfere with other UI interactions */
  overflow: hidden; /* Hide emojis that might fly outside the bounds */
  z-index: 1000; /* Adjust according to your needs to ensure it's above all other elements */

  .emoji {
    position: absolute;
    font-size: 1.5em; /* Adjust size as needed */
    user-select: none;
    pointer-events: none; /* Ignore mouse/pointer events on individual emojis */
    animation: fly 1s linear;
  }

  @keyframes fly {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;

export const StyledInterviewContent = styled.div<StyledInterviewContent>`
  background-color: white;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  padding-bottom: 0px;
  position: relative;
  height: ${(props) => (props.isCollapsed ? "50px" : "80vh")};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: ease-in-out 200ms;
  z-index: 100;
  min-width: 330px;

  ::-webkit-scrollbar {
    padding: 10px;
    background-color: transparent;
    margin: 0px;
    width: 10px;
    height: 5px;
    padding: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    width: 5px;
    background-color: #bdc1c6;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    padding: 1px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  @media (max-width: 900px) {
    position: absolute;
    right: 10px;
    top: 60px;
    width: 50%;
  }
`;

export const StyledTopView = styled.div`
  height: 7.5em;
  overflow: hidden;
`;

export const StyledInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  overflow-x: hidden;
  flex: 1;
`;
export const StyledTabInfo = styled.div`
  padding: 15px;
  background-color: #f6f6fb;
  border-radius: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  ::-webkit-scrollbar {
    background-color: #f6f6fb;
    border-radius: 10px;
    padding: 0px;
    margin: 0px;
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    padding: 1px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }
`;

export const BottomTabSection = styled.div`
  padding: 15px;
  background-color: #f6f6fb;
  height: 70vh;
  border-radius: 10px;
  margin-bottom: 20px;
`;
export const BottomTabSectionContent = styled.div`
  padding: 15px;
  background-color: #f6f6fb;
  height: 100%;

  border-radius: 10px;
`;

export const StyledIcon = styled.div`
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const GuidelinesSection = styled.div`
  flex: 1;
  margin-top: 20px;
  overflow-y: auto;
  ul {
    list-style: disc;
    font-size: 12px;
    line-height: 170%;
    padding: 0 20px;
  }
`;

export const StyledInfoDescription = styled.div`
  padding: 10px;
  border-radius: 10px;
  height: fit-content;

  overflow-y: auto;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  background-color: white;
  ::-webkit-scrollbar {
    background-color: white;
    border-radius: 10px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #f6f6fb;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    padding: 1px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }
`;

export const IndexStyle = styled.div`
  span {
    border-radius: 7px;
    background-color: #f6f6fb;
    padding: 6px 10px;
    font-size: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
  }
`;

export const WhiteIndexStyle = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 8px 18px;
  margin-right: 5px;
`;

export const CompetencyStyle = styled.span`
  border: 1.6px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 8px 18px;
  margin-right: 5px;
`;

export const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 40vh;

  overflow-y: auto;
  min-height: 0px;
  position: relative;

  ::-webkit-scrollbar {
    background-color: #f6f6fb;
    border-radius: 10px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    padding: 1px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }
`;

export const StyledQuestionList = styled.div`
  overflow-y: auto;
  min-height: 0px;
`;

export const StyledAnswerPoints = styled.div`
  height: fit-content;

  background-color: white;
  padding: 1rem;
  line-height: 15px;
  flex: 1;
  overflow-y: auto;
  min-height: 0px;
  font-size: 10px;
  flex-wrap: wrap;
  border-radius: 10px;
  ::-webkit-scrollbar {
    background-color: white;
    border-radius: 10px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #f6f6fb;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    padding: 1px;
    padding: 0px;
    margin: 0px;
    width: 5px;
  }
`;

export const BottomQuestionButtons = styled.span`
  bottom: 0;
  position: absolute;
  margin-bottom: 10px;

  padding: 15px;
  background-color: #f6f6fb;
  left: 0;
  right: 0;
`;

export const StyledVideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
`;

export const StyledVideoWindow = styled.div<StyledVideoActionsProps>`
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: calc(50% - 20px); /* Adjust the width as needed */
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  min-width: 200px;
  aspect-ratio: 16/9;
  background: ${(props) => (props.isEnabled ? "transparent" : "#303030")};
  border: ${(props) => (props.isEnabled ? "1px solid white" : "none")};
  border-radius: 10px;
  img {
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* You can also set a maximum width and height to prevent the image from exceeding the container's size */
    max-width: 100%;
    max-height: 100%;
  }
  &:only-child {
    flex-basis: 100%;
  }
`;

export const StyledVideoActionContainer = styled.div`
  left: 10px;
  top: 20px;
  right: 0;
  position: absolute;
`;

export const StyledVideoActions = styled.span`
  margin: 2px;
`;

export const CoverPictureContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 150px;

  &:hover::before {
    content: "Change Picture";
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(15, 13, 98, 0.5);
    color: #fff;
    border-radius: 16px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover input[type="file"] {
    opacity: 0.01;
    cursor: pointer;
  }

  &:hover::before,
  &:hover input[type="file"]:hover + .profile-picture {
    opacity: 1;
  }
`;

export const StyledImage = styled.img`
  width: 90px;
  min-width: 90px;
  min-height: 60px;
  max-height: 100px;
`;

// export const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px; // adjust this value for space between grid items
//   // adjust this value for space around the grid
//   display: flex;
//   flex-wrap: wrap;

//   backgroundColor: "black",
//   height: "100%",
//   width: "100%",
//   padding: "2%",

export const InterviewSideBarWrapper = styled.div`
  /* This sets the InterviewSideBar to a fixed width of 300px */
  height: 100vh;
`;

export const GridContainer = styled.div`
  /* Prevent wrapping to the next line */
  background-color: #000; /* Assuming you want a black background */
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  overflow-y: hidden;
  align-items: stretch; /* Stretch items to fill the container height */
`;

export const InterviewLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  .side {
    flex-direction: column;
    height: 100%;
    padding-top: 58px;
  }

  @media (min-width: 901px) {
    .side {
      width: 556px;
      max-width: 550px;
    }
  }
`;

export const InterviewLayoutExternal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 160px;
`;
