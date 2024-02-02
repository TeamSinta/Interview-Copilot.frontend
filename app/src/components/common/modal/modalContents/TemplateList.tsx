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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useEffect, useState } from 'react';
import {
  getQuestionsBanksAsync,
  selectQuestionBank,
} from '@/features/interviews/interviewsSlice';
import { IQuestionsBanks } from '@/features/interviews/interviewsInterface';
import { useGetQuestionsBankQuery } from '@/features/interviews/interviewsAPI';
import { useParams } from 'react-router-dom';

const TemplateList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [questionBanks , setQuestionBanks] = useState([])
  const {templateId : template_id} = useParams()
  const { data: questionBanksData, isSuccess } = useGetQuestionsBankQuery(template_id);

  const onSelectQuestionBank = (bank: IQuestionsBanks) => {
    dispatch(selectQuestionBank({ questionBank: bank }));
  };

  useEffect(() => {
    dispatch(getQuestionsBanksAsync());
  }, [dispatch]);

  useEffect(() => {
    if(isSuccess){
      setQuestionBanks(questionBanksData)
    }
  },[isSuccess , questionBanksData ])
  return (
    <TemplateListWrap>
      <TemplateListInputWrap>
        <ElWrap h={40}>
          <SearchInput
            disable={false}
            placeholder={'Search for a questions'}
            error={false}
          />
        </ElWrap>
        {/* <div className="filterWrap">
          <BodySMedium>Role:</BodySMedium>
          <DropdownFilter
            optionArr={[{ name: 'Designer', value: 'Designer' }]}
            dropdownName={'Role'}
            value={''}
          />
        </div> */}
      </TemplateListInputWrap>
      <TemplateListContentWrap>
        {isSuccess ? (
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
