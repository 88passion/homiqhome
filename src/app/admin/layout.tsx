import type { ReactNode } from "react";
import { AdminSessionBar } from "@/components/admin/AdminSessionBar";
import { requireAdminSession } from "@/lib/admin/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <>
      <AdminSessionBar session={session} />
      {children}
    </>
  );
}
