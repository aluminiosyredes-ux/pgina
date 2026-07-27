import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer, Plus, X, Trash2, Edit3, MessageCircle,
  CalendarDays, Clock, MapPin, User, Wrench, ChevronDown,
  Phone, Package, Ruler, FileText,
} from "lucide-react";
import {
  getInstalaciones,
  saveInstalacion,
  updateInstalacion,
  deleteInstalacion,
} from "../../lib/instalaciones";

import type {
  Instalacion,
  InstalacionStatus,
} from "../../lib/instalaciones";
import { getQuotes } from "../../lib/quotes";
import { WHATSAPP_NUMBER } from "../../config";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<InstalacionStatus, {
  label: string; dot: string; text: string; bg: string; border: string;
}> = {
  pendiente:  { label: "Pendiente",  dot: "bg-amber-400",   text: "text-amber-400",   bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.25)"   },
  en_camino:  { label: "En camino",  dot: "bg-cyan-400",    text: "text-cyan-400",    bg: "rgba(6,182,212,0.1)",    border: "rgba(6,182,212,0.25)"    },
  completada: { label: "Completada", dot: "bg-emerald-400", text: "text-emerald-400", bg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.25)"   },
  cancelada:  { label: "Cancelada",  dot: "bg-red-400",     text: "text-red-400",     bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.25)"    },
};
const STATUSES = Object.keys(STATUS_CFG) as InstalacionStatus[];

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

function fmtFecha(fecha: string, hora: string) {
  if (!fecha) return "—";
  const d = new Date(`${fecha}T${hora || "00:00"}`);
  return d.toLocaleDateString("es-CL", { weekday: "short", day: "2-digit", month: "short" }) +
    (hora ? ` · ${hora}` : "");
}

// ─── EMPTY FORM ───────────────────────────────────────────────────────────────

const EMPTY = {
  cliente: "", telefono: "", ciudad: "", producto: "", medidas: "",
  fecha: new Date().toISOString().slice(0, 10),
  hora: "10:00", tecnico: "", notas: "",
  estado: "pendiente" as InstalacionStatus,
  quoteId: undefined as string | undefined,
};

// ─── STATUS DROPDOWN ──────────────────────────────────────────────────────────

function StatusBadge({
  id, current, onChange,
}: { id: string; current: InstalacionStatus; onChange: (s: InstalacionStatus) => void }) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CFG[current];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 160)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text.replace("text-", "") }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        <span className={cfg.text}>{cfg.label}</span>
        <ChevronDown size={9} className={`${cfg.text} ml-0.5`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full left-0 mt-1.5 z-50 rounded-xl overflow-hidden py-1 min-w-[140px]"
            style={{ background: "rgba(14,14,18,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
          >
            {STATUSES.map((s) => {
              const c = STATUS_CFG[s];
              return (
                <button key={s} onMouseDown={() => { onChange(s); setOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-white/[0.04]">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                  <span className={c.text}>{c.label}</span>
                  {s === current && <span className="ml-auto text-zinc-700">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminInstalaciones() {
  const [list, setList] = useState<Instalacion[]>([]);
  const [filter, setFilter] = useState<InstalacionStatus | "todas">("todas");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [fromQuoteOpen, setFromQuoteOpen] = useState(false);

  const quotes = getQuotes().filter(q => q.estado === "agendado");

  function refresh() { setList(getInstalaciones()); }
  useEffect(() => { refresh(); }, []);

  function openNew() {
    setEditingId(null);
    setForm({ ...EMPTY, fecha: new Date().toISOString().slice(0, 10) });
    setModalOpen(true);
  }

  function openEdit(inst: Instalacion) {
    setEditingId(inst.id);
    setForm({
      cliente: inst.cliente, telefono: inst.telefono, ciudad: inst.ciudad,
      producto: inst.producto, medidas: inst.medidas, fecha: inst.fecha,
      hora: inst.hora, tecnico: inst.tecnico, notas: inst.notas,
      estado: inst.estado, quoteId: inst.quoteId,
    });
    setModalOpen(true);
  }

  function openFromQuote(q: { nombre: string; telefono: string; ciudad: string; producto: string; medidas: string; id: string }) {
    setEditingId(null);
    setForm({
      ...EMPTY,
      cliente: q.nombre, telefono: q.telefono, ciudad: q.ciudad,
      producto: q.producto, medidas: q.medidas,
      fecha: new Date().toISOString().slice(0, 10),
      quoteId: q.id,
    });
    setFromQuoteOpen(false);
    setModalOpen(true);
  }

  function handleSubmit() {
    if (!form.cliente || !form.fecha) return;
    if (editingId) {
      updateInstalacion(editingId, form);
    } else {
      saveInstalacion(form);
    }
    setModalOpen(false);
    refresh();
  }

  function handleDelete(id: string) {
    deleteInstalacion(id);
    refresh();
  }

  function handleStatusChange(id: string, estado: InstalacionStatus) {
    updateInstalacion(id, { estado });
    refresh();
  }

  function handleWhatsApp(inst: Instalacion) {
    const msg = [
      `Hola ${inst.cliente}! 👋 Te contactamos de Aluminios & Redes.`,
      ``,
      `Confirmamos tu instalación:`,
      `📦 *Producto:* ${inst.producto}`,
      `📐 *Medidas:* ${inst.medidas}`,
      `📅 *Fecha:* ${fmtFecha(inst.fecha, inst.hora)}`,
      inst.ciudad ? `📍 *Ciudad:* ${inst.ciudad}` : "",
      inst.tecnico ? `👷 *Técnico:* ${inst.tecnico}` : "",
      ``,
      `Cualquier consulta, estamos a tu disposición. ¡Gracias!`,
    ].filter(Boolean).join("\n");
    const phone = inst.telefono.replace(/\D/g, "");
    window.open(`https://wa.me/${phone || WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  const filtered = useMemo(() => {
    let result = list;
    if (filter !== "todas") result = result.filter(i => i.estado === filter);
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(i =>
        i.cliente.toLowerCase().includes(s) ||
        i.producto.toLowerCase().includes(s) ||
        i.ciudad.toLowerCase().includes(s) ||
        i.tecnico.toLowerCase().includes(s)
      );
    }
    return result;
  }, [list, filter, search]);

  const counts = useMemo(() => {
    const c = { pendiente: 0, en_camino: 0, completada: 0, cancelada: 0 };
    list.forEach(i => c[i.estado]++);
    return c;
  }, [list]);

  const field = (k: keyof typeof form) => ({
    value: form[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value })),
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Hammer size={16} className="text-amber-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Instalaciones</h2>
          </div>
          <p className="text-zinc-600 text-xs">Gestiona las instalaciones agendadas y su seguimiento.</p>
        </div>
        <div className="flex items-center gap-2">
          {quotes.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setFromQuoteOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all text-cyan-400"
                style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}
              >
                <CalendarDays size={11} /> Desde cotización ({quotes.length})
              </button>
              <AnimatePresence>
                {fromQuoteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden py-1 min-w-[260px]"
                    style={{ background: "rgba(14,14,18,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
                  >
                    {quotes.map(q => (
                      <button key={q.id} onClick={() => openFromQuote(q)}
                        className="flex flex-col w-full text-left px-4 py-2.5 hover:bg-white/[0.04] transition-colors">
                        <span className="text-white text-xs font-bold">{q.nombre}</span>
                        <span className="text-zinc-500 text-[10px]">{q.producto} · {q.ciudad}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase text-amber-400 transition-all hover:bg-amber-500/20"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <Plus size={12} /> Nueva instalación
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["pendiente", "en_camino", "completada", "cancelada"] as InstalacionStatus[]).map(s => {
          const cfg = STATUS_CFG[s];
          const n = counts[s];
          return (
            <button key={s} onClick={() => setFilter(filter === s ? "todas" : s)}
              className="rounded-xl p-4 text-left transition-all hover:scale-[1.02]"
              style={{
                background: filter === s ? cfg.bg : "rgba(255,255,255,0.02)",
                border: filter === s ? `1px solid ${cfg.border}` : "1px solid rgba(255,255,255,0.06)",
              }}>
              <div className={`text-2xl font-black mb-1 ${cfg.text}`}>{n}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar cliente, producto, técnico…"
            className="w-full bg-[#111] border border-white/[0.07] rounded-xl pl-4 pr-8 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/30 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white">
              <X size={12} />
            </button>
          )}
        </div>
        <button
          onClick={() => setFilter("todas")}
          className={`px-3 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${filter === "todas" ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}
          style={{ border: filter === "todas" ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.06)" }}
        >
          Todas ({list.length})
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Hammer size={32} className="text-zinc-800 mx-auto mb-3" />
          <p className="text-zinc-600 text-sm font-bold">
            {list.length === 0 ? "Sin instalaciones registradas" : "Sin resultados"}
          </p>
          {list.length === 0 && (
            <button onClick={openNew} className="mt-4 text-xs text-amber-400 hover:text-amber-300 transition-colors">
              Crear la primera instalación →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((inst, i) => {
              const cfg = STATUS_CFG[inst.estado];
              return (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-zinc-300 flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {inst.cliente.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("")}
                      </div>
                      <div>
                        <p className="text-white font-black text-sm">{inst.cliente}</p>
                        <p className={`text-[10px] font-bold tracking-widest uppercase ${cfg.text}`}>{cfg.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge id={inst.id} current={inst.estado} onChange={s => handleStatusChange(inst.id, s)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 mb-4">
                    {[
                      { icon: Package,     label: "Producto",  value: inst.producto || "—" },
                      { icon: Ruler,       label: "Medidas",   value: inst.medidas || "—" },
                      { icon: CalendarDays,label: "Fecha",     value: fmtFecha(inst.fecha, inst.hora) },
                      { icon: MapPin,      label: "Ciudad",    value: inst.ciudad || "—" },
                      { icon: Phone,       label: "Teléfono",  value: inst.telefono || "—" },
                      { icon: Wrench,      label: "Técnico",   value: inst.tecnico || "Sin asignar" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-2">
                        <Icon size={11} className="text-zinc-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[9px] text-zinc-700 uppercase tracking-widest">{label}</div>
                          <div className="text-zinc-300 text-xs font-semibold">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {inst.notas && (
                    <div className="mb-4 px-3 py-2.5 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <FileText size={9} className="text-zinc-600" />
                        <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Notas</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed">{inst.notas}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <button onClick={() => handleWhatsApp(inst)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#25D366] transition-all hover:bg-[#25D366]/10"
                      style={{ border: "1px solid rgba(37,211,102,0.2)" }}>
                      <MessageCircle size={11} /> WhatsApp
                    </button>
                    <button onClick={() => openEdit(inst)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-zinc-400 transition-all hover:text-white hover:bg-white/[0.04]"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                      <Edit3 size={11} /> Editar
                    </button>
                    <button onClick={() => handleDelete(inst.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 transition-all hover:text-red-400 hover:bg-red-500/[0.06]"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                      <Trash2 size={11} /> Eliminar
                    </button>
                    <span className="ml-auto text-[9px] text-zinc-700">
                      {new Date(inst.createdAt).toLocaleDateString("es-CL", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ pointerEvents: "none" }}
            >
              <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6"
                style={{ background: "rgba(10,10,14,0.98)", border: "1px solid rgba(255,255,255,0.09)", pointerEvents: "all", backdropFilter: "blur(24px)" }}>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Hammer size={15} className="text-amber-400" />
                      <h3 className="text-white font-black text-base">
                        {editingId ? "Editar instalación" : "Nueva instalación"}
                      </h3>
                    </div>
                    {form.quoteId && (
                      <p className="text-[10px] text-cyan-400 mt-0.5">Desde cotización agendada</p>
                    )}
                  </div>
                  <button onClick={() => setModalOpen(false)} className="text-zinc-600 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Cliente + Teléfono */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">
                        Cliente <span className="text-amber-500">*</span>
                      </label>
                      <input {...field("cliente")} placeholder="Nombre completo"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Teléfono</label>
                      <input {...field("telefono")} placeholder="+56 9 …"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                  </div>

                  {/* Ciudad + Técnico */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Ciudad</label>
                      <input {...field("ciudad")} placeholder="Antofagasta / Iquique"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Técnico asignado</label>
                      <input {...field("tecnico")} placeholder="Nombre del técnico"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                  </div>

                  {/* Producto + Medidas */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Producto</label>
                      <input {...field("producto")} placeholder="Ej: Roller Blackout"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Medidas</label>
                      <input {...field("medidas")} placeholder="2.5m × 1.8m"
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all" />
                    </div>
                  </div>

                  {/* Fecha + Hora */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">
                        Fecha <span className="text-amber-500">*</span>
                      </label>
                      <input type="date" {...field("fecha")}
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Hora</label>
                      <input type="time" {...field("hora")}
                        className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all [color-scheme:dark]" />
                    </div>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Estado</label>
                    <select
                      value={form.estado}
                      onChange={e => setForm(f => ({ ...f, estado: e.target.value as InstalacionStatus }))}
                      className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{STATUS_CFG[s].label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notas */}
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Notas internas</label>
                    <textarea
                      value={form.notas}
                      onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                      placeholder="Instrucciones especiales, acceso, etc…"
                      rows={3}
                      className="w-full bg-[#1a1a1a] border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <button onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.cliente || !form.fecha}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase text-amber-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    {editingId ? "Guardar cambios" : "Crear instalación"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
