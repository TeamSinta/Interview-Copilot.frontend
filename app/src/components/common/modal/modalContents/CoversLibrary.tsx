import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
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
  '/public/svg/cover_1.svg',
  '/public/svg/Cover_2.svg',
  '/public/svg/Cover_3.svg',
  '/public/svg/Cover_4.svg',
  '/public/svg/Cover_5.svg',
  '/public/svg/Cover_6.svg',
];

const CoverLibrary = () => {
  const [selectedSvg, setSelectedSvg] = useState<string | Blob | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [updateTemplate] = useUpdateTemplateMutation();

  const handleSvgClick = async (svg: string) => {
    try {
      const response = await fetch(svg);

      if (!response.ok) {
        console.error('Failed to fetch SVG file:', response.status);
        return;
      }

      const blob = await response.blob();

      setSelectedSvg(blob);
    } catch (error) {
      console.error('Error fetching SVG file:', error);
    }
  };

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

      const formData = new FormData();
      formData.append('id', templateId);
      formData.append('image', selectedSvg, 'image.svg');

      const response = await updateTemplate({
        template: FormData,
        id: templateId,
      }).unwrap();
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
            <SvgContainer key={index} onClick={() => handleSvgClick(svg)}>
              <SvgImage
                src={svg}
                alt={`SVG ${index + 1}`}
                style={{
                  border: selectedSvg === svg ? '2px solid #6462F1' : 'none',
                }}
              />
            </SvgContainer>
          ))}
        </Container>
      </Stack>
      <div style={{ marginTop: '8px' }}>
        <TextBtnL
          label="Save"
          disable={!selectedSvg}
          onClick={handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default CoverLibrary;
