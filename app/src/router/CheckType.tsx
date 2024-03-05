import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import VideoCallExternal from '@/utils/dailyVideoService/videoCallExternalComponent';
import VideoCallComponent from '@/utils/dailyVideoService/videoCallComponent';

function CheckType() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  if (user && isAuthenticated) {
    return <VideoCallComponent />;
  } else {
    // Return the VideoCallExternal component for candidates
    return <VideoCallExternal />;
  }
}

export default CheckType;
