import {
  IconBtnL,
  IconBtnM,
} from "@/components/common/buttons/iconBtn/IconBtn";
import StatusFilter from "@/components/common/filters/statusFilter/StatusFilter";
import TextArea from "@/components/common/form/textArea/TextArea";
import TextInput from "@/components/common/form/textInput/TextInput";
import {
  BinIcon,
  CheckIcon,
  CloseIcon,
  DocumentIcon,
  EditIcon,
  MoveIcon,
  PlusIcon,
  SelectArrowOpenIcon,
  Star1Icon,
  TimeIcon,
} from "@/components/common/svgIcons/Icons";
import {
  BodyMBold,
  BodySMedium,
  H3Bold,
} from "@/components/common/typeScale/StyledTypeScale";
import { H3 } from "@/components/common/typeScale/TypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { IQuestion } from "@/features/interviews/interviewsInterface";
import {
  BackgroundColor,
  StatusDropdownFilter,
} from "@/features/utils/utilEnum";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { Stack } from "@mui/material";
import {
  InputDiv,
  InputLabelDiv,
  OnverviewDetailTitle,
  OverviewDetailBody,
  OverviewDetailEdit,
  OverviewDetailList,
  OverviewDetailTitle,
  OverviewDetails,
} from "@/components/pages/interview/overview_detail/StyledOverviewDetail";
import { useGetQuestionsQuery } from "@/features/questions/questionsAPISlice";
import Loading from "@/components/common/elements/loading/Loading";

interface IState {
  [key: string]: any;
  title: string;
  time: number;
  detail: string;
}

const components = {
  h3: H3,
};

const QuestionList = () => {
  const [questions, setQuestions] = React.useState<string[]>([]);

  const [openItems, setOpenItems] = useState(new Set());
  const [edit, setEdit] = useState(new Set());
  const [inputValue, setInputValue] = useState<IState>({
    title: "",
    time: 0,
    detail: "",
  });

  const {
    data: questionsResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery();

  React.useEffect(() => {
    if (isSuccess) {
      setQuestions(questionsResponse);
    }
  }, [isSuccess, questionsResponse]);

  if (isLoading) {
    return <Loading />; // Render the loading component when data is still loading
  }

  if (isError) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  const openDetailHandler = (id: number, isOpen: boolean) => {
    const temp = new Set();
    if (!isOpen) {
      temp.add(id);
      setOpenItems(temp);
    } else {
      setOpenItems(temp);
    }
  };

  const editDetailHandler = (id: number, isEdit: boolean) => {
    const temp = new Set();
    if (!isEdit) {
      temp.add(id);
      setEdit(temp);
    } else {
      setEdit(temp);
    }
  };

  const setEditDetailInputs = (question: IQuestion) => {
    for (let key in question) {
      if (Object.keys(inputValue).includes(key)) {
        inputValue[key] = question[key];
      }
    }
  };

  const inputOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const textAreaOnChange = (value: string) => {
    inputValue["detail"] = value;
  };

  // useEffect(() => {}, [dispatch, openItems]);
  return (
    <OverviewDetails>
      <>
        {/*  ====== OVERVIEW TITLE START ====== */}
        <OverviewDetailTitle>
          <H3Bold> {`${questions.length} Questions` ?? "Questions"}</H3Bold>
        </OverviewDetailTitle>
        {/*  ====== OVERVIEW TITLE END ====== */}
        <OverviewDetailBody>
          {/*  ====== OVERVIEW LIST START ====== */}
          {questions.map((question: IQuestion, index: number) => {
            if (!edit.has(question.id)) {
              return (
                // ======== OVERVIEW DETAIL VIEW MODE ==========
                <OverviewDetailList key={index}>
                  <div className="header">
                    <div className="title">
                      <div className="index">
                        <BodyMBold>{index + 1}</BodyMBold>
                      </div>
                      <OnverviewDetailTitle
                        onClick={() => {
                          openDetailHandler(index, openItems.has(index));
                        }}
                        className={openItems.has(index) ? "open" : "close"}
                      >
                        <BodyMBold>{question.question_text}</BodyMBold>
                        <SelectArrowOpenIcon />
                      </OnverviewDetailTitle>
                    </div>
                    <div className="summary">
                      <div className="comp" key={index}>
                        <BodySMedium>{question.competency}</BodySMedium>
                      </div>

                      <div className="icon-div">
                        <div className="time-level">
                          <TimeIcon />
                          <BodySMedium>{question.reply_time} min</BodySMedium>
                        </div>
                        <div className="time-level level">
                          <DocumentIcon />
                          <BodySMedium>{question.difficulty}</BodySMedium>
                        </div>
                      </div>
                    </div>
                    <div className="icon-div">
                      <ElWrap h={32} w={32}>
                        <IconBtnM
                          disable={false}
                          onClick={() => {
                            editDetailHandler(
                              question.id,
                              edit.has(question.id)
                            );
                            setEditDetailInputs(question);
                          }}
                          icon={<EditIcon />}
                          className={BackgroundColor.WHITE}
                        />
                      </ElWrap>
                      <ElWrap h={32} w={32}>
                        <IconBtnM
                          disable={false}
                          onClick={() => {}}
                          icon={<BinIcon />}
                          className={BackgroundColor.WHITE}
                        />
                      </ElWrap>
                      <MoveIcon />
                    </div>
                  </div>

                  <div
                    className={`detail ${openItems.has(index) ? "" : "none"}`}
                  >
                    <ReactMarkdown components={components}>
                      {question.guidelines}
                    </ReactMarkdown>
                  </div>
                </OverviewDetailList>
              );
            } else {
              return (
                // ======== OVERVIEW DETAIL EDIT MODE ==========
                <OverviewDetailEdit key={index}>
                  <InputLabelDiv>
                    <label>
                      <BodySMedium>Question</BodySMedium>
                    </label>
                    <InputDiv>
                      <TextInput
                        disable={false}
                        placeholder={"title"}
                        error={false}
                        onChange={inputOnChange}
                        name={"title"}
                        value={inputValue["title"]}
                      />
                      <ElWrap w={40} h={40}>
                        <IconBtnL
                          disable={false}
                          onClick={() => {}}
                          className={BackgroundColor.ACCENT_PURPLE}
                          icon={<CheckIcon />}
                        />
                      </ElWrap>
                      <ElWrap w={40} h={40}>
                        <IconBtnL
                          disable={false}
                          onClick={() => {}}
                          className={BackgroundColor.WHITE}
                          icon={<BinIcon />}
                        />
                      </ElWrap>

                      <ElWrap w={40} h={40}>
                        <IconBtnL
                          disable={false}
                          onClick={() => {
                            editDetailHandler(index, edit.has(question.id));
                          }}
                          className={BackgroundColor.WHITE}
                          icon={<CloseIcon />}
                        />
                      </ElWrap>
                    </InputDiv>
                  </InputLabelDiv>
                  <div className="dropdowns">
                    <InputLabelDiv className="competencies">
                      <label>
                        <BodySMedium>Competencies</BodySMedium>
                      </label>
                      {/* <DropdownFilter
                            // optionArr={optionArrGenerator(
                            //   question.competency
                            // )}
                            // dropdownName={"competencies"}
                          ></DropdownFilter> */}
                    </InputLabelDiv>
                    <InputLabelDiv className="time">
                      <label>
                        <BodySMedium>Time to reply</BodySMedium>
                      </label>
                      <TextInput
                        disable={false}
                        placeholder={"time"}
                        error={false}
                        onChange={inputOnChange}
                        name={"time"}
                        value={inputValue["time"].toString()}
                      />
                    </InputLabelDiv>
                    <InputLabelDiv className="senioriy">
                      <label>
                        <BodySMedium>Seniority</BodySMedium>
                      </label>
                      <StatusFilter
                        status={StatusDropdownFilter.WAITING}
                      ></StatusFilter>
                    </InputLabelDiv>
                  </div>
                  <InputLabelDiv>
                    <label>
                      <BodySMedium>Guidelines</BodySMedium>
                    </label>
                    <TextArea
                      disable={false}
                      placeholder={"detail"}
                      error={false}
                      onChange={textAreaOnChange}
                      name={"detail"}
                      value={inputValue["detail"]}
                    />
                  </InputLabelDiv>
                </OverviewDetailEdit>
              );
            }
          })}
        </OverviewDetailBody>
        {/*  ====== OVERVIEW LIST END ====== */}
        <Stack
          direction="row"
          spacing={1.5}
          style={{ borderTop: "16px solid white" }}
        >
          <TextIconBtnL
            disable={false}
            onClick={() => {}}
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<PlusIcon />}
            label="Add Question"
          />
        </Stack>
      </>
    </OverviewDetails>
  );
};

export default QuestionList;
