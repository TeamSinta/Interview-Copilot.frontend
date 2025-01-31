import { Conclusion } from '@/pages/Interviews/Conclusion';
import DashBoard from '@/pages/Dashboard/Dashboard';
import InterviewStage from '@/pages/InterviewStage';
import Templates from '@/pages/Templates_/Templates';
import NotFound from '@/pages/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '@/pages/Login/Login';

import Conclusions from '@/pages/Interviews/InterviewsHome';
import VideoCallComponent from '@/utils/dailyVideoService/videoCallComponent';
import Settings from '@/pages/Settings/Settings';
import { ProtectedRoutes } from './authenticated/privateRoutes';
import Questions from '@/pages/Questions/Questions';
import QuestionBankStage from '@/pages/Questions/QuestionBanksTab/QuestionBankStage';
import SignUpScreen from '@/pages/SignUp/SignUp';
import CheckType from './CheckType';
import EndCallScreen from '@/pages/Interview/Daily/Call/EndCallScreenExternal';
import PublicRoutes from './authenticated/PublicRoutes';
import NotificationsPage from '@/pages/Notifications';
import VerifyCode from '@/pages/Verify';

const Routers = () => {
  return (
    <Routes>
      <Route path="" element={<PublicRoutes />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
      </Route>
      <Route path="/video-call" element={<CheckType />} />
      <Route path="end-call-screen" element={<EndCallScreen />} />

      <Route path="" element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/templates" element={<Templates />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="/templates/:templateId" element={<InterviewStage />} />
        {/* <Route
      path="/interviews/:department/:round
        element={<InterviewStage />}
      />
      */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/interviews" element={<Conclusions />} />
        <Route path="/questionbank" element={<Questions />} />
        <Route
          path="/questionbank/:questionBankId"
          element={<QuestionBankStage />}
        />
        <Route path="/interviews/Conclusion" element={<Conclusion />} />
        <Route path="/interviews/:id" element={<Conclusion />} />
        <Route path="/video-call" element={<VideoCallComponent />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default Routers;
