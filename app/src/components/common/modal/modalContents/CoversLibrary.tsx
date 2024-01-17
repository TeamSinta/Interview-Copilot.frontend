import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
  BtnContainer,
  Container,
  ImageStyle,
  ImgContainer,
  ModalContentWrap,
} from './StyledModalContents';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { closeModal } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useUpdateTemplateMutation } from '@/features/templates/templatesAPISlice';

const preSelectedCovers = [
  'cover_6.jpg',
  'cover_7.jpg',
  'cover_3.jpg',
  'cover_1.jpg',
  'cover_4.jpg',
  'cover_5.jpg',
];
const path = '/images/';
const CoverLibrary = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [updateTemplate, { isLoading }] = useUpdateTemplateMutation();

  const handleSave = async () => {
    try {
      if (!selectedImg) {
        console.error('No file selected.');
        return;
      }

      if (!templateId) {
        console.error('Template ID is undefined.');
        return;
      }

      const data = await fetch(path + selectedImg);
      const blob = await data.blob();
      const formData = new FormData();
      formData.append('id', templateId);
      formData.append('image', blob, selectedImg);

      await updateTemplate(formData).unwrap();
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
          {preSelectedCovers.map((img, index) => (
            <ImgContainer key={img} onClick={() => setSelectedImg(img)}>
              <ImageStyle
                src={path + img}
                alt={img}
                style={{
                  border: selectedImg === img ? '2px solid #6462F1' : 'none',
                  boxShadow:
                    selectedImg === img
                      ? '0 8px 8px 0 rgb(206, 205, 238), 0 8px 20px 0 rgb(206, 205, 238)'
                      : 'none',
                }}
              />
            </ImgContainer>
          ))}
        </Container>
      </Stack>
      <BtnContainer>
        <TextBtnL
          label="Save"
          disable={!selectedImg || isLoading}
          onClick={handleSave}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </BtnContainer>
    </ModalContentWrap>
  );
};

export default CoverLibrary;
