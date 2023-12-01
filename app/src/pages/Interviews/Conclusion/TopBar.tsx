import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./index.css";
import { TOP_BAR_INFO } from "./Constants";
import {
  getInterviewRoundQuestions,
  getInterview,
  getCandidateById,
  getTemplate,
} from "../../../features/interviews/interviewsAPI";
import { useCookies } from "react-cookie";
const TopBar = ({ interviewRoundId }) => {
  const { BIO_DATA, OVERALL_SCORE, SENTIMENT } = TOP_BAR_INFO;
  const [cookies, ,] = useCookies(["access_token"]);
  const [average, setAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [candidateName, setCandidateName] = useState("");
  const [templateTitle, setTemplateTitle] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      const questions = await getInterviewRoundQuestions(
        interviewRoundId,
        cookies.access_token
      );

      const interviewRound = await getInterview(
        interviewRoundId,
        cookies.access_token
      );

      const candidate = await getCandidateById(
        interviewRound.candidate_id,
        cookies.access_token
      );

      const template = await getTemplate(
        interviewRound.template_id,
        cookies.access_token
      );
      setCandidateName(candidate.first_name + " " + candidate.last_name);
      setTemplateTitle(template.role_title);
      let ratingTotal = 0;
      questions.map((question) => {
        ratingTotal += question.rating;
      });
      const ratingAverage = ratingTotal / questions.length;
      const ratingOverallScore = ratingAverage * 20;

      setAverage(ratingAverage);
      setOverallScore(ratingOverallScore);
      setIsLoading(false);
    };

    fetchRatings();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2} className="bar ">
        <Grid item={true} xs={12} md={12} lg={3} className="column">
          <div>
            <p className="bio-data-name">{candidateName}</p>
            <p className="bio-data-designation">{templateTitle}</p>
            <p className="bio-data-stage">
              <span className="bio-data-stage-label">
                {/* {BIO_DATA.STAGE_LABEL}:{" "} */}
              </span>{" "}
              <span
                style={{
                  fontFamily: "ChillaxSemi",
                  fontWeight: "600",
                }}
              >
                {/* {BIO_DATA.STAGE_NAME} .{" "} */}
              </span>
              {/* <span className="bio-data-stage-date">{BIO_DATA.DATE}</span> */}
            </p>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={12} lg={3} className="column">
          <div>
            <p>{OVERALL_SCORE.LABEL}</p>
            <div id="progressContainer">
              <progress
                id="myProgress"
                style={{
                  height: "20px",
                }}
                value={overallScore.toFixed(0)}
                max="100"
              ></progress>
            </div>
            <p>{!isLoading ? overallScore.toFixed(0) : "Loading..."}%</p>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={12} lg={3} className="column">
          <div>
            {" "}
            <p>{SENTIMENT.LABEL}</p>
            <div>
              <span>
                <i
                  className={
                    "fa fa-" +
                    (average > 2.5 ? "thumbs-up" : "thumbs-down") +
                    " " +
                    (average > 2.5
                      ? "positiveSentimentIcon"
                      : "negativeSentimentIcon")
                  }
                ></i>
              </span>
              <span
                style={{
                  fontFamily: "ChillaxSemi",
                  fontWeight: "600",
                }}
              >
                {average > 2.5 ? "Positive" : "Negative"}
              </span>
            </div>
            <p>
              {!isLoading ? average.toFixed(0) : "Loading..."}{" "}
              <span className="sentiment-meta">/ 5</span>{" "}
            </p>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TopBar;
