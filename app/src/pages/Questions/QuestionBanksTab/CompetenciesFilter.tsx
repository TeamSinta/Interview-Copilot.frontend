import React, { useEffect, useState } from "react";
import { OverviewSections } from "@/components/pages/interview/overview_section/StyledOverviewSection";
import {
  CompetencesOverviewSections,
  CompetencesWrap,
} from "../StyledQuestions";
import { InputLayout } from "@/components/common/form/input/StyledInput";
import Competencies from "@/components/common/elements/competencies/Competencies";

import SearchInput from "@/components/common/form/serchInput/SearchInput";
import { useGetQuestionsQuery } from "@/features/questions/questionsAPISlice";
import Loading from "@/components/common/elements/loading/Loading";

let competencies: any[] = [];

for (var i = 1; i <= 30; i++) {
  competencies.push(i);
}

const CompetenciesFilter: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<Array<string>>([]);
  const [competencies, setCompetencies] = useState<string[]>([]);

  const {
    data: questionsResponse,
    isLoading,
    isError,
    error,
  } = useGetQuestionsQuery();

  useEffect(() => {
    if (questionsResponse) {
      // Extract unique competencies from questions
      const extractedCompetencies = new Set<string>();
      questionsResponse.forEach((question) => {
        if (question.competency) {
          extractedCompetencies.add(question.competency);
        }
      });
      setCompetencies(Array.from(extractedCompetencies));
    }
  }, [questionsResponse]);

  const onSelectComp = (value: string) => {
    const temp = selectedComp.includes(value)
      ? selectedComp.filter((comp) => comp !== value) // If already selected, remove it
      : [...selectedComp, value]; // Otherwise, add it
    setSelectedComp(temp);
  };

  const checkActive = (value: string) => selectedComp.includes(value);

  if (isLoading) {
    return <Loading />; // Your loading component
  }

  if (isError) {
    return <div>Error: {error}</div>; // Error handling
  }

  return (
    <CompetencesOverviewSections>
      <InputLayout>
        <SearchInput
          disable={false}
          placeholder={"Search for Competencies"}
          error={false}
        />
        <CompetencesWrap>
          {competencies.map((index: number) => (
            <Competencies
              label={index}
              key={index}
              selected={checkActive(index)}
              onClick={() => {
                onSelectComp(index);
              }}
            ></Competencies>
          ))}
        </CompetencesWrap>
      </InputLayout>
    </CompetencesOverviewSections>
  );
};

export default CompetenciesFilter;
