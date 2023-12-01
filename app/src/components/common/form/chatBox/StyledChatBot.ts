import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ChatMessages = styled.div`
  background: ${(props) => props.theme.colors.accentPurple};
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  margin: 8px 0;
  max-width: 80%; /* Adjust the max-width as needed */
  align-self: flex-end; /* Right-align the sent messages */
  max-height: 90px; /* Limit the max height of chat messages */
  overflow-y: auto; /* Enable vertical scrolling for overflow */
  word-wrap: break-word; /* Wrap long words to the next line */
  white-space: pre-wrap; /* Preserve line breaks and spaces */
`;

export const ChatInput = styled.div`
  border-radius: 12px;
  background: ${(props) => props.theme.colors.white};
  border: none;
  outline: none;
  padding: 16px 10px;
  font: inherit;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: start;
  justify-content: center;

  :disabled {
    cursor: not-allowed;
    opacity: 0.30000001192092896;
  }

  &.error {
    box-shadow: 0px 2px 0px 0px ${(props) => props.theme.colors.red};
  }
`;

export const Textarea = styled.textarea`
  border: none;
  outline: none;
  overflow-y: auto; /* Enable vertical scrolling for overflow within the textarea */

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  border-radius: 12px;
  max-height: 100px; /* Set a maximum height for the input box */
  display: flex;
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  font: inherit;
  font-size: 14px;
  position: relative;

  /* Set a maximum height for the input box */
`;
