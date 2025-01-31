import { AppDispatch } from '@/store';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import Invite from '@/components/common/form/invite/Invite';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { closeModal } from '@/features/modal/modalSlice';
import { RootState } from '@/store';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { useFetchCompanyMembers } from '@/hooks/useFetchCompanyMembers';
import {
  useGetTemplateDetailQuery,
  useUpdateTemplateMutation,
} from '@/features/templates/templatesAPISlice';
import { useParams } from 'react-router-dom';
import { IMember } from '../../cards/teamplateHomeCard/TemplateHomeCard';
import { CompanyId } from '@/types/company';

const EditInterviewers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

  const { templateId } = useParams();

  const companyId: CompanyId = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyId;

  const stringTemplateId = templateId?.toString();

  const { data: templateData } = useGetTemplateDetailQuery(stringTemplateId);

  const { members } = useFetchCompanyMembers({
    company_id: companyId,
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
        id: member.id, // map id to member_idx
        selected: interviewerIds.has(member.id),
      }));
      setSelectedMembers(initializedMembers);
    }
  }, [members, templateData]); // Depend on templateData as well

  const onMemberSelected = (memberId: string) => {
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
      console.error('Error updating template:', error);
    }
  };

  return (
    <ModalContentWrap>
      <BodySMedium>Department Members</BodySMedium>
      <PhotoContainer>
        <Photos>
          {selectedMembers.map((member: any, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                photoType={PhotoType.L}
                onSelect={() => onMemberSelected(member.id)}
                id={member.id}
                firstName={member.firstName}
                lastName={member.lastName}
                profilePicture={member.profilePicture}
                selected={member.selected}
              />
            </ElWrap>
          ))}
        </Photos>
      </PhotoContainer>

      {/* <Invite /> */}
      <div style={{ marginTop: '8px' }}>
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
