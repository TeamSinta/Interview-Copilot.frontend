import styled from "styled-components";

interface IElWrap {
  w?: string;
  h?: string;
}

interface IElWrapProps {
  children: JSX.Element;
  w?: number;
  h?: number;
}

const StyledElWrap = styled.div<IElWrap>`
  width: ${(props) => (props.w ? props.w?.concat("px") : "100%")};
  height: ${(props) => (props.h ? props.h?.concat("px") : "inherit")};
  font-size: ${(props) =>
    props.h ? (parseInt(props.h) < 40 ? "12px" : "inherit") : ""};
`;
const ElWrap = ({ children, w, h }: IElWrapProps) => {
  return (
    <StyledElWrap w={w?.toString()} h={h?.toString()}>
      {children}
    </StyledElWrap>
  );
};

export default ElWrap;
