"use client";

import Image from "next/image";
import { useActionState, useRef, useState } from "react";
import { deletePropertyImageAction, type PropertyImageActionState, updatePropertyImageMetaAction, uploadPropertyImageAction } from "@/app/admin/properties/image-actions";
import type { Property } from "@/types/property";

const INITIAL_STATE: PropertyImageActionState = { success: false };
const MAX_UPLOAD_MB = 4;
const MAX_IMAGE_WIDTH = 1800;
const JPEG_QUALITY = 0.82;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function fileToDrawableImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file);
    return { source: bitmap, width: bitmap.width, height: bitmap.height };
  }

  const image = document.createElement("img");
  const objectUrl = URL.createObjectURL(file);

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("ไม่สามารถอ่านไฟล์รูปได้"));
      image.src = objectUrl;
    });

    return { source: image, width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const { source, width, height } = await fileToDrawableImage(file);

  const scale = width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / width : 1;
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
  });

  if (!blob) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

export function PropertyImageManager({ property }: { property: Property }) {
  const uploadAction = uploadPropertyImageAction.bind(null, property.id);
  const [state, formAction] = useActionState(uploadAction, INITIAL_STATE);
  const [uploadInfo, setUploadInfo] = useState<string | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUploadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);
    setUploadInfo(null);

    const form = event.currentTarget;
    const fileInput = fileInputRef.current;
    const originalFile = fileInput?.files?.[0];

    if (!originalFile) {
      setClientError("กรุณาเลือกรูปที่ต้องการอัปโหลด");
      return;
    }

    setIsPreparing(true);

    try {
      const processedFile = await compressImage(originalFile);

      if (processedFile.size > MAX_UPLOAD_MB * 1024 * 1024) {
        setClientError(`ไฟล์ยังใหญ่เกินไปหลังบีบอัด (${formatFileSize(processedFile.size)}) กรุณาใช้ไฟล์ไม่เกิน ${MAX_UPLOAD_MB} MB`);
        return;
      }

      const formData = new FormData(form);
      formData.set("image", processedFile);
      setUploadInfo(`กำลังอัปโหลด ${formatFileSize(processedFile.size)}${processedFile.size !== originalFile.size ? ` (จากเดิม ${formatFileSize(originalFile.size)})` : ""}`);
      formAction(formData);

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      setClientError(error instanceof Error ? error.message : "เตรียมไฟล์อัปโหลดไม่สำเร็จ");
    } finally {
      setIsPreparing(false);
    }
  }

  return (
    <section className="space-y-6 rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-black">รูปภาพทรัพย์</h2>
        <p className="mt-2 text-sm leading-relaxed text-black/65">
          อัปโหลดรูปจริงของทรัพย์ บันทึกคำอธิบายรูป และจัดลำดับการแสดงผลได้จากส่วนนี้ ระบบจะบีบอัดรูปให้อัตโนมัติก่อนอัปโหลดเพื่อลดปัญหาไฟล์ใหญ่เกินไปบน production
        </p>
      </div>

      <form ref={formRef} onSubmit={handleUploadSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-dashed border-black/15 bg-[var(--muted-bg)] p-5 md:grid-cols-3 md:items-end">
        <label className="block md:col-span-1">
          <span className="mb-2 block text-sm font-medium text-black">เลือกรูป</span>
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
          />
          <p className="mt-2 text-xs text-black/50">แนะนำไฟล์ JPG/PNG ขนาดไม่เกิน 4 MB ระบบจะบีบอัดให้ก่อนส่ง</p>
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
            disabled={isPreparing}
            className="inline-flex items-center justify-center self-end rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/50"
          >
            {isPreparing ? "กำลังเตรียมไฟล์..." : "อัปโหลด"}
          </button>
        </div>
      </form>

      {uploadInfo && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          {uploadInfo}
        </div>
      )}

      {clientError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {clientError}
        </div>
      )}

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
