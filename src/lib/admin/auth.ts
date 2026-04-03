import "server-only";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export interface AdminSessionInfo {
  userId: string;
  email?: string;
  role: "admin" | "editor";
}

export async function getAdminSession(): Promise<AdminSessionInfo | null> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !adminUser) return null;

  return {
    userId: adminUser.user_id,
    email: user.email,
    role: adminUser.role,
  };
}

export async function requireAdminSession(): Promise<AdminSessionInfo> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
