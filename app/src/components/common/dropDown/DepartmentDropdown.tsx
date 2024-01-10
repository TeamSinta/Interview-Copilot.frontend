import DepartmentDropdownFilter from '@/components/common/filters/dropdownFilter/DepartmentDropdownFilter';
import DropdownFilter from '@/components/common/filters/dropdownFilter/DropdownFilter';
import { IOption } from '@/types/common';
import React from 'react';

interface IDepartmentDropDown {
  departments: IOption[];
  handleSetDepartment: (value: IOption | string) => void;
  workspaceId: string | null;
  multi?: boolean;
}

const DepartmentDropDown: React.FC<IDepartmentDropDown> = ({
  departments,
  handleSetDepartment,
  workspaceId,
  multi,
}) => {
  if (multi) {
    return (
      <DepartmentDropdownFilter
        key={workspaceId}
        label="Department"
        value=""
        optionArr={departments}
        dropdownName="Select Department"
        onChange={handleSetDepartment}
      />
    );
  }
  return (
    <DropdownFilter
      key={workspaceId}
      label="Department"
      value=""
      optionArr={departments}
      dropdownName="Select Department"
      onChange={handleSetDepartment}
    />
  );
};

export default DepartmentDropDown;
