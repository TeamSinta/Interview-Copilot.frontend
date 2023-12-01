import DropdownFilter from "@/components/common/filters/dropdownFilter/DropdownFilter";
import SearchInput from "@/components/common/form/serchInput/SearchInput";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { Box, Stack } from "@mui/material";
import { GridContainer } from "../StyledQuestions";
import TemplateInterviewCard from "@/components/common/cards/templateInterviewCard/TemplateInterviewCard";
import { IQuestionsBank } from "@/features/interviews/interviewsInterface";
import { useGetQuestionBanksQuery } from "@/features/questions/questionsAPISlice";
import Loading from "@/components/common/elements/loading/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { PlusIcon } from "@/components/common/svgIcons/Icons";
import { BackgroundColor } from "@/features/utils/utilEnum";

const QuestionBankTab = () => {
  const navigate = useNavigate();
  const [loadedQuestionBanks, setQuestionBanks] = useState<string[]>([]);

  const {
    data: questionBanks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionBanksQuery();

  useEffect(() => {
    if (isSuccess) {
      setQuestionBanks(questionBanks);
    }
  }, [isSuccess, questionBanks]);

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

  const handleCardClick = (questionBank: string) => {
    navigate(`/questionbank/${questionBank}`);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={4}
        alignContent={"center"}
        sx={{ alignItems: "flex-end", alignContent: "center" }}
      >
        <ElWrap w={180}>
          <TextIconBtnL
            disable={false}
            onClick={() => {}}
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<PlusIcon />}
            label="Add New"
          />
        </ElWrap>
        <Box sx={{ width: "50%" }}>
          <SearchInput
            disable={false}
            placeholder={"Search for a question template"}
            error={false}
          />
        </Box>
        <ElWrap w={180}>
          <DropdownFilter
            label="Sort By"
            optionArr={[
              { name: "Name (A-Z)", value: "name-asc" },
              { name: "Name (Z-A)", value: "name-desc" },
              { name: "Permission Level", value: "permission" },
            ]}
            dropdownName="sort"
            value={""}
          />
        </ElWrap>
      </Stack>

      <Box mt={7}></Box>
      <GridContainer>
        {loadedQuestionBanks.map((QuestionBank: IQuestionsBank) => (
          <TemplateInterviewCard
            title={QuestionBank.title}
            questions={QuestionBank.questions}
            disable={false}
            key={QuestionBank.id}
            onClick={() => handleCardClick(QuestionBank.id)}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default QuestionBankTab;
