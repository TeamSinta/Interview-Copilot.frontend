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
  date: number | string;
  video_uri?: string;
  thumbnail_uri?: string;
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
  const { name, title, disable, date, video_uri, thumbnail_uri } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const formattedDate = formatDateDifference(date);
  console.log(
    'this is the video uri:',
    video_uri,
    ' and thumbnail uri: ',
    thumbnail_uri
  );

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <ElWrap h={256}>
      <Card
        className={(hover ? 'hover' : '').concat(disable ? ' disable' : ' ')}
        id="cardId"
      >
        {/* Display video as a thumbnail if found otherwise image */}
        {video_uri === '' ? (
          <InterviewCardCover imgUrl={''} />
        ) : (
          <video
            src={video_uri}
            poster={thumbnail_uri}
            onError={() => console.log('Error loading thumbnail')}
            controls={false}
            muted={true}
            loop={true}
            onClick={toggleVideo}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        <CardContent
          onMouseEnter={() => {
            setHover(!disable);
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
