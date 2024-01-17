// PaginationComponent.tsx
import React from 'react';
import { Pagination } from '@mui/material';
import { PaginationComponentProps } from '@/types/pagination';

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={onPageChange}
      showFirstButton
      showLastButton
      color="primary"
    />
  );
};

export default PaginationComponent;
