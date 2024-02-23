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
import {
  StyledIcon,
  StyledInfoDescription,
  CompetencyStyle,
} from '../StyledInterview';
import ImageLinkText from './ImageLinkText';

interface IInfoTab {
  interviewDetails: any;
}

const InfoTab: React.FC<IInfoTab> = ({ interviewDetails }) => {
  const briefInfo = useMemo(() => {
    return (
      <>
        <Grid container>
          {' '}
          <ImageText icon={<EmailIcon />} text={interviewDetails.email} />
        </Grid>
        <br></br>
        <Grid container>
          <Grid md={6}>
            {' '}
            <ImageText
              icon={<MapIcon />}
              text={CANDIDATE_DETAILS.LOCATION}
            />{' '}
            <br></br>
            <ImageLinkText
              icon={<ResumeIcon />}
              text={'Resume.pdf'}
              link={CANDIDATE_DETAILS.LINKEDIN}
              textDecoration={'normal'}
            />
          </Grid>
          <Grid md={6}>
            {' '}
            <ImageText
              icon={<PhoneIcon />}
              text={CANDIDATE_DETAILS.PHONE}
            />{' '}
            <br></br>
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
  const jobDescription = useMemo(() => {
    return (
      <StyledInfoDescription>
        {CANDIDATE_DETAILS.DESCRIPTION}
      </StyledInfoDescription>
    );
  }, []);

  const competencies = useMemo(() => {
    return (
      <div style={{ fontSize: '12px' }}>
        <p
          style={{
            fontWeight: '600',
            fontSize: '12px',
            fontFamily: 'InterSemi',
          }}
        >
          {'Competencies'}
        </p>
        <br></br>
        <div style={{ display: 'flex' }}>
          {CANDIDATE_DETAILS.COMPETENCIES.map((a) => {
            return <CompetencyStyle key={a}>{a}</CompetencyStyle>;
          })}{' '}
        </div>
      </div>
    );
  }, []);

  return (
    <>
      {briefInfo}
      <br></br>
      {jobDescription} <br></br>
      {competencies}
    </>
  );
};

const ImageText = (data: any) => {
  const { icon, text } = data;
  return (
    <div
      style={{
        display: 'flex',
        fontSize: '10px',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          marginRight: '5px',
        }}
      >
        <StyledIcon>{icon}</StyledIcon>
      </span>
      <span>{text}</span>
    </div>
  );
};

export default InfoTab;
