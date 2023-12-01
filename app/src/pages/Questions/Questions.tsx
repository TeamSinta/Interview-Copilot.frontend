import DropdownFilter from "@/components/common/filters/dropdownFilter/DropdownFilter";
import TextIconFilter from "@/components/common/filters/textIconFilter/TextIconFilter";
import SearchInput from "@/components/common/form/serchInput/SearchInput";
import { BodySMedium, H1 } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { Box, Stack } from "@mui/material";
import * as React from "react";
import { GridContainer } from "./StyledQuestions";
import TemplateInterviewCard from "@/components/common/cards/templateInterviewCard/TemplateInterviewCard";
import { useSelector } from "react-redux";
import { IQuestionsBank } from "@/features/interviews/interviewsInterface";
import { RootState } from "@/app/store";
import QuestionsStage from "./QuestionsTab/QuestionsStage";
import { useGetQuestionBanksQuery } from "@/features/questions/questionsAPISlice";
import Loading from "@/components/common/elements/loading/Loading";
import QuestionBankTab from "./QuestionBanksTab/QuestionBankTab";

const Questions = () => {
  const TABS = {
    BANK: "QuestionBanks",
    QUESTIONS: "Questions",
  };
  const [activeTab, setActiveTab] = React.useState(TABS.BANK);

  const workspace = useSelector((state: RootState) => state.workspace);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: string; // Change the type to string
    value: string; // Change the type to string
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <BodySMedium>{children}</BodySMedium>
          </Box>
        )}
      </div>
    );
  }
  return (
    <>
      <Stack spacing={3}>
        <Box>
          <BodySMedium
            style={{
              color: "grey",
            }}
          >
            {workspace.name}'s Team Library
          </BodySMedium>
          <H1>Questions</H1>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              padding: "2px",
              gap: "12px",
              display: "flex",
              marginBottom: "22px",
            }}
          >
            <TextIconFilter
              label="Question Bank"
              select={activeTab === TABS.BANK}
              onClick={() => handleTabChange(TABS.BANK)}
            />
            <TextIconFilter
              label="Questions"
              select={activeTab === TABS.QUESTIONS}
              onClick={() => handleTabChange(TABS.QUESTIONS)}
            />
          </Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              padding: "2px",
              gap: "12px",
              display: "flex",
              marginBottom: "24px",
            }}
          ></Box>
          {activeTab === TABS.BANK && (
            <CustomTabPanel value={activeTab} index={TABS.BANK}>
              <QuestionBankTab />
            </CustomTabPanel>
          )}
          {activeTab === TABS.QUESTIONS && (
            <CustomTabPanel value={activeTab} index={TABS.QUESTIONS}>
              <Box sx={{ width: "100%" }}>
                <SearchInput
                  disable={false}
                  placeholder={"Search for a question"}
                  error={false}
                />
                <QuestionsStage />
              </Box>
            </CustomTabPanel>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default Questions;
