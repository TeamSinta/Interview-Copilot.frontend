import { BodyLMedium } from "@/components/common/typeScale/StyledTypeScale";
import { Box } from "@mui/material";
import styled from "styled-components";

export const InterviewStageContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 31px;
  flex-direction: column;
`;

export const InterviewStageTopContainer = styled(InterviewStageContainer)`
  gap: 16px;
  height: auto;
`;

export const InterviewStageCardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const InterviewOverviewContainer = styled(InterviewStageTopContainer)`
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Subtitle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.theme.colors.black};
  }

  ${BodyLMedium} {
    &.inactive {
      opacity: 0.5;
    }
  }
`;

export const BoderBox = styled.div`
  border-radius: 28px;
  border: 1px solid #e0e0e0;
`;

export const InterviewOverviewLayout = styled.div`
  display: flex;
  gap: 30px;
  height: 100%;
  .side {
    gap: 30px;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.devices.lg} {
      width: 100%;
    }
  }

  ${(props) => props.theme.devices.lg} {
    flex-wrap: wrap;
  }
`;

export const InterviewStageBox = styled(Box)`
  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;

  width: 100%;
  overflow-x: auto; // Enable horizontal scrolling
  cursor: grab; // Set cursor style for dragging
  padding: 24px 0px 24px 20px;
`;
