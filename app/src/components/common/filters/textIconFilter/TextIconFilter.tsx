import { useEffect, useState } from "react";
import {
  TextIconFilterLayout,
  TextIconFilterIcon,
} from "./StyledTextIconFilter";

interface ITextIconFilterProps {
  label: string;
  icon: JSX.Element;
  select: boolean;
  onClick: () => void; // Add onClick prop
}

const TextIconFilter = (props: ITextIconFilterProps) => {
  const { select, label, icon, onClick } = props;
  const [selected, setSelected] = useState<boolean>(select);

  useEffect(() => {
    setSelected(select);
  }, [select]);

  return (
    <TextIconFilterLayout
      onClick={() => {
        setSelected(selected ? false : true);
        onClick(); // Call the onClick prop when the element is clicked
      }}
      className={selected ? "selected" : ""}
    >
      <div>{label}</div>
      <TextIconFilterIcon>{icon}</TextIconFilterIcon>
    </TextIconFilterLayout>
  );
};

export default TextIconFilter;
