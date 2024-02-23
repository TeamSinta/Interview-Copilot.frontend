import { BackgroundColor, DataLoading } from '@/features/utils/utilEnum';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextBtnL } from '../../buttons/textBtn/TextBtn';
import { Input } from '../input/StyledInput';
import { InviteContainer, InviteWrap } from './StyledDepartment';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { useCreateNewDepartmentMutation } from '@/features/settingsDetail/userSettingsAPI';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import { RootState } from '@/app/store';

const TextBtnLProps = {
  disable: false,
  label: 'Create',
  onclick: () => {},
  className: BackgroundColor.WHITE,
};

interface NewDepartmentProps {
  onDepartmentCreated: () => void;
}

export interface IInviteProps {
  invite_member: {
    member_email: string;
    admin: boolean;
  };
  status:
    | DataLoading.FULFILLED
    | DataLoading.PENDING
    | DataLoading.UNSEND
    | DataLoading.REJECTED;
}

const NewDepartment: React.FC<NewDepartmentProps> = ({
  onDepartmentCreated,
}) => {
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);

  const [createNewDepartment, { isLoading }] = useCreateNewDepartmentMutation();
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const onDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDepartmentName(e.target.value);
  };

  const CreateNewDepartment = async () => {
    await createNewDepartment({
      company_id: companyId,
      departmentTitle: newDepartmentName,
    })
      .unwrap()
      .then((response) => {
        // Handle success
        onDepartmentCreated();
        setNewDepartmentName('');
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <InviteWrap>
      <InviteContainer>
        <Input
          placeholder="New Department"
          name="new_department"
          onChange={(e) => {
            onDepartmentChange(e);
          }}
          value={newDepartmentName}
          disabled={isLoading}
        />
        <ElWrap w={120}>
          <TextBtnL {...TextBtnLProps} onClick={CreateNewDepartment} />
        </ElWrap>
      </InviteContainer>
    </InviteWrap>
  );
};

export default NewDepartment;
