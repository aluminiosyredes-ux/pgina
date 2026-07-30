/**
 * Analytics Engine — Aluminios & Redes
 * Envía eventos al API server (PostgreSQL). Sin cookies, sin tracking externo.
 */

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
const API_BASE = `${BASE}/api`;

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type EventType =
  | "page_view"
  | "whatsapp_click"
  | "instagram_click"
  | "cotizacion_iniciada"
  | "cotizacion_enviada"
  | "chat_opened"
  | "chat_message"
  | "popup_shown"
  | "popup_dismissed"
  | "popup_cta"
  | "asistencia_form"
  | "pago_iniciado";

export interface AnalyticEvent {
  id: number;
  eventId: string;
  type: string;
  page: string;
  ts: number;
  meta?: string | null;
}

// ─── DEDUPLICATION ───────────────────────────────────────────────────────────
// Prevents double-firing from React 18 StrictMode and rapid same-page revisits.
// Module-level (not sessionStorage) so it resets on full page reload correctly.
let _lastPV: { page: string; ts: number } | null = null;

// ─── TRACK ───────────────────────────────────────────────────────────────────

export function track(type: EventType, meta?: Record<string, string>) {
  const page = typeof window !== "undefined"
    ? window.location.pathname
    : "/";

  const payload = {
    type,
    page,
    ts: Date.now(),
    meta,
  };

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", type, {
      page_path: page,
      ...meta,
    });
  }

  // Mark whatsapp clicks in sessionStorage to help dedupe global handler
  if (type === "whatsapp_click" && typeof window !== "undefined") {
    try {
      sessionStorage.setItem("ayr_last_whatsapp_click_ts", String(Date.now()));
    } catch {}
  }

  // Estadísticas locales opcionales
  try {
    const stored = JSON.parse(
      localStorage.getItem("ayr_analytics") || "[]"
    );

    stored.push(payload);

    localStorage.setItem(
      "ayr_analytics",
      JSON.stringify(stored.slice(-1000))
    );
  } catch {}
}

// ─── FETCH HELPERS ────────────────────────────────────────────────────────────

export async function purgeAllEvents(): Promise<void> {
  const res = await fetch(`${API_BASE}/analytics/purge`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Purge failed: ${res.status}`);
}

export async function fetchEvents(days?: number): Promise<AnalyticEvent[]> {
  const url = days
    ? `${API_BASE}/analytics/events?days=${days}`
    : `${API_BASE}/analytics/all`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Analytics fetch failed: ${res.status}`);
  return res.json() as Promise<AnalyticEvent[]>;
}

// ─── CLIENT-SIDE COMPUTATIONS (work on fetched events array) ─────────────────

export type EventTypeName = EventType;

export function countByType(events: AnalyticEvent[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ev of events) {
    counts[ev.type] = (counts[ev.type] || 0) + 1;
  }
  return counts;
}

export function countByPage(events: AnalyticEvent[]): { page: string; views: number }[] {
  const map: Record<string, number> = {};
  for (const ev of events.filter(e => e.type === "page_view")) {
    const p = ev.page || "/";
    map[p] = (map[p] || 0) + 1;
  }
  return Object.entries(map)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views);
}

export function estimateSessions(events: AnalyticEvent[]): number {
  const views = events.filter(e => e.type === "page_view").sort((a, b) => a.ts - b.ts);
  if (views.length === 0) return 0;
  let sessions = 1;
  for (let i = 1; i < views.length; i++) {
    if (views[i].ts - views[i - 1].ts > 30 * 60 * 1000) sessions++;
  }
  return sessions;
}

export function avgPagesPerSession(events: AnalyticEvent[]): number {
  const sessions = estimateSessions(events);
  if (sessions === 0) return 0;
  const views = events.filter(e => e.type === "page_view").length;
  return Math.round((views / sessions) * 10) / 10;
}

export function getDailySeries(
  events: AnalyticEvent[],
  days: number,
  type?: string,
): { date: string; value: number }[] {
  const series: { date: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dateStr = d.toISOString().slice(0, 10);
    const start = d.getTime();
    const end = start + 86_400_000;
    const count = events.filter(e =>
      e.ts >= start && e.ts < end && (type ? e.type === type : true)
    ).length;
    series.push({ date: dateStr, value: count });
  }
  return series;
}

export function getInterDailySeries(
  events: AnalyticEvent[],
  days: number,
): { date: string; vistas: number; interacciones: number }[] {
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
    const dateStr = d.toISOString().slice(0, 10);
    const start = d.getTime(); const end = start + 86_400_000;
    const dayEvs = events.filter(e => e.ts >= start && e.ts < end);
    series.push({
      date: dateStr,
      vistas: dayEvs.filter(e => e.type === "page_view").length,
      interacciones: dayEvs.filter(e => e.type !== "page_view").length,
    });
  }
  return series;
}

export function getInteractionBreakdown(events: AnalyticEvent[]) {
  const counts = countByType(events);
  return [
    { label: "Clics WhatsApp",      value: counts["whatsapp_click"]     || 0, color: "#25D366" },
    { label: "Chat abierto",        value: counts["chat_opened"]        || 0, color: "#06b6d4" },
    { label: "Mensajes chat",       value: counts["chat_message"]       || 0, color: "#22d3ee" },
    { label: "Cotizaciones",        value: counts["cotizacion_enviada"] || 0, color: "#f59e0b" },
    { label: "Popup CTA",           value: counts["popup_cta"]          || 0, color: "#a78bfa" },
    { label: "Instagram",           value: counts["instagram_click"]    || 0, color: "#ec4899" },
    { label: "Form asistencia",     value: counts["asistencia_form"]    || 0, color: "#34d399" },
  ].filter(i => i.value > 0);
}
