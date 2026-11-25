/** Australian mobile -> E.164 (+614XXXXXXXX), or null if it isn't one. */
export function normaliseAuMobile(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  const local = digits.startsWith("+61")
    ? `0${digits.slice(3)}`
    : digits.startsWith("61")
      ? `0${digits.slice(2)}`
      : digits;
  return /^04\d{8}$/.test(local) ? `+61${local.slice(1)}` : null;
}

/** Trimmed, lower-cased email, or null if it doesn't look like one. */
export function normaliseEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase().slice(0, 120);
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(email) ? email : null;
}
