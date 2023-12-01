import {
  OptionUl,
  DropdownEl,
  DropdownWrap,
} from "@/components/common/filters/dropdownFilter/StyledDropdownFilter";
import { Input } from "@/components/common/form/input/StyledInput";
import styled from "styled-components";
import { BoderBox } from "../StyledInterview";

export const OverviewDetailTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OverviewDetailBody = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
`;

export const OverviewDetailList = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background: rgba(246, 246, 251, 0.5);
  height: auto;

  .header {
    display: flex;
    justify-content: space-between;
    .title {
      display: flex;
      gap: 12px;
      align-items: center;

      svg {
        width: 18px;
        height: 18px;
        stroke: ${(props) => props.theme.colors.black};
      }

      .index {
        padding: 6px;
        display: flex;
        width: 32px;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.colors.white};
      }
    }
    .icon-div {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .summary {
    display: flex;
    gap: 16px;
    align-items: center;

    .comp {
      display: flex;
      padding: 7px 21px;
      justify-content: center;
      align-items: center;
      outline: 1px solid ${(props) => props.theme.colors.black};
      outline-offset: -1px;
      border-radius: 10px;
      background-color: ${(props) => props.theme.colors.white};
    }

    .icon-div {
      display: flex;
      gap: 12px;

      .time-level {
        display: flex;
        gap: 5px;

        &.level {
          svg {
            transform: rotate(270deg);
          }
        }

        svg {
          width: 20px;
          height: 20px;
          stroke: ${(props) => props.theme.colors.black};
        }
      }
    }
  }

  .detail {
    &.none {
      display: none;
    }

    ul {
      list-style: disc;
      font-size: 12px;
      line-height: 170%;
      padding: 0 20px;
    }
  }
`;

export const OnverviewDetailTitle = styled.div`
  display: flex;
  gap: 12px;
  &.open {
    svg {
      transform: rotate(180deg);
    }
  }
`;

export const OverviewDetailEdit = styled.div`
  padding: 20px;
  display: flex;
  gap: 16px;
  border-radius: 12px;
  flex-direction: column;
  outline: 1px solid ${(props) => props.theme.colors.black};
  outline-offset: -1px;
  background-color: ${(props) => props.theme.colors.palePurple};

  .dropdowns {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-right: 136px;
  }
`;

export const InputLabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  gap: 8px;

  &.time {
    flex: 1;
  }

  &.senioriy {
    flex: 1;
  }

  &.competencies {
    flex: 2;
  }

  ${Input} {
    width: 100%;
    background-color: ${(props) => props.theme.colors.white};

    :focus {
      outline: 1px solid ${(props) => props.theme.colors.black};
    }
  }

  .mdx-textarea {
    background-color: ${(props) => props.theme.colors.white};
  }

  ${OptionUl} {
    background-color: ${(props) => props.theme.colors.lightPurple};
  }

  ${DropdownEl} {
    background: ${(props) => props.theme.colors.white};
  }

  ${DropdownWrap} {
    height: 40px;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  gap: 5px;
`;

export const OverviewDetails = styled(BoderBox)`
  padding: 24px;
  width: 100%;
`;

export const TimeQuestionDiv = styled.div`
  display: flex;
  gap: 16px;

  .icon-div {
    display: flex;
    gap: 5px;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      stroke: ${(props) => props.theme.colors.black};
    }
  }
`;

export const StyledImage = styled.img`
  flex: 1;
  max-width: 250px;
  max-height: 250px;
`;

export const EmptySectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 85%;
  gap: 16px;
  flex-direction: column;
  text-align: center;
`;
