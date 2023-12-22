import React, { useState } from 'react';
import DepartmentCheckList from './DepartmentCheckList';

interface IDepartment {
  id: number;
  label: string;
  checked: boolean;
}
interface AdminDepartmentChecklistProps {
  onOptionSelect: (id: number) => void;
}

const AdminDepartmentChecklist: React.FC<AdminDepartmentChecklistProps> = ({
  onOptionSelect,
}) => {
  const assignedDepartments: IDepartment[] = [
    { id: 1, label: 'Department A', checked: true },
    { id: 2, label: 'Department B', checked: true },
    { id: 3, label: 'Department C', checked: false },
    { id: 4, label: 'Department D', checked: false },
  ];

  const [selectedAssigned, setSelectedAssigned] = useState<number[]>([]);

  const handleAssignedClick = (id: number) => {
    const newSelectedAssigned = [...selectedAssigned];
    const index = newSelectedAssigned.indexOf(id);

    if (index === -1) {
      newSelectedAssigned.push(id);
    } else {
      newSelectedAssigned.splice(index, 1);
    }
    setSelectedAssigned(newSelectedAssigned);
    onOptionSelect(id);
  };

  return (
    <div>
      {assignedDepartments.map((department) => (
        <DepartmentCheckList
          key={department.id}
          label={department.label}
          isSelected={selectedAssigned.includes(department.id)}
          onClick={() => handleAssignedClick(department.id)}
          onChange={() => {}}
          checked={department.checked}
        />
      ))}
    </div>
  );
};
export default AdminDepartmentChecklist;
