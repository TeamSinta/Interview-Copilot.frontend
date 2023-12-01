import { AppDispatch } from "@/app/store";
import Photo from "@/components/common/buttons/photo/Photo";
import Photos from "@/components/common/buttons/photo/Photos";
import { PhotoContainer } from "@/components/common/buttons/photo/StyledPhoto";
import { TextBtnL } from "@/components/common/buttons/textBtn/TextBtn";
import { InputLayout } from "@/components/common/form/input/StyledInput";
import Invite from "@/components/common/form/invite/Invite";
import TextArea from "@/components/common/form/textArea/TextArea";
import TextInput from "@/components/common/form/textInput/TextInput";
import { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { openModal } from "@/features/modal/modalSlice";
import { IMember } from "@/features/roles/rolesInterface";
import { useFetchSelectMembers } from "@/features/roles/rolesSlice";
import { BackgroundColor, PhotoType } from "@/features/utils/utilEnum";
import { useDispatch, useSelector } from "react-redux";
import { ModalContentWrap } from "./StyledModalContents";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import {
  AccessToken,
  CompanyID,
} from "@/features/settingsDetail/userSettingTypes";
import { useCookies } from "react-cookie";
import { useAddTemplateMutation } from "@/features/templates/templatesAPISlice";
import StatusFilter from "../../filters/statusFilter/StatusFilter";
import DropdownFilter from "../../filters/dropdownFilter/DropdownFilter";
import DepartmentDropDown from "@/components/pages/settings/memberTab/DepartmentDropdown";
import { useFetchCompanyDepartments } from "@/components/pages/settings/memberTab/useFetchAndSortMembers";
import NewDepartment from "../../form/newDepartment/newDepartment";

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: "Title",
  name: "title",
};

const descriptionInputArg = {
  error: false,
  disable: false,
  placeholder: "Description",
  name: "description",
};

interface IState {
  [key: string]: any;
  title: string;
  description: string;
}

const CreateInterviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

  const [cookies, ,] = useCookies(["access_token"]);
  const accessToken = cookies.access_token as AccessToken;
  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const { members } = useFetchSelectMembers({
    access: accessToken,
    company_id: companyId,
    department_id: departmentId,
    sortCriteria: sortCriteria,
  });

  useEffect(() => {
    if (members && members.length > 0) {
      const initializedMembers = members.map((member) => ({
        ...member,
        member_idx: member.id,
        selected: !!selectedMembers.find((m) => m.id === member.id)?.selected,
      }));
      setSelectedMembers(initializedMembers);
    } else {
      // Handle the case where there are no members
      setSelectedMembers([]);
    }
  }, [members]);

  const onMemberSelected = (memberId: number) => {
    const updatedMembers = selectedMembers.map((member) =>
      member.id === memberId
        ? { ...member, selected: !member.selected }
        : member
    );
    setSelectedMembers(updatedMembers);
  };

  const [inputValue, setInputValue] = useState<IState>({
    title: "",
    description: "",
  });

  const [addTemplate] = useAddTemplateMutation();

  const handleNext = async () => {
    // Define the data to send to the server
    const selectedMemberIds = selectedMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    // Define the data to send to the server
    const requestData = {
      role_title: inputValue.title,
      location: null,
      interviewers: selectedMemberIds,
      company: companyId,
      department_id: departmentId,
    };

    try {
      const response = await addTemplate(requestData).unwrap();
      const templateID = response.id;
      onClickModalOpen(MODAL_TYPE.SELECT_VAL, { templateID });
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error("Failed to add template:", error);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const textAreaOnChange = (value: string) => {
    inputValue["description"] = value;
  };

  const onClickModalOpen = (modalType: MODAL_TYPE, templateID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
      })
    );
  };

  const departments = useFetchCompanyDepartments(
    accessToken,
    companyId as CompanyID
  );

  const handleSetDepartment = (value: string) => {
    setDepartmentId(value);
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          onChange={inputOnChange}
          value={inputValue["title"]}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>
        <TextArea
          {...descriptionInputArg}
          onChange={textAreaOnChange}
          value={inputValue["description"]}
        />
      </InputLayout>
      <InputLayout>
        <DepartmentDropDown
          departments={departments}
          handleSetDepartment={handleSetDepartment}
          workspaceId={workspace.id}
        />
        <NewDepartment />
        <BodySMedium>Members</BodySMedium>
        <PhotoContainer>
          <Photos>
            {selectedMembers.map((member: any, index: number) => (
              <ElWrap w={40} h={40} key={index}>
                <Photo
                  photoType={PhotoType.L}
                  onSelect={() => onMemberSelected(member.id)}
                  member_idx={member.id}
                  member_firstName={member.first_name}
                  member_lastName={member.last_name}
                  member_url={member.profile_picture}
                  selected={member.selected}
                />
              </ElWrap>
            ))}
          </Photos>
        </PhotoContainer>
      </InputLayout>

      <div style={{ marginTop: "8px" }}>
        <TextBtnL
          label="Next"
          disable={false}
          onClick={handleNext}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default CreateInterviews;
