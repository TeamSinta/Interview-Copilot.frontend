import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import React, { useEffect, useRef, useState } from 'react';

import {
  DocumentIcon,
  StarIcon,
  TimeIcon,
} from '@/components/common/svgIcons/Icons';

import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import TextInput from '@/components/common/form/textInput/TextInput';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BackgroundColor } from '@/features/utils/utilEnum';

import { AppDispatch } from '@/app/store';
import StatusFilter, {
  StatusFilterType,
} from '@/components/common/filters/statusFilter/StatusFilter';
import { RotateIcon } from '@/components/common/filters/textIconFilter/StyledTextIconFilter';
import {
  InputLayout,
  StyledTextarea,
  TextAreaError,
} from '@/components/common/form/input/StyledInput';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { closeModal } from '@/features/modal/modalSlice';
import {
  CompetencyDropDownFilter,
  StatusDropdownFilter,
} from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomQuestionFilterDiv,
  CustomQuestionModalBottomDiv,
  CustomQuestionModalLine,
} from './StyledOverviewDetail';
import { validateTitle } from '@/utils/inputValidations';
import { selectModal } from '@/features/modal/modalSlice';
import { useUpdateQuestionMutation } from '@/features/questions/questionsAPISlice';

interface IState {
  title: string;
  time: string;
  guidelines: string;
  difficulty?: StatusDropdownFilter;
  competency?: CompetencyDropDownFilter | null;
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
  const modalData = useSelector(selectModal);
  const dataForEdit = modalData?.dataForEdit;
  const [inputValue, setInputValue] = useState<IState>(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const [addMoreQuestion, setAddMoreQuestion] = React.useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );
  const [openDropdown, setOpenDropdown] = useState<string>('');
  const [updateQuestion] = useUpdateQuestionMutation();

  const handleOpenDropdown = (label: string) => {
    setOpenDropdown(label);
  };

  const handleSelectStatus = (value: StatusFilterType, field: string) => {
    setInputValue({ ...inputValue, [field]: value });
  };

  const handleSwitchChange = () => {
    setAddMoreQuestion(!addMoreQuestion);
  };

  const handleUpdateQuestion = async (templateQuestion: any) => {
    if (!templateQuestion || !templateQuestion) {
      console.error('Invalid template question data');
      return;
    }
    const requestData = {
      ...templateQuestion,
    };
    try {
      await updateQuestion(requestData).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleSubmit = async () => {
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
      return;
    }
    const numericNumber =
      inputValue.time !== '' ? inputValue.time.split(' ')[0] : 5;
    const newQuestion = {
      id: dataForEdit?.id ? dataForEdit?.id : '',
      question_text: inputValue.title,
      reply_time: numericNumber,
      competency: inputValue.competency,
      difficulty: inputValue.difficulty
        ? inputValue.difficulty
        : StatusDropdownFilter.LOW,
      guidelines: inputValue.guidelines,
    };
    if (dataForEdit) {
      await handleUpdateQuestion(newQuestion);
      dispatch(closeModal());
    } else {
      onQuestionCreated(newQuestion);
    }
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
    if (event.target.name === 'guidelines' && !event.target.value.trim()) {
      setError('Description is required');
    } else {
      setError('');
    }
  };
  useEffect(() => {
    if (dataForEdit) {
      setInputValue({
        title: dataForEdit?.question_text,
        guidelines: dataForEdit?.guidelines,
        difficulty: dataForEdit.difficulty as StatusDropdownFilter,
        competency: dataForEdit.competency as CompetencyDropDownFilter,
        time: `${dataForEdit?.reply_time} minute${
          parseInt(dataForEdit?.reply_time) > 1 ? 's' : ''
        }`,
      });
    }
  }, [dataForEdit]);

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
        <StyledTextarea
          disabled={false}
          className={`customStyle ${error ? 'error' : ''}`}
          placeholder={
            'e.g. Frontend Developers are in demand today. A lot of companies are readily hiring them with attractive salary packages. If you believe you possess the skills.'
          }
          onChange={inputOnChange}
          name={'guidelines'}
          value={inputValue.guidelines}
        />
        {error ? (
          <TextAreaError className="customizeForTextArea">
            {error}
          </TextAreaError>
        ) : null}
      </InputLayout>
      <CustomQuestionFilterDiv>
        <StatusFilter
          icon={<StarIcon />}
          label={'Competency'}
          id={'customQuestion'}
          status={inputValue.competency!}
          onSelectStatus={(competency: StatusFilterType) =>
            handleSelectStatus(competency, 'competency')
          }
          openDropdown={openDropdown}
          onOpenDropdown={handleOpenDropdown}
        />
        <StatusFilter
          icon={<TimeIcon />}
          label={'Time to reply'}
          id={'customQuestion'}
          status={inputValue.time}
          onSelectStatus={(time: StatusFilterType) =>
            handleSelectStatus(time, 'time')
          }
          openDropdown={openDropdown}
          onOpenDropdown={handleOpenDropdown}
        />
        <StatusFilter
          icon={
            <RotateIcon>
              <DocumentIcon />
            </RotateIcon>
          }
          id={'customQuestion'}
          label={'Difficulty'}
          status={inputValue.difficulty!}
          onSelectStatus={(difficulty: StatusFilterType) =>
            handleSelectStatus(difficulty, 'difficulty')
          }
          openDropdown={openDropdown}
          onOpenDropdown={handleOpenDropdown}
        />
      </CustomQuestionFilterDiv>
      <CustomQuestionModalLine />
      <CustomQuestionModalBottomDiv>
        {!dataForEdit ? (
          <FormControlLabel
            control={
              <Switch checked={addMoreQuestion} onChange={handleSwitchChange} />
            }
            label={<BodySMedium>Create More</BodySMedium>}
          />
        ) : null}
        <ElWrap w={155} h={40}>
          <TextBtnL
            label={!dataForEdit ? 'Create Question' : 'Update Question'}
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
