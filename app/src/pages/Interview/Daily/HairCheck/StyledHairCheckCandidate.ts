import styled from "styled-components";
import { Button, Box, Stack } from "@mui/material";
import { H3Bold } from "@/components/common/typeScale/StyledTypeScale";

export const HairCheckContainer = styled(Box)`
  background: transparent;
  display: flex;
  height: 90vh;
`;

export const HomeContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 490px;
  gap: 28px;
`;

export const SelectBox = styled(Stack)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  height: 100%;
  max-width: 390px;
  max-height: 410px;
  flex: 1;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Wrapper_Box = styled.div`
  padding: 5px;
`;

export const Title = styled(H3Bold)``;

export const VideoContainer = styled(Box)`
  border-radius: 12px;
  margin-top: 72px;
  margin-left: 20px;
`;

export const ButtonWrapper = styled.label`
  display: flex;
  gap: 12px;
  flex: 1;
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

export const LogoImage = styled.img`
  width: 151px;
  height: 64px;
  flex: 1;
`;
