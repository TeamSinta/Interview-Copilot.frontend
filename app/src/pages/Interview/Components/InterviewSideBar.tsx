import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { StyledInterviewContent } from '../StyledInterview';

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
        height: '100%', // Adjust the height as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontWeight: '600',
          fontFamily: 'ChillaxSemi',
          fontSize: '1.5em',
          width: '100%',
          opacity: opacity, // Apply dynamic opacity value
          transition: 'opacity 1.5s ease-in-out', // Smooth transition for opacity change
        }}
      >
        Waiting for candidate...
      </span>
    </Grid>
  );
};

const InterviewSideBar = ({
  interviewDetails,
  isInterviewSideBarCollapsed,
  interviewSideBarData,
}: any) => {
  return (
    <div>
      {/* {header} */}
      <StyledInterviewContent isCollapsed={isInterviewSideBarCollapsed}>
        {interviewDetails.name !== '' || interviewDetails.name !== null ? (
          interviewSideBarData
        ) : (
          <InterviewSideBarWaiting />
        )}
      </StyledInterviewContent>
    </div>
  );
};

export default InterviewSideBar;
