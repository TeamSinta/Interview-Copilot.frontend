import { AppDispatch } from "@/app/store";
import Photo from "@/components/common/buttons/photo/Photo";
import Photos from "@/components/common/buttons/photo/Photos";
import { PhotoContainer } from "@/components/common/buttons/photo/StyledPhoto";
import { TextBtnL } from "@/components/common/buttons/textBtn/TextBtn";
import Invite from "@/components/common/form/invite/Invite";
import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { closeModal } from "@/features/modal/modalSlice";
// import { selectedMember } from "@/features/roles/rolesSlice";
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
import { useFetchCompanyMembers } from "@/components/pages/settings/memberTab/useFetchAndSortMembers";
import {
  useGetTemplateDetailQuery,
  useUpdateTemplateMutation,
} from "@/features/templates/templatesAPISlice";
import { useParams } from "react-router-dom";

const EditInterviewers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria] = useState("");
  const [departmentId] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

  const [cookies, ,] = useCookies(["access_token"]);
  const accessToken = cookies.access_token as AccessToken;
  const { templateId } = useParams();
  const { data: templateData } = useGetTemplateDetailQuery(templateId);

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;
  const { members } = useFetchCompanyMembers({
    access: accessToken,
    company_id: companyId,
    department_id: departmentId,
    sortCriteria: sortCriteria,
  });

  useEffect(() => {
    if (members && members.length > 0 && templateData) {
      // Assuming templateData.interviewers contains the IDs of the selected interviewers
      const interviewerIds = new Set(
        templateData.interviewers.map((i) => i.id)
      );

      const initializedMembers = members.map((member) => ({
        ...member,
        member_idx: member.id, // map id to member_idx
        selected: interviewerIds.has(member.id),
      }));
      setSelectedMembers(initializedMembers);
    }
  }, [members, templateData]); // Depend on templateData as well

  const onMemberSelected = (memberId: number) => {
    const updatedMembers = selectedMembers.map((member) =>
      member.id === memberId
        ? { ...member, selected: !member.selected }
        : member
    );
    setSelectedMembers(updatedMembers);
  };

  const [updateTemplate] = useUpdateTemplateMutation();

  const handleNext = async () => {
    const selectedMemberIds = selectedMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    try {
      const requestData = {
        id: templateId,
        interviewers: selectedMemberIds, // Assuming your update endpoint needs these fields
        // Add other fields as required
      };
      await updateTemplate(requestData).unwrap();

      dispatch(closeModal());
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Error updating template:", error);
    }
  };

  return (
    <ModalContentWrap>
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

      <Invite />
      <div style={{ marginTop: "8px" }}>
        <TextBtnL
          label="Save"
          disable={false}
          onClick={handleNext}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default EditInterviewers;
