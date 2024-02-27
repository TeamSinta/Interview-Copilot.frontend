import React from 'react';


import './SummaryTab.css';

import { StyledSummaryDescription, StyledSummaryTab } from './StyledSummaryTab';

import TailwindEditor from '../Editor/Editor';

const SummaryTab = ({ summaryInfo }) => {
  return (
    <StyledSummaryTab>
      <TailwindEditor propData={summaryInfo ?? ''} />
      <StyledSummaryDescription></StyledSummaryDescription>
      {/* <StyledRoundBox>
        <InterviewQNA propData={summaryInfo?.faq ?? ''} screen={'summary'} />
      </StyledRoundBox> */}
    </StyledSummaryTab>
  );
};

export default SummaryTab;
