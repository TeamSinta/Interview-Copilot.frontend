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
  const [templateQuestions, setTemplateQuestions] = useState<
    ITemplateQuestion[]
  >([]);
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
      setTemplateQuestions(questions);
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

  const filteredQuestions = templateQuestions.filter(
    (templateQuestion: ITemplateQuestion) => {
      return templateQuestion?.topic === selectedSection.id;
    }
  );

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
      question_text: question.question_text,
      guidelines: question.guidelines,
      reply_time: question.reply_time,
      competency: question.competency,
      difficulty: question.difficulty,
    });
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
      setShowCustomQuestionForm(false);
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error('Failed to add question:', error);
    }
  };

  //Which data have to be update?
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

  const handleDeleteTemplateQuestion = async (questionID: number) => {
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

  const handleClose = () => {
    setShowCustomQuestionForm(false);
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
                showCustomQuestionForm ? (
                  <>
                    <div style={{ paddingTop: '16px', paddingBottom: '166px' }}>
                      <CustomQuestionForm
                        ref={customQuestionFormRef}
                        onQuestionCreated={handleQuestionCreated}
                        onClose={() => {}}
                      />
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )
              ) : (
                <OverviewDetailBody>
                  <>
                    {filteredQuestions.map(
                      (templateQuestion: ITemplateQuestion, index: number) => {
                        if (!edit.has(templateQuestion.id)) {
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
                                        templateQuestion.question.id,
                                        openItems.has(
                                          templateQuestion.question.id
                                        )
                                      );
                                    }}
                                    className={
                                      openItems.has(
                                        templateQuestion.question.id
                                      )
                                        ? 'open'
                                        : 'close'
                                    }
                                  >
                                    <BodyMBold>
                                      {templateQuestion.question.question_text}
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
                                          templateQuestion.question.id,
                                          edit.has(templateQuestion.question.id)
                                        );
                                        setEditDetailInputs(
                                          templateQuestion.question
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
                                        handleDeleteTemplateQuestion(
                                          templateQuestion.question.id
                                        )
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
                                    {templateQuestion.question.competency}
                                  </BodySMedium>
                                </div>

                                <div className="icon-div">
                                  <div className="time-level">
                                    <TimeIcon />
                                    <BodySMedium>
                                      {templateQuestion.question.reply_time} min
                                    </BodySMedium>
                                  </div>
                                  <div className="time-level level">
                                    <DocumentIcon />
                                    <BodySMedium>
                                      {templateQuestion.question.difficulty}
                                    </BodySMedium>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`detail ${
                                  openItems.has(templateQuestion.question.id)
                                    ? ''
                                    : 'none'
                                }`}
                              >
                                <MarkdownFromatConatiner>
                                  {templateQuestion.question.guidelines}
                                </MarkdownFromatConatiner>
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
                                    placeholder={'Question'}
                                    onChange={inputOnChange}
                                    name={'question_text'}
                                    validate={validateTitle}
                                    value={inputValue['question_text']}
                                  />
                                  <ElWrap w={40} h={40}>
                                    <IconBtnL
                                      disable={false}
                                      onClick={() =>
                                        handleUpdateQuestion(
                                          templateQuestion.question
                                            .question_text
                                        )
                                      }
                                      className={BackgroundColor.ACCENT_PURPLE}
                                      icon={<CheckIcon />}
                                    />
                                  </ElWrap>
                                  <ElWrap w={40} h={40}>
                                    <IconBtnL
                                      disable={false}
                                      onClick={() =>
                                        handleDeleteTemplateQuestion(
                                          templateQuestion.question.id
                                        )
                                      }
                                      className={BackgroundColor.WHITE}
                                      icon={<BinIcon />}
                                    />
                                  </ElWrap>
                                  <ElWrap w={40} h={40}>
                                    <IconBtnL
                                      disable={false}
                                      onClick={() => {
                                        editDetailHandler(
                                          templateQuestion.question.id,
                                          edit.has(templateQuestion.question.id)
                                        );
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
                                    <BodySMedium>Competency</BodySMedium>
                                  </label>
                                  <TextInput
                                    disable={false}
                                    placeholder={'Competency'}
                                    validate={validateTitle}
                                    onChange={inputOnChange}
                                    name={'competency'}
                                    value={inputValue['competency']}
                                  />
                                </InputLabelDiv>
                                <InputLabelDiv className="time">
                                  <label>
                                    <BodySMedium>
                                      Time for reply (mins)
                                    </BodySMedium>
                                  </label>
                                  <TextInput
                                    disable={false}
                                    placeholder={'time'}
                                    validate={validateTime}
                                    onChange={inputOnChange}
                                    name={'reply_time'}
                                    value={inputValue['reply_time'].toString()}
                                  />
                                </InputLabelDiv>
                                <InputLabelDiv className="senioriy">
                                  <label>
                                    <BodySMedium>Difficulty</BodySMedium>
                                  </label>
                                  <StatusFilter
                                    status={StatusDropdownFilter.LOW}
                                    onSelectStatus={function (
                                      status: StatusDropdownFilter | null
                                    ): void {
                                      throw new Error(
                                        'Function not implemented.'
                                      );
                                    }}
                                  ></StatusFilter>
                                </InputLabelDiv>
                              </div>
                              <InputLabelDiv>
                                <label>
                                  <BodySMedium>Guidelines</BodySMedium>
                                </label>
                                <TextArea
                                  placeholder={'Guidelines'}
                                  validate={() => null}
                                  onChange={textAreaOnChange}
                                  name={'guidelines'}
                                  value={inputValue['guidelines']}
                                />
                              </InputLabelDiv>
                            </OverviewDetailEdit>
                          );
                        }
                      }
                    )}
                    {showCustomQuestionForm && (
                      <CustomQuestionForm
                        onQuestionCreated={handleQuestionCreated}
                        ref={customQuestionFormRef}
                        onClose={handleClose}
                      />
                    )}
                  </>
                </OverviewDetailBody>
              )}

              {/* ====== OVERVIEW LIST END ====== */}
              {!selectedSection ? (
                <></>
              ) : (
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
                      setShowCustomQuestionForm(!showCustomQuestionForm);
                      // Scroll to the CustomQuestionForm when it's opened
                      if (
                        !showCustomQuestionForm &&
                        customQuestionFormRef.current
                      ) {
                        customQuestionFormRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'start',
                        });
                      }
                    }}
                    className={BackgroundColor.ACCENT_PURPLE}
                    icon={<Star1Icon />}
                    label="Add Custom Question"
                  />
                </Stack>
              )}
              <GlobalModal></GlobalModal>
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
