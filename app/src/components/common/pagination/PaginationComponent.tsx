// PaginationComponent.tsx
import React from 'react';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { PaginationComponentProps } from '@/types/pagination';
import { DefaultTheme } from '@/styles/StyleType';

const theme = createTheme({
  palette: {
    secondary: {
      main: `${DefaultTheme.colors.accentPurple}`,
      light: `${DefaultTheme.colors.palePurple}`,
      contrastText: `${DefaultTheme.colors.white}`,
    },
  },
});

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        showFirstButton
        showLastButton
        shape="rounded"
        size="small"
        color="secondary"
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
