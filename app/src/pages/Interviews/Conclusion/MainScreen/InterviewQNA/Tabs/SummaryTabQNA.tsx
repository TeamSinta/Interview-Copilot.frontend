import React from "react";
import { InterviewContainerStyle } from "../InterviewQNA";
import { Grid } from "@mui/material";
import {
  BodyMBold,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";

export const SummaryTabQNA: React.FC<any> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  return (
    <div className="interview-qna">
      {data?.map((question: any, index: number) => (
        <InterviewContainerStyle>
          <Grid
            container
            spacing={1}
            key={index}
            onClick={() => handleClick(index)}
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            <Grid xs={11} md={11}>
              <div>
                <div
                  className={`question-heading ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  <BodyMBold> {question.question}</BodyMBold>
                </div>
                <div
                  style={{ marginTop: "10px", fontWeight: "400" }}
                  className={`question-answer ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  {" "}
                  <BodySMedium> {question.answer}</BodySMedium>
                </div>
              </div>
            </Grid>
            <Grid xs={1} md={1}>
              <div>
                <i
                  style={{
                    marginLeft: "0px",
                    fontSize: "16px",
                    float: "right",
                  }}
                  className={`fa ${
                    activeIndex === index ? "fa-angle-up" : "fa-angle-down"
                  }`}
                ></i>
              </div>
            </Grid>
          </Grid>
        </InterviewContainerStyle>
      ))}
    </div>
  );
};
