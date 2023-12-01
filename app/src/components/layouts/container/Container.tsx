import { StyledContainer } from "./StyledContainer";

interface IContainer {
  children: JSX.Element[] | JSX.Element;
}

const Container = ({ children }: IContainer) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
