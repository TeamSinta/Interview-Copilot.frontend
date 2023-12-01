import { AppDispatch } from "@/app/store";
import { IQuestion } from "@/features/interviews/interviewsInterface";
import {
  selectInterview,
  setSelectedQuestion,
} from "@/features/interviews/interviewsSlice";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconBtnL } from "../../buttons/iconBtn/IconBtn";
import {
  BinIcon,
  GraphIcon,
  PlusIcon,
  SelectArrowOpenIcon,
  TimeIcon,
} from "../../svgIcons/Icons";
import { BodyLBold, BodySMedium } from "../../typeScale/StyledTypeScale";
import {
  DetailOpenIcon,
  QuestionListContentLists,
  QuestionListContentWrap,
  QuestionListWrap,
  QuestionNumber,
  QuestionValue,
} from "./StyledModalContents";
import Loading from "../../elements/loading/Loading";
import { useGetQuestionsQuery } from "@/features/questions/questionsAPISlice";

const AllQuestionsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedQuestion } = useSelector(selectInterview);
  const [openItems, setOpenItems] = useState(new Set());
  const [html, setHtml] = useState<string>("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const openDetailHandler = (id: number, isOpen: boolean) => {
    const temp = new Set();
    if (!isOpen) {
      temp.add(id);
      setOpenItems(temp);
    } else {
      setOpenItems(temp);
    }
  };

  useEffect(() => {}, [openItems, setOpenItems, html, selectedQuestion]);

  const {
    data: questionsResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery();

  useEffect(() => {
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

  return (
    <QuestionListWrap>
      <QuestionListContentWrap>
        <QuestionListContentLists>
          <div className="lists">
            {questions.map((question: IQuestion, index: number) => (
              <div className="list" key={index}>
                {!selectedQuestion.find(
                  (questionS: IQuestion) => questionS.id === question.id
                ) ? (
                  <div className="iconBtn">
                    <IconBtnL
                      icon={<PlusIcon />}
                      disable={false}
                      onClick={() => {
                        dispatch(
                          setSelectedQuestion({ selectedQuestion: question })
                        );
                      }}
                      className={BackgroundColor.ACCENT_PURPLE}
                    />
                  </div>
                ) : (
                  <div className="added">
                    <BodySMedium>Added</BodySMedium>
                    {/* <div className="iconBtn"> */}
                    <IconBtnL
                      icon={<BinIcon />}
                      disable={false}
                      onClick={() => {
                        dispatch(
                          setSelectedQuestion({ selectedQuestion: question })
                        );
                      }}
                      className={BackgroundColor.WHITE}
                    />
                    {/* </div> */}
                  </div>
                )}
                <div className="title">
                  <QuestionNumber>{index + 1}</QuestionNumber>
                  <BodyLBold>{question.question_text}</BodyLBold>
                  <DetailOpenIcon
                    open={openItems.has(question.id)}
                    onClick={() => {
                      setHtml(question.guidelines);
                      openDetailHandler(
                        question.id,
                        openItems.has(question.id)
                      );
                    }}
                    className={openItems.has(question.id) ? "open" : "close"}
                  >
                    <SelectArrowOpenIcon />
                  </DetailOpenIcon>
                </div>
                <div className="body">
                  <QuestionValue>
                    <BodySMedium>{question.competency}</BodySMedium>
                  </QuestionValue>

                  <div className="iconDiv">
                    <TimeIcon />
                    <BodySMedium>{question.reply_time}min</BodySMedium>
                  </div>
                  <div className="iconDiv">
                    <GraphIcon />
                    <BodySMedium>{question.difficulty}</BodySMedium>
                  </div>
                </div>
                <div
                  className={
                    openItems.has(question.id) ? "detail" : "detail none"
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: html }}></div>
                </div>
              </div>
            ))}
          </div>
        </QuestionListContentLists>
      </QuestionListContentWrap>
    </QuestionListWrap>
  );
};

export default AllQuestionsList;
