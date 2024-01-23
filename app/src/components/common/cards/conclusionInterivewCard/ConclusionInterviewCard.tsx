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
import image from '@/assets/svg/sinta-logo.svg';
import ConclusionData from '@/services/conclusionService';
interface IConclusionInterviewCardProps {
  name: string;
  title: string;
  disable: boolean;
  date: number | string;
  video_uri?: string;
  id: string;
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
  const { name, title, disable, date, video_uri, id } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [
    summarizedAnswers,
    questionsTranscript,
    summarizedInterview,
    videoUrl,
    emojisData,
    loading,
    error,
  ] = video_uri
    ? ConclusionData(id)
    : [null, null, null, null, null, false, false];
  if (loading) return <div>Loading...</div>;
  const shouldDisplayVideo = video_uri && videoUrl && !error;

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
        {shouldDisplayVideo ? (
          <video
            src={videoUrl?.url}
            poster={''}
            controls={false}
            muted={true}
            loop={true}
            onClick={toggleVideo}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '0px 0px 0px 0px',
            }}
          />
        ) : (
          <InterviewCardCover imgUrl={image} />
        )}
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
              <BodySMedium> · {date}</BodySMedium>{' '}
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
