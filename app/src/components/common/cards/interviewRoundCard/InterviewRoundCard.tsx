import React from "react";
import {
  BodySMedium,
  BodyMBold,
  BodySBold,
} from "../../typeScale/StyledTypeScale";
import { Stack, Box } from "@mui/material";

import {
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
  StyledBox,
  CenteredTypography,
} from "./StyledInterviewRoundCard";
import Photos from "../../buttons/photo/Photos";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { NumberIcon, PhotoIcon } from "../card/StyledCard";
import { InitialsGenerator } from "@/utils/Utils";
import TempCover from "@/assets/images/cover_1.jpg";

export interface InterviewRoundCardProps {
  templateId: string;
  image?: string;
  title?: string;
  numberOfQuestions?: string;
  members?: Array<{
    first_name: string;
    last_name: string;
    profile_picture: string;
  }>;
  selected?: boolean;
  imageUrl: string;
  onClick?: (templateId: string) => void;
}

const InterviewRoundCard = (props: InterviewRoundCardProps) => {
  const {
    templateId,
    title,
    imageUrl,
    numberOfQuestions,
    members,
    selected,
    onClick,
  } = props;

  const coverImage = imageUrl || TempCover;

  const handleClick = () => {
    if (onClick) onClick(templateId);
  };

  return (
    <StyledCard
      sx={{ boxShadow: 0 }}
      onClick={handleClick}
      style={{
        background: selected ? "#CECDEE" : "",
        border: selected ? "1px #121212 solid" : "",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <StyledCardContent
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Stack spacing={3.5}>
          <Stack
            spacing={0}
            style={{
              marginTop: "-16px",
            }}
          >
            <BodySMedium style={{ opacity: "0.5" }}>
              {numberOfQuestions}
            </BodySMedium>
            <BodyMBold
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "140px",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </BodyMBold>
          </Stack>
        </Stack>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <Photos>
            <>
              {members
                ?.slice(0, members.length > 4 ? 3 : 4)
                .map((member, index) => (
                  <ElWrap w={32} h={32} key={index}>
                    <PhotoIcon imgUrl={member.profile_picture}>
                      <BodySBold>
                        {!member.profile_picture
                          ? InitialsGenerator(
                              member.first_name,
                              member.last_name
                            )
                          : ""}
                      </BodySBold>
                    </PhotoIcon>
                  </ElWrap>
                ))}
            </>
            <>
              {members?.length && members.length > 4 ? (
                <NumberIcon imgUrl="">
                  <BodySBold>+{members.length - 3}</BodySBold>
                </NumberIcon>
              ) : (
                <></>
              )}
            </>
          </Photos>
        </Box>
      </StyledCardContent>
      <StyledCardMedia imgUrl={coverImage}>
        {/* <StyledBox>
          <CenteredTypography>8</CenteredTypography>
        </StyledBox> */}
      </StyledCardMedia>
    </StyledCard>
  );
};

export default InterviewRoundCard;
