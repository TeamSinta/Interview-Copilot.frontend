import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import React, { useState } from "react";
import { StyledTextareaDiv } from "../input/StyledInput";
import { BodySMedium } from "../../typeScale/StyledTypeScale";

interface ITextAreaProps {
  disable: boolean;
  placeholder: string;
  error: boolean;
  onChange: (e: any) => void;
  name: string;
  value: string;
}

const TextArea = (props: ITextAreaProps): JSX.Element => {
  const { name, value, onChange, placeholder } = props;
  const [inputValue] = useState<{ [key: string]: string }>({
    [name]: value,
  });
  const ref = React.useRef<MDXEditorMethods>(null);

  const placeholderText = (
    <BodySMedium style={{ opacity: ".5" }}> {placeholder}</BodySMedium>
  );

  return (
    <>
      <StyledTextareaDiv>
        <MDXEditor
          className="mdx-textarea"
          contentEditableClassName="prose"
          ref={ref}
          markdown={inputValue[name]}
          onChange={onChange}
          placeholder={placeholderText}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
        />
      </StyledTextareaDiv>
      {/* <ReactMarkdown>{mdx}</ReactMarkdown> */}
    </>
  );
};

export default TextArea;
