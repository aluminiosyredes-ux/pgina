import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  MessageCircle, ArrowLeft, ArrowRight, Moon, Check,
  ShieldCheck, Thermometer, Eye, ChevronRight, Zap,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import { rollerCategories } from "../data/rollerCategories";
import AsistenciaStrip from "../components/AsistenciaStrip";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const WA_BASE = "Hola, quisiera cotizar cortinas roller blackout";

// ─── GALLERY IMAGES ──────────────────────────────────────────────────────────

const gallery = [
  {
    src: "/images/Rollerblack1.jpg",
    alt: "Proyecto Roller Blackout — instalación residencial premium",
    caption: "Proyecto propio",
  },
  {
    src: "/images/Rollerblack2.jpg",
    alt: "Roller Blackout instalado — oscurecimiento total",
    caption: "Oscurecimiento total",
  },
  {
    src: "/images/Rollerblack3.jpg",
    alt: "Cortina Roller Blackout — fabricación a medida",
    caption: "Fabricación a medida",
  },
  {
    src: "/images/Rollerblack4.jpg",
    alt: "Instalación Roller Blackout — detalle de sistema",
    caption: "Instalación profesional",
  },
];

// ─── BENEFITS ────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Moon,
    title: "100% de oscurecimiento",
    desc: "Tela de alta densidad que bloquea completamente la luz solar. Sin filtraciones laterales, sin halo de luz. Sueño profundo garantizado.",
    detail: "Ideal para dormitorios, salas multimedia y espacios de descanso.",
    color: "text-zinc-200",
    glow: "bg-zinc-500/[0.05]",
    border: "border-zinc-500/15",
  },
  {
    icon: Thermometer,
    title: "Aislación térmica y sonora",
    desc: "La tela blackout actúa como barrera térmica reduciendo la transferencia de calor y atenuando el ruido exterior significativamente.",
    detail: "Temperatura interior más estable, menor consumo energético.",
    color: "text-sky-400",
    glow: "bg-sky-500/[0.05]",
    border: "border-sky-500/15",
  },
  {
    icon: Eye,
    title: "Privacidad total",
    desc: "Visibilidad cero desde el exterior durante el día y la noche. Seguridad visual absoluta para cualquier espacio.",
    detail: "Fabricada a medida para cada ventana, sin espacio de luz lateral.",
    color: "text-amber-400",
    glow: "bg-amber-500/[0.05]",
    border: "border-amber-500/15",
  },
];

// ─── FABRIC VARIANTS ─────────────────────────────────────────────────────────

const variants = [
  {
    name: "Blanco Marfil",
    tag: "Más vendido",
    desc: "Acabado satinado suave. Ideal para espacios que necesitan oscurecimiento sin perder luminosidad cuando está abierta. Estética clásica y versátil.",
    tone: "bg-[#f5f0e8]",
    toneName: "Marfil / Crema",
    features: ["Satinado premium", "Refleja calor", "Apto cocinas y dormitorios"],
    waMsg: `${WA_BASE} — color blanco marfil.`,
    featured: true,
  },
  {
    name: "Negro Carbón",
    tag: "Arquitectónico",
    desc: "Tono negro carbón mate de estética contemporánea. Máximo oscurecimiento y diseño editorial. Para home theater y dormitorios minimalistas de autor.",
    tone: "bg-[#1a1a1a]",
    toneName: "Negro / Carbón mate",
    features: ["Mate sin brillo", "Máximo oscurecimiento", "Estética editorial"],
    waMsg: `${WA_BASE} — color negro carbón.`,
    featured: false,
  },
  {
    name: "Gris Perla",
    tag: "Versátil",
    desc: "El equilibrio perfecto entre estética nórdica y funcionalidad total. Tono neutro que integra cualquier paleta de interiores modernos.",
    tone: "bg-[#c8c8c8]",
    toneName: "Gris perla / Neutro",
    features: ["Tono neutro universal", "Combina con todo", "Acabado liso premium"],
    waMsg: `${WA_BASE} — color gris perla.`,
    featured: false,
  },
];

// ─── STATS STRIP DATA ────────────────────────────────────────────────────────

const stats = [
  { value: "100%", label: "Oscurecimiento" },
  { value: "A medida", label: "Fabricación" },
  { value: "3 tonos", label: "Disponibles" },
  { value: "Motorizable", label: "WiFi opcional" },
];

// ─── OTHER ROLLER LINES ──────────────────────────────────────────────────────

const otherLines = rollerCategories.filter((c) => c.slug !== "blackout");

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function RollerBlackoutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
    >

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-end pb-16 overflow-hidden bg-[#1c1c1c]">
        <div className="absolute inset-0">
          <img
            src="/images/cortina.png"
            alt="Roller Blackout"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.28) saturate(0.60)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/95 via-[#030303]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-zinc-400/[0.04] rounded-full blur-[200px] pointer-events-none" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-32">

          {/* Back nav */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-12"
          >
            <Link
              href="/roller"
              className="group inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-300 text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Cortinas Roller
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-xl bg-zinc-700/30 border border-zinc-500/20 flex items-center justify-center">
                <Moon size={15} className="text-zinc-300" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-zinc-600" />
                <span className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-500">Oscurecimiento total · 100%</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl xl:text-[108px] font-black text-white tracking-tighter leading-[0.88] mb-6">
              Roller<br />
              <span className="text-zinc-600">Black</span><span className="text-white">out.</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">
              Tela de alta densidad que bloquea el 100% de la luz solar.
              <span className="block mt-1.5 text-zinc-600 text-sm">Fabricada a medida. Instalación profesional en las regiones de Arica, Iquique y Antofagasta.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href={wa(WA_BASE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-xl shadow-green-500/20 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                Cotizar ahora
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/roller"
                className="flex items-center gap-2.5 px-7 py-4 border border-white/8 text-zinc-400 font-bold text-[11px] tracking-[0.18em] uppercase rounded-xl hover:border-white/16 hover:text-white transition-all"
              >
                <ArrowLeft size={13} /> Ver otras líneas
              </Link>
            </div>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-black text-white tracking-tight leading-none">{s.value}</span>
                  <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-600 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-zinc-700" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-600">Galería de ambientes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.92]">
              Espacios que<br />
              <span className="text-zinc-600">inspiran.</span>
            </h2>
          </motion.div>

          {/* 4-image premium grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">

            {/* Image 1 — tall hero left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 col-span-1 md:col-span-7 md:row-span-2"
              style={{ minHeight: "520px" }}
            >
              <img
                src={gallery[0].src}
                alt={gallery[0].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-[0.22em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {gallery[0].caption}
                </span>
              </div>
            </motion.div>

            {/* Image 2 — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 col-span-1 md:col-span-5"
              style={{ minHeight: "250px" }}
            >
              <img
                src={gallery[1].src}
                alt={gallery[1].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] font-black tracking-[0.22em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {gallery[1].caption}
                </span>
              </div>
            </motion.div>

            {/* Image 3 — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 col-span-1 md:col-span-5"
              style={{ minHeight: "250px" }}
            >
              <img
                src={gallery[2].src}
                alt={gallery[2].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] font-black tracking-[0.22em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {gallery[2].caption}
                </span>
              </div>
            </motion.div>

            {/* Image 4 — full width banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 col-span-2 md:col-span-12"
              style={{ minHeight: "300px" }}
            >
              <img
                src={gallery[3].src}
                alt={gallery[3].alt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-[9px] font-black tracking-[0.22em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {gallery[3].caption}
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-[#111111] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-amber-500/40" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-amber-600">Por qué blackout</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.92]">
              Más que una cortina.<br />
              <span className="text-zinc-600">Una experiencia.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`relative rounded-2xl border ${b.border} ${b.glow} bg-[#1a1a1a] p-7 overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-xl ${b.glow} border ${b.border} flex items-center justify-center mb-5`}>
                      <Icon size={20} className={b.color} />
                    </div>
                    <h3 className="text-lg font-black text-white tracking-tight mb-3 leading-tight">{b.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{b.desc}</p>
                    <p className="text-[11px] text-zinc-700 leading-relaxed border-t border-white/[0.04] pt-4">{b.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── CTA FULL ── */}
      <section className="relative py-24 bg-[#111111] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-amber-600">Presupuesto sin costo</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              ¿Listo para transformar<br />
              <span className="text-zinc-600">tu espacio?</span>
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
              Diseñamos la solución blackout ideal para cada ventana. Medición, fabricación e instalación en las regiones de Arica, Iquique y Antofagasta.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={wa(WA_BASE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-9 py-4.5 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-2xl shadow-green-500/15 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                Consultar por WhatsApp
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <div className="flex items-center gap-2 px-5 py-4 border border-white/6 rounded-xl">
                <ShieldCheck size={13} className="text-zinc-600" />
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-600">Garantía incluida</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER ROLLER LINES ── */}
      <section className="py-14 bg-[#151515] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-7"
          >
            <p className="text-[9px] font-bold tracking-[0.24em] uppercase text-zinc-700 mb-1">Seguir explorando</p>
            <h3 className="text-xl font-black text-white tracking-tight">Otras líneas de cortinas roller.</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {otherLines.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href={`/roller/${c.slug}`}
                    className={`group flex flex-col items-center gap-2.5 p-4 rounded-2xl border ${c.border} ${c.hoverBorder} bg-[#1c1c1c] text-center transition-all duration-300 hover:bg-[#111]`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${c.iconBg} border ${c.border} flex items-center justify-center`}>
                      <Icon size={15} className={c.color} />
                    </div>
                    <span className="text-[11px] font-black text-white leading-tight tracking-tight">{c.title}</span>
                    <ChevronRight size={10} className={`${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AsistenciaStrip />

    </motion.div>
  );
}
