import { AppDispatch } from '@/app/store';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { closeModal, openModal } from '@/features/modal/modalSlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';

import { CoverPictureContainer } from '@/pages/Interview/StyledInterview';
import { Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ElWrap from '@/components/layouts/elWrap/ElWrap';
import {
  useDeleteTemplateMutation,
  useGetTemplateDetailQuery,
  useUpdateTemplateMutation,
} from '@/features/templates/templatesAPISlice';
import { TextIconBtnL } from '../../buttons/textIconBtn/TextIconBtn';
import { BinIcon, DocumentIcon } from '../../svgIcons/Icons';
import { MODAL_TYPE } from '../GlobalModal';

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'role_title',
};

const EditInterviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templateId } = useParams();
  const navigate = useNavigate();

  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);

  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );

  const [title, setTitle] = useState(''); // Separate state for title
  const [description, setDescription] = useState(''); // Separate state for description

  // Example hook to fetch template details - replace with your actual implementation
  const { data: templateData } = useGetTemplateDetailQuery(templateId);

  useEffect(() => {
    if (templateData) {
      setTitle(templateData?.role_title); // Directly set the title string
      setDescription(templateData?.description); // Directly set the description string
    }
  }, [templateData]);

  const [updateTemplate] = useUpdateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleNext = async () => {
    let hasError = false; // Track if there's any validation error

    if (!title.trim()) {
      if (titleInputRef.current) {
        titleInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the title is not empty
    }

    if (!description.trim()) {
      if (descriptionInputRef.current) {
        descriptionInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the description is not empty
    }

    if (hasError) {
      return; // Stop if there's any validation error
    }
    try {
      const requestData = {
        id: templateId,
        description: description,
        role_title: title, // Assuming your update endpoint needs these fields
        // Add other fields as required
      };

      await updateTemplate(requestData).unwrap();
      dispatch(closeModal());
      navigate(0);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error('Error updating template:', error);
    }
  };

  const handleDeleteTemplate = async () => {
    try {
      await deleteTemplate(templateId);
      dispatch(closeModal());
      navigate(`/templates`);
      navigate(0);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error('Error updating template:', error);
    }
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  const validateDescription = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium style={{ color: 'gray', textAlign: 'end' }}>
            Description is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const textAreaOnChange = (value: string) => {
    setDescription(value);
  };

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(openModal({ modalType }));
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          onChange={inputOnChange}
          value={title}
          validate={validateTitle}
          ref={titleInputRef}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>

        {templateData?.description && (
          <TextArea
            disable={false}
            placeholder={'Description'}
            error={false}
            validate={validateDescription}
            onChange={textAreaOnChange}
            name={'description'}
            value={templateData?.description}
            ref={descriptionInputRef}
          />
        )}
      </InputLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ alignItems: 'center' }}
      >
        <BodySMedium>Template Cover Photo</BodySMedium>
        <CoverPictureContainer>
          <ElWrap w={150}>
            <TextIconBtnL
              label="Change Cover"
              icon={<DocumentIcon />}
              disable={false}
              className={BackgroundColor.WHITE}
              onClick={() => {
                onClickModalOpen(MODAL_TYPE.COVER_LIBRARY);
              }}
            />
          </ElWrap>
        </CoverPictureContainer>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ alignItems: 'center' }}
      >
        <BodySMedium>Delete Template? </BodySMedium>
        <ElWrap w={150}>
          <TextIconBtnL
            label="Delete"
            icon={<BinIcon />}
            disable={false}
            className={BackgroundColor.WHITE}
            onClick={handleDeleteTemplate}
          />
        </ElWrap>
      </Stack>
      <div style={{ marginTop: '8px' }}>
        <TextBtnL
          label="Save"
          disable={false}
          onClick={handleNext}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default EditInterviews;
