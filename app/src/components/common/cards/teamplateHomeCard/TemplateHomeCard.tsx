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
  CardWrap,
} from "../card/StyledCard";
import { IconBtnM } from "@/components/common/buttons/iconBtn/IconBtn";
import { RightBracketIcon } from "@/components/common/svgIcons/Icons";
import { PhotoIcon, NumberIcon } from "../card/StyledCard";
import {
  BodyMMedium,
  BodySMedium,
  BodySBold,
} from "@/components/common/typeScale/StyledTypeScale";
import Photos from "../../buttons/photo/Photos";
import { InitialsGenerator } from "@/utils/Utils";
import TempCover from "@/assets/images/cover_1.jpg";

export interface IMember {
  id: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
}

interface ITemplateHomeCard {
  title: string;
  disable: boolean;
  imageUrl: string;
  questions: undefined[];
  members: IMember[];
  sections: undefined[];
  onClick: () => void;
}

const TemplateHomeCard = (props: ITemplateHomeCard) => {
  const [hover, setHover] = useState(false);
  const { title, imageUrl, disable, members, questions, sections, onClick } =
    props;

  const coverImage = imageUrl || TempCover;

  return (
    <ElWrap w={370} h={216}>
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
        </CardButtons>
        <CardCover imgUrl={coverImage}></CardCover>

        <CardWrap>
          <CardContent
            onMouseEnter={() => {
              setHover(disable ? false : true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <BodyMMedium
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "140px",
                whiteSpace: "nowrap", // or some specific value that fits well in your design
              }}
            >
              {title}
            </BodyMMedium>
            <CardSubTitle>
              <CardSubTitleContent>
                <BodySMedium>{sections.length} Sections</BodySMedium>
                <div className="dot"></div>
                <BodySMedium>{questions.length} Questions</BodySMedium>
              </CardSubTitleContent>
            </CardSubTitle>
          </CardContent>
          <Photos>
            <>
              {members
                .slice(0, members.length > 4 ? 3 : 4)
                .map((member: IMember, index) => (
                  <ElWrap w={32} h={32} key={index}>
                    <PhotoIcon imgUrl={member.profile_picture}>
                      <BodySBold>
                        {!member.profile_picture
                          ? InitialsGenerator(
                              member.first_name,
                              member.last_name
                            )
                          : ""}
                      </BodySBold>
                    </PhotoIcon>
                  </ElWrap>
                ))}
            </>
            <>
              {members.length > 4 ? (
                <NumberIcon imgUrl="">
                  <BodySBold>+{members.length - 3}</BodySBold>
                </NumberIcon>
              ) : (
                <></>
              )}
            </>
          </Photos>
        </CardWrap>
      </Card>
    </ElWrap>
  );
};

export default TemplateHomeCard;
