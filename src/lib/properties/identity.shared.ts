const NON_SPACING_MARKS = /[\u0300-\u036f]/g;
const NON_SLUG_CHARS = /[^a-z0-9\s-]/g;
const MULTI_SPACE = /\s+/g;
const MULTI_DASH = /-+/g;
const EDGE_DASH = /^-|-$/g;

export function slugifyPropertyTitle(input: string): string {
  return input
    .normalize("NFKD")
    .replace(NON_SPACING_MARKS, "")
    .toLowerCase()
    .replace(NON_SLUG_CHARS, " ")
    .trim()
    .replace(MULTI_SPACE, "-")
    .replace(MULTI_DASH, "-")
    .replace(EDGE_DASH, "");
}

export function normalizePropertySlug(input: string): string {
  return slugifyPropertyTitle(input);
}
