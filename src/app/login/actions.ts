"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export interface LoginFormState {
  success: boolean;
  message?: string;
}

const DEFAULT_STATE: LoginFormState = { success: false };

function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

export async function loginAction(
  _prevState: LoginFormState = DEFAULT_STATE,
  formData: FormData
): Promise<LoginFormState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    return { success: false, message: "กรุณากรอกอีเมลและรหัสผ่าน" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
