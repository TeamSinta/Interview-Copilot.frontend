import TopNavBar from "./components/layouts/topnavbar/TopNavBar";
import SideNavBar from "./components/layouts/sidenavbar/SideNavBar";
import { StyledMain } from "./components/layouts/container/StyledContainer";
import Container from "./components/layouts/container/Container";
import Routers from "./router/Routers";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Loading from "./components/common/elements/loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.user
  );

  const isVideoCallRoute = location.pathname.startsWith("/video-call/");

  if (isVideoCallRoute) {
    return <Routers />;
  }

  // After this point, the user is either authenticated or on the login page
  return (
    <>
      {isAuthenticated ? (
        <Container>
          <SideNavBar />
          <TopNavBar />
          <StyledMain>
            <Routers />
          </StyledMain>
        </Container>
      ) : (
        // If not authenticated, render the login or other public routes
        <Routers />
      )}
    </>
  );
}
export default App;
