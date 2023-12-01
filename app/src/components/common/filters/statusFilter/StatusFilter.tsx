import React, { useState } from "react";
import { SelectArrowOpenIcon } from "@/components/common/svgIcons/Icons";

import {
  DropdownArrowIconDiv,
  OptionA,
  OptionLi,
  OptionUl,
  SelectedItemDiv,
  StatusDropdownEl,
  StatusDropdownLayout,
  StatusDropdownWrap,
} from "../dropdownFilter/StyledDropdownFilter";
import { StatusDropdownFilter } from "@/features/utils/utilEnum";
import { BodyMMedium } from "../../typeScale/StyledTypeScale";

const optionArr: StatusDropdownFilter[] = [
  StatusDropdownFilter.LOW,
  StatusDropdownFilter.MEDIUM,
  StatusDropdownFilter.HIGH,
];

interface IStatusFilterProps {
  status:
    | StatusDropdownFilter.LOW
    | StatusDropdownFilter.MEDIUM
    | StatusDropdownFilter.HIGH
    | null;
  onSelectStatus: (status: StatusDropdownFilter | null) => void; // Add this callback prop
}

const StatusFilter = (props: IStatusFilterProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [selectedItemName, setSelectedItemName] =
    useState<StatusDropdownFilter | null>(props.status);
  const [selectedItem, setSelectedItem] = useState<StatusDropdownFilter | null>(
    props.status
  );

  const onSelectOpen = (): void => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onSelectedItem = (item: StatusDropdownFilter | null): void => {
    setSelectedItem(item);
    setSelectedItemName(item);
    setOpen(false);
    props.onSelectStatus(item);
  };

  return (
    <>
      <StatusDropdownLayout>
        {/* <DropdownLabel></DropdownLabel> */}
        <StatusDropdownWrap
          onMouseEnter={() => {
            setShadow(true);
          }}
          onMouseLeave={() => {
            setShadow(false);
          }}
          className={shadow ? "hover" : ""}
          onClick={() => {
            setShadow(false);
          }}
        >
          <StatusDropdownEl
            onClick={onSelectOpen}
            bg={selectedItem}
            open={open}
          >
            <SelectedItemDiv>
              <BodyMMedium>
                {selectedItem === null ? `------------` : selectedItemName}
              </BodyMMedium>
              <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
                <SelectArrowOpenIcon />
              </DropdownArrowIconDiv>
            </SelectedItemDiv>
          </StatusDropdownEl>
          <OptionUl open={open}>
            <OptionLi>
              <OptionA
                onClick={() => {
                  onSelectedItem(null);
                }}
              >
                ------------
              </OptionA>
            </OptionLi>
            {optionArr.map((item, index) => (
              <OptionLi key={index}>
                <OptionA
                  onClick={() => {
                    onSelectedItem(item);
                  }}
                >
                  <BodyMMedium>{item}</BodyMMedium>
                </OptionA>
              </OptionLi>
            ))}
          </OptionUl>
        </StatusDropdownWrap>
      </StatusDropdownLayout>
    </>
  );
};

export default StatusFilter;
