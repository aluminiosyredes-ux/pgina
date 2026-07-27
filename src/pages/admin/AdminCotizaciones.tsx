import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Trash2, ChevronDown, FileText,
  User, Phone, Package, Calendar, Filter, RefreshCw,
} from "lucide-react";
import {
  getQuotes,
  updateQuoteStatus,
  deleteQuote,
} from "../../lib/quotes";

import type {
  QuoteEntry,
  QuoteStatus,
} from "../../lib/quotes";
import { WHATSAPP_NUMBER } from "../../config";

const STATUS_CONFIG: Record<QuoteStatus, { label: string; bg: string; text: string; dot: string }> = {
  nueva:      { label: "Nueva",      bg: "bg-blue-500/12",   text: "text-blue-400",    dot: "bg-blue-400"    },
  contactado: { label: "Contactado", bg: "bg-cyan-500/12",   text: "text-cyan-400",    dot: "bg-cyan-400"    },
  agendado:   { label: "Agendado",   bg: "bg-amber-500/12",  text: "text-amber-400",   dot: "bg-amber-400"   },
  instalado:  { label: "Instalado",  bg: "bg-emerald-500/12",text: "text-emerald-400", dot: "bg-emerald-400" },
  pagado:     { label: "Pagado",     bg: "bg-purple-500/12", text: "text-purple-400",  dot: "bg-purple-400"  },
};

const STATUSES = Object.keys(STATUS_CONFIG) as QuoteStatus[];

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

function StatusBadge({ quoteId, current }: { quoteId: string; current: QuoteStatus }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<QuoteStatus>(current);
  const cfg = STATUS_CONFIG[value];

  function select(s: QuoteStatus) {
    setValue(s);
    updateQuoteStatus(quoteId, s);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all duration-200 ${cfg.bg} ${cfg.text} border border-current/20`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
        <ChevronDown size={9} className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[140px] rounded-xl overflow-hidden"
            style={{ background: "rgba(18,18,18,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
          >
            {STATUSES.map((s) => {
              const c = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  onClick={() => select(s)}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-[10px] font-bold tracking-wide uppercase transition-colors duration-150 ${
                    s === value ? `${c.bg} ${c.text}` : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {c.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuoteCard({ q, onDelete }: { q: QuoteEntry; onDelete: () => void }) {
  const waText = `Hola ${q.nombre}! 👋 Te contactamos de Aluminios & Redes.\n\nTenés una cotización pendiente:\n• Producto: ${q.producto}\n• Medidas: ${q.medidas}\n• Estimación: ${fmt(q.totalMin)} – ${fmt(q.totalMax)}\n\n¿Podemos coordinar?`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top accent line per status */}
      <div className={`h-[2px] ${STATUS_CONFIG[q.estado].dot} opacity-60`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <User size={15} className="text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm tracking-tight truncate">{q.nombre}</p>
              <p className="text-zinc-500 text-[10px] flex items-center gap-1 mt-0.5">
                <Phone size={9} /> {q.telefono}
              </p>
            </div>
          </div>
          <StatusBadge quoteId={q.id} current={q.estado} />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: Package, label: "Producto",  val: q.producto },
            { icon: Filter,  label: "Medidas",   val: q.medidas },
            { icon: Calendar,label: "Fecha",     val: new Date(q.fecha).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" }) },
            { icon: Phone,   label: "Ciudad",    val: q.ciudad || "—" },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <p className="text-[9px] font-bold tracking-widest uppercase text-zinc-600 mb-1 flex items-center gap-1">
                <Icon size={8} /> {label}
              </p>
              <p className="text-xs text-zinc-300 font-medium truncate">{val}</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="rounded-xl px-4 py-3 mb-4 flex items-center justify-between"
          style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)" }}>
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Total estimado</span>
          <span className="text-sm font-black text-amber-400">
            {fmt(q.totalMin)}{q.totalMax !== q.totalMin ? ` – ${fmt(q.totalMax)}` : ""}
          </span>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2">
          {q.email && (
            <a href={`mailto:${q.email}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all text-zinc-500 hover:text-zinc-200"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              {q.email}
            </a>
          )}
          <a
            href={`https://wa.me/${q.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all text-emerald-400 hover:text-white hover:bg-[#25D366]"
            style={{ border: "1px solid rgba(37,211,102,0.22)" }}
          >
            <MessageCircle size={12} /> WhatsApp
          </a>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-zinc-700 hover:text-red-400 hover:bg-red-500/8"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            aria-label="Eliminar"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminCotizaciones() {
  const [quotes, setQuotes] = useState<QuoteEntry[]>([]);
  const [filter, setFilter] = useState<QuoteStatus | "todas">("todas");

  function load() {
    setQuotes(getQuotes());
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    deleteQuote(id);
    load();
  }

  const filtered = filter === "todas" ? quotes : quotes.filter((q) => q.estado === filter);

  const counts: Record<string, number> = {
    todas:      quotes.length,
    nueva:      quotes.filter((q) => q.estado === "nueva").length,
    contactado: quotes.filter((q) => q.estado === "contactado").length,
    agendado:   quotes.filter((q) => q.estado === "agendado").length,
    instalado:  quotes.filter((q) => q.estado === "instalado").length,
    pagado:     quotes.filter((q) => q.estado === "pagado").length,
  };

  const filterTabs: { key: QuoteStatus | "todas"; label: string }[] = [
    { key: "todas",      label: "Todas" },
    { key: "nueva",      label: "Nuevas" },
    { key: "contactado", label: "Contactadas" },
    { key: "agendado",   label: "Agendadas" },
    { key: "instalado",  label: "Instaladas" },
    { key: "pagado",     label: "Pagadas" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} className="text-amber-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Cotizaciones</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/20">
              {counts.todas}
            </span>
          </div>
          <p className="text-zinc-600 text-xs">Registros guardados desde los cotizadores</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-zinc-200 transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <RefreshCw size={10} /> Actualizar
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {filterTabs.map(({ key, label }) => {
          const isActive = filter === key;
          const count = counts[key];
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
                isActive
                  ? "bg-amber-500/12 text-amber-400 border-amber-500/25"
                  : "text-zinc-600 hover:text-zinc-300 border-transparent hover:border-white/8"
              }`}
              style={{ border: isActive ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(255,255,255,0.06)" }}
            >
              {label}
              {count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${isActive ? "bg-amber-500/20 text-amber-300" : "bg-white/8 text-zinc-500"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ border: "1px dashed rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.01)" }}
        >
          <FileText size={32} className="text-zinc-700 mb-4" />
          <p className="text-zinc-500 font-bold text-sm mb-1">
            {filter === "todas" ? "No hay cotizaciones aún" : `No hay cotizaciones ${STATUS_CONFIG[filter as QuoteStatus]?.label.toLowerCase()}`}
          </p>
          <p className="text-zinc-700 text-xs">Las cotizaciones aparecen aquí cuando un cliente completa el formulario.</p>
        </motion.div>
      )}

      {/* Cards grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((q) => (
            <QuoteCard key={q.id} q={q} onDelete={() => handleDelete(q.id)} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
