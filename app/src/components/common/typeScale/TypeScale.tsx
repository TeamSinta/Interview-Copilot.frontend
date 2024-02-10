import { H3Bold, BodyMMedium, H2Bold, H1 } from './StyledTypeScale';

export const H1Component = ({ children }: any) => {
  return <H1>{children}</H1>;
};

export const H2Component = ({ children }: any) => {
  return <H2Bold>{children}</H2Bold>;
};

export const H3Component = ({ children }: any) => {
  return <H3Bold>{children}</H3Bold>;
};

export const BodyNMediumComponent = ({ children }: any) => {
  return <BodyMMedium>{children}</BodyMMedium>;
};
