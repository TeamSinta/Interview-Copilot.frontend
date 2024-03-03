import { AppDispatch } from '@/app/store';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import TemplateHomeCard from '@/components/common/cards/teamplateHomeCard/TemplateHomeCard';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { EditIcon, PlusIcon } from '@/components/common/svgIcons/Icons';
import {
  BodyLMedium,
  BodyMMedium,
  H1,
  H2Bold,
  H2Medium,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { openModal } from '@/features/modal/modalSlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { Box, Stack } from '@mui/material';
import { Key, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InterviewsBox, TemplateCardsBox } from '../Dashboard/StyledDashboard';
import { CreateInterviewBox, DepartmentHeading } from './StyledTemplates';

import templateImage from '@/assets/images/LogInPageIllustration.jpg';
import {
  IconBtnL,
  IconBtnM,
} from '@/components/common/buttons/iconBtn/IconBtn';

import Loading from '@/components/common/elements/loading/Loading';
import DropdownFilter from '@/components/common/filters/dropdownFilter/DropdownFilter';

import { useGetTemplatesQuery } from '@/features/templates/templatesAPISlice';
import { TemplateQuestions } from '@/features/templates/templatesInterface';
import { useGetTemplateQuestionsQuery } from '@/features/templates/templatesQuestionsAPISlice';
import { IMember } from '@/types/company';
import { StyledImage } from '../Login/StyledLogin';
import { Files, GalleryVerticalEnd, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Template {
  roundId: Key | null | undefined;
  role_title: string;
  disable: boolean;
  interviewers?: IMember[];
  id: string;
  image: string;
  department?: string;
}

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [templateData, setTemplateData] = useState<Template[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const { data: templateQuestions } = useGetTemplateQuestionsQuery();

  const getFilteredTemplateQuestionsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): object => {
    if (!templateQuestions || !templateId) {
      return [];
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    return filteredQuestions;
  };

  const getFilteredTemplateTopicsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): object => {
    if (!templateQuestions || !templateId) {
      return {};
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    const topics = Array.from(
      new Set(filteredQuestions.map((question) => question.topic))
    );
    return topics;
  };

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  const arg = {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: () => {
      onClickModalOpen(MODAL_TYPE.CREATE_INT);
    },
  };

  const { data: templates, isLoading, isSuccess } = useGetTemplatesQuery();

  useEffect(() => {
    if (isSuccess && templates?.length > 0) {
      setTemplateData(templates);

      if (Array.isArray(templates) && templates?.length === 0) {
        const timeout = setTimeout(() => {
          setShowEmptyState(true);
        }, 500); // Delay of 500 milliseconds

        return () => clearTimeout(timeout);
      }
    }
  }, [isSuccess, templates]);

  if (isLoading) {
    return <Loading />; // Render the loading component when data is still loading
  }

  const handleCardClick = (templateId: string) => {
    if (templateId) navigate(`/templates/${templateId}`);
  };

  const templatesByDepartment: { [key: string]: Template[] } =
    templateData.reduce((groups, template: Template) => {
      const department = template.department ?? 'General';

      if (!groups[department]) {
        groups[department] = [];
      }

      groups[department].push(template);
      return groups;
    }, {} as { [key: string]: Template[] });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const x = scrollContainerRef.current
      ? e.pageX - scrollContainerRef.current.offsetLeft
      : e.pageX; // if there's no ref, just use the pageX value as fallback
    setStartX(x);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = scrollContainerRef.current
      ? e.pageX - scrollContainerRef.current.offsetLeft
      : e.pageX;

    const scrollDistance = x - startX;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollDistance;
    }

    setStartX(x);
  };

  const mainContent = () => {
    // Conditional rendering based on whether template data is empty

    if (templateData === null) {
      return <Loading />;
    } else if (templateData.length > 0 && !showEmptyState) {
      return (
        <>
          <Stack direction="column" spacing={1}>
            <H2Bold>Create a Template</H2Bold>

            <CreateInterviewBox
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              ref={scrollContainerRef}
            >
              <Box>
                <ElWrap w={168} h={114}>
                  <IconBtnL {...arg} />
                </ElWrap>
                <BodyMMedium style={{ color: 'black', marginTop: '4px' }}>
                  + New Template
                </BodyMMedium>
              </Box>
            </CreateInterviewBox>
          </Stack>
          <Stack direction="column" spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{ marginTop: '32px' }}
            >
              <H2Medium style={{ marginTop: '18px' }}>Your Templates</H2Medium>

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

            {Object.entries(templatesByDepartment).map(
              ([department, templates]) => (
                <Stack
                  key={department}
                  direction="column"
                  spacing={1}
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                >
                  <InterviewsBox>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ width: '100%' }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <DepartmentHeading>{department}</DepartmentHeading>
                        <BodyLMedium> · </BodyLMedium>
                        <BodyLMedium style={{ color: 'grey' }}>
                          {templates?.length} Roles
                        </BodyLMedium>
                      </Stack>
                      <Box style={{ margin: '8px' }}>
                        <ElWrap w={32} h={32}>
                          <IconBtnM
                            icon={<EditIcon />}
                            disable={false}
                            className={BackgroundColor.WHITE}
                            onClick={() => {}}
                          />
                        </ElWrap>
                      </Box>
                    </Stack>
                    <TemplateCardsBox>
                      {templates.map(
                        (
                          template: Template // Specify the Template type
                        ) => (
                          <TemplateHomeCard
                            key={template.id}
                            title={template.role_title}
                            disable={template.disable || false}
                            questions={getFilteredTemplateQuestionsLength(
                              templateQuestions,
                              template.id
                            )}
                            sections={getFilteredTemplateTopicsLength(
                              templateQuestions,
                              template.id
                            )}
                            imageUrl={template.image}
                            members={template.interviewers ?? []}
                            // Include other template information as needed
                            onClick={() => handleCardClick(template.id)}
                          />
                        )
                      )}
                    </TemplateCardsBox>
                  </InterviewsBox>
                </Stack>
              )
            )}
            <GlobalModal></GlobalModal>
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <H1>Templates</H1>

          <div className="flex items-center flex-col mt-12  gap-4 h-96 justify-end ">
            <div className="flex flex-col items-center text-center	  gap-4 w-[400px]">
              <Files />
              <div>
                <h2 className="scroll-m-20 border-b mb-1 text-2xl font-semibold tracking-tight first:mt-0">
                  No interview templates yet.
                </h2>
                <p className="leading-7 [&:not(:first-child)]: text-gray-500">
                  {' '}
                  Work’s always better together. Start by creating a interview
                  template.{' '}
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                onClickModalOpen(MODAL_TYPE.CREATE_INT);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </div>
          <GlobalModal></GlobalModal>
        </>
      );
    }
  };

  return <>{mainContent()}</>;
};

export default Templates;
