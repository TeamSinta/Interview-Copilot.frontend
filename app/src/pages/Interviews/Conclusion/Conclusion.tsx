import { H1 } from '@/components/common/typeScale/StyledTypeScale.js';
import React, { useMemo, useState, useEffect } from 'react';
import TopBar from './TopBar.js';
import MainScreen from './MainScreen/MainScreen.js';
import { RightArrowIcon } from '@/components/common/svgIcons/Icons.js';
import { StyledIconBtnM } from '@/components/common/buttons/button/StyledBtn.js';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom'; // <-- Import useNavigate
import SummarizerLoader from '@/components/common/elements/longLoading/LongLoading.js';
import { Grid } from '@mui/material';
import WebSockComp from '../../../components/common/socket/websock';

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

  const endLoader = () => {
    setShowLoader(false);
  };

  const header = useMemo(() => {
    return (
      <>
        <Grid container spacing={2} className="bar ">
          <Grid item={true} xs={12} md={12} lg={3}>
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
          </Grid>
        </Grid>
      </>
    );
  }, [navigate]);

  return (
    <>
      <WebSockComp interviewRoundId={location.state.id} endLoader={endLoader} />
      {showLoader && location.state.useTimer ? (
        <SummarizerLoader /> // Show loader if showLoader is true
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
