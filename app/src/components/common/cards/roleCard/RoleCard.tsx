import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { InitialsGenerator } from "@/utils/Utils";
import { useState } from "react";
import Photos from "../../buttons/photo/Photos";
import { LocationIcon } from "../../svgIcons/Icons";
import {
  BodyMBold,
  BodySBold,
  BodySMedium,
} from "../../typeScale/StyledTypeScale";
import {
  Card,
  CardContent,
  CardCover,
  CardIcon,
  NumberIcon,
  PhotoIcon,
} from "../card/StyledCard";

interface IMembers {
  member_idx: number;
  member_url: string;
  member_first_name: string;
  member_last_name: string;
}

interface IRoleCardProps {
  title: string;
  location: string;
  members: IMembers[];
  disable: boolean;
}

const RoleCard = (props: IRoleCardProps) => {
  const [hover, setHover] = useState(false);
  const { title, location, members, disable } = props;

  return (
    <ElWrap w={312} h={260}>
      <Card
        className={(hover ? "hover" : "").concat(disable ? " disable" : " ")}
        id="cardId"
      >
        <CardCover imgUrl={""}></CardCover>
        <CardContent
          onMouseEnter={() => {
            setHover(disable ? false : true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <BodyMBold>{title}</BodyMBold>
          <CardIcon>
            <LocationIcon />
            <BodySMedium>{location}</BodySMedium>
          </CardIcon>
          <Photos>
            <>
              {members.slice(0, 4).map((member: IMembers, index) => (
                <ElWrap w={32} h={32} key={index}>
                  <PhotoIcon imgUrl={member.member_url}>
                    <BodySBold>
                      {!member.member_url
                        ? InitialsGenerator(
                            member.member_first_name,
                            member.member_last_name
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
                  <BodySBold>+{members.length - 4}</BodySBold>
                </NumberIcon>
              ) : (
                <></>
              )}
            </>
          </Photos>
        </CardContent>
      </Card>
    </ElWrap>
  );
};

export default RoleCard;
