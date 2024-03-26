import {
  EmailIcon,
  MapIcon,
  ResumeIcon,
  PhoneIcon,
  LinkedinIcon,
} from '@/components/common/svgIcons/Icons';
import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { CANDIDATE_DETAILS } from '../InterviewConstant';
import { StyledIcon } from '../StyledInterview';
import ImageLinkText from './ImageLinkText';
import JobDescription from './JobDescription';

interface IInfoTab {
  interviewDetails: any;
}

const InfoTab: React.FC<IInfoTab> = ({ interviewDetails }) => {
  const briefInfo = useMemo(() => {
    return (
      <>
        <Grid container>
          <Grid md={12}>
            <ImageText icon={<EmailIcon />} text={interviewDetails.email} />
          </Grid>
          <Grid md={6}>
            <ImageText icon={<MapIcon />} text={CANDIDATE_DETAILS.LOCATION} />
            <ImageLinkText
              icon={<ResumeIcon />}
              text={'Resume.pdf'}
              link={CANDIDATE_DETAILS.LINKEDIN}
              textDecoration={'normal'}
            />
          </Grid>
          <Grid md={6}>
            <ImageText icon={<PhoneIcon />} text={CANDIDATE_DETAILS.PHONE} />
            <ImageLinkText
              icon={<LinkedinIcon />}
              text={'LinkedIn '}
              link={CANDIDATE_DETAILS.LINKEDIN}
              textDecoration={'underline'}
            />
          </Grid>
        </Grid>
      </>
    );
  }, [interviewDetails]);

  const competencies = useMemo(() => {
    return (
      <div className="flex text-xs flex-wrap gap-3">
        {CANDIDATE_DETAILS.COMPETENCIES.map((a) => {
          return (
            <div
              className="border border-white border-solid rounded-lg bg-white p-2"
              key={a}
            >
              {a}
            </div>
          );
        })}
      </div>
    );
  }, []);

  return (
    <div className="bg-lightBg p-4 my-3 rounded-lg flex flex-col gap-4 h-full">
      {briefInfo}
      <JobDescription CANDIDATE_DETAILS={CANDIDATE_DETAILS} />
      {competencies}
    </div>
  );
};

const ImageText = (data: any) => {
  const { icon, text } = data;
  return (
    <div className="flex text-xs content-center items-center pb-3">
      <span className="mr-1">
        <StyledIcon>{icon}</StyledIcon>
      </span>
      <span className="">{text}</span>
    </div>
  );
};

export default InfoTab;
