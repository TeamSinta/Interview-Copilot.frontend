import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods, // Add the missing import
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';
import { useEffect, forwardRef, useState, useRef} from 'react';
import { StyledTextareaDiv } from '@/components/common/form/input/StyledInput';

interface ITextAreaProps {
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
    validate: (value: string) => string | null; // Validation function
}

const TextArea = forwardRef<HTMLInputElement, ITextAreaProps>((props, ref) => {
  const { value, onChange, placeholder, validate } = props;
  const [inputValue, setInputValue] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    const validationError = validate ? validate(newValue) : null;
    setError(validationError);
        onChange(newValue);
  };
  const triggerValidation = () => {
    const validationError = validate(inputValue);
    setError(validationError);
  };
  // Assign the ref to the input element
  const inputRef = useRef<MDXEditorMethods | null>(null);
  useEffect(() => {
    if (ref) {
      // @ts-ignore
      ref.current = {
        triggerValidation,
      };
    }
  }, [ref]);

  return (
    <>
      <StyledTextareaDiv className={`${error ? 'error' : ''}`}>
        {value ? <></> : <div className="placeholder">{placeholder}</div>}
        <MDXEditor
          ref={inputRef}
          contentEditableClassName={`mdx-editor`}
          markdown={inputValue}
          onChange={handleInputChange}
          autoFocus
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
            codeMirrorPlugin({
              codeBlockLanguages: { js: 'JavaScript', css: 'CSS' },
            }),
            tablePlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  {' '}
                  <BoldItalicUnderlineToggles />
                  {/* <InsertTable /> */}
                  <ListsToggle />
                </>
              ),
            }),
            markdownShortcutPlugin(),
          ]}
        />
      </StyledTextareaDiv>
      {error && <div className="error-message">{error}</div>}
    </>
  );
});

export default TextArea;
