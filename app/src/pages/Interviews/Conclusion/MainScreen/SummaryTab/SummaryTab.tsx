import React from 'react';



import './SummaryTab.css';

import { StyledSummaryDescription } from './StyledSummaryTab';

import TailwindEditor from '../Editor/Editor';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SummaryTab = ({ summaryInfo }) => {
  const editorId = summaryInfo?.summary_id ?? 9;

  const editorNumbered = editorId + 39;
  return (
    <>
      <TailwindEditor
        propData={summaryInfo?.description ?? ''}
        editorId={editorNumbered}
        saveApiEndpoint={`${BACKEND_URL}/summary/${editorId}/update-description/`}
        requestName={'description'}
      />
      <StyledSummaryDescription></StyledSummaryDescription>
      {/* Additional content */}
    </>
  );
};

export default SummaryTab;
