import { useEffect, useRef, useState } from "react";
import { BodyMMedium } from "../../typeScale/StyledTypeScale";
import { StyledButton } from "../button/StyledBtn";
import { IBtnProps } from "../button/StyledBtn";
import {
  CustomButton,
  ButtonWrap,
  DropdownArrowIconDiv,
} from "./StyledDropDownBtn"; // ensure the import path is correct

interface ICustomButtonConfig {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

export interface IDropDownButtonProps extends IBtnProps {
  buttons: ICustomButtonConfig[];
}

export const DropDownButton = (props: IDropDownButtonProps): JSX.Element => {
  const { label, icon, disable, onClick, className, buttons } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
    if (onClick) onClick();
  };

  const onSelectOpen = (): void => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
        <StyledButton
          onClick={handleButtonClick}
          disabled={disable}
          className={className}
        >
          <BodyMMedium>{label}</BodyMMedium>

          <div>{icon}</div>
        </StyledButton>
      </DropdownArrowIconDiv>

      {dropdownVisible && (
        <ButtonWrap>
          {buttons.map((buttonConfig, index) => (
            <CustomButton
              key={index}
              onClick={buttonConfig.onClick}
              disabled={false}
              className={className}
            >
              <BodyMMedium>{buttonConfig.label}</BodyMMedium>
              <div>{buttonConfig.icon}</div>
            </CustomButton>
          ))}
        </ButtonWrap>
      )}
    </div>
  );
};
