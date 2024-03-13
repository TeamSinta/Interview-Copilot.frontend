import { BodyMMedium, BodySMedium } from '../../typeScale/StyledTypeScale';
import {
  IBtnProps,
  StyledButton,
  StyledButtonM,
  StyledButtonS,
} from '../button/StyledBtn';
import { type ClassValue, clsx } from 'clsx';

// delete later
export const TextBtnL = (props: IBtnProps) => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButton onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
      </StyledButton>
    </>
  );
};

// delete later
export const TextBtnM = (props: IBtnProps): JSX.Element => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButtonM onClick={onClick} disabled={disable} className={className}>
        <BodySMedium>{label}</BodySMedium>
      </StyledButtonM>
    </>
  );
};

// delete later
export const TextBtnS = (props: IBtnProps): JSX.Element => {
  const { label, disable, onClick, className } = props;

  return (
    <>
      <StyledButtonS onClick={onClick} disabled={disable} className={className}>
        <BodyMMedium>{label}</BodyMMedium>
      </StyledButtonS>
    </>
  );
};

export const BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground',
  outlined: 'bg-background text-foreground border-foreground',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

// ********* NEW
export const TextBtn = ({ label, className, disabled, onClick }: ITextBtn) => {
  return (
    <button
      className={clsx(
        className,
        'w-full text-white py-2 rounded hover:bg-indigo-700'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export interface ITextBtn {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  className?: ClassValue;
  variant?: ClassValue;
}
