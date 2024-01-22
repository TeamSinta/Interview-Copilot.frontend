import Stack from '@mui/material/Stack';
import { Alert, Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from '@/components/common/form/serchInput/SearchInput';
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

export interface IButton {
  to: string;
  icon: JSX.Element;
  text: string;
}

// interface TopNavBarProps {
//   createCall: () => Promise<string>;
//   startHairCheck: (url: string) => void;
// }

const TopNavBar = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
      // response after creating a room
      const responseRoom = await dispatch(createCall());

      navigate(`/video-call/?roomUrl=${encodeURIComponent(responseRoom.payload)}
      `);
    } catch (error) {
      console.error(error);
    }
  };
  const planMeeting = async () => {
    try {
      const responseRoom = await dispatch(createCall());
      const meetingUrl = `localhost:3001/video-call/?roomUrl=${encodeURIComponent(
        responseRoom.payload
      )}`;

      // Copy the formatted meeting URL to the clipboard
      navigator.clipboard.writeText(meetingUrl).then(
        () => {
          setSnackbarMessage(
            'Meeting URL copied to clipboard Add link to your calender'
          );
          setSnackbarOpen(true);
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTopNavBar sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '100%' }}>
          <SearchInput disable={false} placeholder={'Search'} error={false} />
        </Box>

        <ElWrap w={460}>
          <DropDownButton
            label="New Meeting"
            onClick={() => {}}
            icon={<RightBracketIcon />}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledTopNavBar>
  );
};

export default TopNavBar;
