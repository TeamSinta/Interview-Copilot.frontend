import React from "react";
import styled, { css } from "styled-components";

interface QuestionCollapsibleProps {
  question: string;
  index: number;
  activeIndex: number;
}

interface StyledAngleIconProps {
  active: boolean;
}

const StyledAngleIcon = styled.i<StyledAngleIconProps>`
  margin-left: 10px;
  ${
    (props) =>
      props.active
        ? css`
            &::before {
              content: "\f106";
            }
          ` // unicode for fa-angle-up
        : css`
            &::before {
              content: "\f107";
            }
          ` // unicode for fa-angle-down
  };
`;

export const QuestionCollapsible: React.FC<QuestionCollapsibleProps> = ({
  question,
  index,
  activeIndex,
}) => {
  const isActive = activeIndex === index;

  return (
    <div className={isActive ? "active" : ""}>
      <p>
        {question}{" "}
        <span>
          <StyledAngleIcon className="fa" active={isActive} />
        </span>
      </p>
    </div>
  );
};
