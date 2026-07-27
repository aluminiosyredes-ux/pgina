import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon, Sun, Layers, Cpu, Star,
  ArrowRight, ArrowLeft, MessageCircle,
  Check, AlertTriangle, RotateCcw, User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import { saveQuote } from "../lib/quotes";
import { getPrices } from "../lib/prices";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const TYPES = [
  {
    id: "blackout",
    icon: Moon,
    name: "Roller Blackout",
    desc: "Oscurecimiento total. Ideal para dormitorios.",
    tag: "Más vendido",
    color: "text-zinc-300",
    accent: "border-zinc-400/35 bg-zinc-400/8",
    ring: "ring-zinc-400/40",
    priceMin: 18_000,
    priceMax: 24_000,
  },
  {
    id: "sunscreen",
    icon: Sun,
    name: "Roller Sunscreen",
    desc: "Control solar con vista al exterior.",
    tag: "Control luz",
    color: "text-amber-400",
    accent: "border-amber-400/35 bg-amber-400/8",
    ring: "ring-amber-400/40",
    priceMin: 20_000,
    priceMax: 28_000,
  },
  {
    id: "duo",
    icon: Layers,
    name: "Cortina Dúo",
    desc: "Doble tela, regulación gradual día/noche.",
    tag: "Día / Noche",
    color: "text-sky-400",
    accent: "border-sky-400/35 bg-sky-400/8",
    ring: "ring-sky-400/40",
    priceMin: 28_000,
    priceMax: 38_000,
  },
  {
    id: "motorizada",
    icon: Cpu,
    name: "Cortina Motorizada",
    desc: "Motor WiFi. Control remoto, app o voz.",
    tag: "Smart Home",
    color: "text-purple-400",
    accent: "border-purple-400/35 bg-purple-400/8",
    ring: "ring-purple-400/40",
    priceMin: 40_000,
    priceMax: 55_000,
  },
  {
    id: "premium",
    icon: Star,
    name: "Colección Premium",
    desc: "Telas de importación y mecanismos europeos.",
    tag: "Exclusiva",
    color: "text-amber-300",
    accent: "border-amber-300/35 bg-amber-300/8",
    ring: "ring-amber-300/40",
    priceMin: 32_000,
    priceMax: 48_000,
  },
];

type CurtainType = Omit<(typeof TYPES)[number], "priceMin" | "priceMax"> & {
  icon: LucideIcon;
  priceMin: number;
  priceMax: number;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

const fmtM = (n: number) => n.toFixed(2);

// ─── STEP DOTS ──────────────────────────────────────────────────────────────

function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {(["Tipo", "Medidas", "Resumen"] as const).map((label, i) => {
        const num = (i + 1) as 1 | 2 | 3;
        const done = current > num;
        const active = current === num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-400
                ${done ? "bg-amber-500 text-black" : active ? "bg-white text-black" : "bg-zinc-800 text-zinc-600 border border-zinc-700"}`}
              >
                {done ? <Check size={10} strokeWidth={3} /> : num}
              </div>
              <span className={`text-[8px] font-bold tracking-[0.16em] uppercase transition-colors duration-300
                ${active ? "text-white" : done ? "text-amber-500" : "text-zinc-600"}`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-12 sm:w-20 h-px mx-2 mb-3.5 transition-all duration-400 ${current > num ? "bg-amber-500/50" : "bg-zinc-800"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1 ───────────────────────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
  onNext,
  types,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  types: CurtainType[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-black text-white tracking-tight">
        ¿Qué tipo de cortina<span className="text-zinc-500"> necesitás?</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {types.map((ct, i) => {
          const Icon = ct.icon;
          const on = selected === ct.id;
          return (
            <motion.button
              key={ct.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onClick={() => onSelect(ct.id)}
              className={`group relative text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-250 overflow-hidden
                ${on ? `${ct.accent} ring-1 ${ct.ring}` : "border-zinc-800 bg-[#202020] hover:border-zinc-700 hover:bg-[#101010]"}`}
            >
              {on && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center"
                >
                  <Check size={8} className="text-black" strokeWidth={3} />
                </motion.div>
              )}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${on ? "bg-black/20" : "bg-zinc-800"}`}>
                <Icon size={15} className={on ? ct.color : "text-zinc-500"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[12px] font-black leading-tight mb-0.5 ${on ? "text-white" : "text-zinc-200"}`}>{ct.name}</p>
                <p className="text-[10px] text-zinc-500 leading-snug">{ct.desc}</p>
                <p className={`text-[9px] font-bold mt-1.5 ${on ? ct.color : "text-zinc-600"}`}>
                  Desde {fmt(ct.priceMin)}/m²
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all duration-250
            ${selected ? "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}
        >
          Continuar <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 2 ───────────────────────────────────────────────────────────────────

function Step2({
  type,
  w, h,
  setW, setH,
  onNext, onBack,
}: {
  type: CurtainType;
  w: string; h: string;
  setW: (v: string) => void;
  setH: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const Icon = type.icon;
  const wn = parseFloat(w);
  const hn = parseFloat(h);
  const m2 = !isNaN(wn) && !isNaN(hn) && wn > 0 && hn > 0 ? wn * hn : null;
  const ok = m2 !== null && m2 >= 0.5;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${type.accent}`}>
          <Icon size={13} className={type.color} />
        </div>
        <h3 className="text-xl font-black text-white tracking-tight">
          Ingresá las<span className="text-zinc-500"> medidas.</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Ancho", val: w, set: setW },
          { label: "Alto", val: h, set: setH },
        ].map(({ label, val, set }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-500">{label}</label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                max="20"
                step="0.01"
                placeholder="0.00"
                value={val}
                onChange={(e) => set(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-zinc-700/70 hover:border-zinc-600 focus:border-amber-500/50 text-white text-xl font-black rounded-xl px-4 py-3.5 pr-12 outline-none transition-all placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-md">m</span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {m2 !== null && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Superficie</span>
            <span className="text-lg font-black text-white">{fmtM(m2)} <span className="text-sm text-zinc-500 font-medium">m²</span></span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-500 font-bold text-[9px] tracking-widest uppercase hover:border-zinc-700 hover:text-zinc-300 transition-all">
          <ArrowLeft size={11} /> Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!ok}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all duration-250
            ${ok ? "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}
        >
          Ver presupuesto <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 3 ───────────────────────────────────────────────────────────────────

function Step3({
  type, w, h,
  onBack, onReset,
}: {
  type: CurtainType;
  w: string; h: string;
  onBack: () => void;
  onReset: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");

  const Icon = type.icon;
  const wn = parseFloat(w);
  const hn = parseFloat(h);
  const m2 = wn * hn;
  const tMin = Math.round(m2 * type.priceMin);
  const tMax = Math.round(m2 * type.priceMax);

  const waText =
    `Hola! Realicé una cotización de cortina roller:\n` +
    (nombre ? `• Nombre: ${nombre}\n` : "") +
    (telefono ? `• Teléfono: ${telefono}\n` : "") +
    (ciudad ? `• Ciudad: ${ciudad}\n` : "") +
    `• Tipo: ${type.name}\n` +
    `• Medidas: ${fmtM(wn)} m × ${fmtM(hn)} m\n` +
    `• Superficie: ${fmtM(m2)} m²\n` +
    `• Estimación: ${fmt(tMin)} – ${fmt(tMax)} CLP\n\n` +
    `¿Pueden darme un presupuesto definitivo?`;

  function handleWA(e: React.MouseEvent) {
    if (!nombre || !telefono) { e.preventDefault(); return; }
    saveQuote({
      nombre, telefono, email, ciudad,
      producto: type.name,
      medidas: `${fmtM(wn)}m × ${fmtM(hn)}m`,
      totalMin: tMin,
      totalMax: tMax,
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-black text-white tracking-tight">
        Presupuesto<span className="text-zinc-500"> estimado.</span>
      </h3>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl border ${type.accent} bg-[#1e1e1e] overflow-hidden`}
      >
        <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="p-5 flex flex-col gap-4">
          {/* Type */}
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.accent}`}>
              <Icon size={14} className={type.color} />
            </div>
            <div>
              <p className={`text-[8px] font-black tracking-[0.2em] uppercase ${type.color}`}>{type.tag}</p>
              <p className="text-[12px] font-black text-white">{type.name}</p>
            </div>
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Ancho", v: `${fmtM(wn)} m` },
              { l: "Alto", v: `${fmtM(hn)} m` },
              { l: "Superficie", v: `${fmtM(m2)} m²` },
            ].map((item) => (
              <div key={item.l} className="flex flex-col items-center gap-0.5 py-2.5 rounded-lg border border-white/[0.05] bg-black/20">
                <span className="text-[8px] font-bold tracking-widest uppercase text-zinc-600">{item.l}</span>
                <span className="text-sm font-black text-white">{item.v}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="rounded-xl border border-amber-500/12 bg-amber-500/[0.03] p-4">
            <p className="text-[8px] font-black tracking-[0.2em] uppercase text-zinc-600 mb-2">Estimación de precio</p>
            <p className="text-2xl sm:text-3xl font-black text-white leading-none">
              {fmt(tMin)}
              <span className="text-zinc-600 mx-2 font-light text-xl">–</span>
              {fmt(tMax)}
            </p>
            <p className="text-[9px] text-zinc-600 mt-1.5">CLP · No incluye instalación</p>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]"
      >
        <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          <span className="text-zinc-300 font-bold">Los valores son aproximados.</span>{" "}
          La instalación se coordina directamente con la empresa. Para un presupuesto definitivo se requiere visita técnica o videollamada.
        </p>
      </motion.div>

      {/* Contact form */}
      <div className="rounded-xl border border-white/[0.07] bg-[#1e1e1e] p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={13} className="text-amber-400" />
          <p className="text-xs font-black tracking-widest uppercase text-zinc-300">Tus datos de contacto</p>
          <span className="text-[9px] text-zinc-600 ml-auto">* requerido</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([
            { label: "Nombre", value: nombre, setter: setNombre, placeholder: "Tu nombre", type: "text", req: true },
            { label: "Teléfono", value: telefono, setter: setTelefono, placeholder: "+56 9 ...", type: "tel", req: true },
            { label: "Email", value: email, setter: setEmail, placeholder: "correo@email.com", type: "email", req: false },
            { label: "Ciudad", value: ciudad, setter: setCiudad, placeholder: "Antofagasta / Iquique", type: "text", req: false },
          ] as const).map(({ label, value, setter, placeholder, type, req }) => (
            <div key={label}>
              <label className="block text-[9px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                {label} {req && <span className="text-amber-500">*</span>}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#252525] border border-white/[0.07] rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/40 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp */}
      <motion.a
        href={nombre && telefono ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWA}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`flex items-center justify-center gap-2.5 px-6 py-4 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg ${
          nombre && telefono
            ? "bg-[#25D366] hover:bg-[#1fba58] shadow-green-500/20 hover:scale-[1.01] cursor-pointer"
            : "bg-zinc-700 opacity-40 cursor-not-allowed pointer-events-none"
        }`}
      >
        <MessageCircle size={15} />
        Contactar por WhatsApp
        <ArrowRight size={12} />
      </motion.a>
      <p className="text-center text-[9px] text-zinc-700">Completá nombre y teléfono para continuar.</p>

      {/* Secondary */}
      <div className="flex items-center justify-between pt-1">
        <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-500 font-bold text-[9px] tracking-widest uppercase hover:border-zinc-700 hover:text-zinc-300 transition-all">
          <ArrowLeft size={10} /> Editar
        </button>
        <button onClick={onReset} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800/50 text-zinc-700 font-bold text-[9px] tracking-widest uppercase hover:text-zinc-500 transition-all">
          <RotateCcw size={10} /> Nueva cotización
        </button>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
};

export default function RollerCotizadorSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dir, setDir] = useState(1);
  const [typeId, setTypeId] = useState<string | null>(null);
  const [w, setW] = useState("");
  const [h, setH] = useState("");

  const prices = getPrices();
  const pricedTypes: CurtainType[] = TYPES.map((t) => {
    const p = prices.roller.find((r) => r.id === t.id);
    return p ? { ...t, priceMin: p.priceMin, priceMax: p.priceMax } : { ...t };
  });
  const type = pricedTypes.find((t) => t.id === typeId) ?? null;

  const next = () => { setDir(1); setStep((s) => (s + 1) as 1 | 2 | 3); };
  const back = () => { setDir(-1); setStep((s) => (s - 1) as 1 | 2 | 3); };
  const reset = () => { setDir(-1); setStep(1); setTypeId(null); setW(""); setH(""); };

  return (
    <section className="py-16 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-px bg-amber-500/40" />
            <span className="text-[9px] font-black tracking-[0.26em] uppercase text-amber-500">Herramienta gratuita</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Cotizá tu cortina
            <span className="text-zinc-600 font-light"> roller.</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-lg leading-relaxed">
            3 pasos rápidos para obtener una estimación de precio. Sin compromisos.
          </p>
        </motion.div>

        {/* Cotizador card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-2xl border border-white/[0.06] bg-[#1a1a1a] overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(0,0,0,0.5)" }}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="p-6 md:p-8">
            <Steps current={step} />

            <div className="relative">
              <AnimatePresence mode="wait" custom={dir}>
                {step === 1 && (
                  <motion.div key="s1" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                    <Step1 selected={typeId} onSelect={setTypeId} onNext={next} types={pricedTypes} />
                  </motion.div>
                )}
                {step === 2 && type && (
                  <motion.div key="s2" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                    <Step2 type={type} w={w} h={h} setW={setW} setH={setH} onNext={next} onBack={back} />
                  </motion.div>
                )}
                {step === 3 && type && (
                  <motion.div key="s3" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                    <Step3 type={type} w={w} h={h} onBack={back} onReset={reset} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
