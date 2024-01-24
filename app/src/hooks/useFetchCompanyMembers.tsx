import { useGetCompanyMembersQuery } from '@/features/company/companyAPI';
import { IMembersList, SortBy } from '@/types/common';
import { CompanyId } from '@/types/company';
import { DepartmentId } from '@/types/department';
import { useEffect, useState } from 'react';

export const useFetchCompanyMembers = ({
  company_id,
  department_id,
  sortCriteria,
}: {
  company_id: CompanyId;
  department_id: DepartmentId;
  sortCriteria: SortBy;
}) => {
  const [members, setMembers] = useState<IMembersList[]>([]);

  const { data, isSuccess } = useGetCompanyMembersQuery({
    company_id: company_id,
    department_id: department_id,
    sort_by: sortCriteria,
  });

  useEffect(() => {
    if (isSuccess) {
      setMembers(data);
    }
  }, [isSuccess, data]);

  return { members };
};
