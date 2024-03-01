import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { useState } from 'react';
import { H2Bold, BodySMedium } from '../../typeScale/StyledTypeScale';
// import {
//   Card,
//   CardContent,
//   InterviewCardCover,
//   CardTitleContent,
//   CardSubTitle,
//   CardSubTitleContent,
// } from '../card/StyledCard';
import { CardDescription, CardFooter, CardHeader, CardTitle , Card, CardContent} from '@/components/ui/card';
interface IConclusionInterviewCardProps {
  name: string;
  title: string;
  disable: boolean;
  date: number | string;
  video_uri?: string;
  icon: string;
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
  const { icon, name, title, disable, date, video_uri } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const formattedDate = formatDateDifference(date);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <Card className="h-52 w-80 shadow-md hover:bg-secondary/90 cursor-pointer flex justify-between flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-ellipsis w-64 s truncate ">
          {icon} {name}
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <CardDescription> · {formattedDate}</CardDescription>{' '}
      </CardFooter>
    </Card>
    // <Card
    //   className={(hover ? 'hover' : '').concat(disable ? ' disable' : ' ')}
    //   id="cardId"
    // >
    //   {/* Display video as a thumbnail if found otherwise image */}
    //   {video_uri === '' ? (
    //     <InterviewCardCover imgUrl={''} />
    //   ) : (
    //     <video
    //       src={video_uri}
    //       poster={''}
    //       controls={false}
    //       muted={true}
    //       loop={true}
    //       onClick={toggleVideo}
    //       style={{ width: '100%', height: 'auto' }}
    //     />
    //   )}
    //   <CardContent
    //     onMouseEnter={() => {
    //       setHover(disable ? false : true);
    //     }}
    //     onMouseLeave={() => {
    //       setHover(false);
    //     }}
    //   >
    //     <CardTitleContent>
    //       <H2Bold style={{ fontSize: '14px' }}>{name} </H2Bold>
    //       <CardSubTitle style={{ marginTop: '2px' }}>
    //         {' '}

    //       </CardSubTitle>
    //     </CardTitleContent>
    //     <CardSubTitleContent>
    //       <BodySMedium style={{ fontSize: '10px' }}>{title}</BodySMedium>
    //     </CardSubTitleContent>
    //   </CardContent>
    // </Card>
  );
};

export default ConclusionInterviewCard;
