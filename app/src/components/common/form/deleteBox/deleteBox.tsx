import styled from 'styled-components';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BodyMMedium } from '../../typeScale/StyledTypeScale';
import { TextBtnS } from '../../buttons/textBtn/TextBtn';
import { openModal } from '@/features/modal/modalSlice';
import { MODAL_TYPE } from '../../modal/GlobalModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { IStyledDeleteBoxProps } from '@/types/deleteBox';

export const DeleteBoxContainer = styled.div`
  margin-top: 16px;
  border-radius: 16px;
  background: var(--bg, #f6f6fb);
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDeleteBox: React.FC<IStyledDeleteBoxProps> = ({
  deleteItemText,
  deleteFromText,
  disabled,
  targetModalType,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickModalOpen = (targetModalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: targetModalType,
      })
    );
  };

  return (
    <DeleteBoxContainer>
      <BodyMMedium style={{ opacity: 0.5 }}>You can </BodyMMedium>
      <ElWrap w={50} h={10}>
        <TextBtnS
          label="delete"
          onClick={() => onClickModalOpen(targetModalType)}
          disable={disabled} // Temporarily disabled
          className=""
        />
      </ElWrap>
      <BodyMMedium style={{ opacity: 0.5 }}>
        {' '}
        your {deleteItemText} from {deleteFromText}.
      </BodyMMedium>
    </DeleteBoxContainer>
  );
};

export default StyledDeleteBox;
