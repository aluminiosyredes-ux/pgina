import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Wallet, Banknote, Building2,
  Shield, Lock, CheckCircle2, ChevronRight,
  User, Phone, Mail, MapPin, Hash, DollarSign, MessageSquare, Home, ExternalLink
} from "lucide-react";
import AsistenciaStrip from "../components/AsistenciaStrip";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const paymentMethods = [
  { icon: CreditCard, title: "Crédito",    desc: "Visa, Mastercard, Amex", badge: "Más usado", color: "text-blue-400",    iconBg: "bg-blue-500/10 border-blue-500/20",    cardBorder: "border-blue-500/15 hover:border-blue-500/30" },
  { icon: Wallet,     title: "Débito",     desc: "Todos los bancos",       badge: null,         color: "text-emerald-400", iconBg: "bg-emerald-500/10 border-emerald-500/20", cardBorder: "border-emerald-500/15 hover:border-emerald-500/30" },
  { icon: Banknote,   title: "Prepago",    desc: "Visa & Mastercard",      badge: null,         color: "text-amber-400",   iconBg: "bg-amber-500/10 border-amber-500/20",   cardBorder: "border-amber-500/15 hover:border-amber-500/30" },
  { icon: Building2,  title: "Transferencia", desc: "Cuenta empresarial",  badge: null,         color: "text-zinc-300",    iconBg: "bg-zinc-500/10 border-zinc-500/20",     cardBorder: "border-zinc-500/15 hover:border-zinc-400/30" },
];

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
  direccion: string;
  cotizacion: string;
  monto: string;
  comentarios: string;
}

interface FormErrors {
  nombre?: string;
  telefono?: string;
  email?: string;
  ciudad?: string;
  direccion?: string;
  cotizacion?: string;
  monto?: string;
  comentarios?: string;
}

const EMPTY: FormData = { nombre: "", telefono: "", email: "", ciudad: "", direccion: "", cotizacion: "", monto: "", comentarios: "" };

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.nombre.trim()) e.nombre = "El nombre es obligatorio.";
  if (!data.telefono.trim()) e.telefono = "El teléfono es obligatorio.";
  else if (!/^[0-9+\s\-()]{7,15}$/.test(data.telefono.trim())) e.telefono = "Ingresa un teléfono válido.";
  if (!data.email.trim()) e.email = "El correo es obligatorio.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Ingresa un correo válido.";
  if (!data.ciudad.trim()) e.ciudad = "La ciudad es obligatoria.";
  if (!data.direccion.trim()) e.direccion = "La dirección es obligatoria.";
  if (!data.cotizacion.trim()) e.cotizacion = "El N° de cotización es obligatorio.";
  if (!data.monto.trim()) e.monto = "El monto es obligatorio.";
  else if (!/^\d+([.,]\d{1,2})?$/.test(data.monto.trim())) e.monto = "Ingresa un monto válido (ej: 85000).";
  if (!data.comentarios.trim()) e.comentarios = "Describe brevemente tu compra.";
  else if (data.comentarios.length > 150) e.comentarios = "Máximo 150 caracteres.";
  return e;
}

const inputBase =
  "w-full bg-[#222222] border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-amber-500/60 focus:bg-[#111] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]";
const inputNormal = "border-zinc-800 hover:border-zinc-700";
const inputError  = "border-red-500/40 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.07)]";

function Field({
  label, icon: Icon, error, touched, children,
}: {
  label: string; icon: React.ElementType; error?: string; touched?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 tracking-widest uppercase">
        <Icon size={11} className="text-zinc-600" />
        {label}
      </label>
      {children}
      <AnimatePresence>
        {touched && error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-xs text-red-400/80 mt-0.5 pl-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pagos() {
  useSEO(SEO.pagos);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const set = useCallback((k: keyof FormData, v: string) => {
    setForm((prev) => ({ ...prev, [k]: k === "comentarios" ? v.slice(0, 150) : v }));
  }, []);

  const touch = useCallback((k: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [k]: true }));
  }, []);

  const MERCADOPAGO_URL = "http://link.mercadopago.cl/aluminiosyredes";

  const handleSubmit = () => {
    if (!isValid) {
      const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true])) as Record<keyof FormData, boolean>;
      setTouched(allTouched);
      return;
    }
    window.open(MERCADOPAGO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div {...pageTransition}>

      {/* HERO */}
      <section className="relative flex items-center bg-[#070707]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-800/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-24 md:py-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-5 h-px bg-amber-500/60" />
              <span className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">Pagos Online</span>
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1] mb-6">
              Transacciones<br />
              <span className="text-zinc-400 font-light">seguras y certificadas.</span>
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              Completa tus datos y paga tus proyectos de forma rápida, segura y profesional.
            </p>
            <div className="flex items-center gap-6 mt-10">
              {[
                { icon: CheckCircle2, label: "SSL Encriptado" },
                { icon: Shield,       label: "Datos protegidos" },
                { icon: Lock,         label: "Pago seguro" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={12} className="text-zinc-600" />
                  <span className="text-xs text-zinc-600">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="py-14 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">Métodos disponibles</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Elige tu forma <span className="text-zinc-500">de pago.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {paymentMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border bg-[#1c1c1c] transition-all duration-300 ${m.cardBorder}`}
                >
                  {m.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 whitespace-nowrap">
                      {m.badge}
                    </span>
                  )}
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${m.iconBg}`}>
                    <Icon size={20} className={m.color} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-white">{m.title}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 bg-[#151515]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">Paso 1 de 2</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Completa tus datos<br /><span className="text-zinc-500">para continuar.</span>
            </h2>
            <p className="text-sm text-zinc-600 max-w-sm mx-auto">
              Todos los campos son obligatorios. El botón se habilitará al completar el formulario correctamente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-zinc-800/60 bg-[#1e1e1e] p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Nombre */}
              <div className="sm:col-span-2">
                <Field label="Nombre completo" icon={User} error={errors.nombre} touched={touched.nombre}>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez García"
                    value={form.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    onBlur={() => touch("nombre")}
                    className={`${inputBase} ${touched.nombre && errors.nombre ? inputError : inputNormal}`}
                  />
                </Field>
              </div>

              {/* Teléfono */}
              <Field label="Teléfono" icon={Phone} error={errors.telefono} touched={touched.telefono}>
                <input
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)}
                  onBlur={() => touch("telefono")}
                  className={`${inputBase} ${touched.telefono && errors.telefono ? inputError : inputNormal}`}
                />
              </Field>

              {/* Email */}
              <Field label="Correo electrónico" icon={Mail} error={errors.email} touched={touched.email}>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("email")}
                  className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                />
              </Field>

              {/* Ciudad */}
              <Field label="Ciudad" icon={MapPin} error={errors.ciudad} touched={touched.ciudad}>
                <input
                  type="text"
                  placeholder="Ej: Antofagasta"
                  value={form.ciudad}
                  onChange={(e) => set("ciudad", e.target.value)}
                  onBlur={() => touch("ciudad")}
                  className={`${inputBase} ${touched.ciudad && errors.ciudad ? inputError : inputNormal}`}
                />
              </Field>

              {/* Dirección */}
              <Field label="Dirección" icon={Home} error={errors.direccion} touched={touched.direccion}>
                <input
                  type="text"
                  placeholder="Calle, número, depto."
                  value={form.direccion}
                  onChange={(e) => set("direccion", e.target.value)}
                  onBlur={() => touch("direccion")}
                  className={`${inputBase} ${touched.direccion && errors.direccion ? inputError : inputNormal}`}
                />
              </Field>

              {/* N° Cotización */}
              <Field label="N° de cotización" icon={Hash} error={errors.cotizacion} touched={touched.cotizacion}>
                <input
                  type="text"
                  placeholder="Ej: COT-2024-001"
                  value={form.cotizacion}
                  onChange={(e) => set("cotizacion", e.target.value)}
                  onBlur={() => touch("cotizacion")}
                  className={`${inputBase} ${touched.cotizacion && errors.cotizacion ? inputError : inputNormal}`}
                />
              </Field>

              {/* Monto */}
              <Field label="Monto a pagar (CLP)" icon={DollarSign} error={errors.monto} touched={touched.monto}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 85000"
                  value={form.monto}
                  onChange={(e) => set("monto", e.target.value)}
                  onBlur={() => touch("monto")}
                  className={`${inputBase} ${touched.monto && errors.monto ? inputError : inputNormal}`}
                />
              </Field>

              {/* Comentarios */}
              <div className="sm:col-span-2">
                <Field label="Comentarios adicionales" icon={MessageSquare} error={errors.comentarios} touched={touched.comentarios}>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Describe brevemente en qué consiste tu compra..."
                      value={form.comentarios}
                      onChange={(e) => set("comentarios", e.target.value)}
                      onBlur={() => touch("comentarios")}
                      className={`${inputBase} resize-none pr-16 ${touched.comentarios && errors.comentarios ? inputError : inputNormal}`}
                    />
                    <span className={`absolute bottom-3 right-3.5 text-[10px] font-semibold tabular-nums ${form.comentarios.length >= 140 ? "text-amber-500" : "text-zinc-700"}`}>
                      {form.comentarios.length}/150
                    </span>
                  </div>
                </Field>
              </div>

            </div>

            {/* Progress hint */}
            <div className="mt-6 mb-6">
              <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
                <span>Progreso del formulario</span>
                <span className="font-semibold text-zinc-500">
                  {Object.values(form).filter((v) => v.trim().length > 0).length} / {Object.keys(form).length} campos
                </span>
              </div>
              <div className="h-px bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500 rounded-full"
                  animate={{ width: `${(Object.values(form).filter((v) => v.trim().length > 0).length / Object.keys(form).length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`group w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 ${
                isValid
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-2xl shadow-amber-500/20 hover:shadow-amber-400/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              }`}
            >
              <CreditCard size={17} />
              Continuar al Pago
              {isValid && (
                <>
                  <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>

            {isValid ? (
              <div className="flex flex-col items-center gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <Shield size={11} className="text-zinc-600" />
                  <p className="text-xs text-zinc-600">
                    Serás redirigido a <span className="text-zinc-400 font-semibold">Mercado Pago</span> para completar tu pago de forma segura.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-xs text-zinc-700 mt-3">
                Completa todos los campos para habilitar el pago.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <AsistenciaStrip />

      {/* SECURITY BLOCK */}
      <section className="py-14 bg-[#0f0f0f]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-zinc-800/50 bg-[#222222] px-8 py-10 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-zinc-300" />
            </div>
            <h3 className="text-xl font-black text-white mb-3 tracking-tight">Pagos procesados de forma segura</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Tus pagos son procesados mediante plataformas seguras y certificadas. Toda la información es encriptada y protegida durante la transacción.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: CheckCircle2, label: "Encriptación SSL" },
                { icon: Shield,       label: "Datos protegidos" },
                { icon: Lock,         label: "Transacciones seguras" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-zinc-600" />
                  <span className="text-xs text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
