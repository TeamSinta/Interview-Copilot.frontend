import styled from "styled-components";
import { BodySBold } from "@/components/common/typeScale/StyledTypeScale";
import { Box } from "@mui/material";

export const DepartmentHeading = styled(BodySBold)`
  font-size: 18px;
`;

export const CreateInterviewBox = styled(Box)`
  border-radius: 28px;

  display: flex; // Set to flex to enable horizontal scrolling
  gap: 20px;
  align-items: center;
  margin-top: 22px;
  width: 100%;
  overflow-x: auto; // Enable horizontal scrolling
  flex-wrap: nowrap;
  cursor: grab; // Set cursor style for dragging
  padding: 24px 0px 24px 24px;
`;

export const EditButtonWrapper = styled.div`
  position: relative; /* Change to relative */
  top: 0;
  left: 0;
  z-index: 1; /* Add a higher z-index to the edit button */
`;
