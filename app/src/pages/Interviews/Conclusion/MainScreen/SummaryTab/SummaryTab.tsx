import React from "react";
import {
  BodyLBold,
  BodyMMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import { useState } from "react";
import InterviewQNA from "../InterviewQNA/InterviewQNA";
import { Grid } from "@mui/material";

import "./SummaryTab.css";
import {
  LikeButton,
  UnlikeIcon,
} from "@/components/common/svgIcons/CustomIcons";
import {
  StyledSummaryDescription,
  StyledDecisionButton,
  StyledRoundBox,
  StyledSubmitDecision,
  StyledSummaryTab,
  AIGeneratedImageContainer,
  StyledButtonContent,
  ButtonContainer,
  ButtonStyling,
  StyledImage,
} from "./StyledSummaryTab";

const AIGeneratedImage = () => (
  <AIGeneratedImageContainer>
    <svg
      width="94"
      height="27"
      viewBox="0 0 94 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="27" height="27" rx="6" fill="white" />
      <path
        d="M6.35 18L8.842 9.908C9.164 8.886 10.004 8.396 10.886 8.396C11.782 8.396 12.622 8.886 12.944 9.908L15.436 18H13.35L12.804 16.068L8.982 16.082L8.436 18H6.35ZM10.592 10.51L9.514 14.248H12.272L11.208 10.51C11.152 10.314 11.068 10.23 10.9 10.23C10.746 10.23 10.648 10.314 10.592 10.51ZM17.0491 8.578H19.0931V18H17.0491V8.578Z"
        fill="#6462F1"
      />
      <path
        d="M36.9939 17.644C34.6899 17.644 32.9019 15.784 32.9019 13.468C32.9019 11.2 34.6779 9.328 36.9939 9.328C38.3259 9.328 39.6219 9.976 40.2459 11.2L39.2499 11.776C38.7699 10.948 37.9299 10.48 36.9459 10.48C35.3619 10.48 34.1619 11.812 34.1619 13.492C34.1619 15.208 35.3619 16.516 36.9939 16.516C37.9539 16.516 38.7339 16.144 39.1179 15.688V13.756H40.3059V16.108C39.7539 16.912 38.5659 17.644 36.9939 17.644ZM44.5414 17.632C42.7534 17.632 41.4214 16.336 41.4214 14.524C41.4214 12.832 42.6334 11.452 44.3974 11.452C46.1734 11.452 47.2774 12.736 47.2774 14.38V14.86H42.5734C42.7054 15.868 43.4734 16.576 44.5294 16.576C45.2494 16.576 45.8974 16.264 46.2454 15.616L47.1574 16.084C46.6414 17.092 45.6934 17.632 44.5414 17.632ZM42.6214 14.092H46.0894C46.0414 13.156 45.3574 12.52 44.3854 12.52C43.3894 12.52 42.7414 13.216 42.6214 14.092ZM51.6118 12.616C50.4598 12.616 49.8838 13.564 49.8838 14.656V17.5H48.6958V14.536C48.6958 12.82 49.7158 11.476 51.6118 11.476C53.5318 11.476 54.5758 12.82 54.5758 14.524V17.5H53.3878V14.668C53.3878 13.564 52.7878 12.616 51.6118 12.616ZM59.0258 17.632C57.2378 17.632 55.9058 16.336 55.9058 14.524C55.9058 12.832 57.1178 11.452 58.8818 11.452C60.6578 11.452 61.7618 12.736 61.7618 14.38V14.86H57.0578C57.1898 15.868 57.9578 16.576 59.0138 16.576C59.7338 16.576 60.3818 16.264 60.7298 15.616L61.6418 16.084C61.1258 17.092 60.1778 17.632 59.0258 17.632ZM57.1058 14.092H60.5738C60.5258 13.156 59.8418 12.52 58.8698 12.52C57.8738 12.52 57.2258 13.216 57.1058 14.092ZM64.3681 17.5H63.1801V13.996C63.1801 12.568 63.9961 11.5 65.5321 11.5C65.9041 11.5 66.2881 11.572 66.5881 11.716V12.892C66.3001 12.724 65.9641 12.64 65.6401 12.64C64.8481 12.64 64.3681 13.18 64.3681 14.044V17.5ZM70.0375 17.644C68.3335 17.644 67.0855 16.252 67.0855 14.548C67.0855 12.868 68.4295 11.476 70.2175 11.476C71.9935 11.476 73.3495 12.796 73.3495 14.548V17.5H72.2215V16.468C71.7775 17.188 70.9975 17.644 70.0375 17.644ZM70.2175 16.516C71.3215 16.516 72.1615 15.628 72.1615 14.56C72.1615 13.48 71.3215 12.592 70.2175 12.592C69.1255 12.592 68.2735 13.48 68.2735 14.56C68.2735 15.628 69.1255 16.516 70.2175 16.516ZM77.7272 17.656C76.2632 17.656 75.4832 16.732 75.4832 15.388V12.652H74.3192V11.62H75.4832V10.096H76.6712V11.62H78.9272V12.652H76.6712V15.352C76.6712 16.12 77.1272 16.576 77.8352 16.576C78.2192 16.576 78.6392 16.432 78.9272 16.228V17.32C78.6272 17.524 78.1592 17.656 77.7272 17.656ZM83.0844 17.632C81.2964 17.632 79.9644 16.336 79.9644 14.524C79.9644 12.832 81.1764 11.452 82.9404 11.452C84.7164 11.452 85.8204 12.736 85.8204 14.38V14.86H81.1164C81.2484 15.868 82.0164 16.576 83.0724 16.576C83.7924 16.576 84.4404 16.264 84.7884 15.616L85.7004 16.084C85.1844 17.092 84.2364 17.632 83.0844 17.632ZM81.1644 14.092H84.6324C84.5844 13.156 83.9004 12.52 82.9284 12.52C81.9324 12.52 81.2844 13.216 81.1644 14.092ZM89.9987 17.644C88.2107 17.644 86.8667 16.264 86.8667 14.572C86.8667 12.784 88.1627 11.476 89.9387 11.476C90.7307 11.476 91.4507 11.824 91.9307 12.352L91.9427 8.92H93.1307V14.572C93.1307 16.312 91.7747 17.644 89.9987 17.644ZM89.9987 16.528C91.1027 16.528 91.9427 15.64 91.9427 14.56C91.9427 13.492 91.1027 12.604 89.9987 12.604C88.9067 12.604 88.0547 13.492 88.0547 14.56C88.0547 15.64 88.9067 16.528 89.9987 16.528Z"
        fill="#6462F1"
      />
    </svg>
  </AIGeneratedImageContainer>
);

export const DecisionButton = ({
  activeValue,
  onClick,
  children,
  isActive,
}) => {
  const backgroundColors = isActive
    ? activeValue === 1
      ? "#DBFDDC"
      : "#FABBCF"
    : "#FFFFFF"; // default background color

  console.log("background color", backgroundColors, activeValue);

  return (
    <StyledDecisionButton
      activeValue={activeValue}
      onClick={onClick}
      style={{ backgroundColor: backgroundColors }}
    >
      <StyledButtonContent>
        <ButtonStyling>{children}</ButtonStyling>
      </StyledButtonContent>
    </StyledDecisionButton>
  );
};

export const SubmitDecision = ({ active, setActive }) => (
  <StyledSubmitDecision>
    <Grid>
      <BodyLBold>Submit your decision</BodyLBold>
    </Grid>
    <Grid>
      <StyledRoundBox>
        <ButtonContainer>
          <Grid lg={6} md={6} sm={6} xl={6}>
            <DecisionButton
              activeValue={1}
              onClick={() => setActive(1)}
              isActive={active === 1}
            >
              <LikeButton width={10} height={10} active={1} />
              <BodyMMedium>Hire</BodyMMedium>
            </DecisionButton>
          </Grid>

          <Grid lg={6} md={6} sm={6} xl={6}>
            <DecisionButton
              activeValue={2}
              onClick={() => setActive(2)}
              isActive={active === 2}
            >
              <BodyMMedium>Don't Hire</BodyMMedium>
              <UnlikeIcon width={10} height={10} active={1} />
            </DecisionButton>
          </Grid>
        </ButtonContainer>
        <StyledImage
          src="/src/assets/images/ImageConclusion.JPG"
          alt="dashboard_picture"
        />
      </StyledRoundBox>
    </Grid>
  </StyledSubmitDecision>
);

const SummaryTab = ({ summaryInfo }) => {
  const [active, setActive] = useState(0);

  console.log("active", active);

  return (
    <StyledSummaryTab>
      <Grid container spacing={1}>
        <Grid xs={12} md={6}>
          <BodyLBold>
            {summaryInfo.title}
            <AIGeneratedImage />
          </BodyLBold>
          <StyledSummaryDescription>
            <BodyMMedium>{summaryInfo.description}</BodyMMedium>
          </StyledSummaryDescription>
          <StyledRoundBox>
            <InterviewQNA propData={summaryInfo.faq} screen={"summary"} />
          </StyledRoundBox>
        </Grid>
        <Grid xs={12} md={6}>
          <SubmitDecision active={active} setActive={setActive} />
        </Grid>
      </Grid>
    </StyledSummaryTab>
  );
};

export default SummaryTab;
