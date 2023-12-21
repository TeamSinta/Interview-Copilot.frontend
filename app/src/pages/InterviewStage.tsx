import { AppDispatch, RootState } from '@/app/store';
import {
  IconBtnL,
  IconBtnM,
} from '@/components/common/buttons/iconBtn/IconBtn';
import InterviewRoundCard from '@/components/common/cards/interviewRoundCard/InterviewRoundCard';
import { IMember } from '@/components/common/cards/teamplateHomeCard/TemplateHomeCard';
import Loading from '@/components/common/elements/loading/Loading';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import {
  EditIcon,
  PlusIcon,
  Star1Icon,
} from '@/components/common/svgIcons/Icons';
import {
  BodyLBold,
  BodyLMedium,
  H2Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import {
  InterviewOverviewContainer,
  InterviewOverviewLayout,
  InterviewStageBox,
  InterviewStageCardContainer,
  InterviewStageContainer,
  InterviewStageTopContainer,
  Subtitle,
  Title,
} from '@/components/pages/interview/StyledInterview';
import InterviewOverviewDetails from '@/components/pages/interview/overview_detail/InterviewOverviewDetails';
import InterviewOverviewInterviewer from '@/components/pages/interview/overview_interviewer/InterviewOverviewInterviewer';
import InterviewOverviewSections from '@/components/pages/interview/overview_section/InterviewOverviewSections';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import { getInterviewDetailAsync } from '@/features/interviewDetail/interviewDetailSlice';
import { openModal } from '@/features/modal/modalSlice';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import { useGetTemplatesQuery } from '@/features/templates/templatesAPISlice';
import { TemplateQuestions } from '@/features/templates/templatesInterface';
import { useGetTemplateQuestionsQuery } from '@/features/templates/templatesQuestionsAPISlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Template } from './Templates_/Templates';

const InterviewStage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState<Template[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [departmentId, setDepartmentId] = useState('');
  const [sortCriteria, setSortCritiera] = useState('');

  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);

  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const {
    data: templates,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTemplatesQuery();

  const { data: templateQuestions } = useGetTemplateQuestionsQuery();

  const departments = useFetchCompanyDepartments(companyId as CompanyID);

  const handleSetDepartment = (value: string) => {
    setDepartmentId(value);
  };
  const handleSortMembers = (value: string) => {
    setSortCritiera(value);
  };

  useEffect(() => {
    if (templateId) {
      dispatch(getInterviewDetailAsync(templateId));
    }
    if (isSuccess) {
      setTemplateData(templates);
    }
  }, [dispatch, isSuccess, templateId, templates]);

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

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(openModal({ modalType }));
  };

  const handleCardClick = (roundId: string) => {
    navigate(`/templates/${roundId}`);
  };

  const numericTemplateId = Number(templateId || 0);
  const currentTemplate = templateData.find(
    (t) => Number(t.id) === numericTemplateId
  );
  const templatesOfSameDepartment = currentTemplate
    ? templateData.filter((t) => t.department === currentTemplate.department)
    : [];

  const getFilteredTemplateQuestionsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): number => {
    if (!templateQuestions || !templateId) {
      return 0; // Return 0 if templateQuestions or templateId is not available
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    return filteredQuestions.length;
  };

  return (
    <InterviewStageContainer>
      <InterviewStageTopContainer>
        <Subtitle>
          <BodyLMedium className="inactive">Templates</BodyLMedium>
          <Star1Icon />

          <BodyLMedium className="inactive">{`${
            currentTemplate?.department || 'General'
          } `}</BodyLMedium>
          <Star1Icon />
          <BodyLBold>{`${currentTemplate?.role_title || ''} `}</BodyLBold>
        </Subtitle>
        <InterviewStageCardContainer>
          <InterviewStageBox
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            ref={scrollContainerRef}
          >
            {templatesOfSameDepartment.map((template: Template, index) => (
              <InterviewRoundCard
                key={index}
                templateId={template.id}
                imageUrl={template.image}
                title={template.role_title}
                numberOfQuestions={`${getFilteredTemplateQuestionsLength(
                  templateQuestions,
                  template.id
                )} Questions`}
                onClick={() => handleCardClick(template.id)}
                selected={Number(template.id) === numericTemplateId}
                members={template.interviewers?.map((interviewer: IMember) => ({
                  first_name: interviewer.first_name,
                  last_name: interviewer.last_name, // Assuming interviewer has a name property
                  profile_picture: interviewer.profile_picture, // You mentioned it's stored in profileURL
                }))}
              />
            ))}
            <ElWrap w={56} h={134}>
              <IconBtnL
                disable={false}
                onClick={() => {
                  onClickModalOpen(MODAL_TYPE.CREATE_INT);
                }}
                className={BackgroundColor.ACCENT_PURPLE}
                icon={<PlusIcon />}
              />
            </ElWrap>
          </InterviewStageBox>
        </InterviewStageCardContainer>
      </InterviewStageTopContainer>
      <InterviewOverviewContainer>
        <Title>
          <H2Bold>Interview Overview</H2Bold>
          <ElWrap w={32} h={32}>
            <IconBtnM
              icon={<EditIcon />}
              disable={false}
              className={BackgroundColor.WHITE}
              onClick={() => {
                onClickModalOpen(MODAL_TYPE.EDIT_INT);
              }}
            />
          </ElWrap>
        </Title>
        <GlobalModal></GlobalModal>
        <InterviewOverviewLayout>
          <div className="side">
            <InterviewOverviewInterviewer />
            <InterviewOverviewSections />
          </div>
          <InterviewOverviewDetails />
        </InterviewOverviewLayout>
      </InterviewOverviewContainer>
    </InterviewStageContainer>
  );
};

export default InterviewStage;
