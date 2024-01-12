import React, { useState} from 'react';
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

import {
  PlusIcon,
} from '@/components/common/svgIcons/Icons';
import {
  StarIcon,
  TimeIcon,
  DocumentIcon
} from '@/components/common/svgIcons/Icons';

import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BackgroundColor } from '@/features/utils/utilEnum';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { TextBtnL} from '@/components/common/buttons/textBtn/TextBtn';

import { closeModal } from '@/features/modal/modalSlice';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import StatusFilter from '@/components/common/filters/statusFilter/StatusFilter';
import { DropDownTransparentButton } from '@/components/common/buttons/dropDownBtn/DropDownTransparentButton';
import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { InputLayout } from '@/components/common/form/input/StyledInput';


interface IState {
  [key: string]: any;
  title: string;
  time: number;
  guidelines: string;
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
    time: 0,
    guidelines: '',
    difficulty: null,
    competency: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const [addMoreQuestion , setAddMoreQuestion] = React.useState<boolean>(false)

  const handleSelectDifficulty = (difficulty: any) => {
    setInputValue({ ...inputValue, difficulty });
  };

  const handleSwitchChange = () => {
    setAddMoreQuestion(!addMoreQuestion);
  };

  const handleSubmit = () => {

    // Validate input and perform any necessary checks

    const time = inputValue.time > 0 ? inputValue.time : 5;
    const numericValueAsNumber = parseInt(time, 10);
    const newQuestion = {
      question_text: inputValue.title,
      reply_time: numericValueAsNumber,
      competency: inputValue.competency,
      difficulty: inputValue.difficulty ? inputValue.difficulty :  'Low',
      guidelines: inputValue.guidelines,
      // Add more fields as needed
    };
    onQuestionCreated(newQuestion);
    if(!addMoreQuestion){
      dispatch(closeModal());
    }else{
      setAddMoreQuestion(false);
    }
    
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
        <InputLayout style={{ marginBottom: '15px' }}>
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
        <InputLayout >
          <BodySMedium>Guidelines</BodySMedium>
          <TextArea
            disable={false}
            placeholder={'e.g. Frontend Developers are in demand today. A lot of companies are readily hiring them with attractive salary packages. If you believe you possess the skills.'}
            error={false}
            onChange={textAreaOnChange}
            name={'guidelines'}
            validate={() => null}
            value={inputValue['guidelines']}
          />
        </InputLayout>
        <div style={{ marginTop: '15px', display: 'flex', gap: '16px' ,marginBottom:'21px'}} >
          <DropDownTransparentButton
            label="Competency"
            onClick={() => { }}
            disable={false}
            icon={<StarIcon />}
            className={BackgroundColor.WHITE}
            buttons={[
              {
                label: 'Start a Meeting',
                icon: <PlusIcon />,
                onClick: () => { },
              },
              {
                label: 'Plan a Meeting',
                icon: <PlusIcon />,
                onClick: () => { },
              },
            ]}
          />
          <DropDownTransparentButton
            label="Time to reply"
            icon={<TimeIcon />}
            onClick={() => { }}
            disable={false}
            className={BackgroundColor.WHITE}
            buttons={[
              {
                label: 'Start a Meeting',
                icon: <PlusIcon />,
                onClick: () => { },
              },
              {
                label: 'Plan a Meeting',
                icon: <PlusIcon />,
                onClick: () => { },
              },
            ]}
          />
            <StatusFilter
                icon={<DocumentIcon />}
                label={'Difficulty'}
                status={inputValue.difficulty}
                onSelectStatus={handleSelectDifficulty}
              />
        </div>
        <div style={{ borderTop: '1px solid #C7C7C7', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'right' }}>
          <FormControlLabel
      control={<Switch checked={addMoreQuestion} onChange={handleSwitchChange} />}
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
        </div>
      </div>
       </>
  );
}

export default React.forwardRef(CustomQuestionForm);
