import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import React, { useRef, useState } from 'react';

import {
  DocumentIcon,
  StarIcon,
  TimeIcon,
} from '@/components/common/svgIcons/Icons';

import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BackgroundColor } from '@/features/utils/utilEnum';

import { AppDispatch } from '@/app/store';
import StatusFilter, {
  StatusFilterType,
} from '@/components/common/filters/statusFilter/StatusFilter';
import { RotateIcon } from '@/components/common/filters/textIconFilter/StyledTextIconFilter';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { closeModal } from '@/features/modal/modalSlice';
import {
  CompetencyDropDownFilter,
  StatusDropdownFilter,
} from '@/features/utils/utilEnum';
import { useDispatch } from 'react-redux';
import {
  CustomQuestionFilterDiv,
  CustomQuestionModalBottomDiv,
  CustomQuestionModalLine,
} from './StyledOverviewDetail';
import { validateDescription, validateTitle } from '@/utils/inputValidations';

interface IState {
  // [key: string]: any;
  title: string;
  time: string;
  guidelines: string;
  difficulty: StatusDropdownFilter;
  competency: CompetencyDropDownFilter | null;
}

const initialState: IState = {
  title: '',
  time: '5 minutes',
  guidelines: '',
  difficulty: StatusDropdownFilter.LOW,
  competency: null,
};

interface CustomQuestionFormProps {
  onQuestionCreated: (question: {}) => void;
}

function CustomQuestionForm(
  { onQuestionCreated }: CustomQuestionFormProps,
  ref: React.Ref<any>
) {
  const [inputValue, setInputValue] = useState<IState>(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const [addMoreQuestion, setAddMoreQuestion] = React.useState<boolean>(false);
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );

  const handleSelectStatus = (value: StatusFilterType, field: string) => {
    setInputValue({ ...inputValue, [field]: value });
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
      difficulty: inputValue.difficulty
        ? inputValue.difficulty
        : StatusDropdownFilter.LOW,
      guidelines: inputValue.guidelines,
      // Add more fields as needed
    };
    onQuestionCreated(newQuestion);
    // Clear the form fields or perform any other necessary actions

    setInputValue(initialState);

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

  return (
    <div ref={ref}>
      <InputLayout className="customizeForQuestion">
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
          onSelectStatus={(competency: StatusFilterType) =>
            handleSelectStatus(competency, 'competency')
          }
        />
        <StatusFilter
          icon={<TimeIcon />}
          label={'Time to reply'}
          id={'customQuestion'}
          status={inputValue.time}
          onSelectStatus={(time: StatusFilterType) =>
            handleSelectStatus(time, 'time')
          }
        />
        <StatusFilter
          icon={
            <RotateIcon>
              <DocumentIcon />
            </RotateIcon>
          }
          id={'customQuestion'}
          label={'Difficulty'}
          status={inputValue.difficulty}
          onSelectStatus={(difficulty: StatusFilterType) =>
            handleSelectStatus(difficulty, 'difficulty')
          }
        />
      </CustomQuestionFilterDiv>
      <CustomQuestionModalLine />
      <CustomQuestionModalBottomDiv>
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
    </div>
  );
}

export default React.forwardRef(CustomQuestionForm);
