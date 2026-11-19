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
