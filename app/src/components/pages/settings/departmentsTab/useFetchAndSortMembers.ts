import {
  CompanyID,
  DepartmentID,
} from '@/features/settingsDetail/userSettingTypes';
import {
  useGetCompanyDepartmentsMutation,
  useGetCompanyMembersQuery,
} from '@/features/settingsDetail/userSettingsAPI';
import { MembersList } from '@/features/settingsDetail/userSettingsInterface';
import { IOption } from '@/types/common';
import { useEffect, useState } from 'react';

export const useFetchCompanyMembers = ({
  company_id,
  department_id,
  sortCriteria,
}: {
  company_id: CompanyID;
  department_id: DepartmentID;
  sortCriteria: string;
}) => {
  const [members, setMembers] = useState<MembersList[]>([]);

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
  companyId: CompanyID,
  sort_by: string,
  trigger?: number
) => {
  const [departments, setDepartments] = useState<IOption[]>([]);
  const [getCompanyDepartments] = useGetCompanyDepartmentsMutation();

  useEffect(() => {
    console.log('useEffect triggered');
    getCompanyDepartments({ company_id: companyId, sort_by: sort_by })
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
  }, [companyId, sort_by, getCompanyDepartments, trigger]);

  return departments;
};
