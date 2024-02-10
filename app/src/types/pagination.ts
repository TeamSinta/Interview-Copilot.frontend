export interface PaginationComponentProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}
