import React, {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react';
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react';
import UserMediaError from '../UserMediaError/UserMediaError';
import { Menu, MenuItem } from '@mui/material';
import {
  VideoContainer,
  ButtonWrapper,
  Wrapper,
  IconButtonWrapper,
  HomeContainer,
  IconWrapper,
  DropdownButton,
  SelectBox,
} from './StyledHairCheck';
import { Stack } from '@mui/material';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { TextIconBtnL } from '@/components/common/buttons/textIconBtn/TextIconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import {
  DropUpIcon,
  RightBracketIcon,
  VideoCam,
  VideoCamoff,
  VideoMic,
  VideoMicOff,
  VideoSound,
} from '@/components/common/svgIcons/Icons';
import TextInput from '@/components/common/form/textInput/TextInput';
import Slider from '@/components/common/slider/CustomSlider';
import InterviewRoundCard from '@/components/common/cards/interviewRoundCard/InterviewRoundCard';
import {
  BodySMedium,
  H3Bold,
} from '@/components/common/typeScale/StyledTypeScale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createCandidate,
  createInterviewRound,
} from '../../../../features/interviews/interviewsAPI';
import { useGetTemplateQuestionsQuery } from '@/features/templates/templatesQuestionsAPISlice';
import { TemplateQuestions } from '@/features/templates/templatesInterface';
import IconButton from '@mui/material/IconButton';
import { useGetTemplatesQuery } from '@/features/templates/templatesAPISlice';
import { Template } from '@/pages/Templates_/Templates';
import { CompanyID } from '@/features/settingsDetail/userSettingTypes';
import { TextBtnM } from '@/components/common/buttons/textBtn/TextBtn';
import { useFetchCompanyDepartments } from '@/components/pages/settings/memberTab/useFetchAndSortMembers';
import DepartmentDropDown from '@/components/common/dropDown/DepartmentDropdown';
import { IMember } from '@/types/company';

interface HairCheckProps {
  joinCall: () => void;
  cancelCall: () => void;
  setInterviewRoundDetails: (
    details: { title: any; template_id: any; email: any } | null
  ) => Promise<boolean>;
}

export default function HairCheck({
  joinCall,
  cancelCall,
  setInterviewRoundDetails,
}: HairCheckProps) {
  const localParticipant = useLocalParticipant();
  const { user } = useSelector((state: RootState) => state.user);
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTitle, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isFormValid, setFormValid] = useState(true);

  const titleInputRef = useRef<{ triggerValidation: () => void } | null>(null);

  const workspace = useSelector((state: RootState) => state.workspace);

  // definitely should look over this, idk what TS is doing here om on the companyId type.
  const companyId: CompanyID = (!workspace.id
    ? user?.companies?.[0]?.id ?? workspace.id
    : workspace.id)! as unknown as CompanyID;

  const departments = useFetchCompanyDepartments(companyId as CompanyID);
  //setQuestions

  const { data: templateQuestions } = useGetTemplateQuestionsQuery();

  // const setTemplate

  const getRoomNameFromUrl = (url: string): string => {
    // Create a new URL object from the given URL string
    const urlObj = new URL(url);

    // Get the pathname from the URL object
    const pathname = urlObj.pathname;

    // Split the pathname by '/' and filter out empty strings
    const segments = pathname.split('/').filter((segment) => segment !== '');

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    return lastSegment;
  };

  const generateRandomUsername = (length = 8) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const startMeeting = async () => {
    if (!selectedTemplate) setFormValid(false);
    let hasError = false; // Track if there's any validation error
    if (!newTitle.trim()) {
      if (titleInputRef.current) {
        setFormValid(false);
        titleInputRef.current.triggerValidation();
      }
      hasError = true;
    } else {
      hasError = false; // Reset to false when the title is not empty
    }
    if (hasError) {
      return; // Stop if there's any validation error
    }

    try {
      const title = newTitle;
      const meeting_room_id = getRoomNameFromUrl(callObject?.properties.url);
      const company_id = companyId;
      const user_id = user.id;

      const candidateData = {
        name: 'Sinta Candidate',
        username: generateRandomUsername(),
        user_id: user_id, // Assuming you have the user's ID here
      };

      const candidateResponse = await createCandidate(candidateData);
      const candidate_id = candidateResponse.id;

      const response = await createInterviewRound(
        title,
        selectedTemplate.id, // Use the selectedTemplate's id
        meeting_room_id,
        candidate_id,
        user_id,
        company_id
      );

      const interviewDetails = {
        id: response.id,
        title: response.title,
        template_id: response.template_id,
        email: 'support@sintahr.com',
        name: selectedTemplate.role_title,
        candidate_id: candidate_id,
        department: response.department, // Add department from the response
        description: response.description, // Add description from the response
      };

      setInterviewRoundDetails(interviewDetails).then(() => {
        joinCall();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const { data: templatesData, isSuccess } = useGetTemplatesQuery();

  useEffect(() => {
    if (isSuccess && templatesData?.length > 0) {
      setTemplates(templatesData);
    }
  }, [isSuccess, templatesData]);

  const getFilteredTemplateQuestionsLength = (
    templateQuestions: Record<string, TemplateQuestions> | null,
    templateId: number | null
  ): number => {
    if (!templateQuestions || !templateId) {
      return 0; // Return 0 if templateQuestions or templateId is not available
    }

    const filteredQuestions = Object.values(templateQuestions).filter(
      (templateQuestion) => templateQuestion.template_id === templateId
    );

    return filteredQuestions.length;
  };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   callObject.setUserName(e.target.value);
  // };
  useEffect(() => {
    callObject?.setUserName(user.first_name || '');
  }, [callObject, localParticipant, user.first_name]);

  const join = (e: FormEvent) => {
    e.preventDefault();
    if (newTitle === '' || !selectedTemplate) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    joinCall();
  };

  const updateMicrophone = (e: ChangeEvent<HTMLSelectElement>) => {
    setMicrophone(e.target.value);
  };

  const updateSpeakers = (e: ChangeEvent<HTMLSelectElement>) => {
    setSpeaker(e.target.value);
  };

  const updateCamera = (e: ChangeEvent<HTMLSelectElement>) => {
    setCamera(e.target.value);
  };

  const microphoneItems = microphones?.map((mic) => (
    <MenuItem
      key={`mic-${mic.device.deviceId}`}
      value={mic.device.deviceId}
      onClick={() => updateMicrophone(mic.device.deviceId)}
    >
      {mic.device.label}
    </MenuItem>
  ));

  const speakerItems = speakers?.map((speaker) => (
    <MenuItem
      key={`speaker-${speaker.device.deviceId}`}
      value={speaker.device.deviceId}
      onClick={() => updateSpeakers(speaker.device.deviceId)}
    >
      {speaker.device.label}
    </MenuItem>
  ));

  const cameraItems = cameras?.map((camera) => (
    <MenuItem
      key={`cam-${camera.device.deviceId}`}
      value={camera.device.deviceId}
      onClick={() => updateCamera(camera.device.deviceId)}
    >
      {camera.device.label}
    </MenuItem>
  ));

  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject?.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject?.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const [micMenuAnchorEl, setMicMenuAnchorEl] = useState(null);
  const [speakerMenuAnchorEl, setSpeakerMenuAnchorEl] = useState(null);
  const [cameraMenuAnchorEl, setCameraMenuAnchorEl] = useState(null);

  // Handlers for opening and closing menus
  const handleMicMenuClick = (event) => {
    setMicMenuAnchorEl(event.currentTarget);
  };

  const handleSpeakerMenuClick = (event) => {
    setSpeakerMenuAnchorEl(event.currentTarget);
  };

  const handleCameraMenuClick = (event) => {
    setCameraMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMicMenuAnchorEl(null);
    setSpeakerMenuAnchorEl(null);
    setCameraMenuAnchorEl(null);
  };

  const handleSetDepartment = () => {
    console.log('set department');
  };

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return (
        <>
          <BodySMedium
            style={{
              paddingTop: '40px',
              color: 'gray',
              textAlign: 'center',
            }}
          >
            Title is required{' '}
          </BodySMedium>
        </>
      );
    }

    return null;
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <Wrapper onSubmit={join}>
      <HomeContainer>
        {localParticipant && (
          <VideoContainer>
            <DailyVideo
              sessionId={localParticipant.session_id}
              mirror
              style={{
                flex: '1',
                height: '500px',
                maxWidth: '690px',
              }}
              fit={'cover'}
            />

            <Stack
              direction="row"
              sx={{ marginTop: '4px', gap: '4px', display: 'flex' }}
            >
              <IconButtonWrapper>
                <IconButton onClick={toggleVideo}>
                  {mutedVideo ? <VideoCamoff /> : <VideoCam />}
                </IconButton>
                <DropdownButton onClick={handleCameraMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>
              <Menu
                anchorEl={cameraMenuAnchorEl}
                keepMounted
                open={Boolean(cameraMenuAnchorEl)}
                onClose={handleClose}
              >
                {cameraItems}
              </Menu>
              {/* Toggle Audio Button */}
              <IconButtonWrapper>
                <IconButton onClick={toggleAudio}>
                  {mutedAudio ? <VideoMicOff /> : <VideoMic />}
                </IconButton>
                <DropdownButton onClick={handleMicMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>

              <Menu
                anchorEl={micMenuAnchorEl}
                keepMounted
                open={Boolean(micMenuAnchorEl)}
                onClose={handleClose}
              >
                {microphoneItems}
              </Menu>
              {/* Audio Button with Dropdown */}
              <IconButtonWrapper>
                <IconButton>
                  <VideoSound />
                </IconButton>
                <DropdownButton onClick={handleSpeakerMenuClick}>
                  <IconWrapper>
                    <DropUpIcon />
                  </IconWrapper>
                </DropdownButton>
              </IconButtonWrapper>
              <Menu
                anchorEl={speakerMenuAnchorEl}
                keepMounted
                open={Boolean(speakerMenuAnchorEl)}
                onClose={handleClose}
              >
                {speakerItems}
              </Menu>

              {/* Microphone Button with Dropdown */}
            </Stack>
          </VideoContainer>
        )}

        <SelectBox>
          <Stack direction="column" alignItems="flex-start" spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{
                width: '100%',
                paddingTop: '16px',
                paddingBottom: '18px',
              }}
              spacing={1}
            >
              <H3Bold>Create a meeting</H3Bold>
              <ElWrap w={60}>
                <TextBtnM
                  disable={false}
                  label="Back"
                  onClick={cancelCall}
                  className={BackgroundColor.WHITE}
                />
              </ElWrap>
            </Stack>
            <BodySMedium>Title of your meeting</BodySMedium>
            <div
              style={{
                width: '100%',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              <ElWrap>
                <TextInput
                  name="title"
                  ref={titleInputRef}
                  disable={false}
                  placeholder={`Enter your Interview title here!`}
                  value={newTitle}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  validate={validateTitle}
                />
              </ElWrap>
              {!isFormValid && newTitle === '' ? (
                <BodySMedium
                  style={{
                    color: 'gray',
                    position: 'absolute',
                    bottom: -22,
                    right: 0,
                  }}
                >
                  Title is required{' '}
                </BodySMedium>
              ) : null}
            </div>
          </Stack>
          <div
            style={{ width: '100%', marginTop: '16px', marginBottom: '34px' }}
          >
            {' '}
            <DepartmentDropDown
              departments={departments}
              handleSetDepartment={handleSetDepartment} // this should set the departmentid to then fetch the templates for that department only?
              workspaceId={workspace.id}
            />
          </div>
          <div style={{ height: '100%' }}>
            <Slider
              items={templates}
              renderItem={(template: Template) => (
                <InterviewRoundCard
                  key={template.id}
                  templateId={template.id}
                  imageUrl={template.image}
                  title={template.role_title}
                  numberOfQuestions={`${getFilteredTemplateQuestionsLength(
                    templateQuestions,
                    template.id
                  )} Questions`}
                  members={template.interviewers?.map(
                    (interviewer: IMember) => ({
                      firstName: interviewer.firstName,
                      lastName: interviewer.lastName,
                      profilePicture: interviewer.profilePicture,
                    })
                  )}
                  onClick={(templateId) => {
                    const selected = templates.find(
                      (template) => template.id === templateId
                    );
                    setSelectedTemplate(selected || null);
                  }}
                  selected={selectedTemplate?.id === template.id}
                />
              )}
            />
            {!isFormValid && !selectedTemplate ? (
              <BodySMedium
                style={{
                  color: 'red',
                  position: 'absolute',
                  textAlign: 'center',
                }}
              >
                Template is required{' '}
              </BodySMedium>
            ) : null}
          </div>
          <ButtonWrapper>
            <ElWrap>
              <TextIconBtnL
                disable={false}
                label="Start Meeting"
                icon={<RightBracketIcon />}
                onClick={startMeeting}
                className={BackgroundColor.ACCENT_PURPLE}
              />
            </ElWrap>
          </ButtonWrapper>
        </SelectBox>
      </HomeContainer>
    </Wrapper>
  );
}
