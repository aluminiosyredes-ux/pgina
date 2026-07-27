import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Phone, MessageCircle, ChevronRight, Clock } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+56 9 5973 7903",
    desc: "Respondemos en minutos",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20 hover:border-green-400/40",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+56 9 5973 7903",
    desc: "Lunes a sábado 9–18 hs",
    href: "tel:+56959737903",
    external: false,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-400/40",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    desc: "Seguinos para ver nuestros trabajos",
    href: INSTAGRAM_URL,
    external: true,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20 hover:border-pink-400/40",
  },
  {
    icon: MapPin,
    label: "Cobertura",
    value: "Regiones de Arica · Iquique · Antofagasta",
    desc: "Instalaciones locales · Ventas y envíos a todo Chile",
    href: "#",
    external: false,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20 hover:border-purple-400/40",
  },
];

export default function Contacto() {
  useSEO(SEO.contacto);
  return (
    <motion.div {...pageTransition}>
      {/* Header */}
      <section className="py-14 bg-[#151515] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber-500/4 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-3"
          >
            Contacto
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3"
          >
            Estamos para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              ayudarte.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-base max-w-md mx-auto"
          >
            Elegí el canal que prefieras. Respondemos rápido y sin vueltas.
          </motion.p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="pb-8 bg-[#151515]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              const Wrapper = c.href !== "#" ? "a" : "div";
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Wrapper
                    {...(c.href !== "#" ? { href: c.href, target: c.external ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    className={`group flex items-start gap-4 rounded-xl border bg-[#222222] p-5 transition-all duration-300 hover:bg-[#111] hover:scale-[1.01] ${c.border} ${c.href !== "#" ? "cursor-pointer" : ""}`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={c.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-0.5">{c.label}</p>
                      <p className="text-sm font-semibold text-white mb-0.5 break-all">{c.value}</p>
                      <p className="text-xs text-zinc-400">{c.desc}</p>
                    </div>
                    {c.href !== "#" && (
                      <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all mt-0.5 flex-shrink-0" />
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-7 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-white/5 bg-[#222222] p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-0.5">Horario de atención</h3>
                <p className="text-zinc-400 text-sm">También podés escribirnos por WhatsApp fuera del horario comercial.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { day: "Lunes – Viernes", time: "9:00 – 18:00 hs" },
                { day: "Sábados", time: "9:00 – 13:00 hs" },
                { day: "Domingos", time: "Cerrado" },
                { day: "WhatsApp", time: "Siempre activo" },
              ].map(({ day, time }) => (
                <div key={day} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-sm text-zinc-400">{day}</span>
                  <span className={`text-sm font-semibold ${time === "Siempre activo" ? "text-green-400" : time === "Cerrado" ? "text-zinc-600" : "text-white"}`}>{time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-7 bg-[#151515]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-black text-white mb-2">¿Preferís pedir un presupuesto?</h3>
            <p className="text-zinc-400 text-sm mb-6">Usá nuestro cotizador interactivo de redes y recibís el precio directo por WhatsApp.</p>
            <Link
              href="/redes"
              className="inline-flex items-center gap-2 px-7 py-3 bg-amber-500 text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Ir al cotizador <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
