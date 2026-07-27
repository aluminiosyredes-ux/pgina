import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layers, MessageCircle, ArrowRight, ChevronRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import AsistenciaStrip from "../components/AsistenciaStrip";
import InstagramBanner from "../components/InstagramBanner";
import MercadoLibreSection from "../components/MercadoLibreSection";
import CMSGallerySection from "../components/CMSGallerySection";
import ProductsSection from "../components/ProductsSection";
import { rollerCategories } from "../data/rollerCategories";
import RollerCotizadorSection from "../components/RollerCotizadorSection";
import RollerSlider from "../components/RollerSlider";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const as [number, number, number, number] },
};

const waBase = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera cotizar cortinas roller para mi espacio.")}`;

export default function Roller() {
  useSEO(SEO.roller);
  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex items-end pb-16 bg-[#151515] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/cortina.png"
            alt="Cortinas Roller"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.72) saturate(0.9)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/42 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-[#080808]/18 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/22 via-transparent to-transparent" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 60% 45%, rgba(245,158,11,0.055) 0%, transparent 65%)" }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.016]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/6 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5">
              <Layers size={12} /> Confort y diseño
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[0.92] mb-5">
              Cortinas<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Roller.</span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed mb-7 max-w-lg">
              Blackout, sunscreen, motorizadas y dúo fabricadas a medida. Control de luz, temperatura y privacidad
              con o sin motorización inteligente. Calidad premium en cada instalación.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waBase}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Consultar por WhatsApp <MessageCircle size={14} />
              </a>
              <Link
                href="/contacto"
                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded-xl hover:border-white/25 hover:bg-white/5 transition-all"
              >
                Ver contacto <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {false && (
      <section className="py-14 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-px bg-amber-500/50" />
              <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-zinc-500">Líneas disponibles</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Elegí tu línea
              <span className="text-zinc-600 font-light"> de cortina roller.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rollerCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    href={`/roller/${cat.slug}`}
                    className={`group relative flex flex-col gap-4 p-6 rounded-2xl border ${cat.border} ${cat.hoverBorder} bg-[#1c1c1c] hover:bg-[#111] transition-all duration-300 overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${cat.glowBg} rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${cat.iconBg} border ${cat.border} flex items-center justify-center`}>
                        <Icon size={18} className={cat.color} />
                      </div>
                      <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${cat.border} ${cat.color} tracking-widest uppercase`}>
                        {cat.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white tracking-tight mb-1.5">{cat.title}</h3>
                      <p className="text-[12px] text-zinc-500 leading-relaxed">{cat.sub}</p>
                    </div>
                    <div className={`flex items-center justify-between pt-3 border-t ${cat.border}`}>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-600">
                        {cat.products.length} soluciones
                      </span>
                      <div className={`flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase ${cat.color} group-hover:translate-x-0.5 transition-transform duration-300`}>
                        Explorar <ChevronRight size={11} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── FABRICACIÓN A MEDIDA ── */}
      <section className="py-12 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.28em] uppercase text-amber-500 mb-3">Fabricación propia</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                Fabricamos cada cortina<br />
                <span className="text-zinc-400 font-light">exactamente a tu medida.</span>
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                No trabajamos con tallas estándar. Cada cortina se confecciona con las medidas exactas de tu ventana, 
                garantizando un ajuste perfecto y un acabado profesional en cada instalación.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "+50 colores", desc: "Amplio catálogo de telas en tonos neutros, cálidos y modernos." },
                { title: "Blackout · Screen · Zebra", desc: "Todas las líneas disponibles en múltiples variantes de tela." },
                { title: "Fabricación a medida", desc: "Cortamos y confeccionamos según las medidas exactas de tu espacio." },
                { title: "Instalación incluida", desc: "Servicio completo: medición, fabricación e instalación profesional." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-white/6 bg-white/[0.02]">
                  <p className="text-amber-400 text-xs font-black tracking-wide mb-1">{item.title}</p>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <RollerSlider />

      {/* <RollerCotizadorSection /> */}

      <AsistenciaStrip />

      {/* ── CTA ── */}
      <section className="py-9 bg-[#151515]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-amber-500/12 bg-gradient-to-br from-amber-500/5 to-transparent p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
              <div>
                <p className="text-[10px] font-black tracking-[0.22em] uppercase text-amber-500 mb-2">¿Te interesa?</p>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Pedí tu presupuesto ahora.</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Fabricamos a medida para tu espacio. Asesoramiento sin costo, respondemos el mismo día.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={waBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#1fba58] transition-all shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={14} /> Cotizar por WhatsApp
                </a>
                <Link
                  href="/contacto"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded-xl hover:border-white/25 hover:bg-white/5 transition-all"
                >
                  Ir a contacto
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductsSection category="roller" title="Productos Roller" />

      <CMSGallerySection
        category="roller"
        fallback={[]}
      />

      <MercadoLibreSection />

      <InstagramBanner />

    </motion.div>
  );
}
