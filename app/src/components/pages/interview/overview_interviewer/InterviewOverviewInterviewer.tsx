// import { AppDispatch } from "@/app/store";
import { IconBtnM } from '@/components/common/buttons/iconBtn/IconBtn';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { EditIcon, PlusIcon } from '@/components/common/svgIcons/Icons';
import { H3Bold } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import {
  // getInterviewDetailAsync,
  selectInterviewDetail,
} from '@/features/interviewDetail/interviewDetailSlice';

import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../StyledInterview';
import { OverviewInterviewers } from './StyledOverviewInterviewer';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { openModal } from '@/features/modal/modalSlice';
import { IMember } from '@/types/company';

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
            icon={<PlusIcon />}
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
          interviewer.map((interview: any, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                photoType={PhotoType.L}
                id={interview.id}
                firstName={interview.firstName}
                lastName={interview.lastName}
                profilePicture={interview.profilePicture}
              />
            </ElWrap>
          ))
        ) : (
          <></>
        )}
      </Photos>
      <GlobalModal></GlobalModal>
    </OverviewInterviewers>
  );
};

export default InterviewOverviewInterviewer;
