import { BodyMMedium, BodySMedium } from "../../typeScale/StyledTypeScale";
import {
  IBtnProps,
  StyledButton,
  StyledButtonM,
  StyledButtonS,
} from "../button/StyledBtn";

export const TextBtnL = (props: IBtnProps) => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButton onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
      </StyledButton>
    </>
  );
};

export const TextBtnM = (props: IBtnProps): JSX.Element => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButtonM onClick={onClick} disabled={disable} className={className}>
        <BodySMedium>{label}</BodySMedium>
      </StyledButtonM>
    </>
  );
};

export const TextBtnS = (props: IBtnProps): JSX.Element => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButtonS onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
      </StyledButtonS>
    </>
  );
};
