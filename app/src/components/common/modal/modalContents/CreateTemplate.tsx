import { AppDispatch } from '@/app/store';
import Photo from '@/components/common/buttons/photo/Photo';
import Photos from '@/components/common/buttons/photo/Photos';
import { PhotoContainer } from '@/components/common/buttons/photo/StyledPhoto';
import { TextBtnL } from '@/components/common/buttons/textBtn/TextBtn';
import { InputLayout } from '@/components/common/form/input/StyledInput';
import TextArea from '@/components/common/form/textArea/TextArea';
import TextInput from '@/components/common/form/textInput/TextInput';
import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { openModal } from '@/features/modal/modalSlice';
import { IMember } from '@/features/roles/rolesInterface';
import { useFetchSelectMembers } from '@/features/roles/rolesSlice';
import { BackgroundColor, PhotoType } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContentWrap } from './StyledModalContents';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '@/app/store';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import { useAddTemplateMutation } from '@/features/templates/templatesAPISlice';
import DepartmentDropDown from '@/components/pages/settings/memberTab/DepartmentDropdown';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import NewDepartment from '../../form/newDepartment/newDepartment';

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: 'Title',
  name: 'title',
};

const descriptionInputArg = {
  error: false,
  disable: false,
  placeholder: 'Description',
  name: 'description',
};

const CreateInterviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const workspace = useSelector((state: RootState) => state.workspace);
  const [sortCriteria] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);
  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);
  const descriptionInputRef = useRef<{ triggerValidation: () => void } | null>(
    null
  );
  const [title, setTitle] = useState(''); // Separate state for title
  const [description, setDescription] = useState(''); // Separate state for description

  const companyId: CompanyID = (!workspace.id
    ? user.companies[0].id
    : workspace.id)! as unknown as CompanyID;

  const { members } = useFetchSelectMembers({
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


  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Fetch departments with an additional trigger
  const departments = useFetchCompanyDepartments(companyId as CompanyID, fetchTrigger);

  // Function to trigger re-fetching departments
  const refetchDepartments = () => {
    setFetchTrigger(prev => prev + 1); // Increment to trigger refetch
  };


  const [addTemplate] = useAddTemplateMutation();

  const handleNext = async () => {
    let hasError = false; // Track if there's any validation error

    if (!title.trim()) {
      if (titleInputRef.current) {
        titleInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the title is not empty
    }

    if (!description.trim()) {
      if (descriptionInputRef.current) {
        descriptionInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the description is not empty
    }

    if (hasError) {
      return; // Stop if there's any validation error
    }

    const selectedMemberIds = selectedMembers
      .filter((member) => member.selected)
      .map((member) => member.id);

    if (selectedMemberIds.length === 0) {
      selectedMemberIds.push(user.id);
    }
    // Define the data to send to the server
    const requestData = {
      role_title: title,
      location: null,
      interviewers: selectedMemberIds,
      company: companyId,
      user: user.id,
      department_id: departmentId,
      description: description, // Use the description state here
    };

    try {
      const response = await addTemplate(requestData).unwrap();
      const templateID = response.id;
      onClickModalOpen(MODAL_TYPE.SELECT_VAL, { templateID });
    } catch (error) {
      // Handle error, e.g., display a notification
      console.error('Failed to add template:', error);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const textAreaOnChange = (value: string) => {
    setDescription(value);
  };

  const onClickModalOpen = (modalType: MODAL_TYPE, templateID: any) => {
    dispatch(
      openModal({
        modalType: modalType,
        templateID: templateID,
      })
    );
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  const validateDescription = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium style={{ color: 'gray', textAlign: 'end' }}>
            Description is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };


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
          value={title}
          validate={validateTitle}
          ref={titleInputRef}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>
        <TextArea
          {...descriptionInputArg}
          onChange={textAreaOnChange}
          value={description}
          validate={validateDescription}
          ref={descriptionInputRef}
        />
      </InputLayout>
      <InputLayout>
        <DepartmentDropDown
          departments={departments}
          handleSetDepartment={handleSetDepartment}
          workspaceId={workspace.id}
        />
        <NewDepartment onDepartmentCreated={refetchDepartments} />
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

      <div style={{ marginTop: '8px' }}>
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
