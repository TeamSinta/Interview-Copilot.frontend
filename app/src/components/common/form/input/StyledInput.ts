import styled from 'styled-components';

export const InputLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Input = styled.input`
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightGrey};
  border: none;
  outline: none;
  padding: 16px 10px;
  font: inherit;
  height: 40px;
  width: inherit;
  font-size: 14px;

  :disabled {
    cursor: not-allowed;
    opacity: 0.30000001192092896;
  }

  &.error {
    box-shadow: 0px 6px 0px 0px ${(props) => props.theme.colors.red};
  }
`;

export const InputError = styled.div`
  width: 100%;
  height: 40px;

  position: absolute;
  bottom: 6px;
  border-radius: 12px;
  z-index: -999;
`;

export const SerchInputLayout = styled.div`
  position: relative;
`;

export const SerchInputEl = styled(Input)`
  padding: 8px 8px 8px 40px;
  width: 100%;
`;

export const InputIcon = styled.div`
  position: absolute;
  display: flex;
  left: 9px;
  align-items: center;
  height: 100%;
  svg {
    width: 20px;
    height: 20px;
    stroke: ${(props) => props.theme.colors.black};
  }
`;

export const StyledTextarea = styled.textarea`
  border: none;
  line-height: 150%;
  width: 100%;

  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  border-radius: 12px;
  padding: 16px 10px;
  min-height: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.lightGrey};
  font: inherit;
  font-size: 14px;
  position: relative;

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.black};
  }
`;

export const StyledTextareaDiv = styled.div`
  background: ${(props) => props.theme.colors.lightGrey};
  border-radius: 12px;
  height: 200px;
  position: relative;
  overflow: scroll;
  font-size: 14px;

  p {
    padding: 3px;
  }

  .selectContainer {
    z-index: 9999;
  }

  &.error {
    box-shadow: 0px 6px 0px 0px ${(props) => props.theme.colors.red};
  }

  .placeholder {
    opacity: 0.5;
    position: absolute;
    top: 85px;
    margin-left: 12px;
  }

  .mdx-textarea {
    width: 95%;
    min-height: 62px;
    position: relative;
    overflow: auto;
    font-family: Chillax;

    :focus {
      outline: none;
      cursor: text;
    }
  }

  svg {
    fill: black;
  }

  ul {
    list-style: disc;
    font-size: 14px;
    line-height: 170%;
    padding: 0 20px;
  }

  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 125%;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 125%;
  }

  h3 {
    font-size: 20px;
    font-weight: 500;
    line-height: 125%;
  }

  ol {
    list-style: decimal;
    font-size: 14px;
    line-height: 170%;
    padding: 0 20px;
  }

  strong {
    font-family: 'ChillaxSemi';
  }

  blockquote {
    width: 80%;
    font-style: italic;
    padding: 4px 8px;
    border-left: 5px solid ${(props) => props.theme.colors.accentPurple};
    line-height: 1.6;
    position: relative;
    background: #ededed;
  }
`;
