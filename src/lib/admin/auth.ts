import "server-only";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export interface AdminSessionInfo {
  userId: string;
  email?: string;
  role: "admin" | "editor";
}

export interface AdminAuthDebugInfo {
  hasUser: boolean;
  userId?: string | null;
  email?: string | null;
  adminRowFound: boolean;
  adminRole?: string | null;
  adminLookupError?: string | null;
}

export async function getAdminAuthDebugInfo(): Promise<AdminAuthDebugInfo> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      hasUser: false,
      userId: null,
      email: null,
      adminRowFound: false,
      adminRole: null,
      adminLookupError: null,
    };
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    hasUser: true,
    userId: user.id,
    email: user.email ?? null,
    adminRowFound: Boolean(adminUser),
    adminRole: adminUser?.role ?? null,
    adminLookupError: error?.message ?? null,
  };
}

export async function getAdminSession(): Promise<AdminSessionInfo | null> {
  const debug = await getAdminAuthDebugInfo();

  if (!debug.hasUser || !debug.adminRowFound || !debug.userId || !debug.adminRole) {
    return null;
  }

  return {
    userId: debug.userId,
    email: debug.email ?? undefined,
    role: debug.adminRole as "admin" | "editor",
  };
}

export async function requireAdminSession(): Promise<AdminSessionInfo> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
