export function formatPrice(price: number, purpose: "buy" | "rent"): string {
  const formatted = new Intl.NumberFormat("th-TH").format(price);
  if (purpose === "rent") return `${formatted} บาท/เดือน`;
  return `${formatted} บาท`;
}

export function formatArea(
  landSqw?: number | null,
  usableSqm?: number | null
): string {
  const parts: string[] = [];
  if (landSqw != null) parts.push(`${landSqw} ตร.ว.`);
  if (usableSqm != null) parts.push(`${usableSqm} ตร.ม.`);
  return parts.length ? parts.join(" · ") : "—";
}
