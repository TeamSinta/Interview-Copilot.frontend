import { AppDispatch } from '@/app/store';
import SettingsUserCard from '@/components/common/cards/settingsUserCard/SettingsUserCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import PaginationComponent from '@/components/common/pagination/pagination';
import { setMemberInfo } from '@/features/members/memberSlice';
import { MembersList } from '@/features/settingsDetail/userSettingsInterface';
import usePagination from '@/hooks/usePagination';
import { UserListContainer } from '@/pages/Settings/StyledSettings';
import { Stack } from '@mui/material';

import React from 'react';
import { useDispatch } from 'react-redux';

const MemberList: React.FC<{
  members: MembersList[];
  onClickModalOpen: (modalType: MODAL_TYPE) => void;
}> = ({ members, onClickModalOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ITEMS_PER_PAGE = 5;

  const {
    currentPageItems: currentMembers,
    handlePageChange,
    currentPage,
    pageCount,
  } = usePagination(members, ITEMS_PER_PAGE);

  return (
    <>
      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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
    </>
  );
};

export default MemberList;
