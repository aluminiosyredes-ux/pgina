import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, RotateCcw, Check, Shield, Layers, Box } from "lucide-react";

import {
  getPrices,
  savePrices,
  resetPrices,
  DEFAULTS,
} from "../../lib/prices";

import type {
  PriceConfig,
} from "../../lib/prices";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

function NumericInput({
  value,
  onChange,
  prefix = "$",
}: {
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  const [raw, setRaw] = useState(String(value));

  function handleBlur() {
    const parsed = parseInt(raw.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) {
      onChange(parsed);
      setRaw(String(parsed));
    } else {
      setRaw(String(value));
    }
  }

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-[10px] font-bold text-zinc-600 pointer-events-none">{prefix}</span>
      <input
        type="text"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={handleBlur}
        className="w-full bg-[#1c1c1c] border border-white/[0.07] rounded-lg pl-6 pr-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500/40 transition-all text-right"
      />
    </div>
  );
}

const TABS = [
  { key: "redes"    as const, label: "Redes",   icon: Shield },
  { key: "roller"   as const, label: "Roller",   icon: Layers },
  { key: "aluminios"as const, label: "Aluminios",icon: Box    },
];

export default function AdminPrecios() {
  const [config, setConfig]   = useState<PriceConfig>(getPrices());
  const [tab, setTab]         = useState<"redes" | "roller" | "aluminios">("redes");
  const [saved, setSaved]     = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleSave() {
    await savePrices(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function handleReset() {
    if (!confirm) { setConfirm(true); setTimeout(() => setConfirm(false), 3000); return; }
    resetPrices();
    savePrices(DEFAULTS);
    setConfig(DEFAULTS);
    setConfirm(false);
  }

  function updateRedes(id: string, field: "priceMin" | "priceMax", value: number) {
    setConfig((c) => ({ ...c, redes: c.redes.map((r) => r.id === id ? { ...r, [field]: value } : r) }));
  }
  function updateRoller(id: string, field: "priceMin" | "priceMax", value: number) {
    setConfig((c) => ({ ...c, roller: c.roller.map((r) => r.id === id ? { ...r, [field]: value } : r) }));
  }
  function updateAluminios(id: string, field: "priceMin" | "priceMax", value: number) {
    setConfig((c) => ({ ...c, aluminios: c.aluminios.map((r) => r.id === id ? { ...r, [field]: value } : r) }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={16} className="text-amber-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Precios de Cotizadores</h2>
          </div>
          <p className="text-zinc-600 text-xs">Modifica los valores de cada cotizador. Se aplican de inmediato al publicar.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all ${
              confirm
                ? "bg-red-500/15 text-red-400 border-red-500/30"
                : "text-zinc-500 hover:text-zinc-200"
            }`}
            style={{ border: confirm ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.07)" }}
          >
            <RotateCcw size={10} />
            {confirm ? "¿Seguro?" : "Restablecer"}
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${
              saved
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                : "bg-amber-500/12 text-amber-400 hover:bg-amber-500/20"
            }`}
            style={{ border: saved ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(245,158,11,0.25)" }}
          >
            {saved ? <Check size={10} /> : null}
            {saved ? "Guardado" : "Publicar cambios"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all ${
              tab === key
                ? "bg-amber-500/12 text-amber-400"
                : "text-zinc-600 hover:text-zinc-300"
            }`}
            style={{ border: tab === key ? "1px solid rgba(245,158,11,0.22)" : "1px solid rgba(255,255,255,0.06)" }}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
        style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}>
        <Tag size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          Los precios son <span className="text-zinc-300 font-bold">por metro cuadrado (m²)</span>. El cotizador multiplica automáticamente por la superficie ingresada por el cliente.
          Presioná <span className="text-amber-400 font-bold">Publicar cambios</span> para que se apliquen al cotizador.
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* REDES */}
        {tab === "redes" && (
          <motion.div key="redes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="space-y-3">
            {config.redes.map((item) => (
              <div key={item.id} className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <p className="text-white font-black text-sm">{item.label}</p>
                  <span className="ml-auto text-[10px] text-zinc-600 font-mono">{fmt(item.priceMin)} – {fmt(item.priceMax)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio mínimo / m²</label>
                    <NumericInput value={item.priceMin} onChange={(v) => updateRedes(item.id, "priceMin", v)} />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio máximo / m²</label>
                    <NumericInput value={item.priceMax} onChange={(v) => updateRedes(item.id, "priceMax", v)} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ROLLER */}
        {tab === "roller" && (
          <motion.div key="roller" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="space-y-3">
            {config.roller.map((item) => (
              <div key={item.id} className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <p className="text-white font-black text-sm">{item.label}</p>
                  <span className="ml-auto text-[10px] text-zinc-600 font-mono">{fmt(item.priceMin)} – {fmt(item.priceMax)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio mínimo / m²</label>
                    <NumericInput value={item.priceMin} onChange={(v) => updateRoller(item.id, "priceMin", v)} />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio máximo / m²</label>
                    <NumericInput value={item.priceMax} onChange={(v) => updateRoller(item.id, "priceMax", v)} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ALUMINIOS */}
        {tab === "aluminios" && (
          <motion.div key="aluminios" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="space-y-3">
            {config.aluminios.map((item) => (
              <div key={item.id} className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-zinc-400" />
                  <p className="text-white font-black text-sm">{item.label}</p>
                  <span className="ml-auto text-[10px] text-zinc-600 font-mono">{fmt(item.priceMin)} – {fmt(item.priceMax)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio mínimo / m²</label>
                    <NumericInput value={item.priceMin} onChange={(v) => updateAluminios(item.id, "priceMin", v)} />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">Precio máximo / m²</label>
                    <NumericInput value={item.priceMax} onChange={(v) => updateAluminios(item.id, "priceMax", v)} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
