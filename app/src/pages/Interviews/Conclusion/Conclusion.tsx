import { H1 } from "@/components/common/typeScale/StyledTypeScale.js";
import React, { useMemo, useState, useEffect } from "react";
import TopBar from "./TopBar.js";
import MainScreen from "./MainScreen/MainScreen.js";
import { RightArrowIcon } from "@/components/common/svgIcons/Icons.js";
import { StyledIconBtnM } from "@/components/common/buttons/button/StyledBtn.js";
import styled from "styled-components";
import Loading from "../../../components/common/elements/loading/Loading";

import { useNavigate, useLocation } from "react-router-dom"; // <-- Import useNavigate

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 35px;
`;

const Title = styled.span`
  font-size: 20px;
  margin-left: 10px;
`;

const MainWrapper = styled.div`
  padding: 20px;
  padding-left: 10px;
  padding-right: 0px;
`;

const Conclusion: React.FC = () => {
  const navigate = useNavigate(); // <-- Get the navigate function
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 2 minutes
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 60000); // 2 minutes in milliseconds

    // Clear the timeout if the component unmounts or if the loader is hidden before the timeout
    return () => clearTimeout(timeoutId);
  }, []);

  const header = useMemo(() => {
    return (
      <HeaderWrapper>
        <IconWrapper>
          <StyledIconBtnM onClick={() => navigate(-1)}>
            {/* <-- Use the navigate function here */}
            <RightArrowIcon />
          </StyledIconBtnM>
        </IconWrapper>
        <Title>
          <H1>Conclusions</H1>
        </Title>
      </HeaderWrapper>
    );
  }, [navigate]);

  return (
    <>
      {showLoader && location.state.useTimer ? (
        <Loading /> // Show loader if showLoader is true
      ) : (
        <>
          {header}
          <MainWrapper>
            <TopBar interviewRoundId={location.state.id} />
          </MainWrapper>
          <MainScreen interviewRoundId={location.state.id} />
        </>
      )}
    </>
  );
};

export default Conclusion;
