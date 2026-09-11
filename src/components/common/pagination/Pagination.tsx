import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (page >= 0 && page < totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(0, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 1) {
      endPage = Math.min(totalPages - 1, maxVisible - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(0, totalPages - maxVisible);
    }

    if (startPage > 0) {
      pages.push(
        <PaginationItem key={0}>
          <PaginationLink
            href="#"
            isActive={currentPage === 0}
            onClick={e => handlePageChange(e, 0)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 1) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={e => handlePageChange(e, i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={totalPages - 1}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages - 1}
            onClick={e => handlePageChange(e, totalPages - 1)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => handlePageChange(e, currentPage - 1)}
            aria-disabled={currentPage === 0}
            tabIndex={currentPage === 0 ? -1 : undefined}
            className={
              currentPage === 0
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => handlePageChange(e, currentPage + 1)}
            aria-disabled={currentPage === totalPages - 1}
            tabIndex={currentPage === totalPages - 1 ? -1 : undefined}
            className={
              currentPage === totalPages - 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
