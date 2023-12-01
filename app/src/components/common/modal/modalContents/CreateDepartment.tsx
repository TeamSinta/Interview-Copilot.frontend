import { AppDispatch } from "@/app/store";
import Photo from "@/components/common/buttons/photo/Photo";
import Photos from "@/components/common/buttons/photo/Photos";
import { PhotoContainer } from "@/components/common/buttons/photo/StyledPhoto";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import Invite from "@/components/common/form/invite/Invite";
import TextInput from "@/components/common/form/textInput/TextInput";
import { PlusIcon } from "@/components/common/svgIcons/Icons";
import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { inviteMemberSliceReset } from "@/features/inviteMember/inviteMemberSlice";
import { closeModal } from "@/features/modal/modalSlice";
import { IMember } from "@/features/roles/rolesInterface";
import {
  getMemberAsync,
  postData,
  roleSliceReset,
  selectRole,
  selectedMember,
  setCreateDepTitleInput,
} from "@/features/roles/rolesSlice";
import { BackgroundColor, PhotoType } from "@/features/utils/utilEnum";
import { useDispatch, useSelector } from "react-redux";
import { ModalContentWrap } from "./StyledModalContents";

const titleInputArg = {
  label: "Title",
  error: false,
  disable: false,
  placeholder: "Title",
  name: "title",
};

const textIconBtnArg = {
  label: "CreateDepartment",
  icon: <PlusIcon />,
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const CreateDepartment = () => {
  const { members, title } = useSelector(selectRole);
  const dispatch = useDispatch<AppDispatch>();

  const onMemberSelectd = (memberIdx: number) => {
    dispatch(selectedMember({ memberIdx: memberIdx }));
  };

  const onCreateDepTtileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreateDepTitleInput({ [e.target.name]: e.target.value }));
  };

  const onCreateDepartmentClick = () => {
    dispatch(getMemberAsync());
    dispatch(postData());
    dispatch(closeModal());
    dispatch(inviteMemberSliceReset());
    dispatch(roleSliceReset());
  };

  return (
    <ModalContentWrap>
      <TextInput
        {...titleInputArg}
        onChange={(e) => {
          onCreateDepTtileChange(e);
        }}
        value={title}
      />
      <PhotoContainer>
        <BodySMedium>Members</BodySMedium>
        <Photos>
          {members.map((member: IMember, index: number) => (
            <ElWrap w={40} h={40} key={index}>
              <Photo
                member_idx={0}
                member_firstName={""}
                member_lastName={""}
                member_url={""}
                photoType={PhotoType.L}
                {...member}
                onSelect={onMemberSelectd}
              />
            </ElWrap>
          ))}
        </Photos>
      </PhotoContainer>
      <Invite />
      <TextIconBtnL {...textIconBtnArg} onClick={onCreateDepartmentClick} />
    </ModalContentWrap>
  );
};

export default CreateDepartment;
