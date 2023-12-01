import styled from "styled-components";

export const VideoContainer = styled.div`
  background-color: var(--darkest-blue);
  min-height: 100vh;
  display: grid;
  grid-template-rows: 4rem 1fr 4rem;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin: 16px;
  text-align: center;
`;

export const Heading1 = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 500;
  color: var(--turquoise);
`;

export const SmallParagraph = styled.p`
  color: var(--dark-grey);
  font-size: 12px;
`;

export const StyledButton = styled.button`
  background-color: var(--turquoise);
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const ApiErrorContainer = styled.div`
  background: var(--dark-blue-border);
  width: 480px;
  height: 270px;
  display: inline-flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  text-align: center;
  padding: 3rem;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const ApiErrorParagraph = styled.p`
  color: var(--white);
`;

export const ApiErrorHeading1 = styled.h1`
  color: var(--red-dark);
`;

export const ApiErrorLink = styled.a`
  color: var(--white);
`;

export const AppContainer = styled.div`
  background-color: black;
`;
