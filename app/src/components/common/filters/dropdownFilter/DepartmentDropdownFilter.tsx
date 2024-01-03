import { SelectArrowOpenIcon } from '@/components/common/svgIcons/Icons';
import { BodyMMedium } from '@/components/common/typeScale/StyledTypeScale';
import { IOption } from '@/types/common';
import { memo, useCallback, useMemo, useState } from 'react';
import DepartmentCheckList from '../DepartmentCheckList/DepartmentCheckList';
import {
  DropdownArrowIconDiv,
  DropdownEl,
  DropdownLabel,
  DropdownLayout,
  DropdownWrap,
  OptionUl,
  SelectedItemDiv,
} from './StyledDropdownFilter';

interface IDropdown {
  label?: string;
  optionArr: IOption[];
  dropdownName: string;
  onChange: (data: IOption) => void;
  value: string;
}

const DepartmentDropdownFilter = memo((props: IDropdown): JSX.Element => {
  const { dropdownName, label, optionArr } = props;
  const optionsMemo = useMemo(() => optionArr, [optionArr]);
  const [open, setOpen] = useState(false);

  const onSelectOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [open]);

  return (
    <DropdownLayout>
      {label ? <DropdownLabel>{label}</DropdownLabel> : <></>}
      <DropdownWrap>
        <DropdownEl onClick={onSelectOpen} open={open}>
          <SelectedItemDiv>
            <BodyMMedium>{dropdownName}</BodyMMedium>
            <DropdownArrowIconDiv onClick={onSelectOpen} open={open}>
              <SelectArrowOpenIcon />
            </DropdownArrowIconDiv>
          </SelectedItemDiv>
        </DropdownEl>
        <OptionUl open={open}>
          {optionsMemo.length > 0 ? (
            optionsMemo.map((item) => (
              <DepartmentCheckList
                key={item.value}
                onChange={props.onChange}
                data={item}
              />
            ))
          ) : (
            <></>
          )}
        </OptionUl>
      </DropdownWrap>
    </DropdownLayout>
  );
});

export default DepartmentDropdownFilter;
