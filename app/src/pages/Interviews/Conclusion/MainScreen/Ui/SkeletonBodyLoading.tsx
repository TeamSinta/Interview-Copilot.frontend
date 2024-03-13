import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { BoxShadow } from '../../../StyledConclusions';

const SkeletonBodyLoading = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 py-4 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex flex-col space-y-3 py-9 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col space-y-3 py-2 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex flex-col space-y-3 py-2 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex flex-col space-y-3 py-3 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex flex-col space-y-3 py-3 px-1  ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </>
  );
};

export default SkeletonBodyLoading;
