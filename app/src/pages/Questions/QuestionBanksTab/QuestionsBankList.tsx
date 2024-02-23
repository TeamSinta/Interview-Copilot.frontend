import { IconBtnM } from '@/components/common/buttons/iconBtn/IconBtn';

import {
  CloseIcon,
  DocumentIcon,
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
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { IQuestion } from '@/features/interviews/interviewsInterface';
import { BackgroundColor } from '@/features/utils/utilEnum';
import React, { useState } from 'react';

import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { Stack } from '@mui/material';
import {
  OnverviewDetailTitle,
  OverviewDetailBody,
  OverviewDetailList,
  OverviewDetailTitle,
  OverviewDetails,
} from '@/components/pages/interview/overview_detail/StyledOverviewDetail';
import {useDeleteQuestionFromQuestionBankMutation, useGetQuestionBankDetailQuery, useGetQuestionsQuery } from '@/features/questions/questionsAPISlice';
import Loading from '@/components/common/elements/loading/Loading';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { openModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import MarkdownFromatConatiner from '@/components/common/markdownFormatContainer/MarkdownFormatContainer';
import { useParams } from 'react-router-dom';


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

  const [ deleteQuestion ] = useDeleteQuestionFromQuestionBankMutation()
  const { questionBankId } = useParams(); // Replace 'questionBankId' with your actual parameter name
  const {
    refetch
    } = useGetQuestionBankDetailQuery(questionBankId);

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
  const deleteQuestionFromList = async (id : string) => {
    const questionData = {
      question_ids : [id],
      id : questionBankID
    };
   await deleteQuestion(questionData)
   await refetch()
  }
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
                      className={openItems.has(index) ? 'open' : 'close'}
                    >
                      <BodyMBold>{question.question_text}</BodyMBold>
                      <SelectArrowOpenIcon />
                    </OnverviewDetailTitle>
                  </div>
                  <div className="summary">
                    {question.competency !== null && (
                      <div className="comp" key={index}>
                        <BodySMedium>{question.competency}</BodySMedium>
                      </div>
                    )}
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
                          deleteQuestionFromList(question.id)
                        }}
                        icon={<CloseIcon />}
                        className={BackgroundColor.WHITE}
                      />
                    </ElWrap>
                  </div>
                </div>

                <div className={`detail ${openItems.has(index) ? '' : 'none'}`}>
                  <MarkdownFromatConatiner>
                    {question.guidelines}
                  </MarkdownFromatConatiner>
                </div>
              </OverviewDetailList>
            );
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
            onClick={() => {
              onClickModalOpen(MODAL_TYPE.ADD_CUSTOM_QUESTION, {
                questionBankID,
              });
            }}
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
