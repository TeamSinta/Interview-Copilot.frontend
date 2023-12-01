import styled from "styled-components";

export const StyledCommentInput = styled.textarea`
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
`;
export const StyledCommentBox = styled.div`
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
export const StyledCommentList = styled.div`
   {
    margin-top: 10px;
    height: 70%;
    overflow-y: auto;
    font-size: 12px;
    overflow-y: scroll;
    padding-bottom: 20px;
    ::-webkit-scrollbar {
      background-color: #f6f6fb;
      border-radius: 10px;
      padding: 0px;
      margin: 0px;
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: white;

      border-radius: 5px;
      padding: 0px;
      margin: 0px;
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
      padding: 1px;
      padding: 0px;
      margin: 0px;
      width: 5px;
    }
  }
`;
