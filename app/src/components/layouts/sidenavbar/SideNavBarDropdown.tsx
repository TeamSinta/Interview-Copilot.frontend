import { TwoArrowIcon } from "@/components/common/svgIcons/Icons";
import { useState } from "react";

import {
  DropdownArrowIconDiv,
  DropdownEl,
  DropdownLayout,
  DropdownWrap,
  OptionA,
  OptionLi,
  OptionUl,
  SelectedItemDiv,
  SelectedItemIcon,
} from "@/components/common/filters/dropdownFilter/StyledDropdownFilter";
import { BodyMMedium } from "@/components/common/typeScale/StyledTypeScale";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "@/features/workspace/userWorkspaceSlice";
import { RootState } from "@/app/store";

interface ISideNavBarDropdown {
  optionArr: IOption[];
  dropdownName: string;
  companies?: { id: number; name: string }[];
}

interface IOption {
  id: number;
  name: string;
  value: string;
}

const SideNavBarDropdown = (props: ISideNavBarDropdown): JSX.Element => {
  const { optionArr, dropdownName } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState();
  const [selectedItem, setSelectedItem] = useState({
    [dropdownName]: "",
  });

  const onSelectOpen = (): void => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onSelectedItem = (value: string, name: string, id: number): void => {
    setSelectedItem({ [dropdownName]: value });
    setSelectedItemName(name);
    setOpen(false);
  };

  return (
    <>
      <DropdownLayout>
        <DropdownWrap
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
          <DropdownEl open={open} onClick={onSelectOpen}>
            <SelectedItemDiv>
              {selectedItem[dropdownName] !== "" ? (
                <SelectedItemIcon>
                  {selectedItemName.substring(0, 1).toUpperCase()}
                </SelectedItemIcon>
              ) : (
                <></>
              )}
              <BodyMMedium>
                {selectedItem[dropdownName] === ""
                  ? dropdownName
                  : selectedItemName}
              </BodyMMedium>
              <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
                <TwoArrowIcon />
              </DropdownArrowIconDiv>
            </SelectedItemDiv>
          </DropdownEl>
          <OptionUl open={open}>
            <OptionLi>
              <OptionA
                onClick={() => {
                  onSelectedItem("", "", 0);
                }}
              >
                ------------
              </OptionA>
            </OptionLi>
            {optionArr.map((item, index) => (
              <OptionLi key={index}>
                <OptionA
                  onClick={() => {
                    onSelectedItem(item.value, item.name, item.id);
                    dispatch(setCurrentWorkspace(item));
                  }}
                >
                  <BodyMMedium>{item.name}</BodyMMedium>
                </OptionA>
              </OptionLi>
            ))}
          </OptionUl>
        </DropdownWrap>
      </DropdownLayout>
    </>
  );
};

export default SideNavBarDropdown;
