import React from 'react';

import {
  BodyMMedium,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { Flex, Heading } from '@radix-ui/themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const InformationRow = ({ label, value }) => (
  <TooltipProvider>
    <Flex direction="row" justify="between" css={{ width: '100%' }} gap="6">
      <Tooltip>
        <TooltipTrigger>
          <BodyMMedium className="text-sm font-medium leading-none mt-1 whitespace-nowrap text-overflow-ellipsis">
            {label}
          </BodyMMedium>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <BodyMMedium className="text-sm font-medium mt-1 overflow-hidden sm:max-w-[100px] md:max-w-[100px] lg:max-w-[150px] xl:max-w-[250px] truncate">
            {value}
          </BodyMMedium>
        </TooltipTrigger>
        <TooltipContent>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </Flex>
  </TooltipProvider>
);

const PropertySection = ({ information, questionsData, transcriptData }) => {
  const calculateTalkTimePercentage = (transcriptData) => {
    if (!Array.isArray(transcriptData) || transcriptData.length === 0) {
      console.error(
        'transcriptData is not an array or is empty',
        transcriptData
      );
      return 'N/A'; // Return a default or error value
    }

    let totalSeconds = 0;
    let candidateSeconds = 0;

    // Assuming the last timestamp is the end of the conversation
    const lastTimestamp = transcriptData[transcriptData.length - 1].timestamp
      .split(':')
      .map(Number);
    const totalConversationSeconds = lastTimestamp[0] * 60 + lastTimestamp[1];

    transcriptData.forEach((entry, index) => {
      const currentTimestamp = entry.timestamp.split(':').map(Number);
      const currentTimeInSeconds =
        currentTimestamp[0] * 60 + currentTimestamp[1];

      if (entry.picture === null) {
        // Candidate's speech
        let nextTimeInSeconds = totalConversationSeconds; // Default to total duration for last entry
        if (index < transcriptData.length - 1) {
          const nextTimestamp = transcriptData[index + 1].timestamp
            .split(':')
            .map(Number);
          nextTimeInSeconds = nextTimestamp[0] * 60 + nextTimestamp[1];
        }
        candidateSeconds += nextTimeInSeconds - currentTimeInSeconds;
      }
    });

    const talkTimePercentage = (
      (candidateSeconds / totalConversationSeconds) *
      100
    ).toFixed(2);
    return `${talkTimePercentage}%`;
  };

  const dateValue = information?.created_at || 'N/A';
  const jobTitle = information?.title || 'N/A';
  const interviewSubject = information?.template_title || 'N/A';
  const department = information?.department_name || 'N/A';
  const questionsAsked = questionsData?.data?.length
    ? `${questionsData.data?.length} Questions`
    : 'N/A';
  const candidateTalkTimePercentage =
    calculateTalkTimePercentage(transcriptData.data) || 'N/A';
  const totalDuration = 'Placeholder for duration'; // Ensure logic to calculate or fetch this value

  const firstGroupRows = [
    { label: 'Date', value: dateValue },
    { label: 'Title', value: jobTitle },
    { label: 'Interview Subject', value: interviewSubject },
    { label: 'Department', value: department },
  ];

  const secondGroupRows = [
    { label: 'Questions Asked', value: questionsAsked },
    { label: 'Candidate Talk Time', value: candidateTalkTimePercentage },
    { label: 'Duration', value: totalDuration },
  ];

  return (
    <Flex direction="column">
      <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-300 py-3">
        Properties
      </h4>
      {firstGroupRows.map((row, index) => (
        <InformationRow key={index} label={row.label} value={row.value} />
      ))}
      <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-gray-300 py-3">
        Results
      </h4>
      {secondGroupRows.map((row, index) => (
        <InformationRow key={index} label={row.label} value={row.value} />
      ))}
    </Flex>
  );
};

export const InformationBox = ({
  interviewRoundData,
  questionsData,
  transcriptData,
}) => {
  return (
    <Flex direction="column" gap="3" css={{ width: '100%' }}>
      <Heading as="h4" size="3">
        Leslie and you
      </Heading>
      <PropertySection
        information={interviewRoundData}
        questionsData={questionsData}
        transcriptData={transcriptData}
      />
    </Flex>
  );
};
