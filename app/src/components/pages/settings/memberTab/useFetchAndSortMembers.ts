import {
  AccessToken,
  CompanyID,
  DepartmentID,
} from "@/features/settingsDetail/userSettingTypes";
import {
  useGetCompanyDepartmentsMutation,
  useGetCompanyMembersQuery,
} from "@/features/settingsDetail/userSettingsAPI";
import { MembersList } from "@/features/settingsDetail/userSettingsInterface";
import { useEffect, useState } from "react";

export type Department = {
  title: string;
  id: string;
};
type TransformedDepartment = {
  name: string;
  value: string;
};

export const useFetchCompanyMembers = ({
  access,
  company_id,
  department_id,
  sortCriteria,
}: {
  access: AccessToken;
  company_id: CompanyID;
  department_id: DepartmentID;
  sortCriteria: string;
}) => {
  const [members, setMembers] = useState<MembersList[]>([]);

  const { data, isSuccess } = useGetCompanyMembersQuery({
    access,
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
  accessToken: AccessToken,
  companyId: CompanyID
) => {
  const [departments, setDepartments] = useState<TransformedDepartment[]>([]);
  const [getCompanyDepartments] = useGetCompanyDepartmentsMutation();

  useEffect(() => {
    getCompanyDepartments({ access: accessToken, company_id: companyId })
      .then((response) => {
        if ("data" in response && "data") {
          const transformedData = (response.data as unknown as any[]).map(
            (department) => ({
              name: department.title,
              value: department.id.toString(),
            })
          );
          setDepartments(transformedData);
        } else if ("error" in response) {
          console.log("Error fetching company departments:", response.error);
        }
      })
      .catch((error) => console.error("Error fetching company users:", error));
  }, [accessToken, companyId, getCompanyDepartments]);

  return departments;
};
