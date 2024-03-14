import { BinIcon } from '../../svgIcons/Icons';
import { Stack } from '@mui/material';

import {
  MemberCardContainer,
  ProfilePicture,
  UserDetails,
  PermissionLevel,
} from './StyledEditDepartmentMembersCard'; // Adjust the import path to match your file structure
import { BodyMMedium, BodySMedium } from '../../typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { TruncateText } from '@/utils/Utils';
import { IMember } from '@/types/company';
import { IconBtnM } from '../../buttons/iconBtn/IconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDeleteDepartmentMemberMutation } from '@/features/departments/departmentsAPI';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { resetMemberSelection } from '@/features/members/memberSlice';

interface UserCardProps {
  user: IMember;
  onSelect: (memberIdx: string) => void;
  onClick: (user: any) => void;
  selected: boolean;
}

const EditDepartmentMembersCard: React.FC<UserCardProps> = ({
  user,
  onClick,
  selected,
  onSelect,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [removeDepartmentMembers] = useDeleteDepartmentMemberMutation();
  const currentDepartment = useSelector(
    (state: RootState) => state.user.currentDepartment
  );
  const handleOnRemoveMember = async () => {
    try {
      await removeDepartmentMembers({
        department_id: currentDepartment.id,
        members: [user.id],
      });
      dispatch(resetMemberSelection);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MemberCardContainer
      onClick={() => onSelect(user.id)}
      style={{ background: selected ? '#CECDEE' : '' }}
    >
      <Stack
        direction="row"
        alignItems={'center'}
        gap="8px"
        sx={{ width: '312px' }}
      >
        <ProfilePicture
          alt={`${user.username}'s Photo`}
          src={user.profilePicture || ''}
        />
        <ElWrap w={200}>
          <UserDetails>
            <BodyMMedium>
              {TruncateText(user.firstName + ' ' + user.lastName, 25)}
            </BodyMMedium>
            <BodySMedium style={{ opacity: 0.5 }}>
              {TruncateText(user.email, 25)}
            </BodySMedium>
          </UserDetails>
        </ElWrap>
      </Stack>
      <PermissionLevel>
        <div
          style={{
            background: 'white',
            borderRadius: '11px',
            border: '1.5px #121212 solid',
            padding: '4px 10px',
          }}
        >
          <BodySMedium>{user.role}</BodySMedium>
        </div>
      </PermissionLevel>
      <ElWrap h={32} w={32}>
        <IconBtnM
          disable={false}
          onClick={handleOnRemoveMember}
          icon={<BinIcon />}
          className={BackgroundColor.WHITE}
        />
      </ElWrap>
    </MemberCardContainer>
  );
};

export default EditDepartmentMembersCard;
