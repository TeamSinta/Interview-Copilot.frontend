import ElWrap from "@/components/layouts/elWrap/ElWrap";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { AppDispatch } from "@/app/store";
import { openModal } from "@/features/modal/modalSlice";
import Stack from "@mui/material/Stack";
import StyledInvitationBox from "@/components/common/form/inviteBox/InviteBox";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { RootState } from "@/app/store";
import {
  AccessToken,
  CompanyID,
} from "@/features/settingsDetail/userSettingTypes";
import MemberList from "./MemberList";
import SortingDropdown from "./SortingDropdown";
import DepartmentDropDown from "./DepartmentDropdown";
import {
  useFetchCompanyDepartments,
  useFetchCompanyMembers,
} from "./useFetchAndSortMembers";
import { useState } from "react";

const MemberTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria, setSortCritiera] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [cookies, ,] = useCookies(["access_token"]);
  const accessToken = cookies.access_token as AccessToken;
  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;
  const { members } = useFetchCompanyMembers({
    access: accessToken,
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

  const departments = useFetchCompanyDepartments(
    accessToken,
    companyId as CompanyID
  );

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
          <ElWrap w={270}>
            <DepartmentDropDown
              departments={departments}
              handleSetDepartment={handleSetDepartment}
              workspaceId={workspace.id}
            />
          </ElWrap>
          <ElWrap w={120}>
            <SortingDropdown
              sortCriteria={sortCriteria}
              handleSortMembers={handleSortMembers}
            />
          </ElWrap>
        </Stack>
        <MemberList members={members} onClickModalOpen={onClickModalOpen} />
      </Stack>
      <StyledInvitationBox />
      <GlobalModal></GlobalModal>
    </>
  );
};

export default MemberTab;
