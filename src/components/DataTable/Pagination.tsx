
import { Pagination as BSPagination } from 'react-bootstrap';

const PageButton = ({ 
  page, 
  isActive, 
  onClick 
}: { 
  page: number; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <BSPagination.Item 
    active={isActive} 
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    aria-label={`Page ${page}`}
  >
    {page}
  </BSPagination.Item>
);

const PageEllipsis = () => <BSPagination.Ellipsis />;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPrevious,
  onNext,
  onFirstPage,
  onLastPage,
}: PaginationProps) => (
  <div className="table-pagination">
    <BSPagination className="justify-content-center">
      <BSPagination.Prev 
        onClick={onPrevious}
        disabled={!canPreviousPage}
        aria-label="Previous page"
      >
        <span>
          <img 
            src="/src/table-icons/chevron-left.svg" 
            alt="Previous" 
            className="me-1"
          />
        </span>
        Previous
      </BSPagination.Prev>
      
      {pageNumbers[0] > 1 && (
        <BSPagination.Item 
          onClick={onFirstPage}
          disabled={!canPreviousPage}
          aria-label="First page"
        >
          1
        </BSPagination.Item>
      )}
      
      {pageNumbers[0] > 2 && <PageEllipsis />}
      
      {pageNumbers.map((page : number) => (
        <PageButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PageEllipsis />}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <PageButton 
          page={totalPages}
          isActive={currentPage === totalPages}
          onClick={onLastPage}
        />
      )}
      
      <BSPagination.Next 
        onClick={onNext}
        disabled={!canNextPage}
        aria-label="Next page"
      >
        Next
        <span>
          <img 
            src="/src/table-icons/chevron-right.svg" 
            alt="Next" 
            className="ms-1"
          />
        </span>
      </BSPagination.Next>
    </BSPagination>
  </div>
);
