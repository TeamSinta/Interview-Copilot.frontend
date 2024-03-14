'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateInterviewRoundMutation } from '@/features/interviews/interviewsAPISlice';

interface TitleProps {
  interviewData: any;
}

export const Title = ({ interviewData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [update] = useUpdateInterviewRoundMutation();

  const [title, setTitle] = useState(interviewData.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(interviewData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: interviewData.id,
      title: event.target.value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className="flex gap-x-1">
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="px-2 ml-1 mr-2 text-2xl font-semibold w-90 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="lg"
          className="flex items-start justify-start h-auto p-1 text-2xl font-semibold text-start w-60 "
        >
          <span className="truncate">{interviewData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-20 rounded-md h-9" />;
};
