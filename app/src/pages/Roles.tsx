import { AppDispatch } from "@/app/store";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { PlusIcon } from "@/components/common/svgIcons/Icons";
import { H1 } from "@/components/common/typeScale/StyledTypeScale";
import { openModal } from "@/features/modal/modalSlice";
import { getMemberAsync } from "@/features/roles/rolesSlice";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const textIconBtnArg = {
  label: "CreateDepartment",
  icon: <PlusIcon />,
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
};

const Roles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: MODAL_TYPE.CREATE_DEP,
      })
    );
  };

  useEffect(() => {
    dispatch(getMemberAsync());
  });

  return (
    <>
      <H1>Roles</H1>
      {/* ===== I will move this part when Sammy finish tab task : START=====*/}
      <TextIconBtnL
        {...textIconBtnArg}
        onClick={() => {
          handleOpenModal();
        }}
      />
      <GlobalModal></GlobalModal>
      {/* ============================= END ================================== */}
    </>
  );
};

export default Roles;
