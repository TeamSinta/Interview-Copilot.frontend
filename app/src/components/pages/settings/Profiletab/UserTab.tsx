import TextInput from "@/components/common/form/textInput/TextInput";
import {
  BodyLMedium,
  BodySMedium,
} from "@/components/common/typeScale/StyledTypeScale";
import {
  ProfilePictureContainer,
  StyledImage,
  DeleteBox,
  ChildElement,
} from "@/pages/Settings/StyledSettings";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useState } from "react";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import { PlusIcon, BinIcon } from "@/components/common/svgIcons/Icons";
import {
  useDeactivateUserMutation,
  useUpdateUserMutation,
} from "@/features/settingsDetail/userSettingsAPI";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useCookies } from "react-cookie";

const UserTab = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [cookies, ,] = useCookies(["access_token"]);
  const accessToken: string | undefined = cookies.access_token;
  const [deactivateUser] = useDeactivateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  let [lastName, setLastName] = useState<string>("");
  let [firstName, setFirstName] = useState<string>("");

  const handleDeleteAccountClick = async () => {
    try {
      await deactivateUser({
        access: accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = async () => {
    const userData = {
      first_name: firstName || null,
      last_name: lastName || null,
    };

    try {
      await updateUser({
        access: accessToken,
        userData: userData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack direction={{ md: "row", xs: "column" }} spacing={4}>
        <Stack
          direction="column"
          alignItems={{ xs: "center" }}
          justifyContent={"center"}
          spacing={2.5}
        >
          <ProfilePictureContainer
            onClick={() => {
              document.getElementById("profile-picture-input")?.click();
            }}
          >
            <StyledImage
              src={user.profile_picture || ""}
              alt="dashboard_picture"
            />
            <input
              type="file"
              id="profile-picture-input"
              style={{ display: "none" }}
              onChange={(e) => {
                // Handle file upload logic here
                // const selectedFile = e.target.files[0];
                // Add logic to upload and update the profile picture
              }}
            />
          </ProfilePictureContainer>
        </Stack>
        <Stack direction="column" spacing={2.5} style={{ width: "100%" }}>
          <Stack direction="row" spacing={2.5} style={{ width: "100%" }}>
            <Stack direction="column" spacing={2.5} style={{ width: "50%" }}>
              <BodySMedium style={{ opacity: 0.7 }}> Username</BodySMedium>

              <TextInput
                disable={true}
                placeholder="Username"
                error={false}
                onChange={() => {}}
                name="username"
                value={user.username || ""}
              />
            </Stack>
            <Stack direction="column" spacing={2.5} style={{ width: "50%" }}>
              <BodySMedium style={{ opacity: 0.7 }}> Email</BodySMedium>
              <TextInput
                disable={true}
                placeholder="Email"
                error={false}
                onChange={() => {}}
                name="email"
                value={user.email || ""}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2.5} style={{ width: "100%" }}>
            <Stack direction="column" spacing={2.5} style={{ width: "50%" }}>
              <BodySMedium style={{ opacity: 0.7 }}> First Name</BodySMedium>
              <TextInput
                disable={false}
                placeholder={`${user.first_name}`}
                error={false}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                name="lastName"
                value={firstName || ""}
              />
            </Stack>
            <Stack direction="column" spacing={2.5} style={{ width: "50%" }}>
              <BodySMedium style={{ opacity: 0.7 }}> Last Name</BodySMedium>
              <TextInput
                disable={false}
                placeholder={`${user.last_name}`}
                error={false}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                name="lastName"
                value={lastName || ""}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <ElWrap h={40} w={282}>
          <TextIconBtnL
            label="Save Changes"
            icon={<PlusIcon />}
            disable={false}
            className={BackgroundColor.ACCENT_PURPLE}
            onClick={handleSaveClick}
          />
        </ElWrap>
      </Stack>
      <Stack direction="column" spacing={4}>
        <DeleteBox>
          <ChildElement>
            <BodyLMedium>
              Delete Account?
              <BodySMedium>
                You can't undo these changes, think carefully.
              </BodySMedium>
            </BodyLMedium>
            <ElWrap h={90} w={280}>
              <TextIconBtnL
                label="Delete"
                icon={<BinIcon />}
                disable={false}
                className={BackgroundColor.WHITE}
                onClick={handleDeleteAccountClick}
              />
            </ElWrap>
          </ChildElement>
        </DeleteBox>
      </Stack>
    </>
  );
};

export default UserTab;
