import { BodySMedium } from "../../typeScale/StyledTypeScale";
import { StyledCompetencies } from "./StyledCompetencies";

interface ICompetenciesProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Competencies = (props: ICompetenciesProps) => {
  const { label, selected, onClick } = props;

  return (
    <StyledCompetencies onClick={onClick} className={selected ? "active" : ""}>
      <BodySMedium>{label}</BodySMedium>
    </StyledCompetencies>
  );
};

export default Competencies;
