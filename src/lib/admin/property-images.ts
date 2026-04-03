import "server-only";

import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type PropertyImageRow = Database["public"]["Tables"]["property_images"]["Row"];

const PROPERTY_IMAGES_BUCKET = "property-images";

export interface PropertyImageAdminItem {
  id: string;
  propertyId: string;
  imageUrl: string;
  sortOrder: number;
  altText?: string | null;
}

function getFileExtension(filename: string) {
  const cleaned = filename.split("?")[0] ?? filename;
  const parts = cleaned.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() ?? "jpg" : "jpg";
}

function buildStoragePath(propertyId: string, filename: string) {
  const ext = getFileExtension(filename);
  return `${propertyId}/${randomUUID()}.${ext}`;
}

function getPublicUrl(path: string) {
  const supabase = createAdminClient();
  const { data } = supabase.storage.from(PROPERTY_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadPropertyImage(options: {
  propertyId: string;
  file: File;
  altText?: string | null;
  sortOrder?: number;
}) {
  const supabase = createAdminClient();
  const filePath = buildStoragePath(options.propertyId, options.file.name || "image.jpg");

  const { error: uploadError } = await supabase.storage
    .from(PROPERTY_IMAGES_BUCKET)
    .upload(filePath, options.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: options.file.type || undefined,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const publicUrl = getPublicUrl(filePath);
  const { data, error } = await supabase
    .from("property_images")
    .insert({
      property_id: options.propertyId,
      image_url: publicUrl,
      alt_text: options.altText ?? null,
      sort_order: options.sortOrder ?? 0,
    })
    .select()
    .single<PropertyImageRow>();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    propertyId: data.property_id,
    imageUrl: data.image_url,
    altText: data.alt_text,
    sortOrder: data.sort_order,
  } satisfies PropertyImageAdminItem;
}

export async function deletePropertyImage(imageId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("property_images")
    .select("id, image_url")
    .eq("id", imageId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const imageUrl = data.image_url;
  const marker = `/storage/v1/object/public/${PROPERTY_IMAGES_BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);
  const storagePath = markerIndex >= 0 ? imageUrl.slice(markerIndex + marker.length) : null;

  if (storagePath) {
    const { error: storageError } = await supabase.storage.from(PROPERTY_IMAGES_BUCKET).remove([storagePath]);
    if (storageError) {
      throw new Error(storageError.message);
    }
  }

  const { error: deleteError } = await supabase.from("property_images").delete().eq("id", imageId);
  if (deleteError) {
    throw new Error(deleteError.message);
  }
}

export async function updatePropertyImageMeta(options: {
  imageId: string;
  altText?: string | null;
  sortOrder?: number;
}) {
  const supabase = createAdminClient();
  const payload: Database["public"]["Tables"]["property_images"]["Update"] = {};

  if (options.altText !== undefined) payload.alt_text = options.altText;
  if (options.sortOrder !== undefined) payload.sort_order = options.sortOrder;

  const { data, error } = await supabase
    .from("property_images")
    .update(payload)
    .eq("id", options.imageId)
    .select()
    .single<PropertyImageRow>();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    propertyId: data.property_id,
    imageUrl: data.image_url,
    altText: data.alt_text,
    sortOrder: data.sort_order,
  } satisfies PropertyImageAdminItem;
}
