"use client";

import Image from "next/image";
import { useActionState } from "react";
import { deletePropertyImageAction, type PropertyImageActionState, updatePropertyImageMetaAction, uploadPropertyImageAction } from "@/app/admin/properties/image-actions";
import type { Property } from "@/types/property";

const INITIAL_STATE: PropertyImageActionState = { success: false };

export function PropertyImageManager({ property }: { property: Property }) {
  const uploadAction = uploadPropertyImageAction.bind(null, property.id);
  const [state, formAction] = useActionState(uploadAction, INITIAL_STATE);

  return (
    <section className="space-y-6 rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-black">รูปภาพทรัพย์</h2>
        <p className="mt-2 text-sm leading-relaxed text-black/65">
          อัปโหลดรูปจริงของทรัพย์ บันทึกคำอธิบายรูป และจัดลำดับการแสดงผลได้จากส่วนนี้
        </p>
      </div>

      <form action={formAction} className="grid grid-cols-1 gap-4 rounded-2xl border border-dashed border-black/15 bg-[var(--muted-bg)] p-5 md:grid-cols-3 md:items-end">
        <label className="block md:col-span-1">
          <span className="mb-2 block text-sm font-medium text-black">เลือกรูป</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
          />
        </label>

        <label className="block md:col-span-1">
          <span className="mb-2 block text-sm font-medium text-black">Alt text</span>
          <input
            type="text"
            name="altText"
            placeholder="เช่น ด้านหน้าบ้าน พร้อมพื้นที่จอดรถ"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
          />
        </label>

        <div className="grid grid-cols-[1fr_auto] gap-3 md:col-span-1">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black">ลำดับ</span>
            <input
              type="number"
              name="sortOrder"
              min="0"
              defaultValue={property.images.length}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center self-end rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
          >
            อัปโหลด
          </button>
        </div>
      </form>

      {state.message && (
        <div className={`rounded-xl px-4 py-3 text-sm ${state.success ? "border border-emerald-200 bg-emerald-50 text-emerald-800" : "border border-red-200 bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      )}

      {property.images.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {property.images
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((image) => (
              <div key={image.id} className="overflow-hidden rounded-2xl border border-black/8 bg-white">
                <div className="relative aspect-[4/3] w-full bg-black/5">
                  <Image src={image.imageUrl} alt={image.altText ?? property.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>

                <div className="space-y-4 p-4">
                  <form action={updatePropertyImageMetaAction.bind(null, property.id)} className="space-y-3">
                    <input type="hidden" name="imageId" value={image.id} />

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-black">Alt text</span>
                      <input
                        type="text"
                        name="altText"
                        defaultValue={image.altText ?? ""}
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-black">ลำดับ</span>
                      <input
                        type="number"
                        name="sortOrder"
                        min="0"
                        defaultValue={image.sortOrder}
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
                      />
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                      >
                        บันทึกข้อมูลรูป
                      </button>

                      <button
                        type="submit"
                        formAction={deletePropertyImageAction.bind(null, property.id, image.id)}
                        className="inline-flex items-center rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-600 hover:text-white"
                      >
                        ลบรูป
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-black/8 bg-[var(--muted-bg)] px-5 py-6 text-sm text-black/65">
          ยังไม่มีรูปในทรัพย์นี้ อัปโหลดรูปแรกได้จากฟอร์มด้านบน
        </div>
      )}
    </section>
  );
}
