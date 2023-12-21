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
  select: boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const DepartmentCheckList = (props: IDepartmentListProps) => {
  const { select, label, onClick, checked } = props;
  const [selected, setSelected] = useState<boolean>(select);
  const [check, setCheck] = useState(checked);

  useEffect(() => {
    setSelected(select);
  }, [select]);

  return (
    <DepartmentListLayout
      onClick={() => {
        setSelected(selected ? false : true);
        onClick();
      }}
      className={selected ? 'selected' : ''}
    >
      <CheckInput
        name="Check Box"
        type="checkbox"
        onChange={(e) => {
          setCheck(check ? false : true);
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
