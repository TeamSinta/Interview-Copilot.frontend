import React, { useRef, useState } from "react"; // Import React
import {
  StyledDecisionButton,
  StyledButtonContent,
  ButtonStyling,
  StyledSubmitDecision,
  ButtonContainer,
  SubmittedPrompt,
} from "./StyledDecisionBtn";
import {
  BodyLBold,
  BodyMMedium,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import confetti from "canvas-confetti";

import {
  DoubleLike,
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
  const buttonRef = useRef(null); // Create a ref for the button

  const backgroundColors = isActive
    ? activeValue === 1 || 3
      ? "#DBFDDC"
      : "#FABBCF"
    : "#FFFFFF"; // default background color

  const handleConfetti = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const confettiOrigin = {
        x: (rect.left + rect.right) / 2 / window.innerWidth, // Calculate the X position
        y: (rect.top + rect.bottom) / 2 / window.innerHeight, // Calculate the Y position
      };

      confetti({
        // ... (other confetti options)
        origin: confettiOrigin,
      });
    }
  };
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the passed onClick function
    }
    if (activeValue === 1) {
      // Trigger confetti for "Hire" button
      handleConfetti();
    }
  };
  return (
    <StyledDecisionButton
      ref={buttonRef} // Attach the ref to the button
      activeValue={activeValue}
      onClick={handleClick}
      style={{ backgroundColor: backgroundColors }}
    >
      <StyledButtonContent>
        <ButtonStyling>{children}</ButtonStyling>
      </StyledButtonContent>
    </StyledDecisionButton>
  );
};

export const SubmitDecision = ({ active, setActive }) => {
  const [submitted, setSubmitted] = useState(false); // State to manage the submitted prompt visibility

  const handleStrongHireClick = () => {
    setActive(3);
    setSubmitted(true); // Update the submitted state to true when Strong Hire is clicked
    // Trigger confetti effect here, if needed
  };

  return (
    <StyledSubmitDecision
      style={{
        backgroundImage: `url(${image})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={1} style={{ padding: "18px 12px 18px 12px" }}>
        <Stack
          direction="row"
          style={{ width: "100%" }}
          justifyContent={"space-between"}
        >
          <BodyLBold>Submit your decision</BodyLBold>
          <SubmittedPrompt className={submitted ? "show" : ""}>
            <BodySMedium>Submitted in Greenhouse 🎉</BodySMedium>
          </SubmittedPrompt>
        </Stack>
        <Stack direction="row">
          <Grid>
            <ButtonContainer>
              <div style={{ width: "106px", height: "66px" }}>
                <DecisionButton
                  activeValue={1}
                  onClick={() => setActive(1)}
                  isActive={active === 1}
                >
                  <LikeButton width={10} height={10} active={1} />
                  <BodyMMedium>Hire</BodyMMedium>
                </DecisionButton>
              </div>
              <div style={{ width: "106px", height: "66px" }}>
                <DecisionButton
                  activeValue={2}
                  onClick={() => setActive(2)}
                  isActive={active === 2}
                >
                  <BodyMMedium>Don't Hire</BodyMMedium>
                  <UnlikeIcon width={10} height={10} active={1} />
                </DecisionButton>
              </div>
            </ButtonContainer>
          </Grid>
        </Stack>
        <div style={{ width: "60%", height: "40px" }}>
          <DecisionButton
            activeValue={3}
            onClick={handleStrongHireClick}
            isActive={active === 3}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BodyMMedium>Strong Hire</BodyMMedium>
              <DoubleLike
                padding-bottom={8}
                width={10}
                height={10}
                active={1}
              />
            </div>
          </DecisionButton>
        </div>
      </Stack>
    </StyledSubmitDecision>
  );
};
