import ElWrap from '@/components/layouts/elWrap/ElWrap';
import GlobalModal, { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { AppDispatch } from '@/app/store';
import { openModal } from '@/features/modal/modalSlice';
import Stack from '@mui/material/Stack';
import StyledInvitationBox from '@/components/common/form/inviteBox/InviteBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
// import MemberList from './DepartmentList';\
import SortingDropdown from './SortingDropdown';
import {
  useFetchCompanyDepartments,
  useFetchCompanyMembers,
} from './useFetchAndSortMembers';
import { useState } from 'react';
import DepartmentList from './DepartmentList';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { PlusIcon } from '@/components/common/svgIcons/Icons';
import { BackgroundColor } from '@/features/utils/utilEnum';

const DepartmentTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria, setSortCritiera] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;
  const { members } = useFetchCompanyMembers({
    company_id: companyId,
    department_id: departmentId,
    sortCriteria: sortCriteria,
  });

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  const handleSortMembers = (value: string) => {
    setSortCritiera(value);
  };

  const departments = useFetchCompanyDepartments(companyId as CompanyID);

  const handleSetDepartment = (value: string) => {
    setDepartmentId(value);
  };

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          style={{}}
        >
          <ElWrap w={120}>
            <SortingDropdown
              sortCriteria={sortCriteria}
              handleSortMembers={handleSortMembers}
            />
          </ElWrap>
        </Stack>
        <DepartmentList departments={departments} onClickModalOpen={onClickModalOpen} />
      </Stack>
      <ElWrap h={40} w={282}>
          <TextIconBtnL
            label="Add Department"
            icon={<PlusIcon />}
            disable={false}
            className={BackgroundColor.ACCENT_PURPLE}
            onClick={() => {}}
          />
        </ElWrap>
      <GlobalModal></GlobalModal>
    </>
  );
};

export default DepartmentTab;
