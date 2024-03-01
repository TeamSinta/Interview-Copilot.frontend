import React from 'react';

import './SummaryTab.css';

import { StyledSummaryDescription } from './StyledSummaryTab';

import TailwindEditor from '../Editor/Editor';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SummaryTab = ({ summaryInfo }) => {
  const editorId = summaryInfo?.summary_id ?? 'defaultEditorId ';
  return (
    <>
      <TailwindEditor
        propData={summaryInfo?.description ?? ''}
        editorId="summaryEditor"
        saveApiEndpoint={`${BACKEND_URL}/summary/${editorId}/update-description/`}
        requestName={'description'}
        showSaveStatus={true}
      />
      <StyledSummaryDescription></StyledSummaryDescription>
      {/* Additional content */}
    </>
  );
};

export default SummaryTab;
