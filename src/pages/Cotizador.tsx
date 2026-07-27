import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Layers, Box, Cpu, Check, ChevronRight, Send } from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_NAME } from "../config";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const STEPS = ["Servicio", "Detalles", "Contacto"];

const services = [
  { id: "redes", label: "Redes de Seguridad", icon: Shield, desc: "Balcones, escaleras, industrial" },
  { id: "roller", label: "Roller", icon: Layers, desc: "Screen, blackout, motorizado" },
  { id: "aluminios", label: "Aluminios", icon: Box, desc: "Ventanas, puertas, cerramientos" },
  { id: "domotica", label: "Domótica", icon: Cpu, desc: "Hogar inteligente, automatización" },
];

const detailsMap: Record<string, { label: string; options: string[] }[]> = {
  redes: [
    { label: "Tipo de espacio", options: ["Balcón", "Escalera", "Industrial", "Otro"] },
    { label: "Medida aproximada", options: ["Hasta 5m²", "5–20m²", "Más de 20m²", "No lo sé aún"] },
  ],
  roller: [
    { label: "Tipo de tela", options: ["Screen solar", "Blackout", "Traslúcida", "No lo sé aún"] },
    { label: "Cantidad de paños", options: ["1–2", "3–5", "6–10", "Más de 10"] },
  ],
  aluminios: [
    { label: "Tipo de trabajo", options: ["Ventana DVH", "Puerta corrediza", "Cerramiento", "Frente de local"] },
    { label: "Medida aproximada", options: ["Pequeño (–2m²)", "Mediano (2–6m²)", "Grande (+6m²)", "Presupuesto integral"] },
  ],
  domotica: [
    { label: "Área a automatizar", options: ["Iluminación", "Persianas/cortinas", "Seguridad y accesos", "Sistema completo"] },
    { label: "Tipo de propiedad", options: ["Departamento", "Casa", "Oficina", "Local comercial"] },
  ],
};

type FormData = {
  service: string;
  details: Record<string, string>;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function Cotizador() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormData>({ service: "", details: {}, name: "", phone: "", email: "", message: "" });

  const canNext0 = !!form.service;
  const currentDetails = form.service ? detailsMap[form.service] : [];
  const canNext1 = currentDetails.every((d) => !!form.details[d.label]);

  const handleSelect = (service: string) => setForm((f) => ({ ...f, service, details: {} }));
  const handleDetail = (label: string, val: string) => setForm((f) => ({ ...f, details: { ...f.details, [label]: val } }));
  const handleContact = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val } as FormData));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel = services.find((s) => s.id === form.service)?.label ?? form.service;
    const detailLines = Object.entries(form.details).map(([k, v]) => `  • ${k}: ${v}`).join("\n");
    const msg = [
      `Hola ${COMPANY_NAME}! 👋 Me comunico desde la web para solicitar un presupuesto.`,
      ``,
      `📋 *Servicio:* ${serviceLabel}`,
      detailLines ? `\n*Detalles:*\n${detailLines}` : "",
      ``,
      `👤 *Nombre:* ${form.name}`,
      form.phone ? `📞 *Teléfono:* ${form.phone}` : "",
      form.email ? `📧 *Email:* ${form.email}` : "",
      form.message ? `\n💬 *Mensaje:* ${form.message}` : "",
      ``,
      `Quedo a la espera. ¡Gracias!`,
    ].filter(Boolean).join("\n").trim();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <motion.div {...pageTransition} className="pt-16">
      {/* Header */}
      <section className="py-24 bg-[#151515] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-4"
          >
            Cotizador
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Recibí tu presupuesto
            <br />
            <span className="text-zinc-500">sin costo ni compromiso.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400"
          >
            Completá el formulario en 3 simples pasos y te respondemos en menos de 24 hs.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-32 bg-[#151515]">
        <div ref={ref} className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/5 bg-[#222222] overflow-hidden"
          >
            {/* Progress */}
            {!sent && (
              <div className="border-b border-white/5 px-8 py-5">
                <div className="flex items-center gap-0">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center flex-1 last:flex-none">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? "bg-amber-500 text-black" : i === step ? "bg-amber-500/20 border border-amber-500 text-amber-400" : "bg-zinc-800 text-zinc-600"}`}>
                          {i < step ? <Check size={12} /> : i + 1}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-white" : i < step ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                      </div>
                      {i < STEPS.length - 1 && <div className={`flex-1 mx-3 h-px transition-all ${i < step ? "bg-amber-500/50" : "bg-white/5"}`} />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={28} className="text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Consulta enviada!</h3>
                    <p className="text-zinc-400">Se abrió WhatsApp con tu mensaje. Nos comunicaremos pronto.</p>
                  </motion.div>
                ) : step === 0 ? (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                    <p className="text-sm text-zinc-400 mb-6">¿Qué servicio necesitás?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((s) => {
                        const Icon = s.icon;
                        return (
                          <button key={s.id} onClick={() => handleSelect(s.id)}
                            className={`group flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${form.service === s.id ? "border-amber-500 bg-amber-500/10" : "border-white/5 hover:border-white/15 hover:bg-white/5"}`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${form.service === s.id ? "bg-amber-500/20" : "bg-white/5"}`}>
                              <Icon size={18} className={form.service === s.id ? "text-amber-400" : "text-zinc-400"} />
                            </div>
                            <div>
                              <div className={`text-sm font-semibold ${form.service === s.id ? "text-white" : "text-zinc-300"}`}>{s.label}</div>
                              <div className="text-xs text-zinc-500">{s.desc}</div>
                            </div>
                            {form.service === s.id && <Check size={14} className="text-amber-400 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button disabled={!canNext0} onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black text-xs font-bold tracking-widest uppercase rounded hover:bg-amber-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        Continuar <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                    <p className="text-sm text-zinc-400 mb-6">Contanos un poco más sobre tu proyecto.</p>
                    <div className="space-y-6">
                      {currentDetails.map((detail) => (
                        <div key={detail.label}>
                          <p className="text-xs font-semibold text-zinc-300 mb-3 tracking-wide">{detail.label}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {detail.options.map((opt) => (
                              <button key={opt} onClick={() => handleDetail(detail.label, opt)}
                                className={`px-4 py-2.5 rounded-lg border text-xs font-medium text-left transition-all duration-200 ${form.details[detail.label] === opt ? "border-amber-500 bg-amber-500/10 text-white" : "border-white/5 text-zinc-400 hover:border-white/15 hover:text-white"}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button onClick={() => setStep(0)} className="text-xs text-zinc-500 hover:text-white transition-colors">← Volver</button>
                      <button disabled={!canNext1} onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black text-xs font-bold tracking-widest uppercase rounded hover:bg-amber-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        Continuar <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                    <p className="text-sm text-zinc-400 mb-6">¿Cómo nos contactamos con vos?</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-zinc-400 mb-1.5 block">Nombre *</label>
                          <input required value={form.name} onChange={(e) => handleContact("name", e.target.value)} placeholder="Tu nombre" className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 mb-1.5 block">Teléfono *</label>
                          <input required value={form.phone} onChange={(e) => handleContact("phone", e.target.value)} placeholder="+54 11 ..." className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 mb-1.5 block">Email</label>
                        <input type="email" value={form.email} onChange={(e) => handleContact("email", e.target.value)} placeholder="tu@email.com" className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 mb-1.5 block">Mensaje adicional</label>
                        <textarea rows={3} value={form.message} onChange={(e) => handleContact("message", e.target.value)} placeholder="Cualquier detalle extra..." className="w-full bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors resize-none" />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <button type="button" onClick={() => setStep(1)} className="text-xs text-zinc-500 hover:text-white transition-colors">← Volver</button>
                        <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-amber-500 text-black text-xs font-bold tracking-widest uppercase rounded hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                          Enviar por WhatsApp <Send size={13} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
