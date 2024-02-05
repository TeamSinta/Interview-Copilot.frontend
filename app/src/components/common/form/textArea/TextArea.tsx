import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
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
import { useState } from 'react';
import { StyledTextareaDiv } from '@/components/common/form/input/StyledInput';

interface ITextAreaProps {
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
  validate: (value: string) => string | null; // Validation function
}

const TextArea = (props: ITextAreaProps) => {
  const { value, onChange, placeholder, validate } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    const validationError = validate ? validate(newValue) : null;
    setError(validationError);
    onChange(newValue);
  };

  return (
    <>
      <StyledTextareaDiv className={`${error ? 'error' : ''}`}>
        {value ? <></> : <div className="placeholder">{placeholder}</div>}
        <MDXEditor
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
};

export default TextArea;
