import { motion } from "framer-motion";
import { Link } from "wouter";
import { Box, Check, MessageCircle, ArrowRight, Wind, Thermometer, Volume2, Lock, ChevronRight } from "lucide-react";
import { aluminiosCategories } from "../data/aluminiosCategories";
import { WHATSAPP_NUMBER } from "../config";
import AluminiosSlider from "../components/AluminiosSlider";
import AsistenciaStrip from "../components/AsistenciaStrip";
import InstagramBanner from "../components/InstagramBanner";
import CMSGallerySection from "../components/CMSGallerySection";
import ProductsSection from "../components/ProductsSection";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const as [number, number, number, number] },
};

const products = [
  { name: "Ventanas DVH", sub: "Doble vidriado hermético", desc: "Cámara de aire entre dos vidrios. Aislación térmica y acústica superior. Reduce hasta el 60% la transferencia de temperatura.", tag: "Más solicitado" },
  { name: "Puertas corredizas", sub: "Apertura suave y silenciosa", desc: "Sistemas de rodamiento de alta calidad. Sellado perimetral antipolvo. Disponible en medidas estándar y especiales.", tag: "Residencial" },
  { name: "Cerramientos", sub: "Balcones, terrazas y galerías", desc: "Protección total contra lluvia, viento y frío. Apto para edificios, torres y viviendas. Con o sin apertura.", tag: "Alta demanda" },
  { name: "Frentes de locales", sub: "Diseño moderno y funcional", desc: "Vidrio templado con marco de aluminio, puertas automáticas y sistemas de exhibición para locales comerciales.", tag: "Comercial" },
];

const gallery = [
  { label: "Ventanas DVH departamento", tipo: "Residencial", detail: "Perfil negro lacado", grad: "from-zinc-800/60 to-slate-900/70" },
  { label: "Cerramiento de balcón", tipo: "Residencial", detail: "DVH 4/9/4", grad: "from-slate-700/50 to-zinc-900/80" },
  { label: "Frente local premium", tipo: "Comercial", detail: "Vidrio templado 10mm", grad: "from-zinc-900/70 to-slate-800/60" },
  { label: "Puerta corrediza suite", tipo: "Residencial", detail: "Sistema importado", grad: "from-slate-800/70 to-zinc-800/60" },
  { label: "Cerramiento torre 20 pisos", tipo: "Edificio", detail: "Integral con DVH", grad: "from-zinc-700/50 to-slate-900/80" },
  { label: "Fachada showroom", tipo: "Comercial", detail: "Carpintería modular", grad: "from-slate-900/80 to-zinc-700/50" },
];

const attributes = [
  { icon: Wind, title: "Aislación al viento", desc: "Sellado perimetral que impide el ingreso de aire y polvo." },
  { icon: Thermometer, title: "Aislación térmica", desc: "DVH reduce la ganancia/pérdida de temperatura hasta un 60%." },
  { icon: Volume2, title: "Aislación acústica", desc: "Reduce significativamente el ruido exterior en zonas urbanas." },
  { icon: Lock, title: "Seguridad", desc: "Perfiles con cierre multipunto y sistemas de traba certificados." },
];

const specs = [
  { label: "Perfil principal", value: "Aluminio 6063 T5/T6" },
  { label: "Espesor de pared", value: "1.2 – 2.0 mm según línea" },
  { label: "Vidrio disponible", value: "Simple, DVH 4/9/4, DVH 4/12/4, laminado" },
  { label: "Terminaciones", value: "Anodizado natural, anodizado color, lacado al horno" },
  { label: "Colores", value: "Blanco, negro, gris, marrón y especiales" },
  { label: "Garantía", value: "2 años materiales y mano de obra" },
];

export default function Aluminios() {
  useSEO(SEO.aluminios);
  return (
    <motion.div {...pageTransition}>
      {/* HERO */}
      <section className="relative min-h-[82vh] flex items-end pb-16 bg-[#151515] overflow-hidden">
        {/* ── Hero image — full bleed cinematic ── */}
        <div className="absolute inset-0">
          <img
            src="/images/aluminio.png"
            alt="Carpintería en Aluminio"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.70) saturate(0.88)" }}
          />
          {/* Bottom-to-top fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          {/* Left vignette — text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/62 via-[#080808]/20 to-transparent" />
          {/* Top vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-transparent to-transparent" />
          {/* Cool silver ambient tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 62% 42%, rgba(161,170,180,0.04) 0%, transparent 65%)",
            }}
          />
        </div>

        {/* Dot grid texture */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-500/20 bg-zinc-500/6 text-zinc-300 text-xs font-semibold tracking-widest uppercase mb-5">
              <Box size={12} /> Precisión artesanal
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[0.92] mb-5">
              Carpintería de<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-white to-zinc-400">Aluminio.</span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed mb-7 max-w-lg">
              Ventanas, puertas, cerramientos y frentes de locales fabricados a medida con perfiles de primera línea.
              Cada pieza, terminación perfecta.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera cotizar carpintería de aluminio.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
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

      {/* ── NAVIGATION GRID (oculto temporalmente) ──
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
              <div className="w-4 h-px bg-zinc-400/40" />
              <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-zinc-500">Líneas disponibles</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Elegí tu solución
              <span className="text-zinc-600 font-light"> en aluminio.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aluminiosCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const as [number, number, number, number] }}
                >
                  <Link
                    href={`/aluminios/${cat.slug}`}
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
      ── fin sección oculta ── */}

      <AluminiosSlider />

      {/* CTA WhatsApp — cotización aluminio */}
      <section className="py-10 bg-[#0f0f0f]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-black tracking-[0.28em] uppercase text-zinc-600 mb-3">Carpintería de Aluminio</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
              ¿Necesitás una cotización?
            </h2>
            <p className="text-zinc-500 text-sm mb-6">
              Escribinos por WhatsApp con tus medidas y te respondemos el mismo día hábil.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera cotizar una instalación de carpintería de aluminio.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-black text-sm font-black tracking-wide hover:bg-[#1ebe5d] hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-[#25D366]/25"
            >
              <MessageCircle size={16} />
              Solicitar cotización por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ATRIBUTOS */}
      <section className="py-9 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">Beneficios</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Por qué el aluminio<br /><span className="text-zinc-500">es la mejor elección.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attributes.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-[#222222] hover:border-zinc-400/12 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-zinc-400/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{a.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AsistenciaStrip />

      {/* CTA */}
      <section className="py-9 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/8 bg-[#222222] p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">¿Te interesa?</p>
                <h3 className="text-2xl font-black text-white mb-2">Solicitar presupuesto de aluminio.</h3>
                <p className="text-zinc-400 text-sm">Cotizá tus instalaciones en las regiones de Arica, Iquique y Antofagasta. Ventas y envíos para todo Chile.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera cotizar carpintería de aluminio.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-[#1fba58] transition-all shadow-lg shadow-green-500/20">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <Link href="/contacto"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded hover:border-white/25 hover:bg-white/5 transition-all">
                  Ir a contacto
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <ProductsSection category="aluminios" title="Productos de Aluminios" />

      <CMSGallerySection
        category="aluminios"
        fallback={[]}
      />

      <InstagramBanner />

    </motion.div>
  );
}
