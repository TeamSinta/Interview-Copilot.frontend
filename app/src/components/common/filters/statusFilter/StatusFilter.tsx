import React, { useState } from 'react';
import { SelectArrowOpenIcon } from '@/components/common/svgIcons/Icons';

import {
  DropdownArrowIconDiv,
  OptionA,
  OptionLi,
  OptionUl,
  SelectedItemDiv,
  StatusDropdownEl,
  StatusDropdownLayout,
  StatusDropdownWrap,
} from '../dropdownFilter/StyledDropdownFilter';
import { StatusDropdownFilter } from '@/features/utils/utilEnum';
import { BodyMMedium, BodySMedium } from '../../typeScale/StyledTypeScale';
import { StyledButtonCustom } from '../../buttons/button/StyledBtn';
import { TextIconFilterIcon } from '../textIconFilter/StyledTextIconFilter';
import { TransparentDropdownTitle } from '../../buttons/dropDownBtn/StyledDropDownBtn';
import { Switch } from '@mui/base';


const optionArr: StatusDropdownFilter[] = [
  StatusDropdownFilter.LOW,
  StatusDropdownFilter.MEDIUM,
  StatusDropdownFilter.HIGH,
];

const optionArrTime = Array.from({ length: 60 }, (_, index) => {
  const minute = index + 1;
  return `${minute} minute${minute > 1 ? 's' : ''}`;
});

const optionArrCompetency = [
  'Leadership',
  'Teamwork',
  'Empathy',
];

interface IStatusFilterProps {
  label?: string;
  id?:string;
  icon?: JSX.Element;
  status:
  | StatusDropdownFilter.LOW
  | StatusDropdownFilter.MEDIUM
  | StatusDropdownFilter.HIGH
  | null;
  onSelectStatus?: (status: StatusDropdownFilter | null) => void; // Add this callback prop
}

const StatusFilter = (props: IStatusFilterProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [isHover, setIsHover] = useState(null);
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
  const onHover = (item: string | ((prevState: null) => null) | null) => {
    setIsHover(item);
  };

  const onUnhover = () => {
    setIsHover(null);
  };

  const onSelectedItem = (item: StatusDropdownFilter | null | string): void => {
    setSelectedItem(item);
    setSelectedItemName(item);
    setOpen(false);
    setIsHover(null);
    props.onSelectStatus(item);
  };

  return (
    <>
      <StatusDropdownLayout>
        {/* <DropdownLabel></DropdownLabel> */}
        <StatusDropdownWrap
          onMouseEnter={() => {
            props.label === 'Difficulty' ? setShadow(false) : setShadow(true)
          }}
          onMouseLeave={() => {
            setShadow(false);
          }}
          className={shadow ? 'hover' : ''}
          onClick={() => {
            setShadow(false);
          }}
        >
            {props.id === 'customQuestion' && props.icon ? (
              <SelectedItemDiv
              onClick={onSelectOpen}
              >
              <StyledButtonCustom style={{padding:'10px 16px' , minWidth:'120px'}}>
                <TextIconFilterIcon>{props.icon}</TextIconFilterIcon>
                <BodyMMedium>
                {selectedItem === null ? props.label : selectedItemName}
                </BodyMMedium>
              </StyledButtonCustom>
              </SelectedItemDiv>
            ) : (
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
            )}
          <OptionUl open={open} className={ props.id === 'customQuestion' ? 'customizeUl' : ''} >
          {props.id !== 'customQuestion' ? (
            <OptionLi>
              <OptionA
                onClick={() => {
                  onSelectedItem(null);
                }}
              >
                ------------
              </OptionA>
            </OptionLi>) : (
               <TransparentDropdownTitle>
               <BodySMedium>Add {props.label}</BodySMedium>
               </TransparentDropdownTitle>
            )}
        {props.label === 'Competency' &&  (
          optionArrCompetency.map((item, index) => (
            <OptionLi key={index}>
              <OptionA
                className={`customOptionA ${selectedItem === item ? 'selected' : ''}`}
                onMouseEnter={() => onHover(item)}
                onMouseLeave={onUnhover}
                onClick={() => onSelectedItem(item)}
              >
                <div style={{ width: '30px', marginTop: '2px' }}>
                  {isHover === item && selectedItem !== item && <Switch />} {/* Show Switch on hover */}
                  {selectedItem === item && <Switch checked />} {/* Pass 'selected' prop when item is selected */}
                </div>
                <BodyMMedium>{item}</BodyMMedium>
              </OptionA>
            </OptionLi>
          ))
        )}
         {props.label === 'Time to reply' &&  (
          optionArrTime.map((item, index) => (
            <OptionLi key={index}>
              <OptionA
                className={`customOptionA ${selectedItem === item ? 'selected' : ''}`}
                onMouseEnter={() => onHover(item)}
                onMouseLeave={onUnhover}
                onClick={() => onSelectedItem(item)}
              >
                <div style={{ width: '30px', marginTop: '2px' }}>
                  {isHover === item && selectedItem !== item && <Switch />} {/* Show Switch on hover */}
                  {selectedItem === item && <Switch checked />} {/* Pass 'selected' prop when item is selected */}
                </div>
                <BodyMMedium>{item}</BodyMMedium>
              </OptionA>
            </OptionLi>
          ))
        )}
         {props.label === 'Difficulty' &&  (
          optionArr.map((item, index) => (
            <OptionLi key={index}>
              <OptionA
                className={`customOptionA ${selectedItem === item ? 'selected' : ''}`}
                onMouseEnter={() => onHover(item)}
                onMouseLeave={onUnhover}
                onClick={() => onSelectedItem(item)}
              >
                <div style={{ width: '30px', marginTop: '2px' }}>
                  {isHover === item && selectedItem !== item && <Switch />} {/* Show Switch on hover */}
                  {selectedItem === item && <Switch checked />} {/* Pass 'selected' prop when item is selected */}
                </div>
                <BodyMMedium>{item}</BodyMMedium>
              </OptionA>
            </OptionLi>
          ))
        )}
          </OptionUl>
        </StatusDropdownWrap>
      </StatusDropdownLayout>
    </>
  );
};

export default StatusFilter;
