import ElWrap from '@/components/layouts/elWrap/ElWrap';
import {
  BodyLMedium,
  BodyMMedium,
  BodySMedium,
} from '../../typeScale/StyledTypeScale';
import {
  IBtnProps,
  StyledBtnLL,
  StyledBtnXL,
  StyledButton,
} from '../button/StyledBtn';
import { type ClassValue, clsx } from 'clsx';

// delete later
export const TextIconBtnL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledButton onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
        <div>{icon}</div>
      </StyledButton>
    </>
  );
};

// delete later
export const TextIconBtnXL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledBtnXL onClick={onClick} disabled={disable} className={className}>
        <div>{icon}</div>
        <BodyLMedium>{label}</BodyLMedium>
      </StyledBtnXL>
    </>
  );
};

// delete later
export const TextIconBtnLL = (props: IBtnProps): JSX.Element => {
  const { label, icon, disable, onClick, className } = props;

  return (
    <>
      <StyledBtnLL onClick={onClick} disabled={disable} className={className}>
        <div>{icon}</div>
        <ElWrap w={91} h={36}>
          <BodySMedium>{label}</BodySMedium>
        </ElWrap>
      </StyledBtnLL>
    </>
  );
};

export const ICON_BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground ',
  outlined: 'bg-background text-foreground border-foreground',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

// ********* NEW
export const TextIconBtn = ({
  label,
  className,
  variant = ICON_BUTTON_VARIANTS.primary,
  icon,
  onClick,
  disabled,
}: IIconBtn) => {
  return (
    <button
      className={clsx(
        className,
        variant,
        'w-full py-2 rounded border flex gap-[10px] items-center justify-center'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      <div>{icon}</div>
    </button>
  );
};

export interface IIconBtn {
  label?: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick: () => void;
  className?: ClassValue;
  variant?: ClassValue;
}
