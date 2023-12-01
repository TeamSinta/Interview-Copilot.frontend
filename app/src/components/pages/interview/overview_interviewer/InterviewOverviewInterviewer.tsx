// import { AppDispatch } from "@/app/store";
import { IconBtnM } from "@/components/common/buttons/iconBtn/IconBtn";
import Photo from "@/components/common/buttons/photo/Photo";
import Photos from "@/components/common/buttons/photo/Photos";
import { EditIcon } from "@/components/common/svgIcons/Icons";
import { H3Bold } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import {
  // getInterviewDetailAsync,
  selectInterviewDetail,
} from "@/features/interviewDetail/interviewDetailSlice";
import { IMockMembers } from "@/features/roles/rolesInterface";
import { BackgroundColor, PhotoType } from "@/features/utils/utilEnum";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../StyledInterview";
import { OverviewInterviewers } from "./StyledOverviewInterviewer";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { openModal } from "@/features/modal/modalSlice";

const InterviewOverviewInterviewer = () => {
  const { template } = useSelector(selectInterviewDetail); // Use the correct selector to access interviewers

  const dispatch = useDispatch();

  const interviewer = template.interviewers; // Access interviewers from the template

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(openModal({ modalType }));
  };

  return (
    <OverviewInterviewers>
      <Title>
        <H3Bold>Interviewers</H3Bold>
        <ElWrap w={32} h={32}>
          <IconBtnM
            icon={<EditIcon />}
            disable={false}
            className={BackgroundColor.WHITE}
            onClick={() => {
              onClickModalOpen(MODAL_TYPE.EDIT_MEM);
            }}
          />
        </ElWrap>
      </Title>
      <Photos>
        {interviewer.length > 0 ? (
          interviewer.map((interview: IMockMembers, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                photoType={PhotoType.L}
                member_idx={interview.id}
                member_firstName={interview.first_name}
                member_lastName={interview.last_name}
                member_url={interview.profile_picture}
              />
            </ElWrap>
          ))
        ) : (
          <></>
        )}
        {/* <ElWrap w={40} h={40}>
          <Photo
            photoType={PhotoType.L}
            onSelect={() => {}}
            member_idx={1}
            member_name={"Mattias Welamsson"}
            member_url={""}
            selected={false}
          />
        </ElWrap>
        <ElWrap w={40} h={40}>
          <Photo
            photoType={PhotoType.L}
            onSelect={() => {}}
            member_idx={1}
            member_name={"Mohamed Shegow"}
            member_url={
              "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-512"
            }
            selected={false}
          />
        </ElWrap> */}
      </Photos>
      <GlobalModal></GlobalModal>
    </OverviewInterviewers>
  );
};

export default InterviewOverviewInterviewer;
