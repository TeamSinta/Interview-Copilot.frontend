import styled from "styled-components";
import checkS from "@/assets/svg/checkS.svg";
import { PhotoType } from "@/features/utils/utilEnum";

export const Checked = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &.checked {
    display: none;
    background-image: url(${checkS});
    background-position: center, right bottom;
    background-repeat: no-repeat, no-repeat;
  }
`;

export const PhotoCheckBox = styled.div<{ url: string }>`
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: cover, contain;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  border-radius: inherit;
`;

export const NameCheckBox = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #cecdee;
  border-radius: inherit;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;

export const PhotoCheckBoxCover = styled.div`
  display: none;
  background: linear-gradient(
    0deg,
    rgba(100, 98, 241, 0.8),
    rgba(100, 98, 241, 0.8)
  );
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  border-radius: inherit;
`;

interface IPhotoCheckBoxDiv {
  photoType: PhotoType.L | PhotoType.S;
}

export const PhotoCheckBoxDiv = styled.div<IPhotoCheckBoxDiv>`
  cursor: pointer;
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  border-radius: ${(props) =>
    props.photoType === PhotoType.S ? "8px" : "12px"};
  &:hover {
    ${PhotoCheckBoxCover} {
      display: block;
    }
  }

  &.checked {
    ${Checked} {
      display: block;
    }
    ${PhotoCheckBoxCover} {
      display: block;
    }
  }
`;

export const PhotosWrap = styled.div`
  display: flex;
  gap: 8px;
  width: fit-content;
`;

export const PhotoContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
