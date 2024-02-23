import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import {
  CalendarIcon,
  PlusIcon,
  RightBracketIcon,
} from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';
import ElWrap from '../elWrap/ElWrap';
import { DropDownButton } from '@/components/common/buttons/dropDownBtn/DropDownBtn';
import { StyledTopNavBar } from './StyledTopBarNav';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { createCall } from '../../../utils/dailyVideoService/videoCallSlice';
import { H2Medium } from '@/components/common/typeScale/StyledTypeScale';
import { useToast } from '@/components/ui/use-toast';

export interface IButton {
  to: string;
  icon: JSX.Element;
  text: string;
}

const TopNavBarDash = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { toast } = useToast();

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const startDemo = async () => {
    try {
      const responseRoom = await dispatch(createCall());
      navigate(
        `/video-call/?roomUrl=${encodeURIComponent(responseRoom.payload)}`
      );
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while starting the demo.',
        status: 'error',
      });
    }
  };

  const planMeeting = async () => {
    try {
      const responseRoom = await dispatch(createCall());
      const meetingUrl = `localhost:3001/video-call/?roomUrl=${encodeURIComponent(
        responseRoom.payload
      )}`;

      navigator.clipboard.writeText(meetingUrl).then(
        () => {
          toast({
            title: 'Meeting URL copied to clipboard',
            description: 'Add link to your calendar',
            status: 'success',
          });
        },
        (err) => {
          console.error('Could not copy text: ', err);
          toast({
            title: 'Error',
            description: 'Could not copy the meeting URL to clipboard.',
            status: 'error',
          });
        }
      );
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while planning the meeting.',
        status: 'error',
      });
    }
  };

  return (
    <StyledTopNavBar
      sx={{
        width: '100%',
        paddingBottom: '48px',
        padding: '30px 0px 24px 0px',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '100%' }}>
          <H2Medium>Dashboard</H2Medium>
        </Box>

        <ElWrap w={260}>
          <DropDownButton
            label="New Meeting"
            onClick={() => {}}
            icon={<RightBracketIcon className="right-bracket-icon" />}
            disable={false}
            className={BackgroundColor.ACCENT_PURPLE}
            buttons={[
              {
                label: 'Start a Meeting',
                icon: <PlusIcon />,
                onClick: startDemo, // Use the function reference here
              },
              {
                label: 'Plan a Meeting',
                icon: <CalendarIcon />,
                onClick: planMeeting,
              },
              // You can add more buttons dynamically by adding more objects to this array
            ]}
          />
        </ElWrap>
      </Stack>
    </StyledTopNavBar>
  );
};

export default TopNavBarDash;
