import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useState } from "react";
import { IconBtnM } from "../../buttons/iconBtn/IconBtn";
import { PlusIcon, RightBracketIcon } from "../../svgIcons/Icons";
import { BodyMBold, BodySMedium } from "../../typeScale/StyledTypeScale";

import { IQuestion } from "@/features/interviews/interviewsInterface";
import {
  Card,
  CardButtons,
  CardContent,
  CardCover,
  CardSubTitle,
} from "../card/StyledCard";
import TempCover from "@/assets/svg/questions_cover.svg";

interface ITemplateInterviewCardProps {
  title: string;
  //temporary
  questions: IQuestion[];
  disable: boolean;
  onClick: () => void;
  imageUrl: string;
}

const TemplateInterviewCard = (props: ITemplateInterviewCardProps) => {
  const [hover, setHover] = useState(false);
  const { title, questions, imageUrl, disable, onClick } = props;

  const coverImage = imageUrl || TempCover;

  return (
    <ElWrap w={312} h={216}>
      <Card
        className={(hover ? "hover" : "").concat(disable ? " disable" : "")}
        onClick={onClick}
      >
        <CardButtons>
          <ElWrap w={32}>
            <IconBtnM
              icon={<RightBracketIcon />}
              disable={false}
              onClick={() => {}}
              className={BackgroundColor.WHITE}
            />
          </ElWrap>
          <ElWrap w={32}>
            <IconBtnM
              icon={<PlusIcon />}
              disable={false}
              onClick={onClick}
              className={BackgroundColor.WHITE}
            />
          </ElWrap>
        </CardButtons>
        <CardCover imgUrl={coverImage}></CardCover>
        <CardContent
          onMouseEnter={() => {
            setHover(disable ? false : true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <BodyMBold
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "300px",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </BodyMBold>
          <CardSubTitle>
            <BodySMedium>{questions.length} Questions</BodySMedium>
          </CardSubTitle>
        </CardContent>
      </Card>
    </ElWrap>
  );
};

export default TemplateInterviewCard;
