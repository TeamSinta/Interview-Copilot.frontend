import styled from 'styled-components';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { BodyMMedium } from '../../typeScale/StyledTypeScale';
import { TextBtnS } from '../../buttons/textBtn/TextBtn';
import { openModal } from '@/features/modal/modalSlice';
import { MODAL_TYPE } from '../../modal/GlobalModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';

export const DeleteBoxContainer = styled.div`
  margin-top: 16px;
  border-radius: 16px;
  background: var(--bg, #f6f6fb);
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IStyledDeleteBoxProps {
  deleteItemText: string | null;
  deleteFromText?: string | null;
  disabled: boolean;
}

const StyledDeleteBox: React.FC<IStyledDeleteBoxProps> = ({
  deleteItemText,
  deleteFromText,
  disabled,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickModalOpen = (modalType: MODAL_TYPE) => {
    dispatch(
      openModal({
        modalType: modalType,
      })
    );
  };

  return (
    <DeleteBoxContainer>
      <BodyMMedium style={{ opacity: 0.5 }}>You can </BodyMMedium>
      <ElWrap w={50} h={10}>
        <TextBtnS
          label="delete"
          onClick={() => onClickModalOpen(MODAL_TYPE.DEL_CONFIRM)}
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
