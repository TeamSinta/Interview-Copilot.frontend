import { AppDispatch } from '@/app/store';
import {
  IconBtnM
} from '@/components/common/buttons/iconBtn/IconBtn';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import Loading from '@/components/common/elements/loading/Loading';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import {
  BinIcon,
  DocumentIcon,
  EditIcon,
  MoveIcon,
  PlusIcon,
  QuestionIcon,
  SelectArrowOpenIcon,
  Star1Icon,
  TimeIcon
} from '@/components/common/svgIcons/Icons';
import {
  BodyLMedium,
  BodyMBold,
  BodySMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import { H3 } from '@/components/common/typeScale/TypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { selectInterviewDetail } from '@/features/interviewDetail/interviewDetailSlice';
import { IQuestion } from '@/features/interviews/interviewsInterface';
import { openModal } from '@/features/modal/modalSlice';
import { useUpdateQuestionMutation } from '@/features/questions/questionsAPISlice';
import {
  useAddTemplateQuestionMutation,
  useDeleteTemplateQuestionMutation,
  useGetTemplateQuestionsQuery,
} from '@/features/templates/templatesQuestionsAPISlice';
import {
  BackgroundColor,
  DataLoading
} from '@/features/utils/utilEnum';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmptySectionsImage from "src/assets/svg/'Empty Questions Page Illustration.svg";
import EmptyQuestionsImage from 'src/assets/svg/Empty Questions Illustration.svg';
import {
  EmptySectionContainer,
  OnverviewDetailTitle,
  OverviewDetailBody,
  OverviewDetailList,
  OverviewDetailTitle,
  OverviewDetails,
  StyledImage,
  TimeQuestionDiv
} from './StyledOverviewDetail';

interface IState {
  [key: string]: any;
  question_text: string;
  reply_time: number;
  guidelines: string;
  competency: string;
  difficulty: string;
}

const components = {
  h3: H3,
};

const InterviewOverviewDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedSection, status } = useSelector(selectInterviewDetail);
  const [openItems, setOpenItems] = useState(new Set());
  const [edit, setEdit] = useState(new Set());
  const [newQuestions, setQuestions] = useState<IQuestion[]>([]);
  const [inputValue, setInputValue] = useState<IState>({
    question_text: '',
    reply_time: 0,
    guidelines: '',
    difficulty: '',
    competency: '',
  });

  const { templateId } = useParams();
  const templateID = templateId;

  const [newQuestion] = useAddTemplateQuestionMutation();
  const [deleteQuestion] = useDeleteTemplateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();

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

  const filteredQuestions = newQuestions.filter((question: IQuestion) => {
    return question?.topic === selectedSection?.id;
  });

  const onClickModalOpen = (modalType: MODAL_TYPE, templateID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
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
      question_text: question.question.question_text,
      guidelines: question.question.guidelines,
      reply_time: question.question.reply_time,
      competency: question.question.competency,
      difficulty: question.question.difficulty,
    });

    console.log(question);
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
    inputValue['detail'] = value;
  };

  const handleQuestionCreated = async (question: {}) => {
    const requestData = {
      template_id: templateID,
      topic: String(selectedSection.id),
      question: question,
    };
    try {
      await newQuestion(requestData).unwrap();
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error('Failed to add question:', error);
    }
  };

  const handleUpdateQuestion = async (templateQuestion: string) => {
    if (!templateQuestion || !templateQuestion.question) {
      console.error('Invalid template question data');
      return;
    }

    const requestData = {
      id: templateQuestion.question.id, // Get the question ID
      template_id: templateID, // Assuming templateID is available in scope
      topic: String(selectedSection.id), // Assuming selectedSection is available in scope
      ...inputValue, // Other values from the form or input
    };

    console.log('Updating question with data:', requestData);

    try {
      await updateQuestion(requestData).unwrap();
      setEdit(new Set());
      openDetailHandler(templateQuestion.id, false);
      refetch();
    } catch (error) {
      console.error('Failed to update question:', error);
      // Handle error, e.g., display a notification
    }
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
    (accumulator, question) =>
      accumulator + parseInt(question.question.reply_time, 10),
    0
  );

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  const validateTime = (value: string): string | null => {
    // First, check if the field is empty
    if (!value.trim()) {
      return 'Time is required'; // Error message for empty input
    }

    // Check if the value is a number and within the range 1-60
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue < 1 || numberValue > 60) {
      return 'Please enter a number between 1 and 60'; // Error message for invalid input
    }

    return null; // No validation errors
  };

  return (
    <OverviewDetails>
      {!selectedSection ? (
        <EmptySectionContainer>
          {' '}
          <StyledImage
            style={{ marginTop: '86px' }}
            src={EmptySectionsImage}
            alt="dashboard_picture"
          />
        </EmptySectionContainer>
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
                    (question: IQuestion, index: number) => {
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
                                    setEditDetailInputs(question);
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
                            <div className="comp" key={index}>
                              <BodySMedium>
                                {question.question.competency}
                              </BodySMedium>
                            </div>

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
                            <ReactMarkdown components={components}>
                              {question.question.guidelines}
                            </ReactMarkdown>
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
