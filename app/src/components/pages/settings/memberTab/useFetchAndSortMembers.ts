import {
  useGetCompanyDepartmentsMutation,
  useGetCompanyMembersQuery,
} from '@/features/settingsDetail/userSettingsAPI';
import { IMembersList, IOption, SortBy } from '@/types/common';
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
    company_id,
    department_id,
    sort_by: sortCriteria,
  });

  useEffect(() => {
    if (isSuccess) {
      setMembers(data);
    }
  }, [isSuccess, data]);

  return { members };
};

export const useFetchCompanyDepartments = (
  company_id: CompanyId,
  sort_by: SortBy,
  trigger?: number
) => {
  const [departments, setDepartments] = useState<IOption[]>([]);
  const [getCompanyDepartments] = useGetCompanyDepartmentsMutation();

  useEffect(() => {
    getCompanyDepartments({ company_id, sort_by })
      .then((response) => {
        if ('data' in response && 'data') {
          const transformedData = (response.data as unknown as any[]).map(
            (department) => ({
              name: department.title,
              value: department.id.toString(),
              selected: false,
            })
          );
          setDepartments(transformedData);
        } else if ('error' in response) {
          console.log('Error fetching company departments:', response.error);
        }
      })
      .catch((error) => console.error('Error fetching company users:', error));
  }, [company_id, sort_by, getCompanyDepartments, trigger]);

  return departments;
};
