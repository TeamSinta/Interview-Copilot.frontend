import styled, { css, keyframes } from "styled-components";
import { StyledIconBtn } from "../../buttons/button/StyledBtn";
import { StyledCompetencies } from "../../elements/competencies/StyledCompetencies";
import { BodySMedium } from "../../typeScale/StyledTypeScale";

export const ModalContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SelectContentWrap = styled(ModalContentWrap)`
  gap: 16px;
  height: auto !important;
  max-height: 370px;
  overflow: scroll;
`;

export const SelectContent = styled.div`
  padding: 16px;
  height: auto !important;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightPurple};
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SelectedValueWrap = styled.div`
  display: flex;
  /* height: 40px; */
  gap: 8px;
  overflow: scroll;
  height: 36px;
`;

export const SelectedButtonWrap = styled.div`
  display: flex;
  gap: 16px;
  margin: -4px 0 0 0;
`;

/** ==== COMPETENCIES ====*/
const fadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

export const CompetencesWrap = styled(SelectContent)`
  padding: 22px;
`;

export const NewComInputWrap = styled.div`
  display: flex;
  gap: 8px;
  display: none;
  &.show {
    animation: ${fadeIn} 0.3s;
    display: flex;
  }
`;

/** ==== TEMPLATE ====*/
export const TemplateLayout = styled.div`
  width: 690px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TemplateBody = styled.div`
  padding: 24px;
  border-radius: 28px;
  outline: 1px solid #e0e0e0;
  outline-offset: -1px;
  height: 609px;
`;

export const TemplateListWrap = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const TemplateListInputWrap = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 40px;

  .filterWrap {
    display: flex;
    gap: 8px;
    flex: 2;
    z-index: 9999;

    ${BodySMedium} {
      display: flex;
      align-items: center;
    }
  }
`;

export const TemplateListContentWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  height: 520px;
  padding-bottom: 24px;
  overflow: scroll;
`;

/** ==== ADD QUESTIONS ====*/
export const QuestionBody = styled(TemplateBody)`
  display: flex;
  flex-direction: column;

  .none-q {
    display: flex;
    align-items: center;
    height: inherit;
    text-align: center;
  }

  .btn-wrap {
    display: flex;
    gap: 16px;
  }

  .questions-length {
    padding-top: 14px;
    padding-bottom: 16px;
    text-align: center;
  }
`;

export const QuestionLayout = styled(TemplateLayout)`
  width: 360px;
`;

/** ==== TEMPLATE QUESTIONS ====*/
export const QuestionListWrap = styled(TemplateListWrap)``;

export const QeustionHeader = styled(TemplateListInputWrap)`
  justify-content: space-between;
  .title {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  svg {
    transform: rotate(180deg);
  }
`;

export const QuestionListContentWrap = styled.div`
  height: 521px;
  overflow: scroll;
`;

export const QuestionListContentLists = styled.div`
  background: ${(props) => props.theme.colors.lightPurple};
  border-radius: 12px;
  padding: 20px;
  .lists {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .list {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-bottom: 1px solid #d9d9d9;
      padding-bottom: 20px;

      .iconBtn {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        right: 0;
      }

      .added {
        display: flex;
        gap: 8px;
        position: absolute;
        right: 0;
        align-items: center;

        ${StyledIconBtn} {
          width: 40px;
          height: 40px;
        }
      }

      .title {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .body {
        display: flex;
        gap: 16px;

        .iconDiv {
          svg {
            width: 20px;
            height: 20px;
            stroke: ${(props) => props.theme.colors.black};
          }
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      .detail {
        ul {
          line-height: 170%;
          font-size: 14px;
          list-style: disc;
          padding-left: 20px;
          animation: ${fadeIn} 0.2s;
        }

        &.none {
          display: none;
        }
      }
    }
  }
`;

export const QuestionNumber = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
`;

export const QuestionValue = styled(StyledCompetencies)`
  :hover {
    cursor: initial;
    background: ${(props) => props.theme.colors.white};
  }
`;

export const DetailOpenIcon = styled.div<{ open: boolean }>`
  svg {
    width: 18px;
    height: 18px;
    stroke: ${(props) => props.theme.colors.black};
    /* transform: rotate(360deg); */
  }

  ${(props) =>
    props.open
      ? css`
          svg {
            transform: rotate(-180deg);
            transition: all 0.2s linear;
          }
        `
      : css`
          svg {
            transform: rotate(0deg);
            transition: all 0.2s linear;
          }
        `}
`;

export const QuestionsFilterWrap = styled.div`
  width: 336px;
  overflow: scroll;

  .lists {
    display: flex;
    gap: 8px;
  }
`;

export const SelectedQuestionListWrap = styled.div`
  overflow: scroll;
  height: 411px;
  flex-direction: column;
  display: flex;
  gap: 20px;
  .view {
    display: flex;
    gap: 12px;
  }
`;

export const SelectedQuestionList = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightPurple};
  display: flex;
  width: 312px;
  height: 94px;
  gap: 11px;

  .title {
    width: 181px;
    display: flex;
    align-items: center;
  }
`;
