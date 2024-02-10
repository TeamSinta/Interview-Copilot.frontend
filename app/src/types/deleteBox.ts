import { MODAL_TYPE } from '@/components/common/modal/GlobalModal';

export interface IStyledDeleteBoxProps {
  deleteItemText: string | null;
  deleteFromText?: string | null;
  disabled: boolean;
  targetModalType: MODAL_TYPE;
}
