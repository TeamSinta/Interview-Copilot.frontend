import React from "react";
import styled from "styled-components";
import { TextBtnM } from "../../buttons/textBtn/TextBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { Stack } from "@mui/material";

const InvitationBoxContainer = styled.div`
  height: 128px;
  background: #cecdee;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #121212;
  z-index: 999; /* Ensure it's above other content */
`;

const InvitationBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 24px;
  gap: 16px;
`;

const Title = styled.div`
  color: #121212;
  font-size: 16px;
  font-family: Chillax;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const EmailInput = styled.input`
  width: 628px;
  height: 40px;
  position: relative;
  background: white;
  border-radius: 12px;
  border: 1px solid #121212;
  padding-left: 16px;
  font-size: 14px;
  font-family: Chillax;
  font-weight: 500;
  line-height: 21px;
  margin-top: 16px;
`;

const StyledInvitationBox = () => {
  return (
    <InvitationBoxContainer>
      <InvitationBoxContent>
        <Title>Invite New Members</Title>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <EmailInput type="text" placeholder="Enter email address" />

          <ElWrap w={148} h={40}>
            <TextBtnM
              label="Invite"
              disable={false}
              className={BackgroundColor.WHITE}
              onClick={() => {
                // Show the confirmation popup
              }}
            />
          </ElWrap>
        </Stack>
      </InvitationBoxContent>
    </InvitationBoxContainer>
  );
};

export default StyledInvitationBox;
