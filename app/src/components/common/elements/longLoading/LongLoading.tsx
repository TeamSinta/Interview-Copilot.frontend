import React from 'react';
import { Image, LoadingWrapper, LoadingCircle } from './LoadLoading'; // Adjust the import path as needed
import { Stack } from '@mui/material';
import image from '@/assets/svg/Sinta Circle.svg';
import { BodyLSemiBold } from '../../typeScale/StyledTypeScale';

const SummarizerLoader: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent={'center'}
      alignItems={'center'}
      style={{ paddingTop: '156px' }}
      spacing={12}
    >
      <LoadingWrapper>
        <LoadingCircle />
        <Image src={image} />
      </LoadingWrapper>

      <div style={{ maxWidth: '45%', textAlign: 'center', fontSize: '56px' }}>
        <BodyLSemiBold style={{ fontSize: '18px' }}>
          We're currently summarizing and working our ✨magic✨ on your
          interview. Please bear with us as we craft your summary.
        </BodyLSemiBold>
      </div>
    </Stack>
  );
};

export default SummarizerLoader;
