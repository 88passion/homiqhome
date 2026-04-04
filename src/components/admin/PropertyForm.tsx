"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { createPropertyAction, suggestPropertyIdentityAction, type PropertyFormState, updatePropertyAction } from "@/app/admin/properties/actions";
import { normalizePropertySlug, slugifyPropertyTitle } from "@/lib/properties/identity.shared";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";

const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "house", label: "บ้าน" },
  { value: "condo", label: "คอนโด" },
  { value: "land", label: "ที่ดิน" },
  { value: "shophouse", label: "ทาวน์โฮม" },
];

const PURPOSE_OPTIONS = [
  { value: "buy", label: "ขาย" },
  { value: "rent", label: "เช่า" },
] as const;

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: "draft", label: "แบบร่าง" },
  { value: "published", label: "เผยแพร่" },
  { value: "sold", label: "ขายแล้ว" },
  { value: "rented", label: "ปล่อยเช่าแล้ว" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

function InputGroup({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
      />
      <FieldError message={error} />
    </label>
  );
}

function SelectGroup({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaGroup({
  label,
  name,
  defaultValue,
  rows = 4,
  error,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
      />
      <FieldError message={error} />
    </label>
  );
}

function CheckboxGroup({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-3 text-sm text-black">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function SubmitButton({ editing }: { editing: boolean }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
    >
      {editing ? "บันทึกการแก้ไข" : "สร้างรายการทรัพย์"}
    </button>
  );
}

const INITIAL_STATE: PropertyFormState = { success: false };

export function PropertyForm({ property }: { property?: Property }) {
  const isEditing = Boolean(property);
  const action = isEditing ? updatePropertyAction.bind(null, property!.id) : createPropertyAction;
  const [state, formAction] = useActionState(action, INITIAL_STATE);
  const [titleValue, setTitleValue] = useState(property?.title ?? "");
  const [codeValue, setCodeValue] = useState(property?.code ?? "");
  const [slugValue, setSlugValue] = useState(property?.slug ?? "");
  const [isGeneratingIdentity, setIsGeneratingIdentity] = useState(false);
  const slugTouchedRef = useRef(Boolean(property?.slug));
  const titleSlugPreview = useMemo(() => normalizePropertySlug(slugifyPropertyTitle(titleValue)), [titleValue]);

  useEffect(() => {
    if (isEditing) return;

    let active = true;
    setIsGeneratingIdentity(true);

    suggestPropertyIdentityAction(titleValue)
      .then((identity) => {
        if (!active) return;
        setCodeValue(identity.code);
        if (!slugTouchedRef.current) {
          setSlugValue(identity.slug || titleSlugPreview);
        }
      })
      .catch(() => {
        if (!active) return;
        if (!slugTouchedRef.current) {
          setSlugValue(titleSlugPreview);
        }
      })
      .finally(() => {
        if (active) setIsGeneratingIdentity(false);
      });

    return () => {
      active = false;
    };
  }, [isEditing, titleSlugPreview, titleValue]);

  useEffect(() => {
    if (isEditing || slugTouchedRef.current) return;
    setSlugValue(titleSlugPreview);
  }, [isEditing, titleSlugPreview]);

  return (
    <form action={formAction} className="space-y-8">
      <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black">รหัสทรัพย์</span>
            <input
              name="code"
              value={codeValue}
              readOnly={!isEditing}
              required={isEditing}
              onChange={(event) => setCodeValue(event.target.value)}
              className={`w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30 ${!isEditing ? "cursor-not-allowed bg-black/[0.03] text-black/60" : ""}`}
            />
            {!isEditing && (
              <p className="mt-1 text-xs text-black/50">ระบบจะสร้างรหัส HM ให้ใหม่อัตโนมัติ{isGeneratingIdentity ? "…" : ""}</p>
            )}
            <FieldError message={state.errors?.code} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black">Slug</span>
            <input
              name="slug"
              value={slugValue}
              required={isEditing}
              onChange={(event) => {
                slugTouchedRef.current = true;
                setSlugValue(normalizePropertySlug(event.target.value));
              }}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
            />
            {!isEditing && (
              <p className="mt-1 text-xs text-black/50">ระบบจะสร้าง slug จากชื่อทรัพย์ให้อัตโนมัติ และกัน slug ซ้ำให้</p>
            )}
            <FieldError message={state.errors?.slug} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black">ชื่อทรัพย์</span>
            <input
              name="title"
              required
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
            />
            <FieldError message={state.errors?.title} />
          </label>
          <SelectGroup label="จุดประสงค์" name="purpose" defaultValue={property?.purpose ?? "buy"} options={[...PURPOSE_OPTIONS]} />
          <SelectGroup label="ประเภททรัพย์" name="propertyType" defaultValue={property?.propertyType ?? "house"} options={PROPERTY_TYPE_OPTIONS} />
          <SelectGroup label="สถานะ" name="status" defaultValue={property?.status ?? "draft"} options={STATUS_OPTIONS} />
          <InputGroup label="จังหวัด" name="province" defaultValue={property?.province} required error={state.errors?.province} />
          <InputGroup label="เขต / อำเภอ" name="district" defaultValue={property?.district} required error={state.errors?.district} />
          <InputGroup label="แขวง / ตำบล" name="subdistrict" defaultValue={property?.subdistrict} />
          <InputGroup label="ข้อความทำเล" name="locationText" defaultValue={property?.locationText} required error={state.errors?.locationText} />
          <InputGroup label="ที่อยู่เต็ม" name="addressText" defaultValue={property?.addressText} />
          <InputGroup label="ราคา" name="price" type="number" defaultValue={property?.price} required error={state.errors?.price} />
          <InputGroup label="พื้นที่ดิน (ตร.ว.)" name="landAreaSqw" type="number" defaultValue={property?.landAreaSqw} />
          <InputGroup label="พื้นที่ใช้สอย (ตร.ม.)" name="usableAreaSqm" type="number" defaultValue={property?.usableAreaSqm} />
          <InputGroup label="จำนวนชั้น" name="floorCount" type="number" defaultValue={property?.floorCount} />
          <InputGroup label="ห้องนอน" name="bedrooms" type="number" defaultValue={property?.bedrooms} />
          <InputGroup label="ห้องน้ำ" name="bathrooms" type="number" defaultValue={property?.bathrooms} />
          <InputGroup label="ที่จอดรถ" name="parking" type="number" defaultValue={property?.parking} />
          <InputGroup label="Google Maps URL" name="mapUrl" defaultValue={property?.mapUrl} />
          <InputGroup label="ข้อความ LINE" name="lineMessage" defaultValue={property?.lineMessage} />
        </div>
      </div>

      <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm space-y-5">
        <TextareaGroup
          label="จุดเด่น (1 บรรทัดต่อ 1 ข้อ)"
          name="highlights"
          rows={5}
          defaultValue={property?.highlights.join("\n")}
        />
        <TextareaGroup
          label="คำอธิบายสั้น"
          name="shortDescription"
          rows={3}
          defaultValue={property?.shortDescription}
        />
        <TextareaGroup
          label="รายละเอียดเต็ม"
          name="fullDescription"
          rows={8}
          defaultValue={property?.fullDescription}
          error={state.errors?.fullDescription}
        />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-black/8 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <CheckboxGroup label="ปักหมุด Featured" name="isFeatured" defaultChecked={property?.isFeatured} />
          <CheckboxGroup label="แสดงใน Latest" name="isLatest" defaultChecked={property?.isLatest} />
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          {state.message && <p className="text-sm text-red-600">{state.message}</p>}
          <SubmitButton editing={isEditing} />
        </div>
      </div>

      {property && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
          ตอนนี้คุณแก้ข้อความ รายละเอียด ราคา สถานะ และอัปโหลดรูปของทรัพย์นี้ได้แล้ว หากต้องการปิดการขายให้เปลี่ยนสถานะเป็น “ขายแล้ว” ได้เลย
        </div>
      )}
    </form>
  );
}
