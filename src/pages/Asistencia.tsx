import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Layers, Cpu, Box, HelpCircle,
  MessageCircle, Video, CheckCircle2, ArrowRight,
  Zap, Star, HeartHandshake,
  User, Phone, Mail, MapPin, FileText, AlignLeft,
  RotateCcw,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import InstagramBanner from "../components/InstagramBanner";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";
import { track } from "../lib/analytics";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

// ─── SERVICE OPTIONS ──────────────────────────────────────────────────────────

const SERVICES = [
  { id: "redes",     icon: Shield,    label: "Redes de Seguridad", color: "text-blue-400",   accent: "border-blue-400/30 bg-blue-400/8",   ring: "ring-blue-400/30" },
  { id: "roller",    icon: Layers,    label: "Cortinas Roller",    color: "text-amber-400",  accent: "border-amber-400/30 bg-amber-400/8", ring: "ring-amber-400/30" },
  { id: "domotica",  icon: Cpu,       label: "Domótica",           color: "text-purple-400", accent: "border-purple-400/30 bg-purple-400/8", ring: "ring-purple-400/30" },
  { id: "aluminios", icon: Box,       label: "Aluminios",          color: "text-zinc-300",   accent: "border-zinc-400/30 bg-zinc-400/8",   ring: "ring-zinc-400/30" },
  { id: "otro",      icon: HelpCircle,label: "Otro",               color: "text-zinc-500",   accent: "border-zinc-600/30 bg-zinc-600/8",   ring: "ring-zinc-600/30" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

// ─── CONTACT METHOD OPTIONS ───────────────────────────────────────────────────

const METHODS = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Respuesta inmediata",
    color: "text-green-400",
    accent: "border-green-400/30 bg-green-400/8",
    ring: "ring-green-400/30",
  },
  {
    id: "videollamada",
    icon: Video,
    label: "Videollamada",
    sub: "El equipo coordina contigo",
    color: "text-sky-400",
    accent: "border-sky-400/30 bg-sky-400/8",
    ring: "ring-sky-400/30",
  },
] as const;

type MethodId = (typeof METHODS)[number]["id"];

// ─── PILLARS ──────────────────────────────────────────────────────────────────

const pillars = [
  { icon: Zap,           label: "Respuesta rápida",      sub: "En minutos por WhatsApp" },
  { icon: Star,          label: "Técnicos certificados", sub: "Más de 15 años de experiencia" },
  { icon: HeartHandshake, label: "Sin costo adicional",  sub: "Soporte incluido en tu proyecto" },
];

// ─── INPUT FIELD WRAPPER ─────────────────────────────────────────────────────

function Field({
  icon: Icon,
  label,
  children,
  required,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.2em] uppercase text-zinc-500">
        <Icon size={10} />
        {label}
        {required && <span className="text-amber-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#1e1e1e] border border-zinc-700/70 hover:border-zinc-600 focus:border-amber-500/50 text-white text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-zinc-700";

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────

function SuccessVideollamada({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex flex-col items-center text-center gap-6 py-8"
    >
      <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
        <Video size={32} className="text-sky-400" />
      </div>
      <div>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-sky-400 mb-2">Solicitud recibida</p>
        <h3 className="text-2xl font-black text-white tracking-tight mb-3">
          ¡Gracias{name ? `, ${name.split(" ")[0]}` : ""}!
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
          Tu solicitud de videollamada fue registrada. Un técnico de nuestro equipo se comunicará contigo para coordinar la sesión.
        </p>
      </div>
      <div className="w-full rounded-xl border border-sky-500/15 bg-sky-500/[0.04] px-5 py-4 text-left">
        <p className="text-[10px] font-black tracking-widest uppercase text-zinc-500 mb-1.5">¿Qué sigue?</p>
        {[
          "Revisamos tu solicitud en detalle.",
          "Te contactamos por WhatsApp para agendar.",
          "Realizamos la sesión en el horario acordado.",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-2.5 mb-1.5 last:mb-0">
            <div className="w-4 h-4 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[8px] font-black text-sky-400">{i + 1}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-snug">{s}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-500 font-bold text-[9px] tracking-widest uppercase hover:border-zinc-700 hover:text-zinc-300 transition-all"
      >
        <RotateCcw size={10} /> Nueva solicitud
      </button>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Asistencia() {
  useSEO(SEO.asistencia);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [servicio, setServicio] = useState<ServiceId | null>(null);
  const [motivo, setMotivo] = useState("");
  const [metodo, setMetodo] = useState<MethodId | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = nombre.trim() && telefono.trim() && servicio && motivo.trim() && metodo;

  const handleSubmit = () => {
    if (!canSubmit) return;
    track("asistencia_form", { servicio: servicio ?? "", metodo: metodo ?? "" });

    const serviceLabel = SERVICES.find((s) => s.id === servicio)?.label ?? servicio;
    const methodLabel = METHODS.find((m) => m.id === metodo)?.label ?? metodo;

    const msg =
      `Hola! Solicito asistencia técnica:\n` +
      `• Nombre: ${nombre}\n` +
      `• Teléfono: ${telefono}\n` +
      (email ? `• Email: ${email}\n` : "") +
      (ciudad ? `• Ciudad: ${ciudad}\n` : "") +
      `• Servicio: ${serviceLabel}\n` +
      `• Motivo: ${motivo}\n` +
      `• Tipo: ${methodLabel}\n` +
      (descripcion ? `• Descripción: ${descripcion}` : "");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

    if (metodo === "videollamada") {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setNombre(""); setTelefono(""); setEmail(""); setCiudad("");
    setServicio(null); setMotivo(""); setMetodo(null); setDescripcion("");
    setSubmitted(false);
  };

  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[62vh] flex items-end pb-14 overflow-hidden bg-[#151515]">
        <div className="absolute inset-0">
          <img
            src="/images/domo.png"
            alt="Asistencia Técnica"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.65) saturate(0.88)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/44 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/65 via-[#080808]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/22 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[180px] pointer-events-none" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-4 h-px bg-amber-500/50" />
              <span className="text-[9px] font-black tracking-[0.26em] uppercase text-amber-500">Soporte Postventa Premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.92] mb-5">
              Asistencia<br />
              <span className="text-zinc-500">Técnica</span>{" "}
              <span className="text-white">Premium.</span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
              Soporte profesional y personalizado para todos nuestros clientes.
              <span className="block mt-1 text-zinc-600 text-sm">Sin tiempos de espera. Sin letras chicas.</span>
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent" />
      </section>

      {/* ── PILLAR STRIP ── */}
      <section className="bg-[#1a1a1a] border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-center gap-4 px-6 py-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/8 border border-amber-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight">{p.label}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">{p.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/15 bg-amber-500/[0.04] mb-4">
              <Zap size={10} className="text-amber-500" />
              <span className="text-[9px] font-black tracking-[0.24em] uppercase text-amber-500">Asistencia rápida para nuestros clientes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              Solicita soporte
              <span className="text-zinc-600 font-light"> ahora.</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
              Completá el formulario y te contactamos de inmediato. Atención técnica premium, personalizada para cada caso.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl border border-white/[0.06] bg-[#1a1a1a] overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(0,0,0,0.55)" }}
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SuccessVideollamada name={nombre} onReset={reset} />
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-6">

                    {/* ── Datos personales ── */}
                    <div>
                      <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-600 mb-4">Datos de contacto</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field icon={User} label="Nombre completo" required>
                          <input
                            type="text"
                            placeholder="Juan Pérez"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field icon={Phone} label="Teléfono" required>
                          <input
                            type="tel"
                            placeholder="+56 9 1234 5678"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field icon={Mail} label="Correo electrónico">
                          <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field icon={MapPin} label="Ciudad">
                          <input
                            type="text"
                            placeholder="Antofagasta / Iquique / ..."
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>

                    {/* ── Servicio ── */}
                    <div>
                      <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-600 mb-3">
                        Servicio relacionado <span className="text-amber-500">*</span>
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SERVICES.map((s) => {
                          const Icon = s.icon;
                          const on = servicio === s.id;
                          return (
                            <motion.button
                              key={s.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setServicio(s.id)}
                              className={`relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-left transition-all duration-200
                                ${on ? `${s.accent} ring-1 ${s.ring}` : "border-zinc-800 bg-[#202020] hover:border-zinc-700"}`}
                            >
                              {on && (
                                <motion.div
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center"
                                >
                                  <CheckCircle2 size={8} className="text-black" />
                                </motion.div>
                              )}
                              <Icon size={14} className={on ? s.color : "text-zinc-600"} />
                              <span className={`text-[11px] font-bold leading-tight ${on ? "text-white" : "text-zinc-400"}`}>
                                {s.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Motivo ── */}
                    <Field icon={FileText} label="Motivo del contacto" required>
                      <input
                        type="text"
                        placeholder="Ej: Cortina descalibrada, instalación nueva, configuración app..."
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        className={inputCls}
                      />
                    </Field>

                    {/* ── Método de contacto ── */}
                    <div>
                      <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-600 mb-3">
                        Tipo de asistencia <span className="text-amber-500">*</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {METHODS.map((m) => {
                          const Icon = m.icon;
                          const on = metodo === m.id;
                          return (
                            <motion.button
                              key={m.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setMetodo(m.id)}
                              className={`relative flex items-center gap-3.5 px-4 py-4 rounded-xl border text-left transition-all duration-200
                                ${on ? `${m.accent} ring-1 ${m.ring}` : "border-zinc-800 bg-[#202020] hover:border-zinc-700"}`}
                            >
                              {on && (
                                <motion.div
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center"
                                >
                                  <CheckCircle2 size={9} className="text-black" />
                                </motion.div>
                              )}
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${on ? m.accent : "bg-zinc-800"}`}>
                                <Icon size={16} className={on ? m.color : "text-zinc-500"} />
                              </div>
                              <div>
                                <p className={`text-[12px] font-black ${on ? "text-white" : "text-zinc-300"}`}>{m.label}</p>
                                <p className="text-[10px] text-zinc-600 mt-0.5">{m.sub}</p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Descripción ── */}
                    <Field icon={AlignLeft} label="Descripción adicional">
                      <textarea
                        rows={3}
                        placeholder="Contanos más detalles sobre tu consulta o problema técnico..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className={`${inputCls} resize-none leading-relaxed`}
                      />
                    </Field>

                    {/* ── Submit ── */}
                    <div className="pt-1">
                      <motion.button
                        whileTap={{ scale: canSubmit ? 0.99 : 1 }}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300
                          ${canSubmit
                            ? metodo === "whatsapp"
                              ? "bg-[#25D366] hover:bg-[#1fba58] text-white shadow-lg shadow-green-500/20"
                              : "bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                          }`}
                      >
                        {metodo === "videollamada" ? (
                          <><Video size={14} /> Solicitar Videollamada <ArrowRight size={12} /></>
                        ) : (
                          <><MessageCircle size={14} /> Enviar por WhatsApp <ArrowRight size={12} /></>
                        )}
                      </motion.button>

                      {metodo === "whatsapp" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center text-[9px] text-zinc-700 mt-2.5"
                        >
                          Se abrirá WhatsApp con el resumen de tu solicitud.
                        </motion.p>
                      )}
                      {metodo === "videollamada" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center text-[9px] text-zinc-700 mt-2.5"
                        >
                          El equipo te contactará para coordinar la sesión.
                        </motion.p>
                      )}
                      {!canSubmit && (
                        <p className="text-center text-[9px] text-zinc-700 mt-2.5">
                          Completá los campos obligatorios para continuar.
                        </p>
                      )}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-[10px] text-zinc-700 mt-5"
          >
            Soporte profesional personalizado · Atención técnica premium · Sin costo adicional para nuestros clientes
          </motion.p>

        </div>
      </section>

      <InstagramBanner />

    </motion.div>
  );
}
