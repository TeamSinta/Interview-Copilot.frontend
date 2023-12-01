import { AppDispatch, RootState } from "@/app/store";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { IQuestion } from "@/features/interviews/interviewsInterface";
import {
  resetQuestionBank,
  selectInterview,
  setSelectedQuestion,
} from "@/features/interviews/interviewsSlice";
import { closeModal } from "@/features/modal/modalSlice";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IconBtnM } from "../../buttons/iconBtn/IconBtn";
import { TextIconBtnL } from "../../buttons/textIconBtn/TextIconBtn";

import { CloseIcon, PlusIcon } from "../../svgIcons/Icons";
import {
  BodyLBold,
  BodyLMedium,
  H2Bold,
} from "../../typeScale/StyledTypeScale";
import {
  QuestionBody,
  QuestionLayout,
  QuestionListWrap,
  QuestionNumber,
  QuestionsFilterWrap,
  SelectedQuestionList,
  SelectedQuestionListWrap,
  TemplateBody,
  TemplateLayout,
} from "./StyledModalContents";
import AllQuestionsList from "./AllQuestionsList";
import { useUpdateQuestionBankMutation } from "@/features/questions/questionsAPISlice";

const SelectAllQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedQuestion, selectedQuestionBank } =
    useSelector(selectInterview);
  const questionBankID = useSelector(
    (state: RootState) => state.modal.questionBankID
  );
  const navigate = useNavigate();
  const [upadateQuestionBanks] = useUpdateQuestionBankMutation();

  const addQuestionsToQuestionBank = async () => {
    try {
      const payload = {
        id: questionBankID.questionBankID,
        questions: selectedQuestion.map((question: IQuestion) => question.id),
      };
      const response = await upadateQuestionBanks(payload).unwrap();
      if (response) {
        dispatch(resetQuestionBank());
        dispatch(closeModal());
        navigate(`/questionbank/${response.id}`);
        navigate(0);
      } else {
        // Handle unsuccessful response here
        console.error("Failed to add questions to the Question Bank.");
      }
    } catch (error) {
      // Handle the error here
      console.error("Error making API request:", error);
    }
  };

  useEffect(() => {}, [selectedQuestion, selectedQuestionBank]);

  return (
    <>
      {/* ===== Templates Start ===== */}
      <TemplateLayout>
        <H2Bold>All Questions Library</H2Bold>
        <TemplateBody>
          <AllQuestionsList />
          <Outlet />
        </TemplateBody>
      </TemplateLayout>
      {/* ===== Templates End ===== */}
      {/* ===== Questions Start ===== */}
      <QuestionLayout>
        <H2Bold>Added Questions</H2Bold>
        <QuestionBody>
          {selectedQuestion.length === 0 ? (
            <>
              <div className="none-q">
                Here will be the questions that you add from the templates
              </div>
            </>
          ) : (
            <QuestionListWrap>
              <QuestionsFilterWrap></QuestionsFilterWrap>
              <SelectedQuestionListWrap>
                {selectedQuestion.map((question: IQuestion, index: number) => (
                  <div className="view" key={question.id}>
                    <SelectedQuestionList>
                      <QuestionNumber>{index + 1}</QuestionNumber>
                      <div className="title">
                        <BodyLMedium>{question.question_text}</BodyLMedium>
                      </div>
                      <ElWrap h={32} w={32}>
                        <IconBtnM
                          icon={<CloseIcon />}
                          disable={false}
                          onClick={() => {
                            dispatch(
                              setSelectedQuestion({
                                selectedQuestion: question,
                              })
                            );
                          }}
                          className={BackgroundColor.WHITE}
                        />
                      </ElWrap>
                    </SelectedQuestionList>
                  </div>
                ))}
              </SelectedQuestionListWrap>
            </QuestionListWrap>
          )}
          <>
            <div className="questions-length">
              <BodyLBold>{selectedQuestion.length} Questions</BodyLBold>
            </div>
            <div className="btn-wrap">
              <TextIconBtnL
                label="Add to Question Bank"
                disable={false}
                className={BackgroundColor.ACCENT_PURPLE}
                onClick={addQuestionsToQuestionBank}
                icon={<PlusIcon />}
              />
            </div>
          </>
        </QuestionBody>
      </QuestionLayout>
      {/* ===== Questions End ===== */}
    </>
  );
};

export default SelectAllQuestions;
