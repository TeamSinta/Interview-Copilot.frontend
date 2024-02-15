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
        label="Manage Members"
        value=""
        optionArr={departments}
        dropdownName=""
        onChange={handleSetDepartment}
      />
    );
  }
  return (
    <DropdownFilter
      key={workspaceId}
      label="Manage Members"
      value=""
      optionArr={departments}
      dropdownName="All Company Members"
      onChange={handleSetDepartment}
    />
  );
};

export default MembersFilterDropdown;
