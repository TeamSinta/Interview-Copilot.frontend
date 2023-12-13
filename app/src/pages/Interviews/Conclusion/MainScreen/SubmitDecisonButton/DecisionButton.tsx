import React from "react"; // Import React
import {
  StyledDecisionButton,
  StyledButtonContent,
  ButtonStyling,
  StyledSubmitDecision,
  StyledRoundBox,
  ButtonContainer,
  StyledImage,
} from "./StyledDecisionBtn";
import {
  BodyLBold,
  BodyMMedium,
} from "@/components/common/typeScale/StyledTypeScale";

import {
  LikeButton,
  UnlikeIcon,
} from "@/components/common/svgIcons/CustomIcons";
import { Grid, Stack } from "@mui/material";
import image from "@/assets/svg/DecisionImage.svg";

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
  <StyledSubmitDecision style={{ backgroundImage: `url(${image})` }}>
    <Stack spacing={1} style={{ padding: "18px 12px 18px 12px" }}>
      <Stack direction="row" style={{ width: "100%" }}>
        <BodyLBold>Submit your decision</BodyLBold>
      </Stack>
      <Stack direction="row">
        <Grid>
          <ButtonContainer>
            <DecisionButton
              activeValue={1}
              onClick={() => setActive(1)}
              isActive={active === 1}
            >
              <LikeButton width={10} height={10} active={1} />
              <BodyMMedium>Hire</BodyMMedium>
            </DecisionButton>

            <DecisionButton
              activeValue={2}
              onClick={() => setActive(2)}
              isActive={active === 2}
            >
              <BodyMMedium>Don't Hire</BodyMMedium>
              <UnlikeIcon width={10} height={10} active={1} />
            </DecisionButton>
          </ButtonContainer>
        </Grid>
        {/* <StyledImage src={image}></StyledImage> */}
      </Stack>
    </Stack>
  </StyledSubmitDecision>
);
