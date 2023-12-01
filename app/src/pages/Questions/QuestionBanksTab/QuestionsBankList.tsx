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
import { DropdownFilter } from "@/components/common/filters/dropdownFilter/DropdownFilter.stories";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { openModal } from "@/features/modal/modalSlice";
import { useDispatch } from "react-redux";

interface IState {
  [key: string]: any;
  title: string;
  time: number;
  detail: string;
}

const components = {
  h3: H3,
};

const QuestionBanksQuestionsList = ({ questionBank }) => {
  const [allQuestions, setQuestions] = React.useState<string[]>([]);

  const questions = questionBank?.questions || [];
  const questionBankID = questionBank.id;
  const [openItems, setOpenItems] = useState(new Set());
  const dispatch = useDispatch();

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

  const onClickModalOpen = (modalType: MODAL_TYPE, questionBankID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        questionBankID: questionBankID,
      })
    );
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
            return (
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
                        onClick={() => {}}
                        icon={<CloseIcon />}
                        className={BackgroundColor.WHITE}
                      />
                    </ElWrap>
                  </div>
                </div>

                <div className={`detail ${openItems.has(index) ? "" : "none"}`}>
                  <ReactMarkdown components={components}>
                    {question.guidelines}
                  </ReactMarkdown>
                </div>
              </OverviewDetailList>
            );
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
            onClick={() => {
              onClickModalOpen(MODAL_TYPE.SELECT_ALL_QUESTIONS, {
                questionBankID,
              });
            }}
            className={BackgroundColor.WHITE}
            icon={<PlusIcon />}
            label="Add From Library"
          />
          <TextIconBtnL
            disable={false}
            onClick={() => {}}
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<Star1Icon />}
            label="Add Custom Question"
          />
        </Stack>
        <GlobalModal></GlobalModal>
      </>
    </OverviewDetails>
  );
};

export default QuestionBanksQuestionsList;
