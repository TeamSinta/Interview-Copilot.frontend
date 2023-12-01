import React, { useEffect, useState } from "react";
import { Input, InputError, InputLayout } from "../input/StyledInput";

export interface ITextInput {
  disable: boolean;
  placeholder: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

const TextInput = (props: ITextInput): JSX.Element => {
  const { disable, placeholder, error, onChange, name, value } = props;
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    [name]: value,
  });

  useEffect(() => {
    setInputValue({ [name]: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <InputLayout>
      <Input
        name={name}
        disabled={disable}
        placeholder={placeholder}
        onChange={onChange}
        className={error ? "error" : ""}
        value={inputValue[name]}
      />
      {error ? <InputError /> : <></>}
    </InputLayout>
  );
};

export default TextInput;
