import { BackgroundColor, DataLoading } from "@/features/utils/utilEnum";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TextBtnL } from "../../buttons/textBtn/TextBtn";
import { Input } from "../input/StyledInput";
import { InviteContainer, InviteWrap } from "./StyledDepartment";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { useCreateNewDepartmentMutation } from "@/features/settingsDetail/userSettingsAPI";
import {
  AccessToken,
  CompanyID,
} from "@/features/settingsDetail/userSettingTypes";
import { RootState } from "@/app/store";
import { useCookies } from "react-cookie";

const TextBtnLProps = {
  disable: false,
  label: "Create",
  onclick: () => {},
  className: BackgroundColor.WHITE,
};

export interface IInviteProps {
  invite_member: {
    member_email: string;
    admin: boolean;
  };
  status:
    | DataLoading.FULFILLED
    | DataLoading.PENDING
    | DataLoading.UNSEND
    | DataLoading.REJECTED;
}

const NewDepartment = () => {
  //redux

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [cookies, ,] = useCookies(["access_token"]);
  const accessToken = cookies.access_token as AccessToken;
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);

  // Mutation hook
  const [createNewDepartment, { isLoading }] = useCreateNewDepartmentMutation();
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  // Input change handler
  const onDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDepartmentName(e.target.value);
  };

  const CreateNewDepartment = async () => {
    await createNewDepartment({
      access: accessToken, // Your access token
      company_id: companyId, // The selected company ID
      departmentTitle: newDepartmentName, // The name of the new department
    })
      .unwrap()
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <InviteWrap>
      <InviteContainer>
        <Input
          placeholder="New Department"
          name="new_department"
          onChange={(e) => {
            onDepartmentChange(e);
          }}
          value={newDepartmentName}
          disabled={isLoading}
        />
        <ElWrap w={120}>
          <TextBtnL {...TextBtnLProps} onClick={CreateNewDepartment} />
        </ElWrap>
      </InviteContainer>
    </InviteWrap>
  );
};

export default NewDepartment;
