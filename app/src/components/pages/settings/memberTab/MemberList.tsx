import { AppDispatch } from "@/app/store";
import SettingsUserCard from "@/components/common/cards/settingsUserCard/SettingsUserCard";
import { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { setMemberInfo } from "@/features/members/memberSlice";
import { MembersList } from "@/features/settingsDetail/userSettingsInterface";
import { UserListContainer } from "@/pages/Settings/StyledSettings";
import { Stack } from "@mui/material";

import React from "react";
import { useDispatch } from "react-redux";

const MemberList: React.FC<{
  members: MembersList[];
  onClickModalOpen: (modalType: MODAL_TYPE) => void;
}> = ({ members, onClickModalOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <UserListContainer>
      <Stack direction="column" spacing={3}>
        {members.map((member) => (
          <SettingsUserCard
            key={member.id}
            user={member}
            onClick={() => {
              dispatch(
                setMemberInfo({
                  id: member.id,
                  firstName: member.first_name,
                  lastName: member.last_name,
                  email: member.email,
                  pictureUrl: member.profile_picture,
                })
              );
              onClickModalOpen(MODAL_TYPE.MEMBER_SET);
            }}
          />
        ))}
      </Stack>
    </UserListContainer>
  );
};

export default MemberList;
