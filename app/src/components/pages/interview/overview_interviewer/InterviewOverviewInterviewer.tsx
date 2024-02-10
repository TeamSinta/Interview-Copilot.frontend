import { IconBtnM } from '@/components/common/buttons/iconBtn/IconBtn';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { H3Bold } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';

import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { useGetInterviewTemplateQuery } from '@/features/interviewDetail/interviewDetailAPI';
import { openModal } from '@/features/modal/modalSlice';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Title } from '../StyledInterview';
import { OverviewInterviewers } from './StyledOverviewInterviewer';
import { useParams } from 'react-router-dom';
const InterviewOverviewInterviewer = () => {
  const { templateId } = useParams();

  const {data : template , isSuccess} = useGetInterviewTemplateQuery(templateId)
  const [interviewer , setInterviewer] = React.useState([])

  const dispatch = useDispatch();
  React.useEffect(() => {
    if(isSuccess){
      setInterviewer(template.interviewers)
    }
  },[template])
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
