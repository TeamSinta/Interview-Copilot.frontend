import { useEffect, useState } from 'react';
import { EditIcon } from '../../svgIcons/Icons';
import {
  DepartmentListLayout,
  DepartmentList,
  CheckInput,
  LabelDiv,
} from './StyledDepartmentCheckList';

interface IDepartmentListProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const DepartmentCheckList = (props: IDepartmentListProps) => {
  const { isSelected, label, onClick, checked } = props;
  const [selected, setSelected] = useState<boolean>(isSelected);
  const [check, setCheck] = useState(checked);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <DepartmentListLayout
      onClick={() => {
        setSelected(!selected);
        onClick();
      }}
      className={selected ? 'selected' : ''}
    >
      <CheckInput
        name="Check Box"
        type="checkbox"
        onChange={(e) => {
          setCheck(!check);
        }}
        checked={check}
      />
      <LabelDiv>{label}</LabelDiv>
      <DepartmentList>
        <EditIcon />
      </DepartmentList>
    </DepartmentListLayout>
  );
};

export default DepartmentCheckList;
