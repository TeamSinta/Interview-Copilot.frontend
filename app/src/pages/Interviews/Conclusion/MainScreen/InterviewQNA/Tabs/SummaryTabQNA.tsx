import React from 'react';
import { InterviewContainerStyle } from '../InterviewQNA';
import { Grid } from '@mui/material';
import {
  BodyMBold,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { QuestionValue } from '@/components/common/modal/modalContents/StyledModalContents';
import {PredefinedRatingsProps, RatingButton, buttons } from '../RatingComponent/RatingComponent';

export const PredefinedRatingComponent: React.FC<PredefinedRatingsProps> = ({
  rating,
}) => {
  const activeButton = buttons.find(button => button.rate === rating);

  return activeButton ? (
    <RatingButton
      Icon={activeButton.Icon}
      activeColor={activeButton.color}
      activeIcon={true} />
  ) : null;
};

export const SummaryTabQNA: React.FC<any> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  return (
    <div className="interview-qna">
      {data?.map?.((question: any, index: number) => (
        <InterviewContainerStyle key={index}>
          <Grid
            container
            spacing={1}
            key={index}
            onClick={() => handleClick(index)}
            style={{ marginLeft: '5px'}}
          >
            <Grid item xs={11} md={11}>
              <div>
                <div style={{ display: 'flex'}}>
                  <Grid xs={12} md={8} >
                    <div
                      className={`question-heading ${
                        activeIndex === index ? 'active' : ''
                      }`}
                    >
                      <BodyMBold> {question.question}</BodyMBold>
                    </div>
                  </Grid>
                  <Grid xs={12} md={4} display={'flex'} paddingLeft={2} justifyContent={'space-between'} >
                    {question.competency !== null && (
                      <QuestionValue>
                        <BodySMedium>{question.competency}</BodySMedium>
                      </QuestionValue>
                    )}
                      <div className="icon">
                        <PredefinedRatingComponent rating={question.score} />
                    </div>
                  </Grid>
                </div>
                <div
                  style={{ marginTop: '10px', fontWeight: '400' }}
                  className={`question-answer ${
                    activeIndex === index ? 'show' : ''
                  }`}
                >
                {' '}
                  <BodySMedium> {question.answer}</BodySMedium>
                </div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div>
                <i
                  style={{
                    marginLeft: '0px',
                    marginRight: '20px',
                    fontSize: '16px',
                    float: 'right',
                  }}
                  className={`fa ${
                    activeIndex === index ? 'fa-angle-up' : 'fa-angle-down'
                  }`}
                ></i>
              </div>
            </Grid>
          </Grid>
        </InterviewContainerStyle>
      ))}
    </div>
  );
};
