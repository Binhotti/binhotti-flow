export const DAY = 86_400_000;

export function startOfDay(date = new Date()) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export function formatDate(date: Date | null) {
  if (!date) return "Nunca";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function relativeAccess(date: Date | null) {
  if (!date) return "Nunca acessou";
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
  if (minutes < 2) return "Agora";
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Ontem" : `Há ${days} dias`;
}

export function userStatus(lastSeenAt: Date | null, now = new Date()) {
  if (!lastSeenAt) return { key: "never", label: "Nunca acessou" };
  const age = now.getTime() - lastSeenAt.getTime();
  if (age <= 5 * 60_000) return { key: "online", label: "Online" };
  if (age <= 30 * DAY) return { key: "active", label: "Ativo" };
  return { key: "inactive", label: "Inativo" };
}

export function percentage(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
}

export function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
