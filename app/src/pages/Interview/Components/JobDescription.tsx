import React from 'react';
import { StyledInfoDescription } from '../StyledInterview';
import { Heading } from '@radix-ui/themes';

interface JobDescriptionProps {
  CANDIDATE_DETAILS: {
    JOB_DESCRIPTION: string;
    DESCRIPTION_Data: string[];
  };
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  CANDIDATE_DETAILS,
}) => {
  return (
    <StyledInfoDescription>
      <Heading as="h4" className="font-light text-lg">
        Guidelines
      </Heading>
      <p className="my-2 text-xs">{CANDIDATE_DETAILS.JOB_DESCRIPTION}</p>
      {CANDIDATE_DETAILS.DESCRIPTION_Data.map((point, index) => {
        return (
          <div key={index} className="flex items-start space-x-2">
            <span>•</span>
            <p className="flex-1">{point}</p>
          </div>
        );
      })}
    </StyledInfoDescription>
  );
};

export default JobDescription;
