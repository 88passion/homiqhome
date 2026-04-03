"use server";

import { revalidatePath } from "next/cache";
import { deletePropertyImage, updatePropertyImageMeta, uploadPropertyImage } from "@/lib/admin/property-images";

export interface PropertyImageActionState {
  success: boolean;
  message?: string;
}

const DEFAULT_STATE: PropertyImageActionState = { success: false };
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

export async function uploadPropertyImageAction(
  propertyId: string,
  _prevState: PropertyImageActionState = DEFAULT_STATE,
  formData: FormData
): Promise<PropertyImageActionState> {
  const file = formData.get("image");
  const altText = getString(formData, "altText") || null;
  const sortOrderRaw = getString(formData, "sortOrder");
  const sortOrder = sortOrderRaw ? Number(sortOrderRaw) : 0;

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "กรุณาเลือกรูปที่ต้องการอัปโหลด" };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { success: false, message: "ไฟล์ยังใหญ่เกินไปสำหรับการอัปโหลด กรุณาลดขนาดให้ไม่เกิน 4 MB" };
  }

  try {
    await uploadPropertyImage({
      propertyId,
      file,
      altText,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    });

    revalidatePath(`/admin/properties/${propertyId}`);
    return { success: true, message: "อัปโหลดรูปสำเร็จ" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "อัปโหลดรูปไม่สำเร็จ",
    };
  }
}

export async function deletePropertyImageAction(propertyId: string, imageId: string) {
  await deletePropertyImage(imageId);
  revalidatePath(`/admin/properties/${propertyId}`);
}

export async function updatePropertyImageMetaAction(propertyId: string, formData: FormData) {
  const imageId = getString(formData, "imageId");
  const altText = getString(formData, "altText") || null;
  const sortOrderRaw = getString(formData, "sortOrder");
  const sortOrder = sortOrderRaw ? Number(sortOrderRaw) : 0;

  if (!imageId) {
    throw new Error("ไม่พบ image id");
  }

  await updatePropertyImageMeta({
    imageId,
    altText,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  revalidatePath(`/admin/properties/${propertyId}`);
}
