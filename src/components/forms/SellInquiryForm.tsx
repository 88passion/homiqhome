"use client";

import { useMemo, useState } from "react";
import { getDistrictsByProvince, getAllThaiProvinces, sortProvincesByPriority } from "@/lib/constants/thaiLocations";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import type { PropertyType } from "@/types/property";

const PROPERTY_TYPES: PropertyType[] = ["house", "condo", "land", "shophouse"];
const PROVINCES = sortProvincesByPriority(getAllThaiProvinces());

export interface SellInquiryFormData {
  name: string;
  phone: string;
  email: string;
  lineId: string;
  propertyType: string;
  province: string;
  district: string;
  message: string;
}

const initial: SellInquiryFormData = {
  name: "",
  phone: "",
  email: "",
  lineId: "",
  propertyType: "",
  province: "",
  district: "",
  message: "",
};

export function SellInquiryForm() {
  const [data, setData] = useState<SellInquiryFormData>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const districts = useMemo(() => getDistrictsByProvince(data.province), [data.province]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!data.name.trim() || !data.phone.trim() || !data.message.trim()) {
      setStatus("error");
      setErrorMessage("กรุณากรอกชื่อ เบอร์โทร และรายละเอียดทรัพย์ให้ครบ");
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry_type: "owner",
          source_page: "/sell",
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          line_id: data.lineId || undefined,
          message: data.message,
          payload: {
            propertyType: data.propertyType || undefined,
            province: data.province || undefined,
            district: data.district || undefined,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }

      setStatus("success");
      setData(initial);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-black/10 bg-[var(--muted-bg)] p-8 text-center">
        <p className="text-lg font-medium text-black">ส่งคำขอฝากขายเรียบร้อยแล้ว</p>
        <p className="mt-2 text-black/70">ทีมงาน homiqhome จะติดต่อคุณกลับโดยเร็ว</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-black">
            ชื่อ-นามสกุล <span className="text-black/50">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            placeholder="ชื่อ-นามสกุล"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-black">
            เบอร์โทรศัพท์ <span className="text-black/50">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={data.phone}
            onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            placeholder="08X-XXX-XXXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-black">อีเมล</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label htmlFor="lineId" className="mb-1 block text-sm font-medium text-black">LINE ID</label>
          <input
            id="lineId"
            type="text"
            value={data.lineId}
            onChange={(e) => setData((d) => ({ ...d, lineId: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            placeholder="LINE ID ของคุณ"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="propertyType" className="mb-1 block text-sm font-medium text-black">ประเภททรัพย์</label>
          <select
            id="propertyType"
            value={data.propertyType}
            onChange={(e) => setData((d) => ({ ...d, propertyType: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">-- เลือก --</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="province" className="mb-1 block text-sm font-medium text-black">จังหวัด</label>
          <select
            id="province"
            value={data.province}
            onChange={(e) => setData((d) => ({ ...d, province: e.target.value, district: "" }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">-- เลือก --</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="district" className="mb-1 block text-sm font-medium text-black">อำเภอ/เขต</label>
        {districts.length > 0 ? (
          <select
            id="district"
            value={data.district}
            onChange={(e) => setData((d) => ({ ...d, district: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          >
            <option value="">-- เลือก --</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        ) : (
          <input
            id="district"
            type="text"
            value={data.district}
            onChange={(e) => setData((d) => ({ ...d, district: e.target.value }))}
            className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
            placeholder="อำเภอหรือเขต"
          />
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-black">
          รายละเอียดทรัพย์ <span className="text-black/50">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={data.message}
          onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
          className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-black focus:border-[var(--accent-beige)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-beige)]"
          placeholder="ตัวอย่าง: บ้านเดี่ยว 2 ชั้น โซนบางนา 60 ตร.ว. ต้องการขาย 8.9 ล้าน"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-black px-6 py-3.5 font-medium text-white transition-colors hover:bg-black/90 disabled:opacity-60 md:w-auto md:min-w-[220px]"
      >
        {status === "submitting" ? "กำลังส่ง..." : "ส่งคำขอฝากขาย"}
      </button>
    </form>
  );
}
