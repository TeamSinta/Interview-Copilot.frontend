import React from 'react';
import { IndexStyle, InterviewContainerStyle } from '../InterviewQNA';
import { Grid } from '@mui/material';
import {
  ClockIcon,
  SoundLevelIcon,
} from '@/components/common/svgIcons/CustomIcons';
import { PredefinedRatingsAndCompetency } from '../RatingComponent';
import styled from 'styled-components';
import {
  BodyLSemiBold,
  BodyMMedium,
  BodySBold,
} from '@/components/common/typeScale/StyledTypeScale';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Cross2Icon, RowSpacingIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

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
  align-items: center;
  justify-content: space-between;
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

const QuestionContainer = styled(Grid)`
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;

const TextContainer = styled(Grid)`
  font-weight: bold;
  cursor: pointer;
  padding: 0px 0px;
  font-size: 12px;
  margin: 0px;
  margin-bottom: 15px;
  margin-top: 3px;
`;

const AnswerContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  font-weight: 500;
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
  padding: 20px;
  width: 100%;
  line-height: 1.5;

  BodyMMedium {
    white-space: pre-line; /* This will handle line breaks */
  }

  BodyMMedium:before {
    content: '• '; /* Bullet point */
    display: block;
  }
`;

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
}) => {
  const isActive = index === activeIndex;

  return (
    <>
      <Collapsible open={isActive} onOpenChange={() => handleClick(index)}>
        <CollapsibleTrigger asChild>
          <IndexContainer>
            <IndexStyle>
              <BodySBold>{index + 1 ?? ''}. </BodySBold>
              <BodyLSemiBold>{question}</BodyLSemiBold>
            </IndexStyle>

            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </IndexContainer>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* Content to show when the question is active/open */}
        </CollapsibleContent>
      </Collapsible>
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
}) => {
  const lines = answer
    ? answer.split('- ').filter((line) => line.trim() !== '')
    : [];

  return (
    <>
      <InterviewContainerStyle>
        <QuestionTextDisplay
          handleClick={handleClick}
          index={index}
          activeIndex={activeIndex}
          question={question}
        />
      </InterviewContainerStyle>

      {/* <TextContainer container spacing={1} className="" alignItems="center">
        <PredefinedRatingsAndCompetency
          competency={competency}
          rating={score}
          duration={duration}
          difficulty={difficulty}
        />
      </TextContainer> */}

      <AnswerContainer
        className={`question-answer ${activeIndex === index ? 'show' : ''}`}
      >
        {lines.map((line, index) => (
          <BodyMMedium
            key={index}
            style={{ display: 'block', marginBottom: '0.5em' }}
          >
            • {line}
          </BodyMMedium>
        ))}
      </AnswerContainer>
      <hr style={{ opacity: '1' }} />
    </>
  );
};

export const QuestionsTabQNA: React.FC<QuestionsTabQNAProps> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  return (
    <div>
      {data?.map((question, index) => (
        <QuestionItem
          key={index}
          index={index}
          duration={question.duration}
          question={question.question}
          answer={question.answer}
          competency={question.competency}
          score={question.score}
          handleClick={handleClick}
          activeIndex={activeIndex}
          difficulty={question.difficulty}
        />
      ))}
    </div>
  );
};
