import type { NextConfig } from "next";

function getSupabaseImagePattern() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) return [];

  try {
    const url = new URL(supabaseUrl);
    return [
      {
        protocol: url.protocol.replace(":", "") as "https" | "http",
        hostname: url.hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...getSupabaseImagePattern(),
    ],
  },
};

export default nextConfig;
