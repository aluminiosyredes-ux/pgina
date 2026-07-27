import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users2, MessageCircle, Trash2, StickyNote, ChevronDown,
  Search, X, RefreshCw, Plus, Phone, MapPin, Calendar, Trash,
} from "lucide-react";
import {
  getQuotes, updateQuoteStatus, deleteQuote,
} from "../../lib/quotes";

import type {
  QuoteEntry,
  QuoteStatus,
} from "../../lib/quotes";
import { getNotes, addNote, deleteNote } from "../../lib/crm";
import type { NoteEntry } from "../../lib/crm";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<QuoteStatus, {
  label: string;
  textClass: string;
  bgRgba: string;
  borderRgba: string;
  dotClass: string;
  accentRgba: string;
}> = {
  nueva:      { label: "Nueva",      textClass: "text-blue-400",    bgRgba: "rgba(96,165,250,0.1)",   borderRgba: "rgba(96,165,250,0.22)",   dotClass: "bg-blue-400",    accentRgba: "rgba(96,165,250,0.5)"   },
  contactado: { label: "Contactado", textClass: "text-cyan-400",    bgRgba: "rgba(34,211,238,0.1)",   borderRgba: "rgba(34,211,238,0.22)",   dotClass: "bg-cyan-400",    accentRgba: "rgba(34,211,238,0.5)"   },
  agendado:   { label: "Agendado",   textClass: "text-amber-400",   bgRgba: "rgba(245,158,11,0.1)",   borderRgba: "rgba(245,158,11,0.22)",   dotClass: "bg-amber-400",   accentRgba: "rgba(245,158,11,0.5)"   },
  instalado:  { label: "Instalado",  textClass: "text-emerald-400", bgRgba: "rgba(52,211,153,0.1)",   borderRgba: "rgba(52,211,153,0.22)",   dotClass: "bg-emerald-400", accentRgba: "rgba(52,211,153,0.5)"   },
  pagado:     { label: "Pagado",     textClass: "text-purple-400",  bgRgba: "rgba(192,132,252,0.1)",  borderRgba: "rgba(192,132,252,0.22)",  dotClass: "bg-purple-400",  accentRgba: "rgba(192,132,252,0.5)"  },
};

const STATUSES = Object.keys(STATUS_CONFIG) as QuoteStatus[];

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "2-digit" });

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

// ─── STATUS DROPDOWN ──────────────────────────────────────────────────────────

function StatusDropdown({
  quoteId,
  current,
  onChange,
}: {
  quoteId: string;
  current: QuoteStatus;
  onChange: (s: QuoteStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[current];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 160)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all whitespace-nowrap ${cfg.textClass}`}
        style={{ background: cfg.bgRgba, border: `1px solid ${cfg.borderRgba}` }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
        {cfg.label}
        <ChevronDown size={9} className={`ml-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[152px] rounded-xl overflow-hidden"
            style={{ background: "rgba(10,10,12,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
          >
            {STATUSES.map((s) => {
              const c = STATUS_CONFIG[s];
              const isSelected = s === current;
              return (
                <button
                  key={s}
                  onClick={() => { updateQuoteStatus(quoteId, s); onChange(s); setOpen(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-[10px] font-bold tracking-wide uppercase transition-colors ${isSelected ? c.textClass : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"}`}
                  style={isSelected ? { background: c.bgRgba } : {}}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dotClass}`} />
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

// ─── NOTES DRAWER ─────────────────────────────────────────────────────────────

function NotesDrawer({ quote, onClose }: { quote: QuoteEntry; onClose: () => void }) {
  const [notes, setNotes] = useState<NoteEntry[]>(() => getNotes(quote.id));
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  function handleAdd() {
    if (!text.trim()) return;
    const note = addNote(quote.id, text);
    setNotes((prev) => [...prev, note]);
    setText("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  function handleDelete(noteId: string) {
    deleteNote(quote.id, noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40"
        style={{ backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-sm"
        style={{
          background: "rgba(8,8,10,0.99)",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(6,182,212,0.18)",
        }}
      >
        {/* Cyan top bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent flex-shrink-0" />

        {/* Header */}
        <div
          className="flex items-start gap-3 p-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-cyan-400 flex-shrink-0"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            {initials(quote.nombre)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm truncate">{quote.nombre}</p>
            <p className="text-zinc-500 text-[10px] truncate">{quote.producto} · {quote.medidas}</p>
            <p className="text-zinc-600 text-[10px]">{quote.telefono}</p>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {notes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <StickyNote size={28} className="text-zinc-800 mb-3" />
              <p className="text-zinc-600 text-xs font-bold">Sin notas todavía</p>
              <p className="text-zinc-700 text-[10px] mt-1">Agregá información interna sobre este cliente</p>
            </div>
          )}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="group rounded-xl p-3.5 relative"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span className="text-[9px] font-black tracking-widest uppercase text-cyan-500">{note.autor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[9px] text-zinc-600">{fmtDate(note.fecha)}</span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-700 hover:text-red-400"
                  >
                    <Trash size={10} />
                  </button>
                </div>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">{note.texto}</p>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Add note */}
        <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAdd(); }}
            placeholder="Agregar nota interna..."
            rows={3}
            className="w-full bg-[#0f0f11] rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-700 resize-none focus:outline-none transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          />
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[9px] text-zinc-700">Ctrl+Enter para guardar</span>
            <button
              onClick={handleAdd}
              disabled={!text.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all disabled:opacity-25 text-cyan-400"
              style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.22)" }}
            >
              <Plus size={10} /> Guardar
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── MAIN CRM ─────────────────────────────────────────────────────────────────

export default function AdminCRM() {
  const [quotes, setQuotes] = useState<QuoteEntry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<QuoteStatus | "todas">("todas");
  const [selectedQuote, setSelectedQuote] = useState<QuoteEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, QuoteStatus>>({});

  function load() {
    const qs = getQuotes();
    setQuotes(qs);
    const s: Record<string, QuoteStatus> = {};
    qs.forEach((q) => { s[q.id] = q.estado; });
    setStatuses(s);
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    deleteQuote(id);
    setDeleteId(null);
    load();
  }

  function handleStatusChange(id: string, s: QuoteStatus) {
    setStatuses((prev) => ({ ...prev, [id]: s }));
  }

  const counts = useMemo(() => ({
    todas: quotes.length,
    nueva:      quotes.filter((q) => (statuses[q.id] ?? q.estado) === "nueva").length,
    contactado: quotes.filter((q) => (statuses[q.id] ?? q.estado) === "contactado").length,
    agendado:   quotes.filter((q) => (statuses[q.id] ?? q.estado) === "agendado").length,
    instalado:  quotes.filter((q) => (statuses[q.id] ?? q.estado) === "instalado").length,
    pagado:     quotes.filter((q) => (statuses[q.id] ?? q.estado) === "pagado").length,
  }), [quotes, statuses]);

  const filtered = useMemo(() => {
    let list = quotes;
    if (filter !== "todas") list = list.filter((q) => (statuses[q.id] ?? q.estado) === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.nombre.toLowerCase().includes(q) ||
          r.telefono.includes(q) ||
          r.producto.toLowerCase().includes(q) ||
          (r.ciudad ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [quotes, filter, search, statuses]);

  const waText = (q: QuoteEntry) =>
    `Hola ${q.nombre}! 👋 Te contactamos de Aluminios & Redes.\n\nTu cotización está lista:\n• Producto: ${q.producto}\n• Medidas: ${q.medidas}\n• Estimación: ${fmt(q.totalMin)}${q.totalMax !== q.totalMin ? ` – ${fmt(q.totalMax)}` : ""}\n\n¿Cuándo podemos coordinar? 🔧`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Users2 size={16} className="text-cyan-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Clientes CRM</h2>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest text-cyan-400"
              style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              {quotes.length}
            </span>
            {counts.nueva > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="px-2 py-0.5 rounded-full text-[10px] font-black text-blue-300 animate-pulse"
                style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.28)" }}
              >
                {counts.nueva} nueva{counts.nueva > 1 ? "s" : ""}
              </motion.span>
            )}
          </div>
          <p className="text-zinc-600 text-xs">Gestión de cotizaciones y seguimiento de clientes</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-zinc-200 transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <RefreshCw size={10} /> Actualizar
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nombre, producto, ciudad..."
            className="w-full bg-[#0f0f11] pl-9 pr-9 py-2 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.28)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">
              <X size={11} />
            </button>
          )}
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["todas", ...STATUSES] as const).map((key) => {
            const isActive = filter === key;
            const cfg = key !== "todas" ? STATUS_CONFIG[key] : null;
            const count = counts[key] ?? 0;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${cfg && isActive ? cfg.textClass : isActive ? "text-zinc-300" : "text-zinc-600 hover:text-zinc-400"}`}
                style={{
                  background: isActive ? (cfg ? cfg.bgRgba : "rgba(255,255,255,0.06)") : "transparent",
                  border: `1px solid ${isActive ? (cfg ? cfg.borderRgba : "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />}
                {key === "todas" ? "Todas" : cfg!.label}
                {count > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-white/[0.06]">{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 rounded-2xl"
          style={{ border: "1px dashed rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
        >
          <Users2 size={36} className="text-zinc-800 mb-4" />
          <p className="text-zinc-500 font-bold text-sm mb-1">Sin resultados</p>
          <p className="text-zinc-700 text-xs">Ajustá los filtros o el buscador</p>
        </motion.div>
      )}

      {/* ── DESKTOP TABLE ── */}
      {filtered.length > 0 && (
        <div
          className="hidden lg:block rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)" }}>
                <th className="w-10 px-4 py-3.5 text-left text-[9px] font-black tracking-widest uppercase text-zinc-700">#</th>
                {["Cliente", "Producto · Medidas", "Total", "Estado", "Ciudad · Fecha", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 text-[9px] font-black tracking-widest uppercase text-zinc-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((q, idx) => {
                  const currentStatus = statuses[q.id] ?? q.estado;
                  const scfg = STATUS_CONFIG[currentStatus];
                  const notesCount = getNotes(q.id).length;
                  return (
                    <motion.tr
                      key={q.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="group relative transition-colors duration-150"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      {/* Row # */}
                      <td className="relative px-4 py-4 w-10">
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300"
                          style={{ background: scfg.accentRgba, opacity: 0.35 }}
                        />
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: scfg.accentRgba }}
                        />
                        <span className="text-[10px] font-black text-zinc-700 tabular-nums">{idx + 1}</span>
                      </td>

                      {/* Cliente */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${scfg.textClass}`}
                            style={{ background: scfg.bgRgba, border: `1px solid ${scfg.borderRgba}` }}
                          >
                            {initials(q.nombre)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-xs font-bold leading-tight truncate max-w-[140px]">{q.nombre}</p>
                            <p className="text-zinc-500 text-[10px] flex items-center gap-1 mt-0.5">
                              <Phone size={8} className="flex-shrink-0" /> {q.telefono}
                            </p>
                            {q.email && (
                              <p className="text-zinc-700 text-[10px] truncate max-w-[140px] mt-0.5">{q.email}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Producto */}
                      <td className="px-4 py-4 max-w-[160px]">
                        <p className="text-zinc-200 text-xs font-semibold leading-tight truncate">{q.producto}</p>
                        <p className="text-zinc-600 text-[10px] mt-0.5 truncate">{q.medidas}</p>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-amber-400 text-xs font-black tabular-nums">{fmt(q.totalMin)}</p>
                        {q.totalMax !== q.totalMin && (
                          <p className="text-amber-600/60 text-[10px] tabular-nums mt-0.5">– {fmt(q.totalMax)}</p>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-4">
                        <StatusDropdown
                          quoteId={q.id}
                          current={currentStatus}
                          onChange={(s) => handleStatusChange(q.id, s)}
                        />
                      </td>

                      {/* Ciudad / Fecha */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-zinc-400 text-xs flex items-center gap-1.5">
                          <MapPin size={9} className="text-zinc-600 flex-shrink-0" />
                          {q.ciudad || "—"}
                        </p>
                        <p className="text-zinc-600 text-[10px] flex items-center gap-1.5 mt-0.5">
                          <Calendar size={8} className="flex-shrink-0" /> {fmtDate(q.fecha)}
                        </p>
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-4">
                        <div className="relative flex items-center gap-2">
                          {/* WA */}
                          <a
                            href={`https://wa.me/${q.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(waText(q))}`}
                            target="_blank" rel="noopener noreferrer"
                            title="Contactar por WhatsApp"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-400 hover:text-black hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-200 whitespace-nowrap"
                            style={{ border: "1px solid rgba(37,211,102,0.25)" }}
                          >
                            <MessageCircle size={11} /> WA
                          </a>

                          {/* Notes */}
                          <button
                            onClick={() => setSelectedQuote(q)}
                            title="Ver notas internas"
                            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 whitespace-nowrap ${notesCount > 0 ? "text-cyan-400" : "text-zinc-600 hover:text-zinc-300"}`}
                            style={{
                              background: notesCount > 0 ? "rgba(6,182,212,0.08)" : "transparent",
                              border: `1px solid ${notesCount > 0 ? "rgba(6,182,212,0.22)" : "rgba(255,255,255,0.07)"}`,
                            }}
                          >
                            <StickyNote size={11} />
                            {notesCount > 0 ? (
                              <span className="px-1 py-0.5 rounded text-[9px] font-black bg-cyan-400/15 text-cyan-300">{notesCount}</span>
                            ) : "Notas"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteId(deleteId === q.id ? null : q.id)}
                            title="Eliminar registro"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 text-zinc-700 hover:text-red-400 hover:bg-red-500/8"
                            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            <Trash2 size={12} />
                          </button>

                          {/* Delete confirm popup */}
                          <AnimatePresence>
                            {deleteId === q.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-full mt-1.5 z-50 rounded-xl p-4 w-52"
                                style={{ background: "rgba(12,12,14,0.99)", border: "1px solid rgba(239,68,68,0.22)", backdropFilter: "blur(20px)" }}
                              >
                                <p className="text-white text-xs font-bold mb-1">¿Eliminar registro?</p>
                                <p className="text-zinc-500 text-[10px] mb-3">Esta acción no se puede deshacer.</p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleDelete(q.id)}
                                    className="flex-1 py-1.5 rounded-lg text-[10px] font-black text-red-400 transition-all hover:bg-red-500/15"
                                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-zinc-400 hover:text-white transition-all"
                                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* ── MOBILE CARDS ── */}
      {filtered.length > 0 && (
        <div className="lg:hidden space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((q) => {
              const currentStatus = statuses[q.id] ?? q.estado;
              const scfg = STATUS_CONFIG[currentStatus];
              const notesCount = getNotes(q.id).length;
              return (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="h-[2px]" style={{ background: scfg.accentRgba, opacity: 0.7 }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${scfg.textClass}`}
                          style={{ background: scfg.bgRgba, border: `1px solid ${scfg.borderRgba}` }}
                        >
                          {initials(q.nombre)}
                        </div>
                        <div>
                          <p className="text-white font-black text-sm">{q.nombre}</p>
                          <p className="text-zinc-500 text-[10px]">{q.telefono}</p>
                        </div>
                      </div>
                      <StatusDropdown quoteId={q.id} current={currentStatus} onChange={(s) => handleStatusChange(q.id, s)} />
                    </div>

                    <div
                      className="rounded-xl px-3 py-2.5 mb-3 flex justify-between items-center"
                      style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}
                    >
                      <div>
                        <p className="text-[10px] font-bold text-zinc-300">{q.producto}</p>
                        <p className="text-[9px] text-zinc-600">{q.medidas} · {q.ciudad || "—"}</p>
                      </div>
                      <p className="text-amber-400 font-black text-sm">{fmt(q.totalMin)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${q.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(waText(q))}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black text-emerald-400 hover:text-white hover:bg-[#25D366] transition-all"
                        style={{ border: "1px solid rgba(37,211,102,0.22)" }}
                      >
                        <MessageCircle size={11} /> WhatsApp
                      </a>
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${notesCount > 0 ? "text-cyan-400" : "text-zinc-500"}`}
                        style={{
                          background: notesCount > 0 ? "rgba(6,182,212,0.08)" : "transparent",
                          border: `1px solid ${notesCount > 0 ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.07)"}`,
                        }}
                      >
                        <StickyNote size={11} />{notesCount > 0 ? ` ${notesCount}` : " Notas"}
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-700 hover:text-red-400 transition-all"
                        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Notes drawer */}
      <AnimatePresence>
        {selectedQuote && (
          <NotesDrawer quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
