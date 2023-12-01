import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";
import { CheckBoxWrap, CheckInput } from "./StyledCheckBox";
import { useEffect, useState } from "react";

export interface ICheckBoxProps {
  label: String;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputName: string | undefined;
  checked: boolean;
  disabled: boolean;
}

const CheckBox = (props: ICheckBoxProps) => {
  const { label, onChange, inputName, checked, disabled } = props;

  const [check, setCheck] = useState(checked);

  useEffect(() => {
    setCheck(checked);
  }, [checked]);

  return (
    <CheckBoxWrap>
      <CheckInput
        name={inputName}
        type="checkbox"
        onChange={(e) => {
          onChange(e);
          setCheck(check ? false : true);
        }}
        checked={check}
        disabled={disabled}
      ></CheckInput>
      <BodySMedium>{label}</BodySMedium>
    </CheckBoxWrap>
  );
};

export default CheckBox;
