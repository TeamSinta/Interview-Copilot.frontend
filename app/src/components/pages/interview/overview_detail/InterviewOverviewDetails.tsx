import { AppDispatch } from '@/app/store';
import {
  IconBtnL,
  IconBtnM,
} from '@/components/common/buttons/iconBtn/IconBtn';
import StatusFilter from '@/components/common/filters/statusFilter/StatusFilter';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import {
  BinIcon,
  CheckIcon,
  CloseIcon,
  DocumentIcon,
  EditIcon,
  MoveIcon,
  PlusIcon,
  QuestionIcon,
  SelectArrowOpenIcon,
  Star1Icon,
  TimeIcon,
} from '@/components/common/svgIcons/Icons';
import {
  BodyLMedium,
  BodyMBold,
  BodySMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { selectInterviewDetail } from '@/features/interviewDetail/interviewDetailSlice';
import { IQuestion } from '@/features/interviews/interviewsInterface';
import {
  BackgroundColor,
  DataLoading,
  StatusDropdownFilter,
} from '@/features/utils/utilEnum';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputDiv,
  InputLabelDiv,
  OnverviewDetailTitle,
  OverviewDetailBody,
  OverviewDetailEdit,
  OverviewDetailList,
  OverviewDetailTitle,
  OverviewDetails,
  StyledImage,
  TimeQuestionDiv,
  EmptySectionContainer,
} from './StyledOverviewDetail';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { Stack } from '@mui/material';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { openModal } from '@/features/modal/modalSlice';
import { useParams } from 'react-router-dom';
import EmptyQuestionsImage from 'src/assets/svg/Empty Questions Illustration.svg';
import EmptySectionsImage from "src/assets/svg/'Empty Questions Page Illustration.svg";
import CustomQuestionForm from './CustomQuestionForm';
import {
  useAddTemplateQuestionMutation,
  useDeleteTemplateQuestionMutation,
  useGetTemplateQuestionsQuery,
} from '@/features/templates/templatesQuestionsAPISlice';
import Loading from '@/components/common/elements/loading/Loading';
import { useUpdateQuestionMutation } from '@/features/questions/questionsAPISlice';
import MarkdownFromatConatiner from '@/components/common/markdownFormatContainer/MarkdownFormatContainer';
import { ITemplateQuestion } from '@/features/templates/templatesInterface';

interface IState {
  [key: string]: any;
  question_text: string;
  reply_time: number;
  guidelines: string;
  competency: string;
  difficulty: string;
}

const InterviewOverviewDetails = () => {
  const customQuestionFormRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedSection, status } = useSelector(selectInterviewDetail);
  const [openItems, setOpenItems] = useState(new Set());
  const [showCustomQuestionForm, setShowCustomQuestionForm] = useState(false);
  const [edit, setEdit] = useState(new Set());
  const [newQuestions, setQuestions] = useState<ITemplateQuestion[]>([]);
  const [inputValue, setInputValue] = useState<IState>({
    question_text: '',
    reply_time: 0,
    guidelines: '',
    difficulty: '',
    competency: '',
  });

  const { templateId } = useParams();
  const templateID = templateId;

  const [deleteQuestion] = useDeleteTemplateQuestionMutation();

  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetTemplateQuestionsQuery();

  // Move the useEffect hook to the top level
  useEffect(() => {}, [dispatch, openItems]);
  useEffect(() => {
    if (isSuccess) {
      setQuestions(questions);
    }
  }, [isSuccess, questions]);

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

  const filteredQuestions = newQuestions.filter(
    (question: ITemplateQuestion) => {
      return question?.topic === selectedSection?.id;
    }
  );

  const onClickModalOpen = (
    modalType: MODAL_TYPE,
    templateID: any,
    dataForEdit?: any
  ) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
        dataForEdit,
      })
    );
  };

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
    setInputValue({
      question_text: question.question_text,
      guidelines: question.guidelines,
      reply_time: question.reply_time,
      competency: question.competency,
      difficulty: question.difficulty,
    });
  };

  const handleDeleteTemplateQuestion = async (questionID: string) => {
    try {
      await deleteQuestion(questionID);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error('Error deleting question:', error);
    }
  };

  const totalReplyTime = filteredQuestions.reduce(
    (accumulator, question) => accumulator + question.question.reply_time,
    0
  );

  return (
    <OverviewDetails>
      {!selectedSection ? (
        <>
          <EmptySectionContainer>
            {' '}
            <StyledImage
              style={{ marginTop: '86px' }}
              src={EmptySectionsImage}
              alt="dashboard_picture"
            />
          </EmptySectionContainer>
        </>
      ) : (
        <>
          {status === DataLoading.FULFILLED ? (
            <>
              {/* ====== OVERVIEW TITLE START ====== */}
              <OverviewDetailTitle>
                <H3Bold> {selectedSection?.topics_text ?? 'Questions'}</H3Bold>
                <TimeQuestionDiv>
                  <div className="icon-div">
                    <TimeIcon />
                    <BodySMedium>{totalReplyTime ?? 0} min</BodySMedium>
                  </div>
                  <div className="icon-div">
                    <QuestionIcon />
                    <BodySMedium>
                      {filteredQuestions?.length ?? 0} Questions
                    </BodySMedium>
                  </div>
                </TimeQuestionDiv>
              </OverviewDetailTitle>
              {/* ====== OVERVIEW TITLE END ====== */}

              {filteredQuestions.length === 0 ? (
                <EmptySectionContainer>
                  <StyledImage
                    src={EmptyQuestionsImage}
                    alt="dashboard_picture"
                  />
                  <BodyLMedium style={{ maxWidth: '450px' }}>
                    {' '}
                    Add Questions from the library or create your own custom
                    question
                  </BodyLMedium>
                </EmptySectionContainer>
              ) : (
                <OverviewDetailBody>
                  {/* ====== OVERVIEW LIST START ====== */}
                  {filteredQuestions.map(
                    (question: ITemplateQuestion, index: number) => {
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
                                  openDetailHandler(
                                    question.id,
                                    openItems.has(question.id)
                                  );
                                }}
                                className={
                                  openItems.has(question.id) ? 'open' : 'close'
                                }
                              >
                                <BodyMBold>
                                  {question.question.question_text}
                                </BodyMBold>
                                <SelectArrowOpenIcon />
                              </OnverviewDetailTitle>
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
                                    setEditDetailInputs(question.question);
                                    onClickModalOpen(
                                      MODAL_TYPE.ADD_CUSTOM_QUESTION,
                                      {
                                        templateID,
                                      },
                                      question.question
                                    );
                                  }}
                                  icon={<EditIcon />}
                                  className={BackgroundColor.WHITE}
                                />
                              </ElWrap>
                              <ElWrap h={32} w={32}>
                                <IconBtnM
                                  disable={false}
                                  onClick={() =>
                                    handleDeleteTemplateQuestion(question.id)
                                  }
                                  icon={<BinIcon />}
                                  className={BackgroundColor.WHITE}
                                />
                              </ElWrap>
                              <MoveIcon />
                            </div>
                          </div>
                          <div className="summary">
                            <>
                              {question.question.competency !== null && (
                                <div className="comp" key={index}>
                                  <BodySMedium>
                                    {question.question.competency}
                                  </BodySMedium>
                                </div>
                              )}
                            </>

                            <div className="icon-div">
                              <div className="time-level">
                                <TimeIcon />
                                <BodySMedium>
                                  {question.question.reply_time} min
                                </BodySMedium>
                              </div>
                              <div className="time-level level">
                                <DocumentIcon />
                                <BodySMedium>
                                  {question.question.difficulty}
                                </BodySMedium>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`detail ${
                              openItems.has(question.id) ? '' : 'none'
                            }`}
                          >
                            <MarkdownFromatConatiner>
                              {question.question.guidelines}
                            </MarkdownFromatConatiner>
                          </div>
                        </OverviewDetailList>
                      );
                    }
                  )}
                </OverviewDetailBody>
              )}
              {/* ====== OVERVIEW LIST END ====== */}
              {selectedSection ? (
                <Stack
                  direction="row"
                  spacing={1.5}
                  style={{ borderTop: '16px solid white' }}
                >
                  <TextIconBtnL
                    disable={false}
                    onClick={() => {
                      onClickModalOpen(MODAL_TYPE.SELECT_TEM, { templateID }); // Pass the template ID as a parameter
                    }}
                    className={BackgroundColor.WHITE}
                    icon={<PlusIcon />}
                    label="Add from Library"
                  />
                  <TextIconBtnL
                    disable={false}
                    onClick={() => {
                      onClickModalOpen(MODAL_TYPE.ADD_CUSTOM_QUESTION, {
                        templateID,
                      });
                    }}
                    className={BackgroundColor.ACCENT_PURPLE}
                    icon={<Star1Icon />}
                    label="Add Custom Question"
                  />
                </Stack>
              ) : (
                <></>
              )}
              <GlobalModal />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </OverviewDetails>
  );
};

export default InterviewOverviewDetails;
