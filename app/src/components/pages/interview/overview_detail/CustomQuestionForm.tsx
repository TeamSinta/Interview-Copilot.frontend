import React, { useRef, useState } from 'react';
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

import {
  StarIcon,
  TimeIcon,
  DocumentIcon,
} from '@/components/common/svgIcons/Icons';

import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BackgroundColor } from '@/features/utils/utilEnum';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';

import { closeModal } from '@/features/modal/modalSlice';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import StatusFilter from '@/components/common/filters/statusFilter/StatusFilter';
import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import { CustomQuestionFilterDiv, CustomQuestionModalBottomDiv, CustomQuestionModalLine } from './StyledOverviewDetail';
import { RotateIcon } from '@/components/common/filters/textIconFilter/StyledTextIconFilter';

interface IState {
  [key: string]: any;
  title: string;
  time: string;
  guidelines: string;
  difficulty: null,
  competency: null,
}

interface CustomQuestionFormProps {
  onQuestionCreated: (questionId: number) => void;
  onClose?: () => void; // Add this line
}

function CustomQuestionForm(
  { onQuestionCreated, onClose }: CustomQuestionFormProps,
  ref: React.Ref<any>
) {
  const [inputValue, setInputValue] = useState<IState>({
    title: '',
    time: '',
    guidelines: '',
    difficulty: null,
    competency: null,
  });
  const dispatch = useDispatch<AppDispatch>();
  const [addMoreQuestion, setAddMoreQuestion] = React.useState<boolean>(false);
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );

  const handleSelectDifficulty = (difficulty: any) => {
    setInputValue({ ...inputValue, difficulty });
  };
  const handleSelectCompetency = (competency: any) => {
        setInputValue({ ...inputValue, competency });
  };
  const handleSelectTime = (time: any) => {
    setInputValue({ ...inputValue, time });
  };

  const handleSwitchChange = () => {
    setAddMoreQuestion(!addMoreQuestion);
  };

  const handleSubmit = () => {
    // Validate input and perform any necessary checks
    let hasError = false; // Track if there's any validation error

    if (!inputValue.title.trim()) {
      if (titleInputRef.current) {
        titleInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the title is not empty
    }

    if (!inputValue.guidelines.trim()) {
      if (descriptionInputRef.current) {
        descriptionInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the description is not empty
    }

    if (hasError) {
      return; // Stop if there's any validation error
    }
    const numericNumber =
      inputValue.time !== '' ? inputValue.time.split(' ')[0] : 5;
    const newQuestion = {
      question_text: inputValue.title,
      reply_time: numericNumber,
      competency: inputValue.competency,
      difficulty: inputValue.difficulty ? inputValue.difficulty : 'Low',
      guidelines: inputValue.guidelines,
      // Add more fields as needed
    };
    onQuestionCreated(newQuestion);
    // Clear the form fields or perform any other necessary actions

    setInputValue({
      title: '',
      time: '',
      guidelines: '', // Ensure you reset guidelines here
      competency: null,
      difficulty: null,
    });

    if (!addMoreQuestion) {
      dispatch(closeModal());
    } else {
      setAddMoreQuestion(false);
    }

  };

  const inputOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const textAreaOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newGuidelinesValue = String(event);

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      guidelines: newGuidelinesValue,
    }));
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  const validateDescription = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium style={{ color: 'gray', textAlign: 'end' }}>
            Description is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };
  
  return (
    <div ref={ref}>
      <InputLayout className='customizeForQuestion'>
        <BodySMedium>Question</BodySMedium>
        <TextInput
          disable={false}
          placeholder={'e.g. What are your strengths?'}
          validate={validateTitle}
          onChange={inputOnChange}
          name={'title'}
          id={'CustomQuestionTitle'}
          value={inputValue['title']}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Guidelines</BodySMedium>
        <TextArea
          disable={false}
          placeholder={
            'e.g. Frontend Developers are in demand today. A lot of companies are readily hiring them with attractive salary packages. If you believe you possess the skills.'
          }
          error={false}
          onChange={textAreaOnChange}
          name={'guidelines'}
          validate={validateDescription}
          value={inputValue['guidelines']}
          ref={descriptionInputRef}
        />
      </InputLayout>
      <CustomQuestionFilterDiv>
        <StatusFilter
          icon={<StarIcon />}
          label={'Competency'}
          id={'customQuestion'}
          status={inputValue.competency}
          onSelectStatus={handleSelectCompetency}
        />
        <StatusFilter
          icon={<TimeIcon />}
          label={'Time to reply'}
          id={'customQuestion'}
          status={inputValue.time}
          onSelectStatus={handleSelectTime}
        />
        <StatusFilter
          icon={<RotateIcon><DocumentIcon /></RotateIcon>}
          id={'customQuestion'}
          label={'Difficulty'}
          status={inputValue.difficulty}
          onSelectStatus={handleSelectDifficulty}
        />
      </CustomQuestionFilterDiv>
      <CustomQuestionModalLine />
      <CustomQuestionModalBottomDiv
      >
        <FormControlLabel
          control={
            <Switch checked={addMoreQuestion} onChange={handleSwitchChange} />
          }
          label={<BodySMedium>Create More</BodySMedium>}
        />
        <ElWrap w={155} h={40}>
          <TextBtnL
            label="Create Question"
            disable={false}
            onClick={handleSubmit}
            className={BackgroundColor.ACCENT_PURPLE}
          />
        </ElWrap>
      </CustomQuestionModalBottomDiv>
    </div >
  );
}

export default React.forwardRef(CustomQuestionForm);
