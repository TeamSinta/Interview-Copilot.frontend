import React, { useState } from 'react';

import {
  OptionA,
  OptionLi,
  OptionUl,
  SelectedItemDiv,
  StatusDropdownEl,
  StatusDropdownLayout,
  StatusDropdownWrap,
} from '@/components/common/filters/dropdownFilter/StyledDropdownFilter';
import {
  CompetencyDropDownFilter,
  StatusDropdownFilter,
} from '@/features/utils/utilEnum';
import {
  BodyMMedium,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { StyledButtonCustom } from '@/components/common/buttons/button/StyledBtn';
import { TextIconFilterIcon } from '@/components/common/filters/textIconFilter/StyledTextIconFilter';
import { TransparentDropdownTitle } from '@/components/common/buttons/dropDownBtn/StyledDropDownBtn';
import { Switch } from '@mui/base';

const optionArrTime = Array.from({ length: 60 }, (_, index) => {
  const minute = index + 1;
  return `${minute} minute${minute > 1 ? 's' : ''}`;
});

export type StatusFilterType =
  | StatusDropdownFilter
  | CompetencyDropDownFilter
  | null
  | string;

interface IStatusFilterProps {
  label?: string;
  id?: string;
  icon?: JSX.Element;
  status: StatusFilterType;
  onSelectStatus?: (status: StatusFilterType) => void;
  openDropdown: string; // Add a new prop to track the open dropdown
  onOpenDropdown: (label: string) => void;
}

const StatusFilter = (props: IStatusFilterProps): JSX.Element => {
  const [open, setOpen] = useState<string>('');
    const [shadow, setShadow] = useState(false);
  const [isHover, setIsHover] = useState<string | null>(null);

  const onHover = (
    item: string | ((prevState: null | string) => null) | null
  ) => {
    setIsHover(item);
  };

  const onUnhover = () => {
    setIsHover(null);
  };

  const onSelectedItem = (item: StatusFilterType): void => {
    setOpen('');
    setIsHover(null);
    props.onSelectStatus?.(item);
  };

  const onSelectOpen = (): void => {
    if (props.openDropdown === props.label) {
      props.onOpenDropdown(''); // Close the dropdown if it's already open
    } else {
      props.onOpenDropdown(props.label!); // Open the clicked dropdown
    }
  };

  const dropdownFilter = () => {
    switch (props.label) {
      case 'Competency':
        return CompetencyDropDownFilter;
      case 'Time to reply':
        return optionArrTime;
      case 'Difficulty':
        return StatusDropdownFilter;
      default:
        return [];
    }
  };

  const renderOption = ({ key, value }: { key: string; value: string }) => {
    return (
      <OptionLi key={key}>
        <OptionA
          className={`customOptionA ${
            props.status === value ? 'selected' : ''
            }`}
          onMouseEnter={() => onHover(value)}
          onMouseLeave={onUnhover}
          onClick={() => onSelectedItem(value)}
        >
          <div style={{ width: '30px', marginTop: '2px' }}>
            {isHover === value && props.status !== value && <Switch />}{' '}
            {props.status === value && <Switch checked />}{' '}
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
          setShadow(true);
        }}
        onMouseLeave={() => {
          setShadow(false);
        }}
        className={shadow ? 'hover' : ''}
        onClick={() => {
          setShadow(false);
          onSelectOpen();
        }}
      >
        {props.id === 'customQuestion' && props.icon ? (
          <SelectedItemDiv onClick={onSelectOpen}>
            <StyledButtonCustom>
              <TextIconFilterIcon>{props.icon}</TextIconFilterIcon>
              <BodyMMedium>
                {props.status === null || props.status === ''
                  ? props.label
                  : props.status}
              </BodyMMedium>
            </StyledButtonCustom>
          </SelectedItemDiv>
        ) : (
          <StatusDropdownEl
        onClick={onSelectOpen}
        bg={props.status}
        open={props.label === open}
        >
            <SelectedItemDiv>
        <BodyMMedium>
        {props.status === null ? `------------` : props.status}
        </BodyMMedium>
        </SelectedItemDiv>
        </StatusDropdownEl>
        )}
        <OptionUl
          open={props.label === props.openDropdown}
          className={props.id === 'customQuestion' ? 'customizeUl' : ''}
          onMouseLeave={() => {
            setOpen('');
          }}
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
              <TransparentDropdownTitle>
                <BodySMedium>Add {props.label}</BodySMedium>
              </TransparentDropdownTitle>
              {Object.entries(dropdownFilter()).map(([key, value]) =>
                renderOption({ key, value })
              )}
        </OptionUl>
      </StatusDropdownWrap>
    </StatusDropdownLayout>
  );
};

export default StatusFilter;
