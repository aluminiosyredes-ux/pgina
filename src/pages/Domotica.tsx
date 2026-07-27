import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Cpu, MessageCircle, Zap, ArrowRight, ChevronRight, Check, Wifi,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import AsistenciaStrip from "../components/AsistenciaStrip";
import InstagramBanner from "../components/InstagramBanner";
import CMSGallerySection from "../components/CMSGallerySection";
import ProductsSection from "../components/ProductsSection";
import { domoticaCategories } from "../data/domoticaCategories";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";
import MercadoLibreSection from "../components/MercadoLibreSection";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const ecosystems = [
  { name: "Amazon Alexa", sub: "Voice control" },
  { name: "Google Home", sub: "Assistant" },
  { name: "Apple HomeKit", sub: "iOS / macOS" },
  { name: "KNX / BACnet", sub: "Protocolo industrial" },
  { name: "Tuya Smart", sub: "IoT platform" },
  { name: "MQTT", sub: "Open protocol" },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Domotica() {
  useSEO(SEO.domotica);
  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex items-end pb-16 overflow-hidden bg-[#1c1c1c]">
        {/* ── Hero image — full bleed cinematic ── */}
        <div className="absolute inset-0">
          <img
            src="/images/domo.png"
            alt="Domótica y Automatización"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.74) saturate(0.92)" }}
          />
          {/* Bottom-to-top fade — anchors content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/44 to-transparent" />
          {/* Left-side vignette — improves text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/58 via-[#030303]/20 to-transparent" />
          {/* Top vignette — smooth entry */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/22 via-transparent to-transparent" />
          {/* Subtle purple ambient tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 65% 40%, rgba(139,92,246,0.07) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-purple-500/40" />
                <span className="text-xs font-semibold tracking-[0.22em] text-purple-400/70 uppercase">Hogar Inteligente</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-5">
                Domótica &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
                  Automatización.
                </span>
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
                Transformamos tu hogar u oficina en un espacio verdaderamente inteligente.
                Iluminación, seguridad, accesos y clima — todo desde tu smartphone.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={wa("Hola, quisiera consultar sobre domótica para mi hogar.")}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-7 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-purple-600/20">
                  <MessageCircle size={14} /> Consultar ahora
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link href="/contacto"
                  className="flex items-center gap-2 px-6 py-3.5 border border-white/10 text-white font-bold text-xs tracking-widest uppercase rounded-xl hover:border-white/22 hover:bg-white/4 transition-all">
                  Ver contacto
                </Link>
              </div>
            </motion.div>

            {/* Ecosystems — desktop */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-600 mb-4">Compatible con</p>
              <div className="grid grid-cols-2 gap-2">
                {ecosystems.map((e) => (
                  <div key={e.name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-white">{e.name}</div>
                      <div className="text-[10px] text-zinc-600">{e.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* ── CATEGORY NAVIGATION GRID ── */}
      <section className="py-10 bg-[#0f0f0f] border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-600 mb-1">Explorá por categoría</p>
            <h2 className="text-xl font-black text-white tracking-tight">5 soluciones de hogar inteligente.</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {domoticaCategories.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href={`/domotica/${cat.slug}`}
                    className={`group flex flex-col rounded-2xl border ${cat.border} ${cat.hoverBorder} bg-[#1c1c1c] text-center transition-all duration-300 hover:bg-[#111] overflow-hidden`}
                  >
                    {/* Image thumbnail */}
                    {cat.image && (
                      <div className="relative w-full h-28 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-[#1c1c1c]/30 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradFrom} to-transparent opacity-60`} />
                      </div>
                    )}
                    {/* Content */}
                    <div className="flex flex-col items-center gap-2 p-3 pt-2">
                      <div className={`w-8 h-8 rounded-lg ${cat.iconBg} border ${cat.border} flex items-center justify-center group-hover:scale-[1.05] transition-transform`}>
                        <CatIcon size={15} className={cat.color} />
                      </div>
                      <div>
                        <div className="text-[11px] font-black text-white leading-tight">{cat.title}</div>
                        <div className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 ${cat.color} opacity-60`}>{cat.tag}</div>
                      </div>
                      <ChevronRight size={10} className={`${cat.color} opacity-0 group-hover:opacity-70 transition-opacity`} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="py-8 bg-[#0f0f0f] border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Check, text: "Sin grandes obras", sub: "Instalación limpia" },
              { icon: Zap,   text: "Instalación por etapas", sub: "Expandible cuando quieras" },
              { icon: Cpu,   text: "Asesoramiento completo", sub: "Diseño personalizado" },
              { icon: Wifi,  text: "Soporte post-instalación", sub: "Asistencia técnica incluida" },
            ].map((f, i) => {
              const FIcon = f.icon;
              return (
                <motion.div key={f.text} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FIcon size={13} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-black text-white leading-tight">{f.text}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">{f.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AsistenciaStrip />

      {/* ── CTA ── */}
      <section className="py-10 bg-[#151515]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-transparent p-7 md:p-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-purple-400 mb-2">¿Te interesa?</p>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Automatizá tu hogar o empresa.</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Asesoramiento personalizado sin costo. Diseñamos el sistema ideal para tu espacio y presupuesto.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a href={wa("Hola, quisiera consultar sobre domótica para mi hogar.")}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-green-500/20">
                  <MessageCircle size={14} /> Consultar por WhatsApp
                </a>
                <Link href="/contacto"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded-xl hover:border-white/20 hover:bg-white/4 transition-all">
                  Ver información de contacto
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductsSection category="domotica" title="Productos de Domótica" />

      <CMSGallerySection
        category="domotica"
        fallback={[]}
      />

      <MercadoLibreSection />

      <InstagramBanner />

    </motion.div>
  );
}
