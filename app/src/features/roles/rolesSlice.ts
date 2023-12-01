import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataLoading } from "../utils/utilEnum";
import { fetchMembers } from "./rolesAPI";
import { IMember, IMockMembers, RolesCreateSlice } from "./rolesInterface";
import { useGetCompanyMembersQuery } from "../settingsDetail/userSettingsAPI";
import {
  AccessToken,
  CompanyID,
  DepartmentID,
} from "../settingsDetail/userSettingTypes";
import { useEffect, useState } from "react";

export const initialState: RolesCreateSlice = {
  title: "",
  all_members: [
    {
      member_idx: 0,
      member_name: "",
      member_url: "",
      member_type: "",
      selected: false,
    },
  ],
  status: DataLoading.UNSEND,
};

export const useFetchSelectMembers = ({
  access,
  company_id,
  department_id,
  sortCriteria,
}: {
  access: AccessToken;
  company_id: CompanyID;
  department_id: DepartmentID;
  sortCriteria: string;
}) => {
  const [members, setMembers] = useState<IMockMembers[]>([]);

  const { data, isSuccess } = useGetCompanyMembersQuery({
    access,
    company_id,
    department_id,
    sort_by: sortCriteria,
  });

  useEffect(() => {
    if (isSuccess) {
      const all_members = data.map((memberItem) => ({
        ...memberItem,
        selected: false,
      }));
      setMembers(all_members);
    }
  }, [isSuccess, data]);

  return { members };
};

export const getMemberAsync = createAsyncThunk(
  "roles/fetchMember",
  async () => {
    const response = await fetchMembers();
    const all_members = response.data.map((memberItem) => ({
      ...memberItem,
      selected: false,
    }));
    return all_members;
  }
);

//[Where]: How
export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMemberAsync.fulfilled, (state, action) => {
      state.all_members = action.payload;
    });
  },
  reducers: {
    //[CreateDepartment] : GetMembers from backend and showing when you open modal.
    setMembers: (state, actions) => {
      const { all_members } = actions.payload;
      state.all_members = all_members;
    },
    //[CreateDepartment] : When you select member the member selected.
    selectedMember: (state, actions) => {
      const { memberIdx } = actions.payload;
      const selectedMember = state.all_members.find(
        (member: IMember) => member.member_idx === memberIdx
      );
      if (selectedMember) {
        selectedMember.selected
          ? (selectedMember.selected = false)
          : (selectedMember.selected = true);
      }
    },
    //[CreateDepartment] : onChange for title input, invite member input
    setCreateDepTitleInput: (state, actions) => {
      const { title } = actions.payload;
      state.title = title;
    },
    //[Invite] : Push invited new member after invite member (Depending on the situation there is chance we don't need this logic)
    addInvitedMember: (state, action) => {
      const { invitedMember } = action.payload;
      state.all_members.push(invitedMember);
    },
    //Will change Thunk
    postData: (state) => {
      const selectedMemberArr = state.all_members.filter(
        (member: IMember) => member.selected
      );
      state.all_members = selectedMemberArr;
    },
    roleSliceReset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setMembers,
  selectedMember,
  postData,
  roleSliceReset,
  setCreateDepTitleInput,
  addInvitedMember,
} = rolesSlice.actions;
export const selectRole = (state: RootState) => state.role;

export default rolesSlice.reducer;
