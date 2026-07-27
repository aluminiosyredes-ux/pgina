import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  MessageCircle, ArrowLeft, ArrowRight, Check,
  ShieldCheck, Thermometer, Zap, Sun, Wind,
  ChevronRight, Volume2,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import { aluminiosCategories } from "../data/aluminiosCategories";
import AsistenciaStrip from "../components/AsistenciaStrip";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const otherLines = aluminiosCategories.filter((c) => c.slug !== "ventanales");

// ─── L-25 DATA ────────────────────────────────────────────────────────────────

const l25Images = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90&fit=crop",
    alt: "Ventanal L-25 en living moderno",
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=85&fit=crop",
    alt: "Fachada con ventanales L-25",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85&fit=crop",
    alt: "Interior luminoso con L-25",
  },
];

const l25Benefits = [
  {
    icon: Sun,
    title: "Máxima luminosidad",
    desc: "Perfil slim de alta precisión que minimiza el marco y maximiza el área de vidrio. La luz natural entra sin barreras.",
    color: "text-zinc-300",
  },
  {
    icon: ShieldCheck,
    title: "Calidad / precio óptima",
    desc: "Sistema de probada confiabilidad con acabado de alto estándar. La opción más elegida para proyectos residenciales exigentes.",
    color: "text-zinc-300",
  },
  {
    icon: Wind,
    title: "Sellado antipolvo total",
    desc: "Burletes perimetrales de alta densidad diseñados para el clima árido del norte. Ideal para las regiones de Arica, Iquique y Antofagasta.",
    color: "text-zinc-300",
  },
];

const l25Features = [
  "Perfil aluminio slim serie L-25",
  "Vidrio simple o DVH compatible",
  "Sellado perimetral reforzado",
  "Disponible en fijo, proyectante y abatible",
  "Colores: natural, blanco y negro lacado",
  "Fabricación 100% a medida",
];

// ─── TERMOPANEL DATA ──────────────────────────────────────────────────────────

const termopanelImages = [
  {
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=90&fit=crop",
    alt: "Ventanal Termopanel en arquitectura contemporánea",
  },
  {
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&fit=crop",
    alt: "Edificio premium con vidrio doble",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85&fit=crop",
    alt: "Interior premium con Termopanel",
  },
];

const termopanelBenefits = [
  {
    icon: Thermometer,
    title: "Aislación térmica superior",
    desc: "Doble vidriado hermético con cámara de aire que reduce la transferencia de calor hasta un 60%. Menos frío en invierno, menos calor en verano.",
    color: "text-amber-400",
  },
  {
    icon: Volume2,
    title: "Aislación acústica real",
    desc: "La cámara de aire entre los vidrios absorbe las frecuencias sonoras del exterior. Silencio interior garantizado en zonas urbanas.",
    color: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Eficiencia energética",
    desc: "Menor dependencia de calefacción y aire acondicionado. Un ventanal Termopanel reduce el consumo energético del espacio significativamente.",
    color: "text-amber-400",
  },
];

const termopanelFeatures = [
  "DVH 4/9/4 estándar o 4/12/4 alto rendimiento",
  "Cámara de aire seco sellada herméticamente",
  "Reducción de condensación interior",
  "Compatible con coating low-e (bajo emisivo)",
  "Certificado para proyectos premium",
  "Fabricación a medida, cualquier dimensión",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function VentanalesPage() {
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
            src="/images/aluminio.png"
            alt="Ventanales de Aluminio"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.28) saturate(0.55)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/95 via-[#030303]/40 to-transparent" />
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
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-12"
          >
            <Link
              href="/aluminios"
              className="group inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-300 text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Carpintería en Aluminio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-3 h-px bg-zinc-700" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-500">
                Línea L-25 · Termopanel
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl xl:text-[100px] font-black text-white tracking-tighter leading-[0.88] mb-6">
              Ventanales de<br />
              <span className="text-zinc-500">Aluminio</span>
              <span className="text-white">.</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-3">
              Dos sistemas de precisión para cada proyecto: la versatilidad de la Línea L-25 y el confort superior del Termopanel.
            </p>
            <p className="text-zinc-600 text-sm mb-10">
              Fabricación 100% a medida. Instalación profesional en las regiones de Arica, Iquique y Antofagasta.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={wa("Hola, quisiera cotizar ventanales de aluminio.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-xl shadow-green-500/20 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                Cotizar ahora
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/aluminios"
                className="flex items-center gap-2.5 px-7 py-4 border border-white/8 text-zinc-400 font-bold text-[11px] tracking-[0.18em] uppercase rounded-xl hover:border-white/16 hover:text-white transition-all"
              >
                <ArrowLeft size={13} /> Ver todas las líneas
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* ── SISTEMA INDICATOR ── */}
      <section className="py-10 bg-[#1c1c1c] border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: "01", name: "Línea L-25", sub: "Diseño moderno · Alta relación calidad/precio", anchor: "#l25" },
              { label: "02", name: "Termopanel DVH", sub: "Aislación térmica · Eficiencia energética", anchor: "#termopanel", accent: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.anchor}
                className={`group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300
                  ${item.accent
                    ? "border-amber-500/18 bg-amber-500/[0.04] hover:border-amber-400/30 hover:bg-amber-500/[0.07]"
                    : "border-zinc-700/25 bg-zinc-800/[0.05] hover:border-zinc-500/35 hover:bg-zinc-700/[0.08]"
                  }`}
              >
                <span className={`text-3xl font-black tracking-tighter ${item.accent ? "text-amber-600/50" : "text-zinc-700"}`}>
                  {item.label}
                </span>
                <div className="flex-1">
                  <p className={`text-base font-black tracking-tight ${item.accent ? "text-amber-300" : "text-white"}`}>{item.name}</p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${item.accent ? "text-amber-400" : "text-zinc-400"}`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── LÍNEA L-25 ── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}

      <section id="l25" className="bg-[#0f0f0f] pt-24 pb-0 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-5xl font-black text-zinc-800 tracking-tighter leading-none">01</span>
              <div>
                <p className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-600 mb-1">Sistema residencial</p>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                  Línea L-25<span className="text-zinc-600">.</span>
                </h2>
              </div>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-0">
              Ventanales de aluminio de diseño contemporáneo con una estructura elegante y funcional que equilibra calidad, estética y precio. La solución más solicitada para proyectos residenciales modernos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* L-25 — Big image */}
      <section className="bg-[#0f0f0f] pt-10 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="group relative overflow-hidden rounded-3xl bg-zinc-900"
            style={{ minHeight: "520px" }}
          >
            <img
              src={l25Images[0].src}
              alt={l25Images[0].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* Tag overlay */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-500/25 bg-black/60 backdrop-blur-sm text-[9px] font-black tracking-[0.22em] uppercase text-zinc-300">
                Línea L-25 · Ventanal moderno
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* L-25 — Content: sub-images + benefits + features */}
      <section className="bg-[#0f0f0f] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Sub gallery */}
            <div className="grid grid-cols-2 gap-3">
              {l25Images.slice(1).map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900"
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>

            {/* Benefits + features */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {l25Benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex gap-4 p-5 rounded-2xl border border-zinc-700/18 bg-[#1a1a1a]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-zinc-700/20 border border-zinc-600/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={17} className={b.color} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white tracking-tight mb-1">{b.title}</h4>
                        <p className="text-[12px] text-zinc-600 leading-relaxed">{b.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Features grid */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-zinc-700/20 bg-[#1a1a1a] p-5"
              >
                <p className="text-[9px] font-black tracking-[0.24em] uppercase text-zinc-600 mb-4">Especificaciones</p>
                <ul className="grid grid-cols-1 gap-2">
                  {l25Features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-700/40 border border-zinc-600/25 flex items-center justify-center flex-shrink-0">
                        <Check size={8} className="text-zinc-300" />
                      </div>
                      <span className="text-[12px] text-zinc-500">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <a
                href={wa("Hola, quisiera cotizar ventanales Línea L-25.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/22 text-[#25D366] font-bold text-[11px] tracking-[0.18em] uppercase rounded-xl hover:bg-[#25D366]/18 hover:border-[#25D366]/35 transition-all duration-300"
              >
                <MessageCircle size={13} />
                Cotizar Línea L-25
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── TERMOPANEL ── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}

      <section id="termopanel" className="bg-[#111111] border-t border-white/[0.05] pt-24 pb-0 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-5xl font-black text-amber-900/40 tracking-tighter leading-none">02</span>
              <div>
                <p className="text-[9px] font-black tracking-[0.28em] uppercase text-amber-700 mb-1">Sistema premium</p>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                  Termopanel<span className="text-amber-500/60">.</span>
                </h2>
              </div>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-0">
              Doble vidriado hermético (DVH) con cámara de aire que ofrece aislación térmica y acústica de alto nivel. El estándar de la arquitectura contemporánea para espacios que exigen confort real y eficiencia energética.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Termopanel — Big image */}
      <section className="bg-[#111111] pt-10 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="group relative overflow-hidden rounded-3xl bg-zinc-900"
            style={{ minHeight: "520px" }}
          >
            <img
              src={termopanelImages[0].src}
              alt={termopanelImages[0].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Amber glow */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            {/* Tag overlay */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-500/25 bg-black/60 backdrop-blur-sm text-[9px] font-black tracking-[0.22em] uppercase text-amber-400">
                Termopanel DVH · Alto rendimiento
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Termopanel — Content reversed */}
      <section className="bg-[#111111] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Benefits + features — LEFT side now */}
            <div className="flex flex-col gap-6 lg:order-1">
              <div className="flex flex-col gap-4">
                {termopanelBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex gap-4 p-5 rounded-2xl border border-amber-600/12 bg-[#0b0a08]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/8 border border-amber-500/18 flex items-center justify-center flex-shrink-0">
                        <Icon size={17} className={b.color} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white tracking-tight mb-1">{b.title}</h4>
                        <p className="text-[12px] text-zinc-600 leading-relaxed">{b.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-amber-600/15 bg-[#0b0a08] p-5"
              >
                <p className="text-[9px] font-black tracking-[0.24em] uppercase text-amber-700 mb-4">Especificaciones técnicas</p>
                <ul className="grid grid-cols-1 gap-2">
                  {termopanelFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Check size={8} className="text-amber-400" />
                      </div>
                      <span className="text-[12px] text-zinc-500">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <a
                href={wa("Hola, quisiera cotizar ventanales Termopanel DVH.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/22 text-[#25D366] font-bold text-[11px] tracking-[0.18em] uppercase rounded-xl hover:bg-[#25D366]/18 hover:border-[#25D366]/35 transition-all duration-300"
              >
                <MessageCircle size={13} />
                Cotizar Termopanel
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Sub gallery — RIGHT side */}
            <div className="grid grid-cols-2 gap-3 lg:order-2">
              {termopanelImages.slice(1).map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900"
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── COMPARATIVA RÁPIDA ── */}
      <section className="py-20 bg-[#202020] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-700 mb-3">¿Cuál elegir?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              L-25 vs Termopanel<span className="text-zinc-600">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* L-25 card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] as const }}
              className="rounded-2xl border border-zinc-700/22 bg-[#1a1a1a] p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-black text-zinc-800 tracking-tighter">01</span>
                <div>
                  <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-600">Ideal para</p>
                  <h3 className="text-xl font-black text-white tracking-tight">Línea L-25</h3>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 mb-6">
                {[
                  "Proyectos residenciales modernos",
                  "Presupuesto controlado sin sacrificar calidad",
                  "Casas y departamentos en cualquier piso",
                  "Renovación de ventanas existentes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-700/40 border border-zinc-600/25 flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-zinc-300" />
                    </div>
                    <span className="text-[12px] text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={wa("Hola, quisiera cotizar ventanales Línea L-25.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 border border-zinc-700/30 text-zinc-400 font-bold text-[10px] tracking-[0.16em] uppercase rounded-xl hover:border-zinc-500/50 hover:text-white transition-all"
              >
                <MessageCircle size={11} /> Consultar L-25
              </a>
            </motion.div>

            {/* Termopanel card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="rounded-2xl border border-amber-500/18 bg-[#0b0a08] p-7"
              style={{ boxShadow: "0 0 40px rgba(245,158,11,0.04)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-black text-amber-900/40 tracking-tighter">02</span>
                <div>
                  <p className="text-[9px] font-black tracking-[0.22em] uppercase text-amber-700">Ideal para</p>
                  <h3 className="text-xl font-black text-white tracking-tight">Termopanel DVH</h3>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 mb-6">
                {[
                  "Proyectos de alto estándar arquitectónico",
                  "Zonas con calor o frío extremo",
                  "Alta contaminación acústica urbana",
                  "Certificaciones de eficiencia energética",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-amber-400" />
                    </div>
                    <span className="text-[12px] text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={wa("Hola, quisiera cotizar ventanales Termopanel DVH.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 border border-amber-500/22 bg-amber-500/[0.06] text-amber-400 font-bold text-[10px] tracking-[0.16em] uppercase rounded-xl hover:border-amber-400/35 hover:bg-amber-500/10 transition-all"
              >
                <MessageCircle size={11} /> Consultar Termopanel
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-[#111111] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-500/[0.03] rounded-full blur-[200px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
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
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-amber-600">Relevamiento sin costo</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              Luz, diseño<br />
              <span className="text-zinc-600">y eficiencia.</span>
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
              Medición sin costo, fabricación a medida e instalación profesional en las regiones de Arica, Iquique y Antofagasta. L-25 o Termopanel, te asesoramos sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={wa("Hola, quisiera cotizar ventanales de aluminio.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-9 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-2xl shadow-green-500/15 hover:scale-[1.02]"
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

      {/* ── OTHER LINES ── */}
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
            <h3 className="text-xl font-black text-white tracking-tight">Otras líneas de aluminio.</h3>
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
                    href={`/aluminios/${c.slug}`}
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
