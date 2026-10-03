export function parseMoney(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return NaN;
  return Number(
    value
      .trim()
      .replace(/\s/g, "")
      .replace(/R\$/gi, "")
      .replace(/\./g, "")
      .replace(",", "."),
  );
}
export function formatMoney(value: number | string | { toString(): string }) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}
export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}
