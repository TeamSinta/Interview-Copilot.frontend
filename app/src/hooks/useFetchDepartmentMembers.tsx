// import { AppDispatch } from '@/app/store';
// import { IMembersListResponse, SortBy } from '@/types/common';
// import { DepartmentId } from '@/types/department';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setDepartmentMembers } from '@/features/members/memberSlice';
// import { useGetDepartmentMembersQuery } from '@/features/departments/departmentsAPI';
// import { IMember } from '@/types/company';

// export const useFetchDepartmentMembers = ({
//   department_id,
//   sortCriteria,
// }: {
//   department_id: DepartmentId;
//   sortCriteria: SortBy;
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [members, setMembers] = useState<IMember[]>([]);
//   console.log('Department ID: ', department_id);
//   const { data, isSuccess } = useGetDepartmentMembersQuery({
//     department_id: department_id,
//     sort_by: sortCriteria,
//   });

//   useEffect(() => {
//     console.log('Fetch Department Members Initiated');
//     if (isSuccess) {
//       console.log('Fetch Department Members Success');
//       console.log(data);
//       dispatch(setDepartmentMembers(data));
//       setMembers(data);
//     }
//   }, [isSuccess, data, dispatch]);

//   return { members };
// };

// RTK Queries does the job
