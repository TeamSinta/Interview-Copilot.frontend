import {
  IBtnProps,
  StyledIconBtn,
  StyledIconBtnM,
  StyledIconBtnS,
} from "../button/StyledBtn";

export const IconBtnL = (props: IBtnProps) => {
  const { disable, onClick, className, icon } = props;

  return (
    <StyledIconBtn onClick={onClick} disabled={disable} className={className}>
      <div>{icon}</div>
    </StyledIconBtn>
  );
};

export const IconBtnM = (props: IBtnProps) => {
  const { disable, onClick, className, icon } = props;

  return (
    <StyledIconBtnM onClick={onClick} disabled={disable} className={className}>
      <div>{icon}</div>
    </StyledIconBtnM>
  );
};

export const IconBtnS = (props: IBtnProps) => {
  const { disable, onClick, className, icon } = props;

  return (
    <StyledIconBtnS onClick={onClick} disabled={disable} className={className}>
      <div>{icon}</div>
    </StyledIconBtnS>
  );
};
