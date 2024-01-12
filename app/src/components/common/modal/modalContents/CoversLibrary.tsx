import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
  BtnContainer,
  Container,
  ModalContentWrap,
  SvgContainer,
  SvgImage,
} from './StyledModalContents';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useUpdateTemplateMutation } from '@/features/templates/templatesAPISlice';

const preSelectedCovers = [
  '/public/images/cover_6.jpg',
  '/public/images/cover_7.jpg',
  '/public/images/Cover_3.jpg',
  '/public/images/Cover_1.jpg',
  '/public/images/Cover_4.jpg',
  '/public/images/Cover_5.jpg',
];

const CoverLibrary = () => {
  const [selectedSvg, setSelectedSvg] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [updateTemplate] = useUpdateTemplateMutation();

  const handleSave = async () => {
    try {
      if (!selectedSvg) {
        console.error('No file selected.');
        return;
      }

      if (!templateId) {
        console.error('Template ID is undefined.');
        return;
      }

      const data = await fetch(selectedSvg);
      const blob = await data.blob();

      const formData = new FormData();
      formData.append('id', templateId);
      formData.append('image', blob, 'cover_2.jpg');

      const response = await updateTemplate(formData).unwrap();
      console.log('Update template data ===> ', response);
      dispatch(closeModal());
      navigate(0);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  return (
    <ModalContentWrap>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ alignItems: 'center' }}
      >
        <Container>
          {preSelectedCovers.map((svg, index) => (
            <SvgContainer key={index} onClick={() => setSelectedSvg(svg)}>
              <SvgImage
                src={svg}
                alt={`SVG ${index + 1}`}
                style={{
                  border: selectedSvg === svg ? '2px solid #6462F1' : 'none',
                  boxShadow:
                    selectedSvg === svg
                      ? '0 8px 8px 0 rgb(206, 205, 238), 0 8px 20px 0 rgb(206, 205, 238)'
                      : 'none',
                }}
              />
            </SvgContainer>
          ))}
        </Container>
      </Stack>
      <BtnContainer>
        <TextBtnL
          label="Save"
          disable={!selectedSvg}
          onClick={handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </BtnContainer>
    </ModalContentWrap>
  );
};

export default CoverLibrary;
