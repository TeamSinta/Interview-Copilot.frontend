import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import './index.css';
import { TOP_BAR_INFO } from './Constants';
import {
  useGetInterviewRoundQuestionsQuery,
  useGetInterviewQuery,
  useGetTemplateQuery,
} from '../../../features/interviews/interviewsAPI';
import { useCookies } from 'react-cookie';

import { SubmitDecision } from './MainScreen/SubmitDecisonButton/DecisionButton';
import {
  BodyLBold,
  BodyLMedium,
} from '@/components/common/typeScale/StyledTypeScale';
interface TopBarProps {
  interviewRoundId: number;
}
const TopBar: React.FC<TopBarProps> = ({ interviewRoundId }) => {
  const { OVERALL_SCORE, SENTIMENT } = TOP_BAR_INFO;
  const [average, setAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [candidateName, setCandidateName] = useState('');
  const [templateTitle, setTemplateTitle] = useState('');
  const [interviewDate, setInterviewRoundDate] = useState('');
  const [departmentTitle, setDepartmentTitle] = useState('');
  const [active, setActive] = useState(0);

  const [cookies, ,] = useCookies(['access_token']);

  const { data: questions, isSuccess: questionsSuccess } =
    useGetInterviewRoundQuestionsQuery(interviewRoundId);

  const { data: interviewData, isSuccess } =
    useGetInterviewQuery(interviewRoundId);

  const { data: template } = useGetTemplateQuery(interviewData?.template_id);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      if (isSuccess && questionsSuccess && template) {
        setCandidateName(interviewData.candidate_name);
        setTemplateTitle(template.role_title);
        setDepartmentTitle(template.department_name);
        setInterviewRoundDate(interviewData.created_at);

        let ratingTotal = 0;
        questions.forEach((question) => {
          ratingTotal += question.rating;
        });
        const ratingAverage = ratingTotal / questions.length;
        const ratingOverallScore = ratingAverage * 20;

        setAverage(ratingAverage);
        setOverallScore(ratingOverallScore);
      }
      setIsLoading(false);
    };

    if (template) {
      fetchRatings();
    }
  }, [
    cookies.access_token,
    interviewRoundId,
    isSuccess,
    questionsSuccess,
    template,
    interviewData,
  ]);

  const departmentName = departmentTitle || 'General';
  const candidateTitle = candidateName || 'Unknown Candidate';
  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ gap: '8px' }}>
        <Grid item className="bar-container">
          <Grid
            item={true}
            xs={8}
            md={7}
            lg={7}
            minWidth={'l'}
            className="column"
            style={{ minWidth: '330px' }}
          >
            <Stack
              spacing={1}
              alignContent="center"
              style={{ marginTop: '10px', minWidth: '338px' }}
            >
              <BodyLBold style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {candidateTitle}
              </BodyLBold>
              <BodyLMedium style={{ fontSize: '16px' }}>
                {departmentName}
              </BodyLMedium>

              <BodyLBold
                style={{ fontSize: '14px', display: 'flex', gap: '6px' }}
              >
                {' '}
                {templateTitle}{' '}
                <BodyLMedium style={{ fontSize: '14px' }}>
                  {' '}
                  · {interviewDate}
                </BodyLMedium>
              </BodyLBold>

              <p className="bio-data-stage">
                <span className="bio-data-stage-label">
                  {/* {BIO_DATA.STAGE_LABEL}:{" "} */}
                </span>{' '}
                <span
                  style={{
                    fontFamily: 'ChillaxSemi',
                    fontWeight: '600',
                  }}
                >
                  {/* {BIO_DATA.STAGE_NAME} .{" "} */}
                </span>
                {/* <span className="bio-data-stage-date">{BIO_DATA.DATE}</span> */}
              </p>
            </Stack>
          </Grid>
          <Grid item={true} xs={2} md={3} lg={3} className="column">
            <div className="content-box">
              <p>{OVERALL_SCORE.LABEL}</p>
              <div id="progressContainer">
                <progress
                  id="myProgress"
                  style={{
                    height: '20px',
                  }}
                  value={overallScore.toFixed(0)}
                  max="100"
                ></progress>
              </div>
              <BodyLBold>
                {!isLoading ? overallScore.toFixed(0) : 'Loading...'}%
              </BodyLBold>
            </div>
          </Grid>
          <Grid item={true} xs={2} md={2} lg={2} className="column">
            <div className="content-box">
              {' '}
              <p>{SENTIMENT.LABEL}</p>
              <div>
                <span>
                  <i
                    className={
                      'fa fa-' +
                      (average > 2.5 ? 'thumbs-up' : 'thumbs-down') +
                      ' ' +
                      (average > 2.5
                        ? 'positiveSentimentIcon'
                        : 'negativeSentimentIcon')
                    }
                  ></i>
                </span>
                <span
                  style={{
                    fontFamily: 'ChillaxSemi',
                    fontWeight: '600',
                  }}
                >
                  {average > 2.5 ? 'Positive' : 'Negative'}
                </span>
              </div>
              <BodyLBold>
                {!isLoading ? average.toFixed(0) : 'Loading...'}{' '}
                <span className="sentiment-meta">/ 5</span>{' '}
              </BodyLBold>
            </div>
          </Grid>
        </Grid>

        <Grid item className="bar-decision">
          <SubmitDecision active={active} setActive={setActive} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TopBar;
