import "server-only";

import { normalizePropertySlug, slugifyPropertyTitle } from "./identity.shared";

const HM_CODE_PREFIX = "HM";

export { normalizePropertySlug, slugifyPropertyTitle };

export function formatHmCode(sequence: number): string {
  return `${HM_CODE_PREFIX}-${sequence.toString().padStart(3, "0")}`;
}
