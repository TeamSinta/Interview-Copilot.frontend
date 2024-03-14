import styled from 'styled-components';

const StyledP = styled.p`
  padding: 5px;
  strong {
    font-family: 'InterSemi';
  }

  em {
    font-style: italic;
  }

  &.underbar {
    text-decoration: underline;
  }
`;

const StyledMdxOl = styled.ul`
  list-style: decimal;
  font-size: 14px;
  line-height: 170%;
  padding: 0 20px;
`;

const StyledMdxUl = styled.ul`
  list-style: disc;
  font-size: 14px;
  line-height: 170%;
  padding: 5px 20px;
`;

const StyledMdxQuote = styled.blockquote`
  width: 80%;
  font-style: italic;
  padding: 4px 8px;
  border-left: 5px solid ${(props) => props.theme.colors.accentPurple};
  line-height: 1.6;
  position: relative;
  background: #ededed;
`;

export const MdxUl = ({ children }: any) => {
  return <StyledMdxUl>{children}</StyledMdxUl>;
};

export const MdxOl = ({ children }: any) => {
  return <StyledMdxOl>{children}</StyledMdxOl>;
};

export const MdxP = ({ children }: any) => {
  const isUnderbarElements = children.includes('<u>');
  const regexPattern = /<u>(.*?)<\/u>/;
  return (
    <StyledP className={isUnderbarElements ? 'underbar' : ''}>
      {isUnderbarElements
        ? children.join(' ').match(regexPattern)[1]
        : children}
    </StyledP>
  );
};

export const MdxU = ({ children }: any) => {
  return <div>{children}</div>;
};

export const MdxQuote = ({ children }: any) => {
  return <StyledMdxQuote>{children}</StyledMdxQuote>;
};
