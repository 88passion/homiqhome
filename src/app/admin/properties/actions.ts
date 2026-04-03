"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createAdminProperty, updateAdminProperty, type PropertyAdminInput } from "@/lib/admin/properties";
import type { PropertyStatus, PropertyType } from "@/types/property";

export interface PropertyFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

const DEFAULT_STATE: PropertyFormState = { success: false };

function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function getNumberOrNull(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function parseHighlights(raw: string) {
  return raw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateInput(input: PropertyAdminInput) {
  const errors: Record<string, string> = {};

  if (!input.code) errors.code = "กรุณากรอกรหัสทรัพย์";
  if (!input.slug) errors.slug = "กรุณากรอก slug";
  if (!input.title) errors.title = "กรุณากรอกชื่อทรัพย์";
  if (!input.province) errors.province = "กรุณากรอกจังหวัด";
  if (!input.district) errors.district = "กรุณากรอกเขต / อำเภอ";
  if (!input.locationText) errors.locationText = "กรุณากรอกข้อความทำเล";
  if (!input.fullDescription) errors.fullDescription = "กรุณากรอกรายละเอียดเต็ม";
  if (!Number.isFinite(input.price) || input.price <= 0) {
    errors.price = "กรุณากรอกราคาที่ถูกต้อง";
  }

  return errors;
}

function buildInput(formData: FormData): PropertyAdminInput {
  return {
    code: getString(formData, "code"),
    slug: getString(formData, "slug"),
    title: getString(formData, "title"),
    purpose: getString(formData, "purpose") as "buy" | "rent",
    propertyType: getString(formData, "propertyType") as PropertyType,
    province: getString(formData, "province"),
    district: getString(formData, "district"),
    subdistrict: getNullableString(formData, "subdistrict"),
    locationText: getString(formData, "locationText"),
    addressText: getNullableString(formData, "addressText"),
    price: Number(getString(formData, "price")),
    landAreaSqw: getNumberOrNull(formData, "landAreaSqw"),
    usableAreaSqm: getNumberOrNull(formData, "usableAreaSqm"),
    floorCount: getNumberOrNull(formData, "floorCount"),
    bedrooms: getNumberOrNull(formData, "bedrooms"),
    bathrooms: getNumberOrNull(formData, "bathrooms"),
    parking: getNumberOrNull(formData, "parking"),
    highlights: parseHighlights(getString(formData, "highlights")),
    shortDescription: getNullableString(formData, "shortDescription"),
    fullDescription: getString(formData, "fullDescription"),
    mapUrl: getNullableString(formData, "mapUrl"),
    lineMessage: getNullableString(formData, "lineMessage"),
    isFeatured: getBoolean(formData, "isFeatured"),
    isLatest: getBoolean(formData, "isLatest"),
    status: getString(formData, "status") as PropertyStatus,
  };
}

export async function createPropertyAction(
  _prevState: PropertyFormState = DEFAULT_STATE,
  formData: FormData
): Promise<PropertyFormState> {
  const input = buildInput(formData);
  const errors = validateInput(input);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "กรุณาตรวจสอบข้อมูลอีกครั้ง" };
  }

  try {
    const property = await createAdminProperty(input);
    revalidatePath("/admin/properties");
    revalidatePath("/buy");
    revalidatePath("/rent");
    revalidatePath(`/properties/${property.slug}`);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "บันทึกข้อมูลไม่สำเร็จ",
    };
  }

  redirect("/admin/properties?saved=1");
}

export async function updatePropertyAction(
  propertyId: string,
  _prevState: PropertyFormState = DEFAULT_STATE,
  formData: FormData
): Promise<PropertyFormState> {
  const input = buildInput(formData);
  const errors = validateInput(input);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "กรุณาตรวจสอบข้อมูลอีกครั้ง" };
  }

  try {
    const property = await updateAdminProperty(propertyId, input);
    revalidatePath("/admin/properties");
    revalidatePath(`/admin/properties/${propertyId}`);
    revalidatePath("/buy");
    revalidatePath("/rent");
    revalidatePath(`/properties/${property.slug}`);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "อัปเดตข้อมูลไม่สำเร็จ",
    };
  }

  redirect("/admin/properties?updated=1");
}

export async function updatePropertyStatusAction(propertyId: string, status: PropertyStatus) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .update({ status })
    .eq("id", propertyId)
    .select("slug")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/properties");
  revalidatePath(`/admin/properties/${propertyId}`);
  revalidatePath("/");
  revalidatePath("/buy");
  revalidatePath("/rent");
  revalidatePath(`/properties/${data.slug}`);
}
