import DropdownFilter from "@/components/common/filters/dropdownFilter/DropdownFilter";
import { SORT_CRITERIA } from "@/features/utils/utilEnum";
import React from "react";

const SortingDropdown = ({ sortCriteria, handleSortMembers }) => {
  return (
    <DropdownFilter
      label="Sort By"
      value={sortCriteria}
      onChange={(value) => handleSortMembers(value)}
      optionArr={[
        { name: "Name (A-Z)", value: SORT_CRITERIA.NAME_ASC },
        { name: "Name (Z-A)", value: SORT_CRITERIA.NAME_DESC },
        { name: "Permission Level", value: SORT_CRITERIA.ROLE },
      ]}
      dropdownName=""
    />
  );
};

export default SortingDropdown;
