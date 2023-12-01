import Cover from "@/assets/svg/sinta_default_card.svg";
import styled from "styled-components";

export const Card = styled.div`
  width: inherit;
  height: inherit;
  position: relative;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightPurple};
  transition: 0.3s;

  &.hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.palePurple};
  }

  &.disable {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface ICardCover {
  imgUrl: string;
}

export const CardCover = styled.div<ICardCover>`
  //Use when we have cover url. Right now I used jpg file.
  /* background-image: url(${(props) => props.imgUrl}); */
  background-image: url(${(props) => props.imgUrl});
  background-size: cover, contain;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  width: 100%;
  height: 132px;
  border-radius: 12px 12px 0 0;
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardIcon = styled.div`
  display: flex;
  margin: 4px 0 12px 0px;
  gap: 2px;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.theme.colors.black};
  }
`;

interface IPhotoIcon {
  imgUrl: string;
}

export const PhotoIcon = styled.div<IPhotoIcon>`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover, contain;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const NumberIcon = styled(PhotoIcon)`
  background-color: ${(props) => props.theme.colors.palePurple};
  outline: 1px solid ${(props) => props.theme.colors.black};
  outline-offset: -1px;
`;

export const CardSubTitle = styled.div`
  opacity: 0.5;
  margin-top: 4px;
`;

export const CardSubTitleContent = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  .dot {
    background: ${(props) => props.theme.colors.black};
    width: 2px;
    height: 2px;
    border-radius: 2px;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  margin: 20px;
  top: 0;
  z-index: 999;
  right: 0px;
`;

export const CardWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const InterviewCardCover = styled.div<ICardCover>`
  //Use when we have cover url. Right now I used jpg file.
  /* background-image: url(${(props) => props.imgUrl}); */
  background-image: url(${Cover});
  background-size: cover;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  width: 100%;
  height: 178px;
  border-radius: 12px 12px 0 0;
`;

export const CardTitleContent = styled.div`
  display: flex;
  margin: 0 0 2px 0px;
  gap: 4px;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.theme.colors.black};
  }
`;
