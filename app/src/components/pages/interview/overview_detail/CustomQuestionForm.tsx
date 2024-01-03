import React, { useState, forwardRef } from 'react';
import {
  InputDiv,
  InputLabelDiv,
  OverviewDetailEdit,
} from './StyledOverviewDetail';
import {
  BinIcon,
  CheckIcon,
  CloseIcon,
} from '@/components/common/svgIcons/Icons';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { IconBtnL } from '@/components/common/buttons/iconBtn/IconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import TextInput from '@/components/common/form/textInput/TextInput';
import StatusFilter from '@/components/common/filters/statusFilter/StatusFilter';
import TextArea from '@/components/common/form/textArea/TextArea';

interface IState {
  [key: string]: any;
  title: string;
  time: number;
  guidelines: string;
}

interface CustomQuestionFormProps {
  onQuestionCreated: (questionId: number) => void; // Define a function signature that accepts questionId and returns void.
}

function CustomQuestionForm(
  { onQuestionCreated }: CustomQuestionFormProps,
  ref: React.Ref<any>
) {
  const [inputValue, setInputValue] = useState<IState>({
    title: '',
    time: 0,
    guidelines: '',
    difficulty: null,
    competency: '',
  });

  const handleSelectDifficulty = (difficulty: any) => {
    setInputValue({ ...inputValue, difficulty });
  };

  const handleSubmit = () => {
    // Validate input and perform any necessary checks

    const numericValueAsNumber = parseInt(inputValue.time, 10);

    const newQuestion = {
      question_text: inputValue.title,
      reply_time: numericValueAsNumber,
      competency: inputValue.competency,
      difficulty: inputValue.difficulty,
      guidelines: inputValue.guidelines,
      // Add more fields as needed
    };

    onQuestionCreated(newQuestion);
    // Clear the form fields or perform any other necessary actions

    setInputValue({
      title: '',
      time: 0,
      guidelines: '', // Ensure you reset guidelines here
      competency: '',
      difficulty: null,
    });
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

  const validateTime = (value: string): string | null => {
    // First, check if the field is empty
    if (!value.trim()) {
      return 'Time is required'; // Error message for empty input
    }

    // Check if the value is a number and within the range 1-60
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue < 1 || numberValue > 60) {
      return 'Please enter a number between 1 and 60'; // Error message for invalid input
    }

    return null; // No validation errors
  };

  return (
    <>
      <div ref={ref}>
        <OverviewDetailEdit>
          <InputLabelDiv>
            <label>
              <BodySMedium>Question</BodySMedium>
            </label>
            <InputDiv>
              <TextInput
                disable={false}
                placeholder={'Title'}
                error={false}
                validate={validateTitle}
                onChange={inputOnChange}
                name={'title'}
                value={inputValue['title']}
              />
              <ElWrap w={40} h={40}>
                <IconBtnL
                  disable={false}
                  onClick={handleSubmit}
                  className={BackgroundColor.ACCENT_PURPLE}
                  icon={<CheckIcon />}
                />
              </ElWrap>
              <ElWrap w={40} h={40}>
                <IconBtnL
                  disable={false}
                  onClick={() => {}}
                  className={BackgroundColor.WHITE}
                  icon={<BinIcon />}
                />
              </ElWrap>
              <ElWrap w={40} h={40}>
                <IconBtnL
                  disable={false}
                  onClick={() => {}}
                  className={BackgroundColor.WHITE}
                  icon={<CloseIcon />}
                />
              </ElWrap>
            </InputDiv>
          </InputLabelDiv>
          <div className="dropdowns">
            <InputLabelDiv className="competencies">
              <label>
                <BodySMedium>Competency</BodySMedium>
              </label>
              <TextInput
                disable={false}
                placeholder={'Competency'}
                validate={validateTitle}
                onChange={inputOnChange}
                name={'competency'}
                value={inputValue['competency']}
              />
            </InputLabelDiv>
            <InputLabelDiv className="time">
              <label>
                <BodySMedium>Time for reply (mins)</BodySMedium>
              </label>
              <TextInput
                disable={false}
                placeholder={'time'}
                validate={validateTime}
                onChange={inputOnChange}
                name={'time'}
                value={inputValue['time'].toString()}
              />
            </InputLabelDiv>
            <InputLabelDiv className="difficulty">
              <label>
                <BodySMedium>Difficulty</BodySMedium>
              </label>
              <StatusFilter
                status={inputValue.difficulty} // Pass selected difficulty as status prop
                onSelectStatus={handleSelectDifficulty} // Step 2: Pass the callback function
              />
            </InputLabelDiv>
          </div>
          <InputLabelDiv>
            <label>
              <BodySMedium>Guidelines</BodySMedium>
            </label>
            <TextArea
              disable={false}
              placeholder={'Guidelines'}
              error={false}
              onChange={textAreaOnChange}
              name={'guidelines'}
              validate={() => null}
              value={inputValue['guidelines']}
            />
          </InputLabelDiv>
        </OverviewDetailEdit>
      </div>
    </>
  );
}

export default React.forwardRef(CustomQuestionForm);
