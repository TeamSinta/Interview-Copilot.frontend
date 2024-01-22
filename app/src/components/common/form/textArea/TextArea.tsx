import {
  InsertTable,
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  InsertCodeBlock,
  codeBlockPlugin,
  useCodeBlockEditorContext,
  codeMirrorPlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  KitchenSinkToolbar,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  sandpackPlugin,
} from '@mdxeditor/editor';

import { useState } from 'react';
import { StyledTextareaDiv } from '../input/StyledInput';
import '@mdxeditor/editor/style.css';

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

  const PlainTextCodeEditorDescriptor = {
    // always use the editor, no matter the language or the meta of the code block
    match: (language: any, meta: any) => true,
    // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
    priority: 0,
    // The Editor is a React component
    Editor: (props: any) => {
      const cb = useCodeBlockEditorContext();
      // stops the proppagation so that the parent lexical editor does not handle certain events.
      return (
        <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
          <textarea
            rows={3}
            cols={20}
            defaultValue={props.code}
            onChange={(e) => cb.setCode(e.target.value)}
          />
        </div>
      );
    },
  };

  return (
    <>
      <StyledTextareaDiv className={`${error ? 'error' : ''}`}>
        {value ? <></> : <div className="placeholder">{placeholder}</div>}
        <MDXEditor
          contentEditableClassName={`mdx-textarea`}
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
                  <InsertTable />
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
