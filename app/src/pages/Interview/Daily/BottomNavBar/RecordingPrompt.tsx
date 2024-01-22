import React, { useState, useEffect } from 'react';
import { Snackbar, Paper, Typography } from '@mui/material';

interface RecordingPromptProps {
  isOpen: boolean;
  isRecording: boolean;
}

const RecordingPrompt: React.FC<RecordingPromptProps> = ({
  isOpen,
  isRecording,
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isOpen, isRecording]);

  const formattedTime = formatTime(60 * 60 - elapsedTime);

  return isOpen ? (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{ left: '40%', top: '40px' }}
    >
      <Paper
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#000',
        }}
      >
        <Typography
          variant="body1"
          style={{
            borderRadius: '12px',
            background: 'rgba(255, 26, 97, 0.31)',
            padding: '7px 37px',
            color: '#fff',
          }}
        >
          {isRecording ? 'Recording' : 'Not Recording'}
        </Typography>
        {isRecording && (
          <Paper
            style={{
              borderRadius: '8px',
              background: 'var(--Selected-Color, #CECDEE)',
              padding: '7px 37px',
              marginLeft: '8px',
            }}
          >
            <Typography variant="body2" style={{ margin: 0, color: '#000' }}>
              {`${formattedTime.minutes} mins Remaining`}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Snackbar>
  ) : null;
};

interface TimeFormat {
  minutes: string;
  seconds: string;
}

const formatTime = (seconds: number): TimeFormat => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(remainingSeconds).padStart(2, '0'),
  };
};

export default RecordingPrompt;
