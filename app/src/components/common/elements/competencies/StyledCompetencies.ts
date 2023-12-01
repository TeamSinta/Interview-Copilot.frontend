import styled from "styled-components";

export const StyledCompetencies = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  outline: 1px solid ${(props) => props.theme.colors.black};
  outline-offset: -1px;
  padding: 7px 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;

  :hover {
    background: ${(props) => props.theme.colors.pastelPurple};
    cursor: pointer;
  }

  :active {
    background: #eaeaf4;
  }

  &.active {
    background: ${(props) => props.theme.colors.palePurple};
  }
`;
