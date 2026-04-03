import type { ReactNode } from "react";
import { AdminReadinessBanner } from "@/components/admin/AdminReadinessBanner";
import { AdminSessionBar } from "@/components/admin/AdminSessionBar";
import { requireAdminSession } from "@/lib/admin/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <>
      <AdminSessionBar session={session} />
      <AdminReadinessBanner />
      {children}
    </>
  );
}
