import { InitialsGenerator } from "@/utils/Utils";
import { useEffect, useState } from "react";
import {
  Checked,
  NameCheckBox,
  PhotoCheckBox,
  PhotoCheckBoxCover,
  PhotoCheckBoxDiv,
} from "./StyledPhoto";
import { PhotoType } from "@/features/utils/utilEnum";

export interface IPhotoProps {
  member_idx: number;
  member_firstName: string;
  member_lastName: string;
  member_url: string;
  selected: boolean;
  onSelect: (memberIdx: number) => void;
  photoType: PhotoType.L | PhotoType.S;
}

const Photo = (props: IPhotoProps) => {
  const {
    member_idx,
    member_firstName,
    member_lastName,
    member_url,
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
        onSelect(member_idx);
        setSelectPhoto(selectPhoto ? false : true);
      }}
      className={selectPhoto ? "checked" : ""}
    >
      {
        // Check if member_url is null, empty, or contains only spaces
        member_url === null || member_url.trim() === "" ? (
          <NameCheckBox>
            {InitialsGenerator(member_firstName, member_lastName)}
          </NameCheckBox>
        ) : (
          <PhotoCheckBox url={member_url}></PhotoCheckBox>
        )
      }

      <PhotoCheckBoxCover></PhotoCheckBoxCover>
      <Checked className={selectPhoto ? "checked" : ""}></Checked>
    </PhotoCheckBoxDiv>
  );
};

export default Photo;
