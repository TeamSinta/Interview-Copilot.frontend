import { AppDispatch, RootState } from '@/app/store';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { IQuestion } from '@/features/interviews/interviewsInterface';
import {
  resetQuestionBank,
  selectInterview,
  setSelectedQuestion,
} from '@/features/interviews/interviewsSlice';
import { closeModal } from '@/features/modal/modalSlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { IconBtnM } from '../../buttons/iconBtn/IconBtn';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { TextIconBtnL } from '../../buttons/textIconBtn/TextIconBtn';
import Competencies from '../../elements/competencies/Competencies';
import { CloseIcon, PlusIcon } from '../../svgIcons/Icons';
import {
  BodyLBold,
  BodyLMedium,
  H2Bold,
} from '../../typeScale/StyledTypeScale';
import {
  QuestionBody,
  QuestionLayout,
  QuestionListWrap,
  QuestionNumber,
  QuestionsFilterWrap,
  SelectedQuestionList,
  SelectedQuestionListWrap,
  TemplateBody,
  TemplateLayout,
} from './StyledModalContents';
import TemplateList from './TemplateList';
import QuestionList from './QuestionList';
import axios from 'axios';
import { instance } from '@/utils/axiosService/customAxios';

const SelectTemplate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedQuestion, selectedQuestionBank } =
    useSelector(selectInterview);
  const navigate = useNavigate();
  const templateID = useSelector((state: RootState) => state.modal.templateID);
  const [templateTopics, setTemplateTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const addQuestionsToTemplate = async () => {
    try {
      // Mapping selected questions to the required payload format
      const payload = selectedQuestion.map((question: IQuestion) => ({
        template_topic_id: selectedTopic.id,
        question_id: question.id, // Assuming the question object has an 'id' property
      }));

      const response = await instance.post(
        `${import.meta.env.VITE_BACKEND_URL}/templates/${
          templateID.templateID
        }/questions/add/`,
        payload
      );

      if (response.status === 201 || response.status === 200) {
        dispatch(resetQuestionBank());
        dispatch(closeModal());
        navigate(`/templates/${templateID.templateID}`);
        navigate(0);
      } else {
        // Handle unsuccessful response here
        console.error('Failed to add questions to the template.');
      }
    } catch (error) {
      // Handle the error here
      console.error('Error making API request:', error);
    }
  };

  useEffect(() => {
    // Fetch the template topics from the API when the component mounts.
    const fetchTemplateTopics = async () => {
      try {
        const response = await instance.get(
          `${import.meta.env.VITE_BACKEND_URL}/templates/${
            templateID.templateID
          }/topics/`
        );
        setTemplateTopics(response.data);

        // By default, set the first topic as the selected one.
        if (response.data.length > 0) {
          setSelectedTopic(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching template topics:', error);
      }
    };

    fetchTemplateTopics();
  }, [templateID]);
  useEffect(() => {}, [selectedQuestion, selectedQuestionBank]);

  return (
    <>
      {/* ===== Templates Start ===== */}
      <TemplateLayout>
        <H2Bold>Templates</H2Bold>
        <TemplateBody>
          {selectedQuestionBank.id === 0 ? <TemplateList /> : <QuestionList />}
          <Outlet />
        </TemplateBody>
      </TemplateLayout>
      {/* ===== Templates End ===== */}
      {/* ===== Questions Start ===== */}
      <QuestionLayout>
        <H2Bold>Added Questions</H2Bold>
        <QuestionBody>
          {selectedQuestion.length === 0 ? (
            <>
              <div className="none-q">
                Here will be the questions that you add from the templates
              </div>
            </>
          ) : (
            <QuestionListWrap>
              <QuestionsFilterWrap>
                <div className="lists">
                  {templateTopics.map((topic) => (
                    <Competencies
                      label={topic.topics_text} // assuming each topic has a name property
                      selected={selectedTopic?.id === topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      key={topic.id}
                    />
                  ))}
                </div>
              </QuestionsFilterWrap>
              <SelectedQuestionListWrap>
                {selectedQuestion.map((question: IQuestion, index: number) => (
                  <div className="view" key={question.id}>
                    <SelectedQuestionList>
                      <QuestionNumber>{index + 1}</QuestionNumber>
                      <div className="title">
                        <BodyLMedium>{question.question_text}</BodyLMedium>
                      </div>
                      <ElWrap h={32} w={32}>
                        <IconBtnM
                          icon={<CloseIcon />}
                          disable={false}
                          onClick={() => {
                            dispatch(
                              setSelectedQuestion({
                                selectedQuestion: question,
                              })
                            );
                          }}
                          className={BackgroundColor.WHITE}
                        />
                      </ElWrap>
                    </SelectedQuestionList>
                  </div>
                ))}
              </SelectedQuestionListWrap>
            </QuestionListWrap>
          )}
          <>
            <div className="questions-length">
              <BodyLBold>{selectedQuestion.length} Questions</BodyLBold>
            </div>
            <div className="btn-wrap">
              <TextBtnL
                label="Skip"
                disable={false}
                onClick={() => navigate(0)}
                className={BackgroundColor.WHITE}
              />
              <TextIconBtnL
                label="Add to Round"
                disable={false}
                className={BackgroundColor.ACCENT_PURPLE}
                onClick={addQuestionsToTemplate}
                icon={<PlusIcon />}
              />
            </div>
          </>
        </QuestionBody>
      </QuestionLayout>
      {/* ===== Questions End ===== */}
    </>
  );
};

export default SelectTemplate;
