import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Moon, Sun, Layers, Cpu, Star,
  ArrowLeft, ArrowRight, MessageCircle,
  RotateCcw, AlertTriangle, Check,
  ChevronRight,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const curtainTypes = [
  {
    id: "blackout",
    icon: Moon,
    name: "Roller Blackout",
    desc: "Oscurecimiento total. Ideal para dormitorios y salas multimedia.",
    tag: "Más vendido",
    color: "text-zinc-300",
    border: "border-zinc-500/20",
    activeBorder: "border-zinc-300/50",
    iconBg: "bg-zinc-500/12",
    glowBg: "bg-zinc-400/[0.05]",
    priceMin: 18_000,
    priceMax: 24_000,
    unit: "CLP/m²",
  },
  {
    id: "sunscreen",
    icon: Sun,
    name: "Roller Sunscreen",
    desc: "Control solar con vista al exterior. Screen del 1% al 10%.",
    tag: "Control solar",
    color: "text-amber-400",
    border: "border-amber-500/20",
    activeBorder: "border-amber-400/60",
    iconBg: "bg-amber-500/12",
    glowBg: "bg-amber-400/[0.05]",
    priceMin: 20_000,
    priceMax: 28_000,
    unit: "CLP/m²",
  },
  {
    id: "duo",
    icon: Layers,
    name: "Cortina Dúo",
    desc: "Sistema de doble tela. Regulación gradual de luz y privacidad.",
    tag: "Día / Noche",
    color: "text-sky-400",
    border: "border-sky-500/20",
    activeBorder: "border-sky-400/60",
    iconBg: "bg-sky-500/12",
    glowBg: "bg-sky-400/[0.05]",
    priceMin: 28_000,
    priceMax: 38_000,
    unit: "CLP/m²",
  },
  {
    id: "motorizada",
    icon: Cpu,
    name: "Cortina Motorizada",
    desc: "Motor WiFi integrado. Control desde app, voz o control remoto.",
    tag: "Smart Home",
    color: "text-purple-400",
    border: "border-purple-500/20",
    activeBorder: "border-purple-400/60",
    iconBg: "bg-purple-500/12",
    glowBg: "bg-purple-400/[0.05]",
    priceMin: 40_000,
    priceMax: 55_000,
    unit: "CLP/m²",
  },
  {
    id: "premium",
    icon: Star,
    name: "Colección Premium",
    desc: "Telas de importación y mecanismos europeos de alta precisión.",
    tag: "Exclusiva",
    color: "text-amber-300",
    border: "border-amber-400/22",
    activeBorder: "border-amber-300/65",
    iconBg: "bg-amber-400/12",
    glowBg: "bg-amber-300/[0.05]",
    priceMin: 32_000,
    priceMax: 48_000,
    unit: "CLP/m²",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const fmtDec = (n: number) => n.toFixed(2);

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ["Tipo", "Medidas", "Resumen"];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-500
                  ${done ? "bg-amber-500 text-black" : active ? "bg-white text-black" : "bg-zinc-800 text-zinc-500 border border-zinc-700"}`}
              >
                {done ? <Check size={12} /> : num}
              </div>
              <span className={`text-[9px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${active ? "text-white" : done ? "text-amber-500" : "text-zinc-600"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-px mx-2 mb-4 transition-all duration-500 ${step > num ? "bg-amber-500/60" : "bg-zinc-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1: SELECT TYPE ──────────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-black tracking-[0.24em] uppercase text-zinc-500 mb-2">Paso 1 de 3</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          ¿Qué tipo de cortina<span className="text-zinc-500"> necesitás?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {curtainTypes.map((ct, i) => {
          const Icon = ct.icon;
          const isSelected = selected === ct.id;
          return (
            <motion.button
              key={ct.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              onClick={() => onSelect(ct.id)}
              className={`group relative text-left flex flex-col gap-3.5 p-5 rounded-2xl border transition-all duration-300 overflow-hidden
                ${isSelected
                  ? `${ct.activeBorder} bg-[#111] shadow-lg`
                  : `${ct.border} bg-[#1c1c1c] hover:bg-[#0f0f0f] hover:${ct.activeBorder}`
                }`}
            >
              {/* Glow */}
              <div className={`absolute inset-0 ${ct.glowBg} opacity-0 group-hover:opacity-100 ${isSelected ? "opacity-100" : ""} transition-opacity duration-400`} />

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
                >
                  <Check size={10} className="text-black" strokeWidth={3} />
                </motion.div>
              )}

              {/* Icon + tag */}
              <div className="flex items-center justify-between relative z-10">
                <div className={`w-10 h-10 rounded-xl ${ct.iconBg} border ${ct.border} flex items-center justify-center`}>
                  <Icon size={18} className={ct.color} />
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${ct.border} ${ct.color} tracking-widest uppercase`}>
                  {ct.tag}
                </span>
              </div>

              {/* Text */}
              <div className="relative z-10">
                <p className="text-[13px] font-black text-white tracking-tight mb-1">{ct.name}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{ct.desc}</p>
              </div>

              {/* Price hint */}
              <div className={`relative z-10 pt-2.5 border-t ${ct.border}`}>
                <p className="text-[10px] text-zinc-600">
                  Desde <span className={`font-bold ${ct.color}`}>{fmt(ct.priceMin)}</span> /m²
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!selected}
          className={`group flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300
            ${selected
              ? "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
        >
          Continuar
          <ArrowRight size={13} className={selected ? "group-hover:translate-x-0.5 transition-transform" : ""} />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 2: MEASUREMENTS ────────────────────────────────────────────────────

function Step2({
  width,
  height,
  onWidthChange,
  onHeightChange,
  onNext,
  onBack,
  selectedType,
}: {
  width: string;
  height: string;
  onWidthChange: (v: string) => void;
  onHeightChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedType: (typeof curtainTypes)[0] | null;
}) {
  const w = parseFloat(width);
  const h = parseFloat(height);
  const m2 = !isNaN(w) && !isNaN(h) && w > 0 && h > 0 ? w * h : null;
  const isValid = m2 !== null && m2 >= 0.5;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-[10px] font-black tracking-[0.24em] uppercase text-zinc-500 mb-2">Paso 2 de 3</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Ingresá las<span className="text-zinc-500"> medidas.</span>
        </h2>
        {selectedType && (
          <div className="flex items-center gap-2 mt-3">
            <selectedType.icon size={13} className={selectedType.color} />
            <span className={`text-[11px] font-bold tracking-widest uppercase ${selectedType.color}`}>{selectedType.name}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Width */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] font-black tracking-[0.22em] uppercase text-zinc-500">
            Ancho
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              max="20"
              step="0.01"
              placeholder="ej: 2.50"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-zinc-700/60 hover:border-zinc-600 focus:border-amber-500/60 text-white text-lg font-black tracking-tight rounded-xl px-5 py-4 pr-16 outline-none transition-all duration-200 placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-400 tracking-wider">m</span>
            </div>
          </div>
        </div>

        {/* Height */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] font-black tracking-[0.22em] uppercase text-zinc-500">
            Alto
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              max="10"
              step="0.01"
              placeholder="ej: 1.80"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-zinc-700/60 hover:border-zinc-600 focus:border-amber-500/60 text-white text-lg font-black tracking-tight rounded-xl px-5 py-4 pr-16 outline-none transition-all duration-200 placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-400 tracking-wider">m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live m² preview */}
      <AnimatePresence>
        {m2 !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 px-5 py-4 rounded-xl border border-amber-500/18 bg-amber-500/[0.04]"
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-zinc-500 mb-0.5">Superficie calculada</span>
              <span className="text-2xl font-black text-white">{fmtDec(m2)} <span className="text-sm text-zinc-500 font-medium">m²</span></span>
            </div>
            {m2 < 0.5 && (
              <p className="text-[11px] text-amber-400 ml-auto">Mínimo 0.5 m²</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-zinc-700/40 bg-zinc-800/20">
        <div className="w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-[9px] font-black text-zinc-400">i</span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Ingresá el ancho y alto del vano (hueco de la ventana) en metros con decimales. Para múltiples paños, ingresá uno a la vez.
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700/50 text-zinc-400 font-bold text-xs tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-all"
        >
          <ArrowLeft size={12} /> Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`group flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300
            ${isValid
              ? "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
        >
          Ver presupuesto
          <ArrowRight size={13} className={isValid ? "group-hover:translate-x-0.5 transition-transform" : ""} />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 3: SUMMARY ──────────────────────────────────────────────────────────

function Step3({
  selectedType,
  width,
  height,
  onBack,
  onReset,
}: {
  selectedType: (typeof curtainTypes)[0];
  width: string;
  height: string;
  onBack: () => void;
  onReset: () => void;
}) {
  const w = parseFloat(width);
  const h = parseFloat(height);
  const m2 = w * h;
  const total_min = Math.round(m2 * selectedType.priceMin);
  const total_max = Math.round(m2 * selectedType.priceMax);

  const Icon = selectedType.icon;

  const waMsg =
    `Hola! Realicé una cotización en el sitio web:\n\n` +
    `• Tipo: ${selectedType.name}\n` +
    `• Ancho: ${fmtDec(w)} m\n` +
    `• Alto: ${fmtDec(h)} m\n` +
    `• Superficie: ${fmtDec(m2)} m²\n` +
    `• Estimación: ${fmt(total_min)} – ${fmt(total_max)} CLP\n\n` +
    `¿Pueden darme un presupuesto definitivo y coordinar una visita técnica?`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-black tracking-[0.24em] uppercase text-zinc-500 mb-2">Paso 3 de 3</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Resumen del<span className="text-zinc-500"> presupuesto.</span>
        </h2>
      </div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className={`rounded-2xl border ${selectedType.border} bg-[#1c1c1c] overflow-hidden`}
      >
        {/* Top accent */}
        <div className={`h-[2px] bg-gradient-to-r from-transparent ${selectedType.color.replace("text-", "via-")}/50 to-transparent`} />

        <div className="p-6 md:p-7 flex flex-col gap-5">
          {/* Type header */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${selectedType.iconBg} border ${selectedType.border} flex items-center justify-center`}>
              <Icon size={18} className={selectedType.color} />
            </div>
            <div>
              <p className={`text-[9px] font-black tracking-[0.22em] uppercase ${selectedType.color} mb-0.5`}>{selectedType.tag}</p>
              <p className="text-sm font-black text-white">{selectedType.name}</p>
            </div>
          </div>

          {/* Measurements row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Ancho", value: `${fmtDec(w)} m` },
              { label: "Alto", value: `${fmtDec(h)} m` },
              { label: "Superficie", value: `${fmtDec(m2)} m²` },
            ].map((item) => (
              <div key={item.label} className={`flex flex-col items-center gap-1 py-3 rounded-xl border ${selectedType.border} bg-black/20`}>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-600">{item.label}</span>
                <span className="text-base font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Price range */}
          <div className={`rounded-xl border ${selectedType.border} ${selectedType.glowBg} p-5`}>
            <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-500 mb-3">Estimación de precio</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl md:text-4xl font-black text-white">{fmt(total_min)}</span>
              <span className="text-zinc-500 font-medium mb-1">–</span>
              <span className="text-3xl md:text-4xl font-black text-white">{fmt(total_max)}</span>
            </div>
            <p className="text-[10px] text-zinc-600">CLP · Valores aproximados · No incluye instalación</p>
          </div>

          {/* Detail rows */}
          <div className="flex flex-col gap-0 rounded-xl border border-white/[0.05] overflow-hidden">
            {[
              { label: "Precio base por m²", value: `${fmt(selectedType.priceMin)} – ${fmt(selectedType.priceMax)}` },
              { label: "Metros cuadrados", value: `${fmtDec(m2)} m²` },
              { label: "Instalación", value: "Se coordina por separado" },
              { label: "Garantía", value: "Incluida en materiales" },
            ].map((row, i) => (
              <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < 3 ? "border-b border-white/[0.04]" : ""}`}>
                <span className="text-[11px] text-zinc-500">{row.label}</span>
                <span className="text-[11px] font-bold text-zinc-200">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-start gap-3.5 px-5 py-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]"
      >
        <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black tracking-[0.18em] uppercase text-amber-400 mb-0.5">Aviso importante</p>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Los valores entregados son <strong className="text-zinc-200">aproximados</strong> y pueden variar según materiales, sistema de instalación y condiciones del vano.
          </p>
          <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">
            Para un presupuesto definitivo es necesaria una <strong className="text-zinc-300">visita técnica</strong> o videollamada. La instalación se coordina directamente con nuestra empresa.
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex flex-col gap-2.5"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-sm tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.01]"
        >
          <MessageCircle size={16} />
          Contactar por WhatsApp
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
        <p className="text-center text-[10px] text-zinc-600 tracking-wide">
          Se enviará el resumen de la cotización automáticamente.
        </p>
      </motion.div>

      {/* Secondary actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700/50 text-zinc-400 font-bold text-xs tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-all"
        >
          <ArrowLeft size={12} /> Editar medidas
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700/30 text-zinc-600 font-bold text-xs tracking-widest uppercase hover:border-zinc-600 hover:text-zinc-300 transition-all"
        >
          <RotateCcw size={11} /> Nueva cotización
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function RollerCotizador() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const selectedType = curtainTypes.find((c) => c.id === selectedTypeId) ?? null;

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };
  const reset = () => {
    setDirection(-1);
    setStep(1);
    setSelectedTypeId(null);
    setWidth("");
    setHeight("");
  };

  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[42vh] flex items-end pb-10 overflow-hidden bg-[#0f0f0f]">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7"
          >
            <Link
              href="/roller"
              className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Cortinas Roller
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/6 text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-4">
              Cotizador estimativo
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-4">
              Estimá el precio<br />
              <span className="text-zinc-500">de tu cortina roller.</span>
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
              3 pasos rápidos. Obtené un valor aproximado y contactanos por WhatsApp para coordinar tu presupuesto definitivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-10 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-6">

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <StepIndicator step={step} />
          </motion.div>

          {/* Step content */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Step1
                    selected={selectedTypeId}
                    onSelect={setSelectedTypeId}
                    onNext={goNext}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Step2
                    width={width}
                    height={height}
                    onWidthChange={setWidth}
                    onHeightChange={setHeight}
                    onNext={goNext}
                    onBack={goBack}
                    selectedType={selectedType}
                  />
                </motion.div>
              )}
              {step === 3 && selectedType && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Step3
                    selectedType={selectedType}
                    width={width}
                    height={height}
                    onBack={goBack}
                    onReset={reset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
