import React, { useEffect, useState } from 'react';
import { TOP_BAR_INFO } from '../../Constants';
import {
  getInterviewRoundQuestions,
  getInterview,
  getTemplate,
} from '../../../../../features/interviews/interviewsAPI';
import { useCookies } from 'react-cookie';

import { Skeleton } from '@/components/ui/skeleton';
import { BoxShadow, FlexShadow } from '../../../StyledConclusions';
import { Grid } from '@radix-ui/themes';

const SkeletonLoading = () => {
  // const { OVERALL_SCORE, SENTIMENT } = TOP_BAR_INFO;
  // const [average, setAverage] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  // const [overallScore, setOverallScore] = useState(0);
  // const [candidateName, setCandidateName] = useState('');
  // const [templateTitle, setTemplateTitle] = useState('');
  // const [interviewDate, setInterviewRoundDate] = useState('');
  // const [departmentTitle, setDepartmentTitle] = useState('');
  // const [active, setActive] = useState(0);

  // const [cookies, ,] = useCookies(['access_token']);

  // useEffect(() => {
  //   const fetchRatings = async () => {
  //     setIsLoading(true);
  //     const questions = await getInterviewRoundQuestions(interviewRoundId);

  //     const interviewRound = await getInterview(
  //       interviewRoundId,
  //       cookies.access_token
  //     );
  //     const template = await getTemplate(
  //       interviewRound.template_id,
  //       cookies.access_token
  //     );
  //     setCandidateName(interviewRound.candidate_name);
  //     setTemplateTitle(template.role_title);
  //     setDepartmentTitle(template.department_name);
  //     setInterviewRoundDate(interviewRound.created_at);
  //     let ratingTotal = 0;
  //     questions.map((question) => {
  //       ratingTotal += question.rating;
  //     });
  //     const ratingAverage = ratingTotal / questions.length;
  //     const ratingOverallScore = ratingAverage * 20;

  //     setAverage(ratingAverage);
  //     setOverallScore(ratingOverallScore);
  //     setIsLoading(false);
  //   };

  //   fetchRatings();
  // }, [cookies.access_token, interviewRoundId]);

  return (
    <Grid columns="1fr 2fr" gap="3" width="100%" height={'100%'}>
      <FlexShadow
        style={{
          background: 'white',
        }}
        direction={'column'}
      >
        <div className="flex flex-col space-y-3 py-9 px-1  ">
          <Skeleton className="h-[250px] w-96  rounded-xl" />
        </div>
        <div className="flex flex-col space-y-3 py-9 px-1  ">
          <Skeleton className="h-4 w-[400px]" />
          <div className="flex flex-col space-y-3 py-9 px-1  ">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />

            <Skeleton className="h-4 w-[400px]" />
          </div>
        </div>
      </FlexShadow>

      <BoxShadow style={{ background: 'white' }} grow={'1'}>
        <div className="flex flex-col space-y-3 py-10 px-1  ">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-col space-y-3 py-9 px-1  ">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col space-y-3 py-2 px-1  ">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-col space-y-3 py-9 px-1  ">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex flex-col space-y-3 py-9 px-1  ">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </BoxShadow>
    </Grid>
  );
};

export default SkeletonLoading;
