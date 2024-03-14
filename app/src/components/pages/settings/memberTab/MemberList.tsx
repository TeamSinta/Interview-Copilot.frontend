import { AppDispatch } from '@/store';
import SettingsMemberCard from '@/components/common/cards/settingsMemberCard/SettingsMemberCard';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import PaginationComponent from '@/components/common/pagination/PaginationComponent';
import { setMemberInfo } from '@/features/members/memberSlice';
import usePagination from '@/hooks/usePagination';
import { MemberListContainer } from '@/pages/Settings/StyledSettings';
import { IMember } from '@/types/company';
import { ModalTypeMap, Stack } from '@mui/material';

import React from 'react';
import { useDispatch } from 'react-redux';

type MemberListProps = {
  members: IMember[] | undefined;
  onClickModalOpen: (ModalType: MODAL_TYPE) => void;
};

const MemberList: React.FC<MemberListProps> = ({
  members,
  onClickModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const ITEMS_PER_PAGE = 5;

  const {
    currentPageItems: currentMembers,
    handlePageChange,
    currentPage,
    pageCount,
  } = usePagination(members ?? [], ITEMS_PER_PAGE);

  return (
    <>
      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <MemberListContainer>
        <Stack direction="column" spacing={1}>
          {currentMembers.map((member) => (
            <SettingsMemberCard
              key={member.id}
              user={member}
              onClick={() => {
                dispatch(
                  setMemberInfo({
                    id: member.id,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    username: member.username,
                    profilePicture: member.profilePicture,
                    role: member.role,
                  })
                );
                onClickModalOpen(MODAL_TYPE.MEMBER_SET);
              }}
            />
          ))}
        </Stack>
      </MemberListContainer>
    </>
  );
};

export default MemberList;
