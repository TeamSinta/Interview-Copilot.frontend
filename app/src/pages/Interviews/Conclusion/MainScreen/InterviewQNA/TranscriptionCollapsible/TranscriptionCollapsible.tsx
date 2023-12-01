import React from "react";
import { Grid } from "@mui/material";

export const TranscriptionCollapsible: React.FC<any> = (data: any) => {
  const { question, index, activeIndex } = data;

  return (
    <div
      style={{
        fontWeight: "500",
        borderRadius: "10px",
        backgroundColor: "white",
        fontSize: "14px",
        marginTop: "10px",
      }}
      className={`question-answer ${activeIndex === index ? "show" : ""}`}
    >
      {question?.transcription?.map((dialogue: any, index: number) => (
        <Grid
          style={{
            margin: "0px",
          }}
          container
          spacing={1}
          key={index}
        >
          <Grid xs={1} md={1}>
            <div
              style={{
                padding: "15px 15px",
                borderRadius: "10px",
              }}
            >
              <img
                style={{
                  borderRadius: "10px",
                }}
                src={dialogue.userImageUrl}
                width="30"
                height="30"
                alt="user-profile"
              />
            </div>
          </Grid>
          <Grid xs={9} md={10} style={{ padding: "15px 15px" }}>
            <div>
              <p>{dialogue?.speech}</p>
            </div>
            <div>
              <p
                style={{
                  color: "#121212",
                  opacity: 0.5,
                  marginTop: "5px",
                }}
              >
                {dialogue?.timestamp}
              </p>
            </div>
          </Grid>
          {/* <Grid xs={1} md={1} style={{ padding: "15px 0px" }}>
            <ChatStyled>
              <ChatIcon />
            </ChatStyled>
          </Grid> */}
        </Grid>
      ))}
    </div>
  );
};
