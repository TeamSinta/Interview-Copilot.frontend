import React from "react";

import {
  H1,
  H2Bold,
  H2Medium,
  H3Bold,
  H3Medium,
  BodyLBold,
  BodyLMedium,
  BodyMBold,
  BodyMMedium,
  BodySBold,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";

interface ITypeScaleProps {
  label?: string;
}

const TypeScale = ({ label }: ITypeScaleProps): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "500px",
      }}
    >
      <H1>TYPE SCALE</H1>
      <hr style={{ width: "100%" }} />
      <H1>H1: {label}</H1>
      <H2Bold>H2 SemiBold: {label}</H2Bold>
      <H2Medium>H2 Medium : {label}</H2Medium>
      <H3Bold>H3 SemiBold : {label}</H3Bold>
      <H3Medium>H3 Medium : {label}</H3Medium>
      <BodyLBold>Body L Bold : {label}</BodyLBold>
      <BodyLMedium>Body L Medium : {label}</BodyLMedium>
      <BodyMBold>Body M Bold : {label}</BodyMBold>
      <BodyMMedium>Body M Medium : {label}</BodyMMedium>
      <BodySBold>Body S Bold : {label}</BodySBold>
      <BodySMedium>Body S Medium : {label}</BodySMedium>
    </div>
  );
};

export default TypeScale;
