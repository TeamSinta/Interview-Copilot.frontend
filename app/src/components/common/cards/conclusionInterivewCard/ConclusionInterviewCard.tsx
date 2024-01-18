import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { useState } from 'react';
import { H2Bold, BodySMedium } from '../../typeScale/StyledTypeScale';
import {
  Card,
  CardContent,
  InterviewCardCover,
  CardTitleContent,
  CardSubTitle,
  CardSubTitleContent,
} from '../card/StyledCard';

interface IConclusionInterviewCardProps {
  name: string;
  title: string;
  disable: boolean;
  date: number;
}

const formatDateDifference = (creationDate: string | number) => {
  const dateObject =
    typeof creationDate === 'string'
      ? new Date(creationDate)
      : new Date(creationDate * 1000);
  return dateObject.toLocaleString();
};

const ConclusionInterviewCard = (props: IConclusionInterviewCardProps) => {
  const [hover, setHover] = useState(false);
  const { name, title, disable, date } = props;

  const formattedDate = formatDateDifference(date);

  return (
    <ElWrap h={256}>
      <Card
        className={(hover ? 'hover' : '').concat(disable ? ' disable' : ' ')}
        id="cardId"
      >
        <InterviewCardCover imgUrl={''}></InterviewCardCover>
        <CardContent
          onMouseEnter={() => {
            setHover(disable ? false : true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <CardTitleContent>
            <H2Bold style={{ fontSize: '14px' }}>{name} </H2Bold>
            <CardSubTitle style={{ marginTop: '2px' }}>
              {' '}
              <BodySMedium> · {formattedDate}</BodySMedium>{' '}
            </CardSubTitle>
          </CardTitleContent>
          <CardSubTitleContent>
            <BodySMedium style={{ fontSize: '10px' }}>{title}</BodySMedium>
          </CardSubTitleContent>
        </CardContent>
      </Card>
    </ElWrap>
  );
};

export default ConclusionInterviewCard;
