"use client";

import { type ReactNode, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Props for the PaginationWrap component.
 */
export interface PaginationWithLinksProps {
  /** Total number of items available. */
  totalCount: number;
  /** Number of items per page. */
  pageSize: number;
  /** Current active page. */
  page: number;
  /** Custom search parameter for pagination (default: "page"). */
  pageSearchParam?: string;
}

/**
 * PaginationWrap component to display paginated navigation.
 *
 * @param {PaginationWithLinksProps} props - Component properties.
 * @returns {JSX.Element} The pagination component.
 */
export function PaginationWrap({
  pageSize,
  totalCount = 0,
  page,
  pageSearchParam = "page",
}: PaginationWithLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPageCount = Math.max(1, Math.ceil(totalCount / pageSize));

  /**
   * Constructs the pagination link with updated page query parameter.
   *
   * @param {number} newPage - The new page number.
   * @returns {string} The updated URL with the correct page query parameter.
   */
  const buildLink = useCallback(
    (newPage: number): string => {
      if (!searchParams) return `${pathname}?${pageSearchParam}=${newPage}`;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(pageSearchParam, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pageSearchParam, searchParams, pathname]
  );

  /**
   * Renders pagination numbers with ellipsis where necessary.
   *
   * @returns {ReactNode[]} Array of pagination elements.
   */
  const renderPageNumbers = (): ReactNode[] => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPageCount - 1, page + 1);

    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={buildLink(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPageCount > maxVisiblePages && page > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={buildLink(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPageCount > maxVisiblePages && page < totalPageCount - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPageCount > 1) {
      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            href={buildLink(totalPageCount)}
            isActive={page === totalPageCount}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <Pagination className="md:justify-end">
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={
                page === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
