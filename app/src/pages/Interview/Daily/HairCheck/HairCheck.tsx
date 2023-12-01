import React, {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import UserMediaError from "../UserMediaError/UserMediaError";
import { MenuItem } from "@mui/material";
import {
  VideoContainer,
  ButtonWrapper,
  Wrapper,
  SelectBox,
  HomeContainer,
} from "./StyledHairCheck";
import { Stack } from "@mui/material";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import {
  CloseIcon,
  RightBracketIcon,
  VideoCam,
  VideoMic,
  VideoSound,
} from "@/components/common/svgIcons/Icons";
import TextInput from "@/components/common/form/textInput/TextInput";
import Slider from "@/components/common/slider/CustomSlider";
import InterviewRoundCard from "@/components/common/cards/interviewRoundCard/InterviewRoundCard";
import {
  BodySMedium,
  H3Bold,
} from "@/components/common/typeScale/StyledTypeScale";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  createInterviewRound,
  getCandidateByUsername,
} from "../../../../features/interviews/interviewsAPI";
import { useCookies } from "react-cookie";
import { IMember } from "@/components/common/cards/teamplateHomeCard/TemplateHomeCard";
import { useGetTemplateQuestionsQuery } from "@/features/templates/templatesQuestionsAPISlice";
import DropUpBtn from "@/components/common/dropUpBtn/dropUpBtn";
import { TemplateQuestions } from "@/features/templates/templatesInterface";
import DropdownFilter from "../../../../components/common/filters/dropdownFilter/DropdownFilter";
import IconButton from "@mui/material/IconButton";
import { useGetTemplatesQuery } from "@/features/templates/templatesAPISlice";
import { Template } from "@/pages/Templates_/Templates";

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
  const [newTitle, setTitle] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [cookies, ,] = useCookies(["access_token"]);

  //setQuestions

  const { data: templateQuestions } = useGetTemplateQuestionsQuery();

  // const setTemplate

  const getRoomNameFromUrl = (url: string): string => {
    // Create a new URL object from the given URL string
    const urlObj = new URL(url);

    // Get the pathname from the URL object
    const pathname = urlObj.pathname;

    // Split the pathname by '/' and filter out empty strings
    const segments = pathname.split("/").filter((segment) => segment !== "");

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    return lastSegment;
  };

  const startMeeting = async () => {
    if (newTitle === "") throw new Error("Empty candidate username");
    if (selectedTemplateId === "" || !selectedTemplateId)
      throw new Error("Empty selected template");

    try {
      const title = newTitle;
      const candidateId = 1;

      const meeting_room_id = getRoomNameFromUrl(callObject?.properties.url);
      const response = await createInterviewRound(
        title,
        selectedTemplateId,
        cookies.access_token,
        meeting_room_id
      );

      const interviewDetails = {
        id: response.id,
        title: response.title,
        template_id: response.template_id,
        email: "support@sintahr.com",
        name: "Template Details",
        candidate_id: candidateId,
      };

      setInterviewRoundDetails(interviewDetails).then(() => {
        joinCall();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const {
    data: templatesData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTemplatesQuery();

  useEffect(() => {
    if (isSuccess) {
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
    console.log(filteredQuestions.length);

    return filteredQuestions.length;
  };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   callObject.setUserName(e.target.value);
  // };
  useEffect(() => {
    callObject?.setUserName(user.first_name || "");
  }, [localParticipant]);

  const join = (e: FormEvent) => {
    e.preventDefault();
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
                flex: "1",
                height: "500px",
                maxWidth: "690px",
              }}
              fit={"cover"}
            />

            <Stack
              direction="row"
              sx={{ marginTop: "4px", gap: "4px", display: "flex" }}
            >
              <DropUpBtn
                mainButtonContent={<VideoMic />}
                dropdownItems={microphoneItems}
              />
              <DropUpBtn
                mainButtonContent={<VideoSound />}
                dropdownItems={speakerItems}
              />
              <DropUpBtn
                mainButtonContent={<VideoCam />}
                dropdownItems={cameraItems}
              />
            </Stack>
          </VideoContainer>
        )}

        <SelectBox>
          <Stack direction="column" alignItems="flex-start" spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{
                width: "100%",
                paddingTop: "16px",
                paddingBottom: "18px",
              }}
              spacing={1}
            >
              <H3Bold>Create a meeting</H3Bold>
              <IconButton onClick={cancelCall} style={{ stroke: "black" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <BodySMedium>Title of your meeting</BodySMedium>
            <div style={{ width: "100%" }}>
              <ElWrap>
                <TextInput
                  name="title"
                  disable={false}
                  placeholder={`Enter your Interview title here!`}
                  error={false}
                  value={newTitle}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </ElWrap>
            </div>
          </Stack>
          <div
            style={{ width: "100%", marginTop: "16px", marginBottom: "34px" }}
          >
            <DropdownFilter
              label="Department"
              optionArr={[
                { name: "Name (A-Z)", value: "name-asc" },
                { name: "Name (Z-A)", value: "name-desc" },
                { name: "Permission Level", value: "permission" },
              ]}
              dropdownName="All templates"
              value={""}
            />
          </div>
          <div style={{ height: "100%" }}>
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
                      first_name: interviewer.first_name,
                      last_name: interviewer.last_name,
                      profile_picture: interviewer.profile_picture,
                    })
                  )}
                  onClick={(templateId) => {
                    setSelectedTemplateId(templateId);
                  }}
                  selected={selectedTemplateId === template.id}
                />
              )}
            />
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
            {/* <ElWrap w={360} h={40}>
              <TextIconBtnL
                disable={false}
                label="Back to Start"
                icon={<RightBracketIcon />}
                onClick={cancelCall}
                className={BackgroundColor.WHITE}
              />
            </ElWrap> */}
          </ButtonWrapper>
        </SelectBox>
      </HomeContainer>
    </Wrapper>
  );
}
