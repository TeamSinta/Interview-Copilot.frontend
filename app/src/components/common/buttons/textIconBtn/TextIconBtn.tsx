import ElWrap from "@/components/layouts/elWrap/ElWrap";
import {
  BodyLMedium,
  BodyMMedium,
  BodySMedium,
} from "../../typeScale/StyledTypeScale";
import {
  IBtnProps,
  StyledBtnLL,
  StyledBtnXL,
  StyledButton,
} from "../button/StyledBtn";

export const TextIconBtnL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledButton onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
        <div>{icon}</div>
      </StyledButton>
    </>
  );
};

export const TextIconBtnXL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledBtnXL onClick={onClick} disabled={disable} className={className}>
        <div>{icon}</div>
        <BodyLMedium>{label}</BodyLMedium>
      </StyledBtnXL>
    </>
  );
};

export const TextIconBtnLL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledBtnLL onClick={onClick} disabled={disable} className={className}>
        <div>{icon}</div>
        <ElWrap w={91} h={36}>
          <BodySMedium>{label}</BodySMedium>
        </ElWrap>
      </StyledBtnLL>
    </>
  );
};
