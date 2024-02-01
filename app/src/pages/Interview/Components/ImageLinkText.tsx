import styled from 'styled-components';
import { StyledIcon } from './../StyledInterview';

const Container = styled.div`
  display: flex;
  font-size: 10px;
  align-content: center;
  align-items: center;
`;

interface IImageLinkText {
  icon: React.ReactNode;
  text: string;
  link: string;
  textDecoration: string;
}

const ImageLinkText = (data: IImageLinkText) => {
  const { icon, text, link, textDecoration } = data;
  return (
    <Container>
      <span
        style={{
          marginRight: '5px',
        }}
      >
        <StyledIcon>{icon}</StyledIcon>
      </span>
      <span>
        <a style={{ textDecoration: textDecoration }} href={link}>
          {text}
        </a>
      </span>
    </Container>
  );
};

export default ImageLinkText;
