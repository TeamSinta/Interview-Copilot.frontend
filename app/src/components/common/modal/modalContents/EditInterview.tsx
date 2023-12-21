import { AppDispatch, RootState } from '@/app/store';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { closeModal } from '@/features/modal/modalSlice';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';

import { CoverPictureContainer } from '@/pages/Interview/StyledInterview';
import { Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import {
  useDeleteTemplateMutation,
  useGetTemplateDetailQuery,
  useUpdateTemplateMutation,
} from '@/features/templates/templatesAPISlice';
import { TextIconBtnL } from '../../buttons/textIconBtn/TextIconBtn';
import { BinIcon, DocumentIcon } from '../../svgIcons/Icons';

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'role_title',
};

const descriptionInputArg = {
  error: false,
  disable: false,
  placeholder: 'Description',
  name: 'description',
};

interface IState {
  [key: string]: any;
  role_title: string;
  description: string;
}

const EditInterviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const workspace = useSelector((state: RootState) => state.workspace);

  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const [inputValue, setInputValue] = useState<IState>({
    role_title: '',
    description: '',
  });

  // Example hook to fetch template details - replace with your actual implementation
  const { data: templateData } = useGetTemplateDetailQuery({
    company_id: companyId,
    id: templateId,
  });

  useEffect(() => {
    if (templateData) {
      setInputValue({
        role_title: templateData.role_title,
        description: templateData.description,
      });
    }
  }, [templateData]);

  const [updateTemplate] = useUpdateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleNext = async () => {
    try {
      const requestData = {
        id: templateId,
        ...inputValue, // Assuming your update endpoint needs these fields
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

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,

      [event.target.name]: event.target.value,
    });
  };

  const textAreaOnChange = (value: string) => {
    inputValue['detail'] = value;
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          onChange={inputOnChange}
          value={inputValue['role_title']}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>
        {/* Need to switch back to textAREA component, Suwon help plsss? */}

        <TextArea
          {...descriptionInputArg}
          onChange={textAreaOnChange}
          value={inputValue['description']}
        />
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
              onClick={() => {}}
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
