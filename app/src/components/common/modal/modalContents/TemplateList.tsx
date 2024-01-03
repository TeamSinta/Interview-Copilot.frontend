import ElWrap from '@/components/layouts/elWrap/ElWrap';
import DropdownFilter from '../../filters/dropdownFilter/DropdownFilter';
import SearchInput from '../../form/serchInput/SearchInput';
import { BodySMedium } from '../../typeScale/StyledTypeScale';
import {
  TemplateListContentWrap,
  TemplateListInputWrap,
  TemplateListWrap,
} from './StyledModalContents';
import TemplateInterviewCard from '../../cards/templateInterviewCard/TemplateInterviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useEffect } from 'react';
import {
  getQuestionsBanksAsync,
  selectInterview,
  selectQuestionBank,
} from '@/features/interviews/interviewsSlice';
import { IQuestionsBanks } from '@/features/interviews/interviewsInterface';
import { DataLoading } from '@/features/utils/utilEnum';

const TemplateList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questionBanks, status } = useSelector(selectInterview);

  const onSelectQuestionBank = (bank: IQuestionsBanks) => {
    dispatch(selectQuestionBank({ questionBank: bank }));
  };

  useEffect(() => {
    dispatch(getQuestionsBanksAsync());
  }, [dispatch]);

  return (
    <TemplateListWrap>
      <TemplateListInputWrap>
        <ElWrap w={462} h={40}>
          <SearchInput
            disable={false}
            placeholder={'Search for a questions'}
            error={false}
          />
        </ElWrap>
        <div className="filterWrap">
          <BodySMedium>Role:</BodySMedium>
          <DropdownFilter
            optionArr={[{ name: 'Designer', value: 'Designer' }]}
            dropdownName={'Role'}
            value={''}
          />
        </div>
      </TemplateListInputWrap>
      <TemplateListContentWrap>
        {status === DataLoading.FULFILLED ? (
          questionBanks.map((bank: IQuestionsBanks) => (
            <TemplateInterviewCard
              {...bank}
              disable={false}
              key={bank.id}
              onClick={() => {
                onSelectQuestionBank(bank);
              }}
            />
          ))
        ) : (
          <></>
        )}
      </TemplateListContentWrap>
    </TemplateListWrap>
  );
};

export default TemplateList;
