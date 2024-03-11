import { AppDispatch } from '@/store';
import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import { setCurrentMembers } from '@/features/members/memberSlice';
import { SortBy } from '@/types/common';
import { CompanyId, IMember } from '@/types/company';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useFetchCompanyMembers = ({
  company_id,
  sortCriteria,
}: {
  company_id: CompanyId;
  sortCriteria: SortBy;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [members, setMembers] = useState<IMember[]>([]);

  const { data, isSuccess } = useGetCompanyMembersQuery({
    company_id: company_id,
    sort_by: sortCriteria,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentMembers(data));
      setMembers(data);
    }
  }, [isSuccess, data, dispatch]);

  return { members };
};
