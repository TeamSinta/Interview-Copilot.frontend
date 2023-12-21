import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import React from 'react';
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
import { H2Medium } from '@/components/common/typeScale/StyledTypeScale';

export interface IButton {
  to: string;
  icon: JSX.Element;
  text: string;
}

// interface TopNavBarProps {
//   createCall: () => Promise<string>;
//   startHairCheck: (url: string) => void;
// }

const TopNavBarDash = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

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
                onClick: () => {},
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
