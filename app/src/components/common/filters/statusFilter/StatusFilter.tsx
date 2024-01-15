import React, { useState } from 'react';

import {
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

const optionArrTime = Array.from({ length: 60 }, (_, index) => {
  const minute = index + 1;
  return `${minute} minute${minute > 1 ? 's' : ''}`;
});

const optionArrCompetency = ['Leadership', 'Teamwork', 'Empathy'];

interface IStatusFilterProps {
  label?: string;
  id?: string;
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
  const [openOnlyOne, setOpenOnlyOne] = useState<string | null>(null);
  const [shadow, setShadow] = useState(false);
  const [isHover, setIsHover] = useState<string | null>(null);
  const [selectedItemName, setSelectedItemName] =
    useState<StatusDropdownFilter | null>(props.status);
  const [selectedItem, setSelectedItem] = useState<StatusDropdownFilter | null>(
    props.status
  );
  const onDiffSelect = (label: string | null) => {
    setOpenOnlyOne((prevActiveDropdown) =>
      prevActiveDropdown === label ? null : label
    );
    setOpen(true);
  };

  const onHover = (
    item: string | ((prevState: null | string) => null) | null
  ) => {
    setIsHover(item);
  };

  const onUnhover = () => {
    setIsHover(null);
  };

  const onSelectedItem = (item: StatusDropdownFilter | null | string): void => {
    setSelectedItem(item as StatusDropdownFilter | null);
    setSelectedItemName(item as StatusDropdownFilter | null);
    setOpen(false);
    setIsHover(null);
    props.onSelectStatus?.(item as StatusDropdownFilter | null);
  };

  const renderOption = ({ key, value }: { key: string; value: string }) => {
    return (
      <OptionLi key={key}>
        <OptionA
          className={`customOptionA ${
            selectedItem === value ? 'selected' : ''
          }`}
          onMouseEnter={() => onHover(value)}
          onMouseLeave={onUnhover}
          onClick={() => onSelectedItem(value)}
        >
          <div style={{ width: '30px', marginTop: '2px' }}>
            {isHover === value && selectedItem !== value && <Switch />}{' '}
            {selectedItem === value && <Switch checked />}{' '}
          </div>
          <BodyMMedium>{value}</BodyMMedium>
        </OptionA>
      </OptionLi>
    );
  };

  return (
    <StatusDropdownLayout>
      <StatusDropdownWrap
        onMouseEnter={() => {
          onDiffSelect(props.label as string);
          props.id === 'customQuestion' ? setShadow(false) : setShadow(true);
        }}
        onMouseLeave={() => {
          setShadow(false);
          onDiffSelect(props.label as string);
        }}
        className={shadow ? 'hover' : ''}
        onClick={() => {
          setShadow(false);
        }}
      >
        {props.id === 'customQuestion' && props.icon ? (
          <SelectedItemDiv>
            <StyledButtonCustom
              style={{ padding: '10px 16px', minWidth: '120px' }}
            >
              <TextIconFilterIcon>{props.icon}</TextIconFilterIcon>
              <BodyMMedium>
                {selectedItem === null ? props.label : selectedItemName}
              </BodyMMedium>
            </StyledButtonCustom>
          </SelectedItemDiv>
        ) : (
          <StatusDropdownEl bg={selectedItem} open={open}>
            <SelectedItemDiv>
              <BodyMMedium>
                {selectedItem === null ? `------------` : selectedItemName}
              </BodyMMedium>
            </SelectedItemDiv>
          </StatusDropdownEl>
        )}
        <OptionUl
          open={openOnlyOne === props.label ? open : false}
          className={props.id === 'customQuestion' ? 'customizeUl' : ''}
        >
          {props.id !== 'customQuestion' ? (
            <OptionLi>
              <OptionA
                onClick={() => {
                  onSelectedItem(null);
                }}
              >
                ------------
              </OptionA>
            </OptionLi>
          ) : null}
          {props.label === 'Competency' && openOnlyOne === 'Competency' && (
            <>
              <TransparentDropdownTitle>
                <BodySMedium>Add {props.label}</BodySMedium>
              </TransparentDropdownTitle>
              {Object.entries(optionArrCompetency).map(([key, value]) =>
                renderOption({ key, value })
              )}
            </>
          )}
          {props.label === 'Time to reply' &&
            openOnlyOne === 'Time to reply' && (
              <>
                <TransparentDropdownTitle>
                  <BodySMedium>Add {props.label}</BodySMedium>
                </TransparentDropdownTitle>
                {Object.entries(optionArrTime).map(([key, value]) =>
                  renderOption({ key, value })
                )}
              </>
            )}
          {props.label === 'Difficulty' && openOnlyOne === 'Difficulty' && (
            <>
              <TransparentDropdownTitle>
                <BodySMedium>Add {props.label}</BodySMedium>
              </TransparentDropdownTitle>
              {Object.entries(StatusDropdownFilter).map(([key, value]) =>
                renderOption({ key, value })
              )}
            </>
          )}
        </OptionUl>
      </StatusDropdownWrap>
    </StatusDropdownLayout>
  );
};

export default StatusFilter;
