import { AppDispatch } from '@/app/store';
import { useParams } from 'react-router-dom';

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
  SelectArrowOpenIcon,
  Star1Icon,
  TimeIcon,
} from '@/components/common/svgIcons/Icons';
import {
  BodyMBold,
  BodySMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import { H3 } from '@/components/common/typeScale/TypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { IQuestion } from '@/features/interviews/interviewsInterface';
import {
  BackgroundColor,
  StatusDropdownFilter,
} from '@/features/utils/utilEnum';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { Stack } from '@mui/material';
import {
  InputDiv,
  InputLabelDiv,
  OnverviewDetailTitle,
  OverviewDetailBody,
  OverviewDetailEdit,
  OverviewDetailList,
  OverviewDetailTitle,
  OverviewDetails,
} from '@/components/pages/interview/overview_detail/StyledOverviewDetail';
import { useGetQuestionsQuery } from '@/features/questions/questionsAPISlice';
import Loading from '@/components/common/elements/loading/Loading';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { useDispatch } from 'react-redux';
import { openModal } from '@/features/modal/modalSlice';


interface IState {
  [key: string]: any;
  title: string;
  time: number;
  guidelines: string;
}
const components = {
  h3: H3,
};

const QuestionList = () => {
  const [questions, setQuestions] = React.useState<string[]>([]);

  const [openItems, setOpenItems] = useState(new Set());
  const [edit, setEdit] = useState(new Set());
  const [inputValue, setInputValue] = useState<IState>({
    question_text: '',
    time: 0,
    guidelines: '',
    difficulty: null,
    competency: '',
  });

  const {
    data: questionsResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery();
  
  const dispatch = useDispatch<AppDispatch>();
  const { templateId } = useParams();
  const templateID = templateId;

  const onClickModalOpen = (modalType: MODAL_TYPE, templateID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
      })
    );
  };

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
    inputValue['guidelines'] = value;
  };
  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Question is required{' '}
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

  const handleSelectDifficulty = (difficulty: any) => {
    setInputValue({ ...inputValue, difficulty });
  };

  // useEffect(() => {}, [dispatch, openItems]);
  return (
    <OverviewDetails>
      <>
        {/*  ====== OVERVIEW TITLE START ====== */}
        <OverviewDetailTitle>
          <H3Bold> {`${questions.length} Questions` ?? 'Questions'}</H3Bold>
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
                        className={openItems.has(index) ? 'open' : 'close'}
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
                    className={`detail ${openItems.has(index) ? '' : 'none'}`}
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
                        placeholder={'Question'}
                        validate={validateTitle}
                        onChange={inputOnChange}
                        name={'question_text'}
                        value={inputValue['question_text']}
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
                        <BodySMedium>Time to reply (mins)</BodySMedium>
                      </label>
                      <TextInput
                        disable={false}
                        placeholder={'time'}
                        validate={validateTime}
                        onChange={inputOnChange}
                        name={'time'}
                        value={inputValue['time'].toString()}
                      />
                    </InputLabelDiv>
                    <InputLabelDiv className="senioriy">
                      <label>
                        <BodySMedium>Difficulty</BodySMedium>
                      </label>
                      <StatusFilter
                        status={inputValue.difficulty} // Pass selected difficulty as status prop
                        onSelectStatus={handleSelectDifficulty} // Step 2: Pass the callback function
                      />
                    </InputLabelDiv>
                  </div>
                  <InputLabelDiv>
                    <label>
                      <BodySMedium>Guidelines</BodySMedium>
                    </label>
                    <TextArea
                      disable={false}
                      placeholder={'Guidelines'}
                      error={false}
                      onChange={textAreaOnChange}
                      name={'guidelines'}
                      validate={() => null}
                      value={inputValue['guidelines']}
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
          style={{ borderTop: '16px solid white' }}
        >
          <TextIconBtnL
            disable={false}
            onClick={() => {
              onClickModalOpen(MODAL_TYPE.ADD_CUSTOM_QUESTION, {
                templateID,
              });
            }}
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<PlusIcon />}
            label="Add Question"
          />
        </Stack>
      </>
      <GlobalModal></GlobalModal>
    </OverviewDetails>
  );
};

export default QuestionList;
