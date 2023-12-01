import { SelectArrowOpenIcon } from "@/components/common/svgIcons/Icons";
import { memo, useCallback, useMemo, useState } from "react";
import {
  DropdownArrowIconDiv,
  DropdownEl,
  DropdownLabel,
  DropdownLayout,
  DropdownWrap,
  OptionA,
  OptionLi,
  OptionUl,
  SelectedItemDiv,
} from "./StyledDropdownFilter";
import { BodyMMedium } from "../../typeScale/StyledTypeScale";

interface IDropdown {
  label?: string;
  optionArr: IOption[];
  dropdownName: string;
  onChange?: (value: string) => void;
  value: string;
}

interface IOption {
  name: string;
  value: string;
}

const DropdownFilter = memo((props: IDropdown): JSX.Element => {
  const { label, optionArr, dropdownName } = props;
  const optionsMemo = useMemo(() => optionArr, [optionArr]);
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    [dropdownName]: props.value || "",
  });

  const onSelectOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    setShadow(!open);
  }, [open]);

  const onSelectedItem = useCallback(
    (value: string, name: string) => {
      setSelectedItem({ [dropdownName]: value });
      setSelectedItemName(name);
      setOpen(false);
      props.onChange?.(value);
    },
    [dropdownName, props]
  );

  return (
    <>
      <DropdownLayout>
        {label ? <DropdownLabel>{label}</DropdownLabel> : <></>}
        <DropdownWrap
          onMouseEnter={() => {
            open ? setShadow(false) : setShadow(true);
          }}
          onMouseLeave={() => {
            setShadow(false);
          }}
          className={shadow ? "hover" : ""}
          onClick={() => {
            setShadow(false);
          }}
        >
          <DropdownEl onClick={onSelectOpen} open={open}>
            <SelectedItemDiv>
              <BodyMMedium>
                {selectedItem[dropdownName] === ""
                  ? dropdownName
                  : selectedItemName}
              </BodyMMedium>
              <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
                <SelectArrowOpenIcon />
              </DropdownArrowIconDiv>
            </SelectedItemDiv>
          </DropdownEl>
          <OptionUl open={open}>
            <OptionLi>
              <OptionA
                onClick={() => {
                  onSelectedItem("", "");
                }}
              >
                ------------
              </OptionA>
            </OptionLi>
            {optionsMemo.length > 0 ? (
              optionsMemo.map((item, index) => (
                <OptionLi key={index}>
                  <OptionA
                    onClick={() => {
                      onSelectedItem(item.value, item.name);
                    }}
                  >
                    <BodyMMedium>{item.name}</BodyMMedium>
                  </OptionA>
                </OptionLi>
              ))
            ) : (
              <></>
            )}
          </OptionUl>
        </DropdownWrap>
      </DropdownLayout>
    </>
  );
});

export default DropdownFilter;
