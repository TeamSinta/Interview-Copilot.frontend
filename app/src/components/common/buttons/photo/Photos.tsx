import { PhotosWrap } from "./StyledPhoto";

interface IPhotosProps {
  children: JSX.Element[] | JSX.Element;
}

const Photos = ({ children }: IPhotosProps) => {
  return <PhotosWrap>{children}</PhotosWrap>;
};

export default Photos;
