import { ModalContentWrap } from './StyledModalContents';
import { useRef } from 'react';
import CustomQuestionForm from '@/components/pages/interview/overview_detail/CustomQuestionForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectInterviewDetail } from '@/features/interviewDetail/interviewDetailSlice';
import { useAddTemplateQuestionMutation, useUpdateTemplateQuestionMutation } from '@/features/templates/templatesQuestionsAPISlice';
import { useUpdateQuestionMutation } from '@/features/questions/questionsAPISlice';

const AddCustomQuestion = () => {
  const { templateId } = useParams();
  const { selectedSection } = useSelector(selectInterviewDetail);
  const [newQuestion] = useAddTemplateQuestionMutation();
  const [updateQuestion] = useUpdateTemplateQuestionMutation();


  const templateID = templateId;
  const customQuestionFormRef = useRef(null);
  const handleQuestionCreated = async (question: {}) => {
    const requestData = {
      template_id: templateID,
      topic: String(selectedSection.id),
      question: question,
    };
    try {
      await newQuestion(requestData).unwrap();
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error('Failed to add question:', error);
    }
  };
  const handleQuestionEdit = async (question: {}) => {
    const requestData = {
      id:'31',
      template_id: templateID,
      topic: String(selectedSection.id),
      question: question,
    };
    console.log(requestData)
    try {
      await updateQuestion(requestData).unwrap();
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
        handleQuestionEdit={handleQuestionEdit}
      />
    </ModalContentWrap>
  );
};

export default AddCustomQuestion;
