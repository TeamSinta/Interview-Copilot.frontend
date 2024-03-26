import React from 'react';
import { InterviewContainerStyle } from '../InterviewQNA';
import { Grid } from '@mui/material';
import {
  ClockIcon,
  SoundLevelIcon,
} from '@/components/common/svgIcons/CustomIcons';
import styled from 'styled-components';
import {
  BodyMMedium,
  H2Bold,
  H3Bold,
  H3Medium,
} from '@/components/common/typeScale/StyledTypeScale';

import { PredefinedRatingsComponent } from '../RatingComponent/RatingComponent';
import { Flex } from '@radix-ui/themes';
import { AccordionItem } from '@radix-ui/react-accordion';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TailwindEditor from '../../Editor/Editor';

interface Question {
  question: string;
  answer: string;
  competency?: string | null; // Make competency optional and nullable
  score: number;
  duration: string;
  difficulty?: string;
  index?: number;
  id?: string;
}

interface CompetencyGroup {
  [key: string]: {
    questions: Question[];
    totalScore: number;
    averageScore?: number;
  };
}

interface QuestionSummarizedAnswers {
  question: string;
  answer: string;
  competency: string;
  score: number;
}

interface QuestionItemProps extends QuestionSummarizedAnswers {
  index: number;
  duration: string;
  difficulty: string;
  handleClick: (index: number) => void;
  activeIndex: number;
  key: number;
}

interface QuestionsTabQNAProps {
  activeIndex: number;
  data: QuestionItemProps[];
  handleClick: QuestionItemProps['handleClick'];
}

interface QuestionTextDisplayProps {
  activeIndex: number;
  question: string;
  handleClick: QuestionItemProps['handleClick'];
  index?: number;
  score: number;
  answer: string;
  key: string;
}

interface QuestionMetaProps {
  duration: string;
  question: string;
  difficulty: string;
}

interface TextProps {
  marginLeft?: string;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IndexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px;
  text-align: start;
`;

const IconContainer = styled.div`
  opacity: 0.5;
  margin: 0px;
  padding: 0px;
`;

const Text = styled.div<TextProps>`
  font-size: 10px;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
  margin-left: 4px;
`;

const groupQuestionsByCompetency = (questions: Question[]) => {
  const grouped: CompetencyGroup = questions.reduce(
    (acc: CompetencyGroup, question) => {
      // Default to "General" if competency is null or undefined
      const competency = question.competency || 'General';
      if (!acc[competency]) {
        acc[competency] = { questions: [], totalScore: 0 };
      }
      acc[competency].questions.push(question);
      acc[competency].totalScore += question.score;
      return acc;
    },
    {}
  );

  // Calculate average score for each competency
  Object.keys(grouped).forEach((competency) => {
    const group = grouped[competency];
    group.averageScore = group.totalScore / group.questions.length;
  });

  return grouped;
};

export const QuestionMeta: React.FC<QuestionMetaProps> = ({
  duration,
  difficulty,
}) => {
  return (
    <p>
      <FlexContainer>
        <IconContainer>
          <ClockIcon width={12} height={12} active={0} />
        </IconContainer>
        <Text>{duration}</Text>

        <IconContainer style={{ marginLeft: '12px' }}>
          <SoundLevelIcon width={12} height={12} active={0} />
        </IconContainer>
        <Text>{difficulty}</Text>
      </FlexContainer>
    </p>
  );
};

export const QuestionTextDisplay: React.FC<QuestionTextDisplayProps> = ({
  handleClick,
  index,
  activeIndex,
  question,
  score,
  answer,
  answer_id,
}) => {
  const isActive = index === activeIndex;

  const stringIndex = `item-${index}`;
  const defaultValues = [`item-${activeIndex}`];
  const editorId = answer_id; // Fallback ID if summaryInfo is null
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(answer_id);

  return (
    <>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={defaultValues}
      >
        <AccordionItem value={stringIndex}>
          <AccordionTrigger>
            {' '}
            <IndexContainer>
              <PredefinedRatingsComponent rating={score} />{' '}
              <h4 className="font-semibold text-lg">{question}</h4>
            </IndexContainer>
          </AccordionTrigger>
          <AccordionContent>
            <TailwindEditor
              propData={answer ?? ''}
              editorId={editorId}
              saveApiEndpoint={`${BACKEND_URL}/question_response/interviewer-feedback/${editorId}/update-answers`}
              requestName={'Answer text'}
              showSaveStatus={true}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answer,
  competency,
  duration,
  score,
  difficulty,
  index,
  handleClick,
  activeIndex,
  answer_id,
}) => {
  return (
    <>
      <InterviewContainerStyle>
        <QuestionTextDisplay
          handleClick={handleClick}
          index={index}
          activeIndex={activeIndex}
          question={question}
          score={score}
          answer={answer}
          answer_id={answer_id}
        />
      </InterviewContainerStyle>

      <hr style={{ opacity: '1' }} />
    </>
  );
};

export const QuestionsTabQNA: React.FC<QuestionsTabQNAProps> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  const groupedQuestions = groupQuestionsByCompetency(data);

  console.log(groupedQuestions);
  return (
    <div>
      {Object.entries(groupedQuestions).map(([competency, group]) => (
        <div key={competency}>
          <Flex direction={'row'} className=" ">
            <div className=" flex items-center  mt-6 text-sm rounded-lg py-0.5 px-2 border border-gray-300 shadow border-solid">
              <h2>{competency}</h2>
              <PredefinedRatingsComponent
                rating={Math.round(group.averageScore || 0)}
              />
            </div>
          </Flex>
          {group.questions.map((question, index) => (
            <QuestionItem
              key={index}
              answer_id={question.answer_id}
              index={index}
              duration={question.duration?.toString() ?? ''} // Convert to string, provide fallback
              question={question.question}
              answer={question.answer}
              competency={question.competency ?? ''} // Provide fallback for null or undefined
              score={question.score}
              handleClick={handleClick}
              activeIndex={activeIndex}
              difficulty={question.difficulty ?? ''}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
