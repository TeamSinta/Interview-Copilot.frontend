import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';

export const validateTitle = (value: string): string | null => {
  if (!value.trim()) {
    return (
      <BodySMedium
        style={{ paddingTop: '52px', color: 'gray', textAlign: 'end' }}
      >
        Title is required{' '}
      </BodySMedium>
    );
  }

  return null;
};

export const validateDescription = (value: string): string | null => {
  if (!value.trim()) {
    return (
      <BodySMedium style={{ color: 'gray', textAlign: 'end' }}>
        Description is required{' '}
      </BodySMedium>
    );
  }

  return null;
};
