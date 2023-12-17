import React, { useEffect, useState } from "react";
import "./InterviewQNA.css";
import styled from "styled-components";
import { QuestionsTabQNA, SummaryTabQNA, TranscriptionTabQNA } from "./Tabs";
import { NotesTabQNA } from "./Tabs/NotesTabQNA";

export const ChatStyled = styled.div`
  svg {
    width: 20px;
    height: 20px;
    stroke: black;
  }
`;

export const InterviewContainerStyle = styled.div`
  font-weight: bold !important;
  cursor: pointer;
  padding: 10px;
  padding-left: 0px;
  padding-right: 10px;
  margin-bottom: 20px;
`;

export const IndexStyle = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 8px 16px;
  font-size: 10px;
  margin-right: 10px;
`;

const InterviewQNA: React.FC<any> = ({ propData, screen }) => {
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [, setData] = useState<any>("");
  const [view, setView] = useState<any>("");

  useEffect(() => {
    setView(screen);
    setData(propData);
  }, [screen, propData]);

  console.log(propData);

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const ViewQNA: React.FC<any> = () => {
    if (view === "summary")
      return (
        <SummaryTabQNA
          activeIndex={activeIndex}
          data={propData}
          handleClick={handleClick}
        />
      );
    if (view === "question")
      return (
        <QuestionsTabQNA
          activeIndex={activeIndex}
          data={propData}
          handleClick={handleClick}
        />
      );
    if (view === "transcription")
      return (
        <TranscriptionTabQNA
          activeIndex={activeIndex}
          data={propData}
          handleClick={handleClick}
        />
      );
    if (view === "notes")
      return (
        <>
          <NotesTabQNA
            activeIndex={activeIndex}
            data={propData}
            handleClick={handleClick}
          />
          {console.log("here")}
        </>
      );
    return null;
  };

  return <ViewQNA />;
};

export default InterviewQNA;
