import DepartmentDropdownFilter from '@/components/common/filters/dropdownFilter/DepartmentDropdownFilter';
import DropdownFilter from '@/components/common/filters/dropdownFilter/DropdownFilter';
import { IDepartmentDropDown } from '@/types/department';
import React from 'react';

const MembersFilterDropdown: React.FC<IDepartmentDropDown> = ({
  departments,
  handleSetDepartment,
  workspaceId,
  multi,
}) => {
  if (multi) {
    return (
      <DepartmentDropdownFilter
        key={workspaceId}
        label="Department Members"
        value=""
        optionArr={departments}
        dropdownName="Members"
        onChange={handleSetDepartment}
      />
    );
  }
  return (
    <DropdownFilter
      key={workspaceId}
      label="Department Members"
      value=""
      optionArr={departments}
      dropdownName="Members"
      onChange={handleSetDepartment}
    />
  );
};

export default MembersFilterDropdown;
