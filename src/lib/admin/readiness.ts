import "server-only";

export interface AdminReadinessReport {
  hasSupabaseUrl: boolean;
  hasPublishableKey: boolean;
  hasServiceRoleKey: boolean;
  authConfigured: boolean;
  bucketConfigured: boolean;
  warnings: string[];
}

export function getAdminReadinessReport(): AdminReadinessReport {
  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasPublishableKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const hasServiceRoleKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const warnings: string[] = [];

  if (!hasSupabaseUrl || !hasPublishableKey) {
    warnings.push("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL หรือ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ครบ");
  }

  if (!hasServiceRoleKey) {
    warnings.push("ยังไม่ได้ตั้งค่า SUPABASE_SERVICE_ROLE_KEY ทำให้ create/update/upload ฝั่ง admin จะทำงานไม่ครบ");
  }

  warnings.push("ระบบ login/admin guard และ session ผ่าน Next.js cookies ถูกต่อแล้ว แต่ตอนนี้ยังต้องปิดงาน role access ของ admin_users ให้ผ่านจริง");
  warnings.push("ต้องสร้าง Supabase Storage bucket ชื่อ property-images ก่อน จึงจะอัปโหลดรูปใน production ได้จริง");
  warnings.push("ควรทดสอบ flow เพิ่มทรัพย์ แก้ไขทรัพย์ และอัปโหลดรูปบน production ให้ครบก่อนให้ทีมงานใช้จริง");

  return {
    hasSupabaseUrl,
    hasPublishableKey,
    hasServiceRoleKey,
    authConfigured: hasSupabaseUrl && hasPublishableKey,
    bucketConfigured: false,
    warnings,
  };
}
