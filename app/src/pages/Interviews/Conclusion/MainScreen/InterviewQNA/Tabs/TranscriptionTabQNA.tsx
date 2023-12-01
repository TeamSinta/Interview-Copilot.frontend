import React from "react";
import { InterviewContainerStyle } from "../InterviewQNA";

import { TranscriptionCollapsible } from "../TranscriptionCollapsible";
import { QuestionMeta, QuestionTextDisplay } from "./QuestionTabQNA";
import styled from "styled-components";

interface QuestionData {
  question: string;
  duration: string;
}

interface TranscriptionTabQNAProps {
  activeIndex: number;
  data: QuestionData[];
  handleClick: (index: number) => void;
}

const MarginTop = styled.div`
  margin-top: 10px;
  margin-left: 5px;
`;

export const TranscriptionTabQNA: React.FC<TranscriptionTabQNAProps> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  return (
    <div>
      {data?.map((question, index) => (
        <InterviewContainerStyle>
          <QuestionTextDisplay
            handleClick={handleClick}
            index={index}
            activeIndex={activeIndex}
            question={question?.question}
          />

          <MarginTop>
            <QuestionMeta duration={question?.duration} />
          </MarginTop>

          <TranscriptionCollapsible
            question={question}
            index={index}
            activeIndex={activeIndex}
          />
        </InterviewContainerStyle>
      ))}
    </div>
  );
};
