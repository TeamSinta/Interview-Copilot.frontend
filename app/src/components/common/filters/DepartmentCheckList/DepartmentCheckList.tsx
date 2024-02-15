import { IDepartmentListProps } from '@/types/department';
import {
  CheckInput,
  DepartmentListLayout,
  LabelDiv,
} from './StyledDepartmentCheckList';

const DepartmentCheckList = (props: IDepartmentListProps) => {
  const { onChange, data } = props;

  return (
    <DepartmentListLayout
      onClick={() => {
        onChange({ ...data, selected: !data.selected });
      }}
      className={data.selected ? 'selected' : ''}
    >
      <CheckInput
        name={data.name}
        value={data.value}
        type="checkbox"
        onChange={(e) => {
          onChange({ ...data, selected: e.target.checked });
        }}
        checked={data.selected}
      />
      <LabelDiv>{data.name}</LabelDiv>
    </DepartmentListLayout>
  );
};

export default DepartmentCheckList;
