import TopNavBar from './components/layouts/topnavbar/TopNavBar';
import SideNavBar from './components/layouts/sidenavbar/SideNavBar';
import { StyledMain } from './components/layouts/container/StyledContainer';
import Container from './components/layouts/container/Container';
import Routers from './router/Routers';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Navigate, useLocation } from 'react-router-dom';
import ConclusionContainer from './components/layouts/container/conclusionContainer/ConclusionContainer';
import { ConclusionStyledMain } from './components/layouts/container/conclusionContainer/StyledConclusionContianer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const isVideoCallRoute = location.pathname.startsWith('/video-call/');
  const isConclusionRoute =
    location.pathname === '/interviews/conclusion/' ||
    location.pathname === '/dashboard';

  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" />;
  }

  if (isVideoCallRoute) {
    return <Routers />;
  }

  if (isConclusionRoute && isAuthenticated) {
    return (
      <>
        <ConclusionContainer>
          <ConclusionStyledMain>
            <SideNavBar />
            <Routers />
          </ConclusionStyledMain>
          <Toaster />
        </ConclusionContainer>
      </>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Container>
          <SideNavBar />
          <TopNavBar />
          <StyledMain>
            <Routers />
          </StyledMain>
          <Toaster />
        </Container>
      ) : (
        <Routers />
      )}
    </>
  );
}

export default App;
