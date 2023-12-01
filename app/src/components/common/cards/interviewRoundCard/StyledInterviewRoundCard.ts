import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StyledCard = styled(Card)`
  display: flex;
  width: 286px;
  height: 134px;
  position: relative;
  background: #f6f6fb;
  border-radius: 12px;
  &:hover {
    background: #eaeaf4;
    transition: background-color 0.3s ease-in-out;
  }
  min-width: 286px;
`;

export const StyledCardContent = styled(CardContent)`
  top: 6px;
  left: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

interface ICardCover {
  imgUrl: string;
}
export const StyledCardMedia = styled(CardMedia)<ICardCover>`
  position: absolute;
  right: 16px;

  width: 82px;
  height: 94px;
  background-image: url(${(props) => props.imgUrl}),
    linear-gradient(0deg, black 0%, white 100%);
  border-radius: 8px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBox = styled(Box)`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenteredTypography = styled(Typography)`
  text-align: center;
  color: #121212;
  font-size: 20px;
  font-family: Chillax;
  font-weight: 600;
  line-height: 25px;
  word-wrap: break-word;
`;
