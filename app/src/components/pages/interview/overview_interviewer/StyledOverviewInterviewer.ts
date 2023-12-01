import styled from "styled-components";
import { BoderBox, Title } from "../StyledInterview";

export const OverviewInterviewers = styled(BoderBox)`
  height: 136px;
  padding: 20px 24px;
  width: 360px;

  ${Title} {
    margin-bottom: 23px;
  }

  ${(props) => props.theme.devices.lg} {
    width: 100%;
  }
`;
