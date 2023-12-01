import ElWrap from "@/components/layouts/elWrap/ElWrap";

import { BackgroundColor } from "@/features/utils/utilEnum";
import { useState } from "react";
import {
  Card,
  CardButtons,
  CardContent,
  CardCover,
  CardSubTitle,
  CardSubTitleContent,
} from "../card/StyledCard";
import { IconBtnM } from "@/components/common/buttons/iconBtn/IconBtn";
import { PlusIcon, RightBracketIcon } from "@/components/common/svgIcons/Icons";
import {
  BodyMMedium,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";

interface ITemplateRoleCard {
  title: string;
  disable: boolean;
  questions: undefined[];
  sections: undefined[];
}

const TemplateRoleCard = (props: ITemplateRoleCard) => {
  const [hover, setHover] = useState(false);
  const { title, disable, questions, sections } = props;

  return (
    <ElWrap w={370} h={216}>
      <Card
        className={(hover ? "hover" : "").concat(disable ? " disable" : "")}
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
              onClick={() => {}}
              className={BackgroundColor.WHITE}
            />
          </ElWrap>
        </CardButtons>
        <CardCover imgUrl={""}></CardCover>
        <CardContent
          onMouseEnter={() => {
            setHover(disable ? false : true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <BodyMMedium>{title}</BodyMMedium>
          <CardSubTitle>
            <CardSubTitleContent>
              <BodySMedium>{sections.length} Sections</BodySMedium>
              <div className="dot"></div>
              <BodySMedium>{questions.length} Questions</BodySMedium>
            </CardSubTitleContent>
          </CardSubTitle>
        </CardContent>
      </Card>
    </ElWrap>
  );
};

export default TemplateRoleCard;
