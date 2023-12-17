import React from "react";
import styled from "styled-components";
import { Grid, Tooltip } from "@mui/material";
import Image from "@/assets/images/empty_user_pic.jpeg";
import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";

interface QuestionData {
  name: string;
  speech: string;
  timestamp: string;
  picture: string | null; // Assuming picture can be null
}

interface TranscriptionTabQNAProps {
  activeIndex: number;
  data: QuestionData[];
  handleClick: (index: number) => void;
}

const MarginTop = styled.div`
  margin-top: 10px;
  margin-left: 5px;
`;

export const TranscriptionTabQNA: React.FC<TranscriptionTabQNAProps> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  console.log(data);
  return (
    <div
      style={{
        fontWeight: "500",
        borderRadius: "10px",
        backgroundColor: "white",
        fontSize: "14px",
        marginTop: "10px",
      }}
    >
      {data?.map((item, index) => (
        <MarginTop key={index}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={1}
              md={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "16px",
                paddingLeft: "16px",
              }}
            >
              <Tooltip title={item.name} arrow>
                <img
                  src={item.picture || Image} // Replace with the correct path to your assets
                  alt="user"
                  style={{
                    borderRadius: "10px",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={9} md={10} style={{ padding: "15px 15px" }}>
              <div>
                <BodySMedium>{item.speech}</BodySMedium>{" "}
                {/* Using speech field */}
              </div>
              <div>
                <BodySMedium
                  style={{
                    color: "#121212",
                    opacity: 0.5,
                    marginTop: "5px",
                  }}
                >
                  {item.timestamp} {/* Using timestamp field */}
                </BodySMedium>
              </div>
            </Grid>
            {/* Additional Grid if needed */}
          </Grid>
        </MarginTop>
      ))}
    </div>
  );
};
