import styled from "styled-components";
import { Button, Box, Stack } from "@mui/material";
import { H3Bold } from "@/components/common/typeScale/StyledTypeScale";

export const SelectBox = styled(Stack)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 590px;
  height: 100%;
  flex: 1;
  margin: 20px;
  display: flex;

  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 359px;
    height: 100%;
    margin-right: 8px;
    overflow-y: scroll;
  }
`;

export const HeadingBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 950px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const Wrapper = styled.div`
  height: 93vh;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
  justify-content: center;

  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 100vh width 100%;
    background-color: black;
    color: black;
  }
`;

export const Wrapper_Box = styled.div`
  padding: 5px;
`;

export const Title = styled(H3Bold)``;

export const VideoContainer = styled(Box)`
  margin-top: 72px;
  margin-left: 20px;

  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    border-radius: 12px;
    height: 40%;

    overflow-y: scroll;
  }
`;

export const ButtonWrapper = styled.label`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 28px;
`;

export const Input = styled.input`
  border: 1px solid var(--grey);
  padding: 0.5em;
  border-radius: 4px;
  color: var(--dark-blue);
  width: 100%;
`;

export const StyledButton = styled(Button)``;

export const CancelButton = styled(Button)`
  margin-top: 0;
`;

export const HomeContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 500px;
  gap: 6px;
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 450px;
    height: 100vh;
    overflow-y: hidden;
  }
`;
