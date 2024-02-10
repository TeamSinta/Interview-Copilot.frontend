import { IMembersListResponse } from '@/types/common';
import { IMember } from '@/types/company';

/* Utility function to re-format the member data received from backend */

export const transformMemberList = (
  response: IMembersListResponse[]
): IMember[] => {
  return response.map((member) => ({
    id: member.id,
    firstName: member.first_name,
    lastName: member.last_name,
    email: member.email,
    profilePicture: member.profile_picture,
    username: member.username,
    role: member.role,
  }));
};
