import {
  BodyMMedium,
  H1,
} from "@/components/common/typeScale/StyledTypeScale.js";
import React, { useMemo, useState, useEffect } from "react";
import TopBar from "./TopBar.js";
import MainScreen from "./MainScreen/MainScreen.js";
import {
  BottomArrowIcon,
  CandidateIcon,
  RightArrowIcon,
} from "@/components/common/svgIcons/Icons.js";
import styled from "styled-components";

import { useNavigate, useLocation } from "react-router-dom"; // <-- Import useNavigate
import SummarizerLoader from "@/components/common/elements/longLoading/LongLoading.js";
import { Divider, Grid, Stack } from "@mui/material";
import { getInterview } from "@/features/interviews/interviewsAPI.js";
import { useCookies } from "react-cookie";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn.js";
import { BackgroundColor } from "@/features/utils/utilEnum.js";
import ElWrap from "@/components/layouts/elWrap/ElWrap.js";
import { IconBtnM } from "@/components/common/buttons/iconBtn/IconBtn.js";
import WebSockComp from "../../../components/common/socket/websock";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 35px;
`;
const ProfilePic = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 18px;
`;

const Title = styled.div`
  font-size: 20px;
`;
const CreatedContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  const [cookies, ,] = useCookies(["access_token"]);
  const [interviewTitle, setInterviewTitle] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [interviewerPicture, setInterviewerPicture] = useState("");

  useEffect(() => {
    // Set a timeout to hide the loader after 2 minutes

    const fetchRatings = async () => {
      const interviewRound = await getInterview(
        location.state.id,
        cookies.access_token
      );

      setInterviewTitle(interviewRound.title);
      setInterviewerPicture(interviewRound.interviewer.profile_picture);

      setInterviewerName(
        ` ${interviewRound.interviewer.first_name}` +
          ` ` +
          `${interviewRound.interviewer.last_name}`
      );
    };

    fetchRatings();
    // Clear the timeout if the component unmounts or if the loader is hidden before the timeout
  }, [cookies.access_token, location.state.id]);

  const endLoader = () => {
    setShowLoader(false);
  };

  const header = useMemo(() => {
    return (
      <>
        <Grid container className="bar ">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            style={{ width: "100%", padding: "12px" }}
          >
            <HeaderWrapper>
              <ElWrap w={38}>
                <IconBtnM
                  onClick={() => navigate(-1)}
                  icon={<RightArrowIcon />}
                  disable={false}
                  className={BackgroundColor.WHITE}
                />
              </ElWrap>

              <Stack direction="column" justifyContent="flex-start" spacing={2}>
                <Title>
                  <H1 style={{ lineHeight: "100%" }}>{` ${interviewTitle}`}</H1>
                </Title>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <ProfilePic src={interviewerPicture}></ProfilePic>

                  <BodyMMedium style={{ marginTop: "0px" }}>
                    {interviewerName}
                  </BodyMMedium>
                  <BodyMMedium> · </BodyMMedium>
                  <BodyMMedium style={{ marginTop: "0px" }}>
                    about 1 month ago
                  </BodyMMedium>
                  <BodyMMedium> · </BodyMMedium>
                  <BodyMMedium style={{ marginTop: "0px" }}>
                    Not Shared
                  </BodyMMedium>
                  <BottomArrowIcon />
                </Stack>
              </Stack>
            </HeaderWrapper>
            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <CreatedContainer>
                <BodyMMedium> 1 / 3 Summaries Created</BodyMMedium>
              </CreatedContainer>
              <ElWrap w={227}>
                <TextIconBtnL
                  label="Share"
                  onClick={() => {}}
                  icon={<CandidateIcon />}
                  disable={false}
                  className={BackgroundColor.ACCENT_PURPLE}
                />
              </ElWrap>
            </Stack>
          </Stack>
        </Grid>
      </>
    );
  }, [interviewTitle, interviewerName, interviewerPicture, navigate]);

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
