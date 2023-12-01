import DropdownFilter from "@/components/common/filters/dropdownFilter/DropdownFilter";

const DepartmentDropDown = ({
  departments,
  handleSetDepartment,
  workspaceId,
}) => {
  return (
    <DropdownFilter
      key={workspaceId}
      label="Department"
      value=""
      optionArr={departments}
      dropdownName=""
      onChange={handleSetDepartment}
    />
  );
};

export default DepartmentDropDown;
