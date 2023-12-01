import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  H3Bold,
  BodyLBold,
  BodySMedium,
  BodyLMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import {
  OverviewSections,
  SectionLists,
  SectionList,
  EmptySectionContainer,
} from "./StyledOverviewSection";
import { DataLoading } from "@/features/utils/utilEnum";
import { Title } from "../StyledInterview";
import { useDispatch } from "react-redux";
import { setSelectedSection } from "@/features/interviewDetail/interviewDetailSlice";

import {
  TimeIcon,
  QuestionIcon,
  PlusIcon,
  BinIcon,
} from "@/components/common/svgIcons/Icons";
import { TimeQuestionDiv } from "../overview_detail/StyledOverviewDetail";
import { selectInterviewDetail } from "@/features/interviewDetail/interviewDetailSlice";
import { ISection } from "@/features/interviewDetail/inverviewDetailInterface";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { openModal } from "@/features/modal/modalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IconBtnM } from "@/components/common/buttons/iconBtn/IconBtn";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { Stack } from "@mui/material";
import { useDeleteTopicMutation } from "@/features/templates/templatesAPISlice";

const InterviewOverviewSections: React.FC = () => {
  const { sections, status, selectedSection, questions } = useSelector(
    selectInterviewDetail
  );

  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(
    selectedSection?.id || null
  );
  const { templateId } = useParams();
  const templateID = templateId;
  const [deleteTopic] = useDeleteTopicMutation();
  const navigate = useNavigate();

  const handleButtonClick = (sectionId: number) => {
    setActiveSectionId(sectionId);
    dispatch(setSelectedSection(sectionId));
  };

  // State to track the active section ID
  useEffect(() => {
    if (selectedSection) {
      setActiveSectionId(selectedSection.id);
    }
  }, [selectedSection]);

  const onClickModalOpen = (modalType: MODAL_TYPE, templateID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
      })
    );
  };

  const getRelevantQuestionCount = (sectionId: number) => {
    const section = sections.find(
      (sectionItem) => sectionItem.id === sectionId
    );
    if (!section) return 0;

    const relevantQs = questions?.filter((q) => q.topic === section.id) || [];
    return relevantQs.length;
  };

  const getTotalReplyTime = (sectionId: number) => {
    const section = sections.find(
      (sectionItem) => sectionItem.id === sectionId
    );
    if (!section) return 0;

    const relevantQs = questions?.filter((q) => q.topic === section.id) || [];
    return relevantQs.reduce(
      (acc, curr) => acc + (curr.question.reply_time || 0),
      0
    );
  };

  const handleDeleteTopic = async (topicID: number) => {
    try {
      await deleteTopic(topicID);
      navigate(0);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Error updating template:", error);
    }
  };
  return (
    <OverviewSections>
      <Title>
        <H3Bold>Sections</H3Bold>
      </Title>
      <SectionLists>
        {Array.isArray(sections) && sections.length > 0 ? (
          status === DataLoading.FULFILLED ? (
            sections.map((sectionItem: ISection, index: number) => {
              const questionCount = getRelevantQuestionCount(sectionItem.id);
              const totalReplyTime = getTotalReplyTime(sectionItem.id);

              return (
                <SectionList
                  key={index}
                  className={activeSectionId === sectionItem.id ? "active" : ""}
                  onClick={() => handleButtonClick(sectionItem)}
                  onMouseEnter={() => setHoveredSection(index)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "start",
                          gap: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <BodyLBold>{sectionItem.topics_text}</BodyLBold>
                        <TimeQuestionDiv>
                          <div className="icon-div">
                            <TimeIcon />
                            <BodySMedium>{totalReplyTime} min</BodySMedium>
                          </div>
                          <div className="icon-div">
                            <QuestionIcon />
                            <BodySMedium>{questionCount} Questions</BodySMedium>
                          </div>
                        </TimeQuestionDiv>
                      </div>
                    </div>

                    {hoveredSection === index && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ElWrap w={32} h={32}>
                          <IconBtnM
                            icon={<BinIcon />}
                            disable={false}
                            className={BackgroundColor.WHITE}
                            onClick={() => {
                              handleDeleteTopic(sectionItem.id);
                            }}
                          />
                        </ElWrap>
                      </div>
                    )}
                  </Stack>
                </SectionList>
              );
            })
          ) : (
            <></>
          )
        ) : (
          <EmptySectionContainer>
            {" "}
            <BodyLMedium>
              To get started, start by adding a topic or section for your
              interview
            </BodyLMedium>
          </EmptySectionContainer>
        )}
      </SectionLists>
      <div style={{ borderTop: "16px solid white" }}>
        <TextIconBtnL
          disable={false}
          onClick={() => {
            onClickModalOpen(MODAL_TYPE.SELECT_VAL, { templateID });
          }}
          className={BackgroundColor.ACCENT_PURPLE}
          icon={<PlusIcon />}
          label="Add New Section"
        />
      </div>
      <GlobalModal></GlobalModal>
    </OverviewSections>
  );
};

export default InterviewOverviewSections;
