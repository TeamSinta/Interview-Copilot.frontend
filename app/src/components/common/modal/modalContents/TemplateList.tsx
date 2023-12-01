import ElWrap from "@/components/layouts/elWrap/ElWrap";
import DropdownFilter from "../../filters/dropdownFilter/DropdownFilter";
import SearchInput from "../../form/serchInput/SearchInput";
import { BodySMedium } from "../../typeScale/StyledTypeScale";
import {
  TemplateListContentWrap,
  TemplateListInputWrap,
  TemplateListWrap,
} from "./StyledModalContents";
import TemplateInterviewCard from "../../cards/templateInterviewCard/TemplateInterviewCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useEffect } from "react";
import {
  getQuestionsBanksAsync,
  selectInterview,
  selectQuestionBank,
} from "@/features/interviews/interviewsSlice";
import { IQuestionsBank } from "@/features/interviews/interviewsInterface";
import { DataLoading } from "@/features/utils/utilEnum";

const TemplateList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questionBanks, status } = useSelector(selectInterview);

  const onSelectQuestionBank = (template: IQuestionsBank) => {
    dispatch(selectQuestionBank(template));
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
            placeholder={"Search for a questions"}
            error={false}
          />
        </ElWrap>
        <div className="filterWrap">
          <BodySMedium>Role:</BodySMedium>
          <DropdownFilter
            optionArr={[{ name: "Designer", value: "Designer" }]}
            dropdownName={"Role"}
          />
        </div>
      </TemplateListInputWrap>
      <TemplateListContentWrap>
        {status === DataLoading.FULFILLED ? (
          questionBanks.map((template: IQuestionsBank) => (
            <TemplateInterviewCard
              title={template.title}
              questions={template.questions}
              disable={false}
              key={template.id}
              onClick={() => {
                onSelectQuestionBank({ questionBank: template });
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
