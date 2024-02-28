import React, { useEffect, useState, useRef } from 'react';
import {
  // Input,
  InputError,
  InputLayout,
} from '@/components/common/form/input/StyledInput';
import { Input } from '@/components/ui/input';

export interface ITextInput {
  disable: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  validate: (value: string) => string | null; // Validation function
  id?: string;
}

const TextInput = (props: ITextInput, ref: React.Ref<any>) => {
  const { disable, placeholder, onChange, name, value, validate, id } = props;
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    [name]: value,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue({ [name]: value });
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const validationError = validate(newValue);
    setError(validationError);
    onChange(e);

    setInputValue({ [name]: newValue });
  };

  const triggerValidation = () => {
    const validationError = validate(inputValue[name]);
    setError(validationError);
  };

  // Assign the ref to the input element
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (ref) {
      // @ts-ignore
      ref.current = {
        triggerValidation,
      };
    }
  }, [ref]);

  return (
    <div className="w-full">
      <Input
        type="text"
        ref={inputRef} // Assign the ref to the input element
        name={name}
        disabled={disable}
        placeholder={placeholder}
        onChange={handleInputChange}
        className={`${error ? 'error' : ''} ${
          id === 'CustomQuestionTitle' ? 'customStyle' : ''
        }`}
        value={inputValue[name]}
      />
      {error ? <InputError>{error}</InputError> : <></>}
    </div>
  );
};

export default React.forwardRef(TextInput);
