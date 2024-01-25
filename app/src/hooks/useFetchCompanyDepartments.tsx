import { useGetCompanyDepartmentsQuery } from '@/features/departments/departmentsAPI';
import { SortBy } from '@/types/common';
import { CompanyId } from '@/types/company';
import { useEffect } from 'react';
import { setAllDepartments } from '@/features/departments/departmentSlice';
import { useDispatch } from 'react-redux';

export const useFetchAndSetCompanyDepartments = (
  company_id: CompanyId,
  sort_by: SortBy
) => {
  const dispatch = useDispatch();
  const { data: departmentsData, isSuccess } = useGetCompanyDepartmentsQuery({
    company_id: company_id,
    sort_by: sort_by,
  });

  useEffect(() => {
    if (isSuccess && departmentsData) {
      dispatch(setAllDepartments(departmentsData));
    }
  }, [isSuccess, dispatch, departmentsData]);

  return { departmentsData, isSuccess };
};
