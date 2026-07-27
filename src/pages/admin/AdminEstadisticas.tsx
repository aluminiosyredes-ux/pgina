import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Eye, MousePointerClick, MessageSquare, TrendingUp, Users,
  Smartphone, BarChart3, Activity, RefreshCw, Calendar,
  Shield, Layers, Box, Cpu, Wrench, ChevronRight, Loader2, Trash2, AlertTriangle,
} from "lucide-react";
import {
  fetchEvents, purgeAllEvents, countByType, countByPage, estimateSessions,
  avgPagesPerSession, getInteractionBreakdown, getDailySeries,
  getInterDailySeries, type AnalyticEvent,
} from "../../lib/analytics";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  "/":          { label: "Inicio",     icon: Eye,          color: "#f59e0b" },
  "/redes":     { label: "Redes",      icon: Shield,       color: "#60a5fa" },
  "/roller":    { label: "Roller",     icon: Layers,       color: "#a78bfa" },
  "/aluminios": { label: "Aluminios",  icon: Box,          color: "#94a3b8" },
  "/domotica":  { label: "Domótica",   icon: Cpu,          color: "#c084fc" },
  "/asistencia":{ label: "Asistencia", icon: Wrench,       color: "#34d399" },
  "/contacto":  { label: "Contacto",   icon: MessageSquare,color: "#fb923c" },
  "/pagos":     { label: "Pagos",      icon: ChevronRight, color: "#facc15" },
};

function pageLabel(path: string) {
  return PAGE_LABELS[path]?.label ?? path;
}

function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "short" });
}

type Range = 7 | 14 | 30;

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs shadow-2xl"
      style={{ background: "rgba(10,10,14,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="text-zinc-400 mb-1">{label ? fmtDate(label) : ""}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color }}>{p.value} {p.name}</p>
      ))}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub, color, delay = 0,
}: {
  icon: React.ElementType; label: string; value: string | number;
  sub?: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: `rgba(${color},0.06)`,
        border: `1px solid rgba(${color},0.18)`,
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `rgba(${color},0.12)`, border: `1px solid rgba(${color},0.22)` }}>
        <Icon size={16} style={{ color: `rgb(${color})` }} />
      </div>
      <div>
        <p className="text-2xl font-black text-white mb-0.5">{value}</p>
        <p className="text-[10px] text-zinc-500 tracking-wide leading-tight">{label}</p>
        {sub && <p className="text-[9px] text-zinc-700 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminEstadisticas() {
  const [range, setRange] = useState<Range>(14);
  const [allEvents, setAllEvents] = useState<AnalyticEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [purgeConfirm, setPurgeConfirm] = useState(false);
  const [purging, setPurging] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setAllEvents(data);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  async function handlePurge() {
    setPurging(true);
    try {
      await purgeAllEvents();
      setAllEvents([]);
      setPurgeConfirm(false);
    } catch {
      // silently ignore
    } finally {
      setPurging(false);
    }
  }

  useEffect(() => { void loadData(); }, [loadData]);

  const rangeEvents = useMemo(() => {
    const cutoff = Date.now() - range * 86_400_000;
    return allEvents.filter(e => e.ts >= cutoff);
  }, [allEvents, range]);

  const totalViews  = useMemo(() => allEvents.filter(e => e.type === "page_view").length, [allEvents]);
  const sessions    = useMemo(() => estimateSessions(allEvents), [allEvents]);
  const avgPages    = useMemo(() => avgPagesPerSession(allEvents), [allEvents]);
  const counts      = useMemo(() => countByType(rangeEvents), [rangeEvents]);
  const pageViews   = useMemo(() => countByPage(allEvents).slice(0, 8), [allEvents]);
  const interactions= useMemo(() => getInteractionBreakdown(rangeEvents), [rangeEvents]);
  const interSeries = useMemo(() => getInterDailySeries(rangeEvents, range), [rangeEvents, range]);
  const cotizSeries = useMemo(() => getDailySeries(rangeEvents, range, "cotizacion_enviada"), [rangeEvents, range]);

  const maxPage = pageViews[0]?.views ?? 1;
  const hasData = allEvents.length > 0;
  const RANGE_OPTS: Range[] = [7, 14, 30];

  const totalInteracciones = allEvents.filter(e => e.type !== "page_view").length;

  // ── LOADING ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 size={28} className="text-cyan-500 animate-spin" />
        <p className="text-zinc-600 text-xs">Cargando estadísticas…</p>
      </div>
    );
  }

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <Activity size={24} className="text-red-400" />
        </div>
        <p className="text-red-400 font-bold text-sm">Error al cargar datos</p>
        <p className="text-zinc-600 text-xs max-w-xs text-center">{error}</p>
        <button onClick={() => void loadData()}
          className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-400 hover:text-white transition-colors"
          style={{ border: "1px solid rgba(6,182,212,0.3)" }}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-black text-white mb-1 flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            Estadísticas
          </h2>
          <p className="text-zinc-600 text-xs">
            {hasData
              ? `${allEvents.length.toLocaleString("es-CL")} eventos · actualizado ${lastRefresh?.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) ?? ""}`
              : "Los eventos se registran automáticamente desde visitas reales al sitio"}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Range selector */}
          <div className="flex rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {RANGE_OPTS.map(r => (
              <button key={r} onClick={() => setRange(r)}
                className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all"
                style={{
                  background: range === r ? "rgba(6,182,212,0.15)" : "transparent",
                  color: range === r ? "#22d3ee" : "#52525b",
                  borderRight: r !== 30 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                {r}d
              </button>
            ))}
          </div>

          <button onClick={() => void loadData()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <RefreshCw size={10} /> Actualizar
          </button>

          {/* Purge button */}
          {!purgeConfirm ? (
            <button
              onClick={() => setPurgeConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-widest uppercase text-zinc-700 hover:text-red-400 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              title="Eliminar todos los eventos registrados (útil para limpiar datos de prueba)"
            >
              <Trash2 size={10} /> Limpiar datos
            </button>
          ) : (
            <div className="flex items-center gap-1.5 rounded-xl px-2 py-1"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}>
              <AlertTriangle size={10} className="text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-[10px] font-bold">¿Seguro?</span>
              <button
                onClick={() => void handlePurge()}
                disabled={purging}
                className="px-2 py-0.5 rounded-lg text-[10px] font-black text-red-400 hover:bg-red-500/15 transition-all disabled:opacity-50"
              >
                {purging ? "…" : "Sí, borrar"}
              </button>
              <button
                onClick={() => setPurgeConfirm(false)}
                className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── EMPTY STATE ────────────────────────────────────────────────────── */}
      {!hasData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-10 flex flex-col items-center text-center gap-4"
          style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.12)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
            <BarChart3 size={28} className="text-cyan-500" />
          </div>
          <div>
            <p className="text-white font-black text-base mb-1">Sin datos todavía</p>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              Las estadísticas se registran automáticamente cuando hay visitas al sitio público. Volvé aquí después de que alguien navegue la web.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center text-[10px] text-zinc-600">
            {["Visitas por página", "Clics WhatsApp", "Uso del chat", "Cotizaciones", "Interacciones"].map(f => (
              <span key={f} className="px-2.5 py-1 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>{f}</span>
            ))}
          </div>
        </motion.div>
      )}

      {hasData && (
        <>
          {/* ── KPI ROW 1 ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Eye}              label="Vistas totales"           value={totalViews.toLocaleString("es-CL")}                                      color="6,182,212"   delay={0}    />
            <StatCard icon={Users}            label="Sesiones estimadas"       value={sessions}     sub="gaps >30 min"                                          color="245,158,11"  delay={0.05} />
            <StatCard icon={Smartphone}       label="Páginas por sesión"       value={avgPages}                                                                  color="161,161,170" delay={0.1}  />
            <StatCard icon={MousePointerClick} label="Interacciones totales"   value={totalInteracciones.toLocaleString("es-CL")}                               color="52,211,153"  delay={0.15} />
          </div>

          {/* ── KPI ROW 2 — period ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={MessageSquare}   label={`Clics WhatsApp (${range}d)`}        value={counts["whatsapp_click"]     || 0} color="37,211,102"  delay={0.18} />
            <StatCard icon={Activity}        label={`Chat iniciado (${range}d)`}          value={counts["chat_opened"]        || 0} color="6,182,212"   delay={0.21} />
            <StatCard icon={TrendingUp}      label={`Cotizaciones (${range}d)`}           value={counts["cotizacion_enviada"] || 0} color="245,158,11"  delay={0.24} />
            <StatCard icon={Calendar}        label={`Form asistencia (${range}d)`}        value={counts["asistencia_form"]    || 0} color="192,132,252" delay={0.27} />
          </div>

          {/* ── AREA CHART — tráfico diario ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-cyan-400" />
                <h3 className="text-white font-bold text-sm">Tráfico diario — últimos {range} días</h3>
              </div>
              <div className="flex items-center gap-4 text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />Vistas</span>
                <span className="flex items-center gap-1.5 text-zinc-400"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Interacciones</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={interSeries} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gVistas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gInter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fontSize: 9, fill: "#52525b" }} axisLine={false} tickLine={false} interval={range > 14 ? 4 : 1} />
                <YAxis tick={{ fontSize: 9, fill: "#52525b" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="vistas"        name="vistas"        stroke="#06b6d4" strokeWidth={2} fill="url(#gVistas)" dot={false} />
                <Area type="monotone" dataKey="interacciones" name="interacciones" stroke="#f59e0b" strokeWidth={2} fill="url(#gInter)"  dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* ── MID ROW: Páginas + Pie ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Top páginas */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Eye size={14} className="text-amber-400" />
                <h3 className="text-white font-bold text-sm">Páginas más visitadas</h3>
              </div>
              {pageViews.length === 0 ? (
                <p className="text-zinc-700 text-xs text-center py-8">Sin datos</p>
              ) : (
                <div className="space-y-3">
                  {pageViews.map(({ page, views }) => {
                    const cfg = PAGE_LABELS[page];
                    const Icon = cfg?.icon ?? Eye;
                    const pct = Math.round((views / maxPage) * 100);
                    return (
                      <div key={page}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Icon size={11} className="text-zinc-500 flex-shrink-0" />
                            <p className="text-zinc-300 text-xs font-bold">{pageLabel(page)}</p>
                            <p className="text-zinc-700 text-[9px]">{page}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-zinc-400 text-xs font-black">{views}</span>
                            <span className="text-zinc-700 text-[9px]">{pct}%</span>
                          </div>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.05)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: cfg
                                ? `linear-gradient(90deg, ${cfg.color}99, ${cfg.color}55)`
                                : "rgba(6,182,212,0.5)"
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Interacciones pie */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Activity size={14} className="text-cyan-400" />
                <h3 className="text-white font-bold text-sm">Tipo de interacciones — {range}d</h3>
              </div>
              {interactions.length === 0 ? (
                <p className="text-zinc-700 text-xs text-center py-8">Sin interacciones en este período</p>
              ) : (
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={130} height={130}>
                    <PieChart>
                      <Pie data={interactions} dataKey="value" cx="50%" cy="50%"
                        innerRadius={35} outerRadius={55} paddingAngle={3} stroke="none">
                        {interactions.map((entry, i) => (
                          <Cell key={i} fill={entry.color} opacity={0.85} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {interactions.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                          <span className="text-zinc-400 text-[10px]">{item.label}</span>
                        </div>
                        <span className="text-zinc-300 text-xs font-black">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── BAR CHART — cotizaciones diarias ───────────────────────────── */}
          {(counts["cotizacion_enviada"] || 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.1)" }}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={14} className="text-amber-400" />
                <h3 className="text-white font-bold text-sm">Cotizaciones enviadas — últimos {range} días</h3>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={cotizSeries} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fontSize: 9, fill: "#52525b" }} axisLine={false} tickLine={false} interval={range > 14 ? 4 : 1} />
                  <YAxis tick={{ fontSize: 9, fill: "#52525b" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="value" name="cotizaciones" fill="#f59e0b" opacity={0.7} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* ── ÚLTIMOS EVENTOS ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Activity size={14} className="text-zinc-500" />
              <h3 className="text-white font-bold text-sm">Últimos eventos registrados</h3>
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {allEvents.slice(0, 30).map(ev => {
                const meta = ev.meta ? (() => { try { return JSON.parse(ev.meta!) as Record<string, string>; } catch { return null; } })() : null;
                return (
                  <div key={ev.id} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                    style={{ border: "1px solid rgba(255,255,255,0.03)" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: ev.type === "page_view" ? "#06b6d4" : ev.type.includes("whatsapp") ? "#25D366" : "#f59e0b" }} />
                    <span className="text-zinc-500 text-[9px] font-mono flex-shrink-0 w-24">
                      {new Date(ev.ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                    <span className="text-zinc-400 text-[10px] font-bold flex-1 truncate">{ev.type.replace(/_/g, " ")}</span>
                    <span className="text-zinc-700 text-[9px] flex-shrink-0">{ev.page}</span>
                    {meta && (
                      <span className="text-zinc-800 text-[9px] flex-shrink-0 truncate max-w-[120px]">
                        {Object.entries(meta).map(([k, v]) => `${k}:${v}`).join(" ")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
