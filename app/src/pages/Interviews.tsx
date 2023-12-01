import { AppDispatch } from "@/app/store";
import { TextIconBtnL } from "@/components/common/buttons/textIconBtn/TextIconBtn";
import GlobalModal, { MODAL_TYPE } from "@/components/common/modal/GlobalModal";
import { PlusIcon } from "@/components/common/svgIcons/Icons";
import { H1 } from "@/components/common/typeScale/StyledTypeScale";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { openModal } from "@/features/modal/modalSlice";
import { getMemberAsync } from "@/features/roles/rolesSlice";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Interviews = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  useEffect(() => {
    dispatch(getMemberAsync());
  });

  return (
    <>
      <H1>Interviews</H1>
      <ElWrap w={250} h={40}>
        <TextIconBtnL
          disable={false}
          label="Create New Interviews"
          icon={<PlusIcon />}
          onClick={() => {
            onClickModalOpen(MODAL_TYPE.CREATE_INT);
          }}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </ElWrap>
      <Outlet />
      <GlobalModal></GlobalModal>
    </>
  );
};

export default Interviews;
