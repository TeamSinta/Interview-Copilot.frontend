import ReactMarkdown from 'react-markdown';
import { H1Component, H2Component, H3Component } from '../typeScale/TypeScale';
import { MdxOl, MdxP, MdxQuote, MdxU, MdxUl } from './StyledMarkdownElements';

const MarkdownFromatConatiner: React.FC<{ children: string }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      children={children}
      components={{
        h1: H1Component,
        h2: H2Component,
        h3: H3Component,
        ul: MdxUl,
        ol: MdxOl,
        blockquote: MdxQuote,
        p: MdxP,
        u: MdxU,
        code(props) {
          const { children, ...rest } = props;
          return <div {...rest}>{children}</div>;
        },
      }}
    />
  );
};

export default MarkdownFromatConatiner;
