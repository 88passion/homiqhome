const HM_CODE_PREFIX = "HM";

export function slugifyPropertyTitle(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizePropertySlug(input: string): string {
  return slugifyPropertyTitle(input);
}

export function formatHmCode(sequence: number): string {
  return `${HM_CODE_PREFIX}-${sequence.toString().padStart(3, "0")}`;
}
