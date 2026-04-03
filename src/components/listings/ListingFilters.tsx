"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import type { PropertyType } from "@/types/property";

const PAGE_SIZES = [24, 48, 96] as const;

interface ListingFiltersProps {
  purpose: "buy" | "rent";
  provinces: string[];
  districts: string[];
  totalCount: number;
  pageSize: number;
}

export function ListingFilters({
  purpose,
  provinces,
  districts,
  totalCount,
  pageSize,
}: ListingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      next.delete("page");
      router.push(`/${purpose}?${next.toString()}`, { scroll: false });
    },
    [purpose, router, searchParams]
  );

  const type = searchParams.get("type") ?? "";
  const province = searchParams.get("province") ?? "";
  const district = searchParams.get("district") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const bedrooms = searchParams.get("bedrooms") ?? "";
  const currentPageSize = PAGE_SIZES.includes(pageSize as 24 | 48 | 96)
    ? pageSize
    : 24;

  const activeFilterCount = useMemo(() => {
    return [type, province, district, maxPrice, bedrooms].filter(Boolean).length;
  }, [bedrooms, district, maxPrice, province, type]);

  const activeFilters = [
    type ? { key: "type", label: `ประเภท: ${PROPERTY_TYPE_LABELS[type as PropertyType]}` } : null,
    province ? { key: "province", label: `จังหวัด: ${province}` } : null,
    district ? { key: "district", label: `เขต/อำเภอ: ${district}` } : null,
    maxPrice ? { key: "maxPrice", label: `ราคาไม่เกิน: ${Number(maxPrice).toLocaleString("th-TH")}` } : null,
    bedrooms ? { key: "bedrooms", label: `ห้องนอน: ${bedrooms}+` } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  const filtersContent = (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="filter-type" className="mb-1 block text-xs font-medium text-black/70">
            ประเภททรัพย์
          </label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => updateParams({ type: e.target.value || undefined })}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">ทั้งหมด</option>
            {(Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="filter-province" className="mb-1 block text-xs font-medium text-black/70">
            จังหวัด
          </label>
          <select
            id="filter-province"
            value={province}
            onChange={(e) =>
              updateParams({ province: e.target.value || undefined, district: undefined })
            }
            className="max-h-12 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">ทั้งหมด</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-district" className="mb-1 block text-xs font-medium text-black/70">
            อำเภอ/เขต
          </label>
          <select
            id="filter-district"
            value={district}
            onChange={(e) => updateParams({ district: e.target.value || undefined })}
            disabled={!province}
            className="max-h-12 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)] disabled:cursor-not-allowed disabled:bg-black/[0.03] disabled:text-black/40"
          >
            <option value="">ทั้งหมด</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-maxPrice" className="mb-1 block text-xs font-medium text-black/70">
            ราคาสูงสุด (บาท)
          </label>
          <input
            id="filter-maxPrice"
            type="number"
            min="0"
            placeholder="ไม่จำกัด"
            value={maxPrice}
            onChange={(e) =>
              updateParams({ maxPrice: e.target.value ? e.target.value : undefined })
            }
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          />
        </div>
        <div>
          <label htmlFor="filter-bedrooms" className="mb-1 block text-xs font-medium text-black/70">
            ห้องนอนขั้นต่ำ
          </label>
          <select
            id="filter-bedrooms"
            value={bedrooms}
            onChange={(e) => updateParams({ bedrooms: e.target.value || undefined })}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">ทั้งหมด</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-4">
        <div className="space-y-2">
          <p className="text-sm text-black/70">
            แสดง <span className="font-medium text-black">{totalCount}</span> รายการ
          </p>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 md:hidden">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => updateParams({ [filter.key]: undefined })}
                  className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-black/75"
                >
                  <span>{filter.label}</span>
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-black/70">แสดงต่อหน้า</span>
          <select
            value={String(currentPageSize)}
            onChange={(e) => {
              const size = e.target.value;
              const next = new URLSearchParams(searchParams.toString());
              next.set("pageSize", size);
              next.delete("page");
              router.push(`/${purpose}?${next.toString()}`, { scroll: false });
            }}
            className="rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm text-black focus:border-[var(--accent-beige)] focus:outline-none"
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={String(s)}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black shadow-sm"
          >
            <span>{mobileOpen ? "ซ่อนตัวกรอง" : "เปิดตัวกรอง"}</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => updateParams({ type: undefined, province: undefined, district: undefined, maxPrice: undefined, bedrooms: undefined })}
              className="text-sm font-medium text-black/70 underline underline-offset-2"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => updateParams({ [filter.key]: undefined })}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-black/75"
              >
                <span>{filter.label}</span>
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block">{filtersContent}</div>

      <div
        className={`overflow-hidden transition-all duration-200 md:hidden ${
          mobileOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">{filtersContent}</div>
      </div>
    </div>
  );
}
