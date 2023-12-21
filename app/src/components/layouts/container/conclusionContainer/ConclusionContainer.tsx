import { ConclusionStyledContainer } from './StyledConclusionContianer';

interface IContainer {
  children: JSX.Element[] | JSX.Element;
}

const ConclusionContainer = ({ children }: IContainer) => {
  return <ConclusionStyledContainer>{children}</ConclusionStyledContainer>;
};

export default ConclusionContainer;
