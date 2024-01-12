import { useEffect, useRef, useState } from 'react';
import { BodyMMedium } from '../../typeScale/StyledTypeScale';
import {StyledButtonCustom } from '../button/StyledBtn';
import { IBtnProps } from '../button/StyledBtn';
import {
  CustomButton,
  ButtonWrap,
  DropdownArrowIconDiv,
} from './StyledDropDownBtn';
import { TextIconFilterIcon } from '@/components/common/filters/textIconFilter/StyledTextIconFilter';

interface ICustomButtonConfig {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

export interface IDropDownButtonProps extends IBtnProps {
  buttons: ICustomButtonConfig[];
}

export const DropDownTransparentButton = (props: IDropDownButtonProps): JSX.Element => {
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

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
        <StyledButtonCustom
          onClick={handleButtonClick}
          disabled={disable}
          className={className}
        >
        <TextIconFilterIcon>{icon}</TextIconFilterIcon>
        <BodyMMedium>{label}</BodyMMedium>
          {dropdownVisible && (
            <ButtonWrap>
              {buttons.map((buttonConfig, index) => (
                <CustomButton
                  key={index}
                  onClick={buttonConfig.onClick}
                  className={className}
                >
                  <BodyMMedium>{buttonConfig.label}</BodyMMedium>
                  <div>{buttonConfig.icon}</div>
                </CustomButton>
              ))}
            </ButtonWrap>
          )}
        </StyledButtonCustom>
      </DropdownArrowIconDiv>
    </div>
  );
};
