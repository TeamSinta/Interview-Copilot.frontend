import { AppDispatch } from '@/app/store';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import TemplateInterviewCard from '@/components/common/cards/templateInterviewCard/TemplateInterviewCard';
import Loading from '@/components/common/elements/loading/Loading';
import DropdownFilter from '@/components/common/filters/dropdownFilter/DropdownFilter';
import SearchInput from '@/components/common/form/serchInput/SearchInput';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { IQuestionsBanks } from '@/features/interviews/interviewsInterface';
import { openModal } from '@/features/modal/modalSlice';
import {
  getQuestionsBank,
  selectQuestionsBank,
} from '@/features/questions/questionBankSlice';
import { useGetQuestionBanksQuery } from '@/features/questions/questionsAPISlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GridContainer } from '../StyledQuestions';

const QuestionBankTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { questionsBank } = useSelector(selectQuestionsBank);

  const onClickModalOpen = () => {
    dispatch(
      openModal({
        modalType: MODAL_TYPE.CREATE_QUEST_BANK,
      })
    );
  };

  const {
    data: questionBanks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionBanksQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getQuestionsBank(questionBanks));
    }
  }, [isSuccess, questionBanks, dispatch]);

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

  const handleCardClick = (questionBank: number) => {
    navigate(`/questionbank/${questionBank}`);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={4}
        alignContent={'center'}
        sx={{ alignItems: 'flex-end', alignContent: 'center' }}
      >
        <ElWrap w={180}>
          <TextIconBtnL
            disable={false}
            onClick={onClickModalOpen}
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<PlusIcon />}
            label="Add New"
          />
        </ElWrap>
        <Box sx={{ width: '50%' }}>
          <SearchInput
            disable={false}
            placeholder={'Search for a question template'}
            error={false}
          />
        </Box>
        <ElWrap w={180}>
          <DropdownFilter
            label="Sort By"
            optionArr={[
              { name: 'Name (A-Z)', value: 'name-asc' },
              { name: 'Name (Z-A)', value: 'name-desc' },
              { name: 'Permission Level', value: 'permission' },
            ]}
            dropdownName="sort"
            value={''}
          />
        </ElWrap>
      </Stack>

      <Box mt={7}></Box>
      <GridContainer>
        {questionsBank.map((QuestionBank: IQuestionsBanks) => (
          <TemplateInterviewCard
            {...QuestionBank}
            disable={false}
            key={QuestionBank.id}
            onClick={() => handleCardClick(QuestionBank.id)}
          />
        ))}
      </GridContainer>
      <GlobalModal />
    </>
  );
};

export default QuestionBankTab;
