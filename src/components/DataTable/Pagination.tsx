import type { PaginationProps } from '../../interfaces';

const PageButton = ({ 
  page, 
  isActive, 
  onClick 
}: { 
  page: number; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <li className={`page-item ${isActive ? 'active' : ''}`}>
    <button 
      className="page-link" 
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Page ${page}`}
    >
      {page}
    </button>
  </li>
);

const PageEllipsis = () => (
  <li className="page-item disabled">
    <span className="page-link">...</span>
  </li>
);

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
  <nav className="table-pagination">
    <ul className="pagination justify-content-center">
      <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
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
        </button>
      </li>
      
      {/* First Page */}
      {pageNumbers[0] > 1 && (
        <li className="page-item">
          <button 
            className="page-link" 
            onClick={onFirstPage}
            disabled={!canPreviousPage}
            aria-label="First page"
          >
            1
          </button>
        </li>
      )}
      
      {/* Ellipsis before page numbers */}
      {pageNumbers[0] > 2 && <PageEllipsis />}
      
      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}
      
      {/* Ellipsis after page numbers */}
      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PageEllipsis />}
      
      {/* Last Page */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <PageButton 
          page={totalPages}
          isActive={currentPage === totalPages}
          onClick={onLastPage}
        />
      )}
      
      <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
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
        </button>
      </li>
    </ul>
  </nav>
);
