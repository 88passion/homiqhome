import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/queries/inquiries";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อ เบอร์โทร และข้อความให้ครบ" },
        { status: 400 }
      );
    }

    const result = await createInquiry({
      inquiry_type: String(body.inquiry_type ?? "general"),
      source_page: body.source_page ? String(body.source_page) : undefined,
      property_id: body.property_id ? String(body.property_id) : undefined,
      name,
      phone,
      email: body.email ? String(body.email) : undefined,
      line_id: body.line_id ? String(body.line_id) : undefined,
      message,
      payload: body.payload ?? null,
    });

    if (result.error) {
      const message = result.error.message.includes("Could not find the table")
        ? "ฐานข้อมูลยังไม่พร้อมใช้งานเต็มที่ กรุณาลองใหม่อีกครั้งหลังตั้งค่าระบบเสร็จ"
        : result.error.message;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: result.data?.id ?? null });
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }
}
