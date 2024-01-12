import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyledTextareaDiv } from '../input/StyledInput';
import { BodySMedium } from '../../typeScale/StyledTypeScale';

interface ITextAreaProps {
  disable: boolean;
  placeholder: string;
  error: boolean;
  onChange: (e: any) => void;
  name: string;
  value: string;
  validate: (value: string) => string | null; // Validation function
}

const TextArea = forwardRef(
  (props: ITextAreaProps, ref: React.Ref<any>): JSX.Element => {
    const { name, value, onChange, placeholder, validate } = props;
    const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
      [name]: value,
    });

    const [error, setError] = useState<string | null>(null);

    const placeholderText = (
      <BodySMedium style={{ opacity: '.5' }}> {placeholder}</BodySMedium>
    );

    const handleInputChange = (newValue: string) => {
      setInputValue({ [name]: newValue });
      const validationError = validate ? validate(newValue) : null;
      setError(validationError);
      onChange(newValue);
    };

    const triggerValidation = () => {
      const validationError = validate(inputValue[name]);
      setError(validationError);
    };
    const inputRef = React.useRef<MDXEditorMethods>(null);
    useEffect(() => {
      if (ref) {
        // @ts-ignore
        ref.current = {
          triggerValidation,
        };
      }
    }, [ref]);

    useImperativeHandle(ref, () => ({
      triggerValidation,
    }));
    return (
      <>
        <StyledTextareaDiv>
          <MDXEditor
            ref={inputRef}
            className={`mdx-textarea ${error ? 'error' : ''}`}
            contentEditableClassName={`prose ${name === 'guidelines' ? 'customProse': '' }`}
            markdown={inputValue[name]}
            onChange={handleInputChange}
            placeholder={placeholderText}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
          />
        </StyledTextareaDiv>
        {error && <div className="error-message">{error}</div>}
      </>
    );
  }
);

export default TextArea;
