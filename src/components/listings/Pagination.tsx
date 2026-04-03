"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  purpose: "buy" | "rent";
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export function Pagination({
  purpose,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const pageUrl = (page: number): string => {
    const q = new URLSearchParams(searchParams.toString());
    q.set("page", String(page));
    const qs = q.toString();
    return `/${purpose}${qs ? `?${qs}` : ""}`;
  };

  if (totalPages <= 1 && totalCount <= pageSize) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    return p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2);
  });

  return (
    <nav
      className="flex flex-col gap-4 border-t border-black/5 pt-8"
      aria-label="การแบ่งหน้า"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-black/70">
          แสดง {from}–{to} จาก {totalCount} รายการ
        </p>
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          {currentPage > 1 ? (
            <Link
              href={pageUrl(currentPage - 1)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-black/15 px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              ก่อนหน้า
            </Link>
          ) : (
            <span className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] px-4 text-sm text-black/35">
              ก่อนหน้า
            </span>
          )}
          {currentPage < totalPages ? (
            <Link
              href={pageUrl(currentPage + 1)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-black/15 px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              ถัดไป
            </Link>
          ) : (
            <span className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] px-4 text-sm text-black/35">
              ถัดไป
            </span>
          )}
        </div>
      </div>
      <ul className="hidden items-center gap-1 sm:flex">
        {currentPage > 1 && (
          <li>
            <Link
              href={pageUrl(currentPage - 1)}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-black/15 px-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              ก่อนหน้า
            </Link>
          </li>
        )}
        {visiblePages.map((p, i, arr) => (
            <li key={p}>
              {i > 0 && arr[i - 1] !== p - 1 && (
                <span className="mx-1 text-black/40">…</span>
              )}
              {p === currentPage ? (
                <span
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-black text-sm font-medium text-white"
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={pageUrl(p)}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-black/15 px-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
                >
                  {p}
                </Link>
              )}
            </li>
          ))}
        {currentPage < totalPages && (
          <li>
            <Link
              href={pageUrl(currentPage + 1)}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-black/15 px-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              ถัดไป
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
