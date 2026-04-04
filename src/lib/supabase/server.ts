import { cookies } from "next/headers";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function trySetCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string,
  value: string,
  options?: Record<string, unknown>
) {
  try {
    cookieStore.set(name, value, options);
  } catch {
    // In some Server Component render contexts (especially production on Vercel),
    // cookie writes are not allowed. Reads are enough for auth checks here.
  }
}

export async function createServerClient(): Promise<SupabaseClient<Database>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          trySetCookie(cookieStore, name, value, options);
        });
      },
    },
  });
}
