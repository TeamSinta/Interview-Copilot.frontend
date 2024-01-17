import { AppDispatch } from '@/app/store';
import SettingsUserCard from '@/components/common/cards/settingsUserCard/SettingsUserCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { setMemberInfo } from '@/features/members/memberSlice';
import { MembersList } from '@/features/settingsDetail/userSettingsInterface';
import { UserListContainer } from '@/pages/Settings/StyledSettings';
import { Pagination, Stack } from '@mui/material';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PAGE_SIZE = 5;

const MemberList: React.FC<{
  members: MembersList[];
  onClickModalOpen: (modalType: MODAL_TYPE) => void;
}> = ({ members, onClickModalOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);

  // calc pages
  const pageCount = Math.ceil(members.length / PAGE_SIZE);

  // get names for current page
  const indexOfLastItem = page * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <>
      <UserListContainer>
        <Stack direction="column" spacing={3}>
          {currentMembers.map((member) => (
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
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </>
  );
};

export default MemberList;
