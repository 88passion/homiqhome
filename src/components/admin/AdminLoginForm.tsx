"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/admin/login/actions";

const INITIAL_STATE: LoginFormState = { success: false };

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5 rounded-3xl border border-black/8 bg-white p-6 shadow-sm md:p-8">
      <div>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black">อีเมล</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
            placeholder="admin@example.com"
          />
        </label>
      </div>

      <div>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black">รหัสผ่าน</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/30"
            placeholder="••••••••"
          />
        </label>
      </div>

      {state.message && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
      >
        เข้าสู่ระบบ admin
      </button>
    </form>
  );
}
