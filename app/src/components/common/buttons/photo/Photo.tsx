import { InitialsGenerator } from '@/utils/Utils';
import { useEffect, useState } from 'react';
import {
  Checked,
  NameCheckBox,
  PhotoCheckBox,
  PhotoCheckBoxCover,
  PhotoCheckBoxDiv,
} from './StyledPhoto';
import { PhotoType } from '@/features/utils/utilEnum';

export interface IPhotoProps {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  selected: boolean;
  onSelect: (memberIdx: number) => void;
  photoType: PhotoType.L | PhotoType.S;
}

const Photo = (props: IPhotoProps) => {
  const {
    id,
    firstName,
    lastName,
    profilePicture,
    selected,
    onSelect,
    photoType,
  } = props;

  const [selectPhoto, setSelectPhoto] = useState(selected);

  useEffect(() => {
    setSelectPhoto(selected);
  }, [selected]);

  return (
    <PhotoCheckBoxDiv
      photoType={photoType}
      onClick={() => {
        onSelect(id);
        setSelectPhoto(selectPhoto ? false : true);
      }}
      className={selectPhoto ? 'checked' : ''}
    >
      {
        // Check if profilePicture is null, empty, or contains only spaces
        profilePicture === null || profilePicture.trim() === '' ? (
          <NameCheckBox>{InitialsGenerator(firstName, lastName)}</NameCheckBox>
        ) : (
          <PhotoCheckBox url={profilePicture}></PhotoCheckBox>
        )
      }

      <PhotoCheckBoxCover></PhotoCheckBoxCover>
      <Checked className={selectPhoto ? 'checked' : ''}></Checked>
    </PhotoCheckBoxDiv>
  );
};

export default Photo;
