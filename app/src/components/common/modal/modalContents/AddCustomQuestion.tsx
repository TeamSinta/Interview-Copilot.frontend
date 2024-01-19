import { ModalContentWrap } from './StyledModalContents';
import { useRef } from 'react';
import CustomQuestionForm from '@/components/pages/interview/overview_detail/CustomQuestionForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectInterviewDetail } from '@/features/interviewDetail/interviewDetailSlice';
import { useAddTemplateQuestionMutation } from '@/features/templates/templatesQuestionsAPISlice';
import { useAddQuestionMutation } from '@/features/questions/questionsAPISlice';

const AddCustomQuestion = () => {
  const { templateId } = useParams();
  const { selectedSection } = useSelector(selectInterviewDetail);
  const [newQuestion] = useAddTemplateQuestionMutation();
  const [addQuestion] = useAddQuestionMutation();

  const templateID = templateId;
  const customQuestionFormRef = useRef(null);
  const handleQuestionCreated = async (question: {}) => {
    try {
      if (templateId) {
        const requestData = {
          template_id: templateID,
          topic: String(selectedSection.id),
          question: question,
        };
        await newQuestion(requestData).unwrap();
      } else {
        await addQuestion(question).unwrap();
      }
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error('Failed to add question:', error);
    }
  };

  return (
    <ModalContentWrap>
      <CustomQuestionForm
        ref={customQuestionFormRef}
        onQuestionCreated={handleQuestionCreated}
      />
    </ModalContentWrap>
  );
};

export default AddCustomQuestion;
