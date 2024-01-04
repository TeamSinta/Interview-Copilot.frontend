import { AppDispatch } from '@/app/store';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { closeModal } from '@/features/modal/modalSlice';
import { addNewQuestionBank } from '@/features/questions/questionBankSlice';
import { useAddQuestionBankMutation } from '@/features/questions/questionsAPISlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'title',
};

const descriptionInputArg = {
  error: false,
  disable: false,
  placeholder: 'Description',
  name: 'description',
};

interface ICreateQuestionBankState {
  title: string;
  description: string;
}

const CreateQuestionBank = () => {
  const [inputValue, setInputValue] = useState<ICreateQuestionBankState>({
    title: '',
    description: '',
  });
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const [addQuestionBank] = useAddQuestionBankMutation();

  const handleNext = async () => {
    let hasError = false; // Track if there's any validation error

    if (!inputValue.title.trim()) {
      if (titleInputRef.current) {
        titleInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the title is not empty
    }

    if (!inputValue.description.trim()) {
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

    try {
      const requestData = {
        title: inputValue.title,
        description: inputValue.description,
      };
      const newQuestionBank = await addQuestionBank(requestData)?.unwrap();
      dispatch(addNewQuestionBank(newQuestionBank));
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to add template:', error);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const textAreaOnChange = (value: string) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      description: value,
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
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          onChange={inputOnChange}
          value={inputValue['title']}
          validate={validateTitle}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>
        <TextArea
          {...descriptionInputArg}
          onChange={textAreaOnChange}
          validate={validateDescription}
          value={inputValue['description']}
        />
      </InputLayout>
      <div style={{ marginTop: '8px' }}>
        <TextBtnL
          label="Next"
          disable={false}
          onClick={handleNext}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default CreateQuestionBank;
